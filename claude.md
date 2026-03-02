# Mentalwell Investors - Project Context

## Overview
Interactive investor deck and financial model for **Mentalwell** - an AI-powered ADHD and ASD assessment clinic revolutionizing mental healthcare in the UK.

## Project Architecture

```
Mentalwell_Investors/
├── index.html              # Main investor deck (tabbed presentation)
├── demo.html               # Interactive scenario testing
├── css/                    # Stylesheets (to be extracted)
├── js/
│   ├── financial-data.js   # Data layer - all business assumptions
│   ├── calculations.js     # Business logic - financial calculations
│   └── renderer.js         # View layer - HTML generation
└── assets/
    └── images/
        ├── branding/       # Logo, mw.png
        ├── team/           # Founders: armando, daniel, kayode, dor
        └── slides/         # Presentation images
```

## Tech Stack
- **Pure Vanilla JavaScript** (ES6+ classes)
- **No build process** - runs directly in browser
- **No dependencies** - zero npm packages
- **MVC Pattern**: Data → Calculations → Renderer

## Key Files

### js/financial-data.js
Central data repository containing:
- **Pricing**: B2C (£590-£1,990), NHS (£1,350-£2,000), Subscriptions (£750-£1,050)
- **Costs**: Clinical (£450-£650), Tech/Admin (£60-£150), CAC (£0-£300)
- **Operating Expenses**: Insurance, CQC, office rent, admin salaries
- **Growth Scenarios**: Pessimistic, Realistic, Optimistic for 2026
- **Multi-year Projections**: 2026-2029 with expansion to UK, Ireland, Canada, Australia
- **Unit Economics**: Per-service margin calculations

### js/calculations.js
`FinancialCalculations` class with methods:
- `calculateMonthlyRevenue()` - B2C, NHS, subscription revenue
- `calculateMonthlyCosts()` - Uses unit economics
- `generate2025Performance()` - Actuals + projections
- `generate2026Projections()` - Scenario-based
- `calculateKPIMetrics()` - Dynamic KPI calculation
- `switchScenario()` - Toggle between growth scenarios

### js/renderer.js
`FinancialRenderer` class with rendering methods:
- `renderServicePricingTable()` - Service portfolio
- `render2025PerformanceTable()` - Historical data
- `render2026ProjectionsTable()` - Monthly projections
- `renderUnitEconomicsTable()` - Per-service margins
- `renderThreeStatementModel()` - Income, Balance, Cash Flow
- `renderTitrationTrackingTable()` - ADHD medication tracking
- `renderHRPlanningTable()` - Staffing requirements
- `renderScenarioComparison()` - Side-by-side scenarios

## Business Model

### Services
| Service | Price | Target |
|---------|-------|--------|
| ADHD Assessment Only | £590 | B2C |
| ADHD Complete Care | £1,200 | B2C |
| ADHD Premium | £1,990 | B2C |
| Child ADHD | £890 | B2C |
| ASD Assessment (Adult/Child) | £1,900 | B2C/NHS |
| NHS ADHD Contract | £1,350 | NHS |
| NHS ASD Contract | £2,000 | NHS |

### Revenue Channels
1. **B2C Direct** - Private patients
2. **NHS Right to Choose** - Contract referrals (launching April 2026)
3. **Subscriptions** - 6-month treatment plans (50% take rate)

### Unit Economics (Updated Feb 2026)
| Service | Revenue | Clinical | Tech/Admin | CAC | Margin |
|---------|---------|----------|------------|-----|--------|
| ADHD Assessment Only | £590 | £320 | £60 | £300 | -15% |
| ADHD Complete Care | £1,200 | £550 | £60 | £300 | 24% |
| ADHD Premium | £1,990 | £650 | £60 | £300 | 49% |
| Child ADHD | £890 | £320 | £60 | £300 | 24% |
| ASD Assessment | £1,900 | £550 | £60 | £300 | 52% |
| NHS ADHD | £1,350 | £550 | £60 | £50 | 51% |
| NHS ASD | £2,000 | £550 | £60 | £50 | 67% |

