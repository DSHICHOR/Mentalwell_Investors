#!/usr/bin/env python3
"""
Mentalwell Stripe Payment Analysis Script
Analyzes Stripe export data and generates monthly sales reports.
"""

import pandas as pd
from datetime import datetime
import json
import re

# Product Portfolio - match by price
PRODUCT_MAPPING = {
    # ADHD Adult
    590: {'name': 'ADHD Assessment Only', 'category': 'adhd_adult', 'type': 'assessment'},
    1200: {'name': 'ADHD Complete Care Package', 'category': 'adhd_adult', 'type': 'package'},
    1990: {'name': 'ADHD Premium Package', 'category': 'adhd_adult', 'type': 'package'},
    295: {'name': 'ADHD Re-assessment', 'category': 'adhd_adult', 'type': 'reassessment'},

    # ADHD Child
    890: {'name': 'Child ADHD Assessment Only', 'category': 'adhd_child', 'type': 'assessment'},
    900: {'name': 'Child ADHD Assessment Only (old price)', 'category': 'adhd_child', 'type': 'assessment'},

    # Treatment Plans
    750: {'name': 'Adult 6-Month Treatment Plan', 'category': 'treatment', 'type': 'subscription'},
    1050: {'name': 'Child 6-Month Treatment Plan', 'category': 'treatment', 'type': 'subscription'},
    1500: {'name': 'Adult 12-Month Treatment Plan', 'category': 'treatment', 'type': 'subscription'},
    2100: {'name': 'Child 12-Month Treatment Plan', 'category': 'treatment', 'type': 'subscription'},

    # ASD/Autism
    1750: {'name': 'Adult Autism Assessment', 'category': 'asd_adult', 'type': 'assessment'},
    1900: {'name': 'Adult/CYP Autism Assessment', 'category': 'asd', 'type': 'assessment'},
    1940: {'name': 'Autism Assessment (variant)', 'category': 'asd', 'type': 'assessment'},

    # Other
    250: {'name': 'Consultation/Add-on', 'category': 'other', 'type': 'addon'},
    990: {'name': 'Complete Care (old price)', 'category': 'adhd_adult', 'type': 'package'},
}

def identify_product(row):
    """Identify product from amount and description."""
    amount = row['Amount']
    description = str(row['Description']) if pd.notna(row['Description']) else ''

    # Skip test transactions
    if amount <= 1:
        return {'name': 'Test Transaction', 'category': 'test', 'type': 'test'}

    # Try to identify from description first
    desc_lower = description.lower()

    # Check description for specific products
    if 'autism' in desc_lower or 'asd' in desc_lower or 'ados' in desc_lower:
        if 'cyp' in desc_lower or 'child' in desc_lower:
            return {'name': 'CYP Autism Assessment', 'category': 'asd_child', 'type': 'assessment'}
        return {'name': 'Adult Autism Assessment', 'category': 'asd_adult', 'type': 'assessment'}

    if 'children' in desc_lower or 'child' in desc_lower or 'u18' in desc_lower or 'cyp' in desc_lower:
        if 'assessment only' in desc_lower:
            return {'name': 'Child ADHD Assessment Only', 'category': 'adhd_child', 'type': 'assessment'}
        return {'name': 'Child ADHD Package', 'category': 'adhd_child', 'type': 'package'}

    if 're-assessment' in desc_lower or 'reassessment' in desc_lower:
        return {'name': 'ADHD Re-assessment', 'category': 'adhd_adult', 'type': 'reassessment'}

    if 'premium' in desc_lower:
        return {'name': 'ADHD Premium Package', 'category': 'adhd_adult', 'type': 'package'}

    if 'complete care' in desc_lower:
        return {'name': 'ADHD Complete Care Package', 'category': 'adhd_adult', 'type': 'package'}

    if 'assessment only' in desc_lower:
        return {'name': 'ADHD Assessment Only', 'category': 'adhd_adult', 'type': 'assessment'}

    # Fall back to price matching
    amount_int = int(round(amount))
    if amount_int in PRODUCT_MAPPING:
        return PRODUCT_MAPPING[amount_int]

    # Unknown product
    return {'name': f'Unknown (£{amount})', 'category': 'unknown', 'type': 'unknown'}


