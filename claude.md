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
| ASD Assessment | £1,750 | B2C/NHS |
| NHS ADHD Contract | £1,350 | NHS |
| NHS ASD Contract | £2,000 | NHS |

### Revenue Channels
1. **B2C Direct** - Private patients
2. **NHS Right to Choose** - Contract referrals (launching Dec 2025)
3. **Subscriptions** - 6-month treatment plans (50% take rate)

### Unit Economics
- B2C ADHD: 31% margin (£369 profit/patient)
- B2C ASD: 51% margin (£892 profit/patient)
- NHS ADHD: 55% margin (£739 profit/patient)
- NHS ASD: 68% margin (£1,362 profit/patient)

## Growth Scenarios (2026)

| Scenario | Patients | Revenue | Description |
|----------|----------|---------|-------------|
| Pessimistic | ~750/mo | ~£10M | 50% of target |
| Realistic | ~1,500/mo | ~£21M | 30% private, 70% NHS |
| Optimistic | ~3,000/mo | ~£40M | 2x target |

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

## Team
- **Armando** - [Role TBD]
- **Daniel** - [Role TBD]
- **Kayode** - [Role TBD]
- **Dor** - [Role TBD]

## TODO / Improvements
- [ ] Extract inline CSS to `css/styles.css`
- [ ] Update image paths to new asset structure
- [ ] Add interactive charts (Chart.js consideration)
- [ ] Mobile responsiveness improvements
- [ ] Add print/PDF export functionality
- [ ] Update team bios and roles

## Notes
- All financials in GBP (£)
- Fiscal year aligns with calendar year
- UK healthcare market context
- NHS Right to Choose pathway critical for scale