## Growth Scenarios (2026)

| Scenario | Annual Revenue | Description |
|----------|----------------|-------------|
| Pessimistic | ~£5M | 50% of target |
| Realistic | ~£10M | 70:30 NHS:Private, 90:10 ADHD:Autism |
| Optimistic | ~£15M | 150% of target |

**Note:** NHS launches April 2026. Jan-Mar is B2C only.

## Key Metrics to Track
- Total patients (monthly/annual)
- Revenue by channel (B2C vs NHS)
- Gross margin by service type
- Clinician utilization (80 assessments/month capacity)
- Prescriber requirements (462 appointments/month capacity)
- Titration patient tracking (90% start, 3-month duration)

## Development Guidelines

### Updating Financial Data
1. Edit `js/financial-data.js` - single source of truth
2. All tables auto-update via calculations engine
3. Test with `demo.html` for scenario validation

### Adding New Tables/Sections
1. Add calculation method to `calculations.js`
2. Add render method to `renderer.js`
3. Add container div with ID to `index.html`
4. Call render method in `initializeDynamicContent()`

### Code Style
- ES6 class-based OOP
- camelCase naming
- Currency formatted with `formatCurrency()`
- Percentages with `formatPercentage()`

## Current Status (Last Updated: Feb 2026)

### 2025 Actuals - Stripe Verified (June - December)
| Month | Patients | Revenue |
|-------|----------|---------|
| June | 14 | £11,045 |
| July | 27 | £24,315 |
| August | 84 | £72,322 |
| September | 147 | £135,340 |
| October | 198 | £178,315 |
| November | 264 | £240,537 |
| December | 172 | £159,785 |
| **2025 Total** | **906** | **£821,659** |

### 2026 Actuals - Stripe Verified
| Month | Patients | Revenue |
|-------|----------|---------|
| January | 185 | £174,080 |
| February* | 99 | £99,142 |

*February is partial month (as of Feb 18)

### Key Milestones Achieved
- Peak month: November 2025 (264 patients, £240K revenue)
- Exceeded £75K monthly target - reached £174K in Jan 2026
- Autism assessments launched January 2026 (8 patients in first month)
- Total 2025 revenue: £822K (Stripe verified)
- NHS Launch: December 2025
- Seed Round: £250K

### Data Source
- Primary: Stripe export (`unified_payments.csv`)
- Analysis script: `scripts/analyze_stripe.py`

## Team (28 people)

### Leadership & Vision
- **Daniel Shichor** - CEO & Co-Founder
- **Dor Cohen** - COO & Co-Founder

### Management & Operations
- **Dr. Armando Muro** - Medical Director
- **Harry Bradley** - Head of Operations
- **Ami Andrews** - Head of Clinical Operations
- **Paul Houghton** - Head of Autism Pathway
- **Carl Ellis** - ADHD Clinical Lead
- **Adil Bhaloda** - Prescribing Pathway Lead

### Clinical Team
- **12 ADHD Assessors** (Psychiatrists)
- **3 Autism Assessment Team** (Clinical Psychologists + SLT)
- **3 Prescribers** (Nurse/Pharmacist Independent Prescribers)
- **3 Support Staff** (QA, Patient Support)

### Key Advisor
- **Colbert Ncube** - NHS Partnership Lead (14 years NHS experience)

## Funding
- **Seed Round (Completed):** £250K
- **Series A (Current):** Raising £3M
- **Target:** £10M revenue in 2026

## TODO / Improvements
- [ ] Extract inline CSS to `css/styles.css`
- [ ] Add interactive charts (Chart.js consideration)
- [ ] Mobile responsiveness improvements
- [ ] Add print/PDF export functionality

## Notes
- All financials in GBP (£)
- Fiscal year aligns with calendar year
- UK healthcare market context
- NHS Right to Choose pathway critical for scale