def analyze_stripe_data(csv_path):
    """Main analysis function."""

    # Read CSV
    df = pd.read_csv(csv_path)

    # Parse dates
    df['Date'] = pd.to_datetime(df['Created date (UTC)'])
    df['Month'] = df['Date'].dt.to_period('M')
    df['Year'] = df['Date'].dt.year

    # Filter to only paid transactions
    paid_df = df[df['Status'] == 'Paid'].copy()

    # Exclude test transactions (£1 or less)
    paid_df = paid_df[paid_df['Amount'] > 1]

    # Exclude refunded transactions
    paid_df = paid_df[paid_df['Amount Refunded'] == 0]

    # Identify products
    paid_df['Product'] = paid_df.apply(identify_product, axis=1)
    paid_df['Product_Name'] = paid_df['Product'].apply(lambda x: x['name'])
    paid_df['Category'] = paid_df['Product'].apply(lambda x: x['category'])
    paid_df['Type'] = paid_df['Product'].apply(lambda x: x['type'])

    print("=" * 80)
    print("MENTALWELL STRIPE ANALYSIS REPORT")
    print("=" * 80)
    print(f"\nData Range: {paid_df['Date'].min().strftime('%Y-%m-%d')} to {paid_df['Date'].max().strftime('%Y-%m-%d')}")
    print(f"Total Paid Transactions (excl. tests/refunds): {len(paid_df)}")
    print(f"Total Revenue: £{paid_df['Amount'].sum():,.2f}")

    # Monthly Summary
    print("\n" + "=" * 80)
    print("MONTHLY SUMMARY")
    print("=" * 80)

    monthly = paid_df.groupby('Month').agg({
        'Amount': ['sum', 'count'],
        'id': 'count'
    }).reset_index()
    monthly.columns = ['Month', 'Revenue', 'Transactions', 'Count']
    monthly = monthly.drop('Count', axis=1)

    print(f"\n{'Month':<12} | {'Transactions':>12} | {'Revenue':>15}")
    print("-" * 45)

    for _, row in monthly.iterrows():
        print(f"{str(row['Month']):<12} | {row['Transactions']:>12} | £{row['Revenue']:>14,.2f}")

    # Product breakdown by month
    print("\n" + "=" * 80)
    print("PRODUCT BREAKDOWN BY MONTH")
    print("=" * 80)

    product_monthly = paid_df.groupby(['Month', 'Product_Name']).agg({
        'Amount': ['sum', 'count']
    }).reset_index()
    product_monthly.columns = ['Month', 'Product', 'Revenue', 'Count']

    # Pivot for better view
    for month in sorted(paid_df['Month'].unique()):
        month_data = product_monthly[product_monthly['Month'] == month]
        if len(month_data) > 0:
            print(f"\n--- {month} ---")
            for _, row in month_data.sort_values('Revenue', ascending=False).iterrows():
                print(f"  {row['Product']:<40} | {row['Count']:>4} units | £{row['Revenue']:>10,.2f}")

    # Category summary
    print("\n" + "=" * 80)
    print("CATEGORY SUMMARY (ALL TIME)")
    print("=" * 80)

    category_summary = paid_df.groupby('Category').agg({
        'Amount': ['sum', 'count']
    }).reset_index()
    category_summary.columns = ['Category', 'Revenue', 'Count']
    category_summary = category_summary.sort_values('Revenue', ascending=False)

    print(f"\n{'Category':<20} | {'Count':>8} | {'Revenue':>15} | {'Avg':>10}")
    print("-" * 60)
    for _, row in category_summary.iterrows():
        avg = row['Revenue'] / row['Count'] if row['Count'] > 0 else 0
        print(f"{row['Category']:<20} | {row['Count']:>8} | £{row['Revenue']:>14,.2f} | £{avg:>9,.2f}")

    # Generate JSON output for financial-data.js
    print("\n" + "=" * 80)
    print("DATA FOR financial-data.js")
    print("=" * 80)

    # Group by year-month
    output_data = {}
    for month in sorted(paid_df['Month'].unique()):
        month_str = str(month)
        year = int(month_str[:4])
        month_name = pd.Timestamp(month.to_timestamp()).strftime('%B').lower()

        month_df = paid_df[paid_df['Month'] == month]

        # Count by category
        category_counts = month_df.groupby('Category').size().to_dict()
        product_counts = month_df.groupby('Product_Name').size().to_dict()

        month_data = {
            'patients': len(month_df),
            'revenue': round(month_df['Amount'].sum(), 2),
            'status': 'actual',
            'breakdown': product_counts
        }

        if year not in output_data:
            output_data[year] = {}
        output_data[year][month_name] = month_data

    # Print as JavaScript
    print("\n// Performance data from Stripe export")
    for year in sorted(output_data.keys()):
        print(f"\n// {year} Actuals")
        print(f"performance_{year}: {{")
        print("  actuals: {")
        for month, data in output_data[year].items():
            print(f"    {month}: {{")
            print(f"      patients: {data['patients']},")
            print(f"      revenue: {data['revenue']},")
            print(f"      status: 'actual',")
            print(f"      breakdown: {json.dumps(data['breakdown'], indent=8)}")
            print(f"    }},")
        print("  }")
        print("},")

    return paid_df, monthly, output_data


if __name__ == "__main__":
    import sys

    csv_path = sys.argv[1] if len(sys.argv) > 1 else '/Users/Michael/Downloads/unified_payments (5).csv'

    paid_df, monthly, output_data = analyze_stripe_data(csv_path)

    # Save detailed output
    print("\n" + "=" * 80)
    print("ANALYSIS COMPLETE")
    print("=" * 80)
