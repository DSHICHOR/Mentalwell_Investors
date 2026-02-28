// Mentalwell Financial Model - Data Configuration
// Edit this file to update all financial projections across the website

const financialData = {
  // Service Pricing (Updated Feb 2026)
  pricing: {
    // ADHD Services
    b2c_adhd_assessment: 590,
    b2c_adhd_complete: 1200,
    b2c_adhd_premium: 1990,
    b2c_adhd_reassessment: 295,
    // Autism Services (Adult & Child same price)
    b2c_asd: 1900,           // Used by calculations engine
    b2c_asd_adult: 1900,
    b2c_asd_child: 1900,
    // Child ADHD
    b2c_child_adhd: 890,
    // Treatment Plans
    treatment_adult_6month: 750,
    treatment_adult_12month: 1500,
    treatment_child_6month: 1050,
    treatment_child_12month: 2100,
    subscription_6month: 750, // Alias for subscription calculation
    // NHS Rates (future)
    nhs_adhd: 1350,
    nhs_asd: 2000
  },

  // Cost Structure (per patient) - Updated Feb 2026
  costs: {
    clinical_adhd: 550,      // Clinical costs for ADHD
    clinical_asd: 550,       // Clinical costs for Autism (same)
    clinical_child: 550,     // Clinical costs for children
    technology_admin: 60,    // Tech/admin per patient
    customer_acquisition: 300 // CAC for all products
  },

  // Fixed Operating Expenses (monthly)
  operating_expenses: {
    insurance: 3000, // Professional indemnity insurance
    cqc_registration: 500, // Higher compliance costs
    office_rent: {
      start_date: '2026-01-01',
      monthly_cost: 8000 // Larger facilities needed
    },
    admin_salaries: {
      start_date: '2026-01-01',
      positions: 8, // More admin staff needed for scale
      annual_salary_per_position: 45000,
      monthly_cost_total: 30000 // 8 positions × £45k/year ÷ 12 months
    },
    unexpected_overhead_rate: 0.15 // 15% of total operating expenses for scale
  },

  // 2026 Monthly OpEx schedule (based on 2025 management accounts + scaling)
  // Dec 2025 actual total expenses: £64K. Categories: staff, software, consulting,
  // facilities, payment processing, insurance, travel/other.
  // Staff costs are the largest component (~61%), scaling with headcount growth.
  opex_monthly_2026: {
    january: 93000,    // Bank statement verified: staff £45K, marketing £18K, software £5K, insurance/rent £8K, NI/other £17K
    february: 91000,   // Bank statement estimated (similar pattern to January)
    march: 91000,
    april: 96000,      // NHS ops begin, compliance costs
    may: 99000,
    june: 103000,      // NHS ASD launch adds complexity
    july: 108000,
    august: 112000,
    september: 116000,
    october: 119000,
    november: 122000,
    december: 125000
  },

  // Market Assumptions
  market: {
    subscription_take_rate: 0.562,
    subscription_renewal_rate: 0.667,
    gross_margin_target: 0.53
  },

  // 2025-2026 Actuals (from Stripe export - unified_payments)
  // Last updated: February 2026
  // Source: scripts/analyze_stripe.py
  performance_2025: {
    actuals: {
      june: {
        patients: 14,
        revenue: 11045,
        status: 'actual',
        breakdown: {
          adhd_assessment_only: 5,
          adhd_complete_care: 4,
          adhd_reassessment: 1,
          adult_6m_plan: 4
        }
      },
      july: {
        patients: 27,
        revenue: 24315,
        status: 'actual',
        breakdown: {
          adhd_assessment_only: 10,
          adhd_complete_care: 14,
          adhd_reassessment: 1,
          adult_6m_plan: 2
        }
      },
      august: {
        patients: 84,
        revenue: 72322,
        status: 'actual',
        breakdown: {
          adhd_assessment_only: 27,
          adhd_complete_care: 26,
          adhd_reassessment: 3,
          adult_6m_plan: 6,
          child_6m_plan: 4,
          child_adhd_assessment: 17
        }
      },
      september: {
        patients: 147,
        revenue: 135340,
        status: 'actual',
        breakdown: {
          adhd_assessment_only: 29,
          adhd_complete_care: 51,
          adhd_premium: 2,
          adhd_reassessment: 10,
          adult_6m_plan: 14,
          child_12m_plan: 1,
          child_6m_plan: 13,
          child_adhd_assessment: 27
        }
      },
      october: {
        patients: 198,
        revenue: 178315,
        status: 'actual',
        breakdown: {
          adhd_assessment_only: 62,
          adhd_complete_care: 68,
          adhd_premium: 3,
          adhd_reassessment: 5,
          adult_6m_plan: 16,
          child_6m_plan: 12,
          child_adhd_assessment: 31
        }
      },
      november: {
        patients: 264,
        revenue: 240537,
        status: 'actual',
        breakdown: {
          adhd_assessment_only: 91,
          adhd_complete_care: 90,
          adhd_premium: 10,
          adhd_reassessment: 7,
          adult_12m_plan: 1,
          adult_6m_plan: 26,
          child_6m_plan: 14,
          child_adhd_assessment: 24
        }
      },
      december: {
        patients: 172,
        revenue: 159785,
        status: 'actual',
        breakdown: {
          adhd_assessment_only: 45,
          adhd_complete_care: 54,
          adhd_premium: 6,
          adhd_reassessment: 3,
          adult_12m_plan: 1,
          adult_6m_plan: 30,
          child_6m_plan: 14,
          child_adhd_assessment: 19
        }
      }
    },
    // No projections needed - all 2025 data is now actual
    projections: {}
  },

  // 2026 Actuals (from Stripe)
  performance_2026: {
    actuals: {
      january: {
        patients: 185,
        revenue: 174080,
        status: 'actual',
        // Bank-statement-verified costs (Jan 2026 NatWest + Stripe)
        // Clinical costs weighted by actual product mix (not flat £550/patient)
        // Marketing/CAC sits in OpEx for actual months (visible in bank statement as Google/Facebook spend)
        actual_costs: {
          clinical: 72000,      // Weighted: 50×£320 + 71×£550 + 4×£650 + 3×£150 + 25×£200 + 3×£550 + 11×£250 + 15×£320 + 1×£100
          tech_admin: 15000,    // Platform, Stripe processing (~3%), admin overhead
          marketing_cac: 0,     // In OpEx for actual months
          subscription_cogs: 0  // No renewal pipeline in January
        },
        breakdown: {
          adhd_assessment_only: 50,
          adhd_complete_care: 71,
          adhd_premium: 4,
          adhd_reassessment: 3,
          adult_6m_plan: 25,
          adult_autism: 2,
          cyp_autism: 1,
          child_6m_plan: 11,
          child_adhd_assessment: 15,
          consultation: 1
        }
      },
      february: {
        patients: 160,
        revenue: 136500,  // B2C portion; + £13,500 subscription (18 renewals) = £150K total
        status: 'actual',
        // Bank-statement-estimated full month (extrapolated from partial data + Jan pattern)
        actual_costs: {
          clinical: 75000,      // Scaled from Jan product mix pattern
          tech_admin: 15000,    // Platform, Stripe processing, admin overhead
          marketing_cac: 0,     // In OpEx for actual months
          subscription_cogs: 0  // Subscription delivery costs folded into clinical
        },
        breakdown: {
          adhd_assessment_only: 42,
          adhd_complete_care: 56,
          adhd_premium: 5,
          adhd_reassessment: 3,
          adult_12m_plan: 2,
          adult_6m_plan: 21,
          adult_autism: 10,
          cyp_autism: 2,
          child_6m_plan: 5,
          child_adhd_assessment: 11,
          consultation: 2
        }
      }
    }
  },

  // Renewal Pipeline (Stripe verified) - eligible renewal transactions per month
  // Source: scripts/stripe_kpi_analysis.py
  // Subscription revenue = eligible × 50% uptake × £750
  renewal_pipeline_2026: {
    january: 0,
    february: 36,     // From Aug 2025 purchases
    march: 81,        // From Sep 2025 purchases
    april: 99,        // From Oct 2025 purchases
    may: 141,         // From Nov 2025 purchases
    june: 105,        // From Dec 2025 purchases
    july: 111,        // From Jan 2026 purchases
    august: 55,       // From Feb 2026 purchases
    september: 90,    // Estimated from Mar 2026 projected volumes
    october: 60,      // Estimated from Apr 2026 B2C volumes
    november: 70,     // Estimated from May 2026 B2C volumes
    december: 80      // Estimated from Jun 2026 B2C volumes
  },

  // 2025 Annual Summary (calculated from Stripe actuals)
  annual_summary_2025: {
    total_patients: 906,  // Jun-Dec 2025 from Stripe
    total_revenue: 821659,
    months_active: 7,
    avg_monthly_patients: 129,
    avg_monthly_revenue: 117380,
    peak_month: 'November',
    peak_revenue: 240537,
    peak_patients: 264
  },

  // Growth Scenarios for 2026
  // Target: £10M annual revenue, 70:30 NHS:Private mix, 90:10 ADHD:Autism
  // NHS ADHD from April 2026, NHS ASD from June 2026
  scenarios: {
    pessimistic: {
      name: "Pessimistic",
      description: "Conservative growth, 70:30 NHS:Private, 90:10 ADHD:Autism (NHS ADHD Apr, ASD Jun)",
      projections_2026: {
        // Jan: Actual, Feb-Mar: B2C only targets (no NHS)
        january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },   // Actual: 185 patients
        february: { b2c_adhd: 135, b2c_asd: 15, nhs_adhd: 0, nhs_asd: 0 }, // 150 target
        march: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 0, nhs_asd: 0 },    // 180 target
        // Apr-May: NHS ADHD starts (ASD from June)
        april: { b2c_adhd: 72, b2c_asd: 8, nhs_adhd: 162, nhs_asd: 0 },
        may: { b2c_adhd: 81, b2c_asd: 9, nhs_adhd: 180, nhs_asd: 0 },
        june: { b2c_adhd: 90, b2c_asd: 10, nhs_adhd: 198, nhs_asd: 22 },
        july: { b2c_adhd: 99, b2c_asd: 11, nhs_adhd: 216, nhs_asd: 24 },
        august: { b2c_adhd: 108, b2c_asd: 12, nhs_adhd: 234, nhs_asd: 26 },
        september: { b2c_adhd: 117, b2c_asd: 13, nhs_adhd: 252, nhs_asd: 28 },
        october: { b2c_adhd: 117, b2c_asd: 13, nhs_adhd: 252, nhs_asd: 28 },
        november: { b2c_adhd: 117, b2c_asd: 13, nhs_adhd: 252, nhs_asd: 28 },
        december: { b2c_adhd: 117, b2c_asd: 13, nhs_adhd: 252, nhs_asd: 28 }
      }
    },
    realistic: {
      name: "Realistic",
      description: "Base case, 70:30 NHS:Private, 90:10 ADHD:Autism (NHS ADHD Apr, ASD Jun)",
      projections_2026: {
        // Jan: Actual, Feb-Mar: B2C only targets (no NHS)
        january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },   // Actual: 185 patients, £174K
        february: { b2c_adhd: 135, b2c_asd: 15, nhs_adhd: 0, nhs_asd: 0 }, // 150 target
        march: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 0, nhs_asd: 0 },    // 180 target
        // Apr-May: NHS ADHD starts (ASD from June), targeting 70:30 NHS:Private
        april: { b2c_adhd: 108, b2c_asd: 12, nhs_adhd: 252, nhs_asd: 0 },    // NHS ADHD launch
        may: { b2c_adhd: 126, b2c_asd: 14, nhs_adhd: 288, nhs_asd: 0 },      // NHS ADHD ramp
        june: { b2c_adhd: 144, b2c_asd: 16, nhs_adhd: 324, nhs_asd: 36 },    // NHS ASD launches
        july: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 360, nhs_asd: 40 },    // ~580 total, ~£780K
        august: { b2c_adhd: 180, b2c_asd: 20, nhs_adhd: 396, nhs_asd: 44 },  // ~640 total, ~£860K
        september: { b2c_adhd: 189, b2c_asd: 21, nhs_adhd: 423, nhs_asd: 47 }, // ~680 total, ~£920K
        october: { b2c_adhd: 198, b2c_asd: 22, nhs_adhd: 450, nhs_asd: 50 },  // ~720 total, ~£970K
        november: { b2c_adhd: 207, b2c_asd: 23, nhs_adhd: 468, nhs_asd: 52 }, // ~750 total, ~£1.0M
        december: { b2c_adhd: 207, b2c_asd: 23, nhs_adhd: 468, nhs_asd: 52 }  // Maintain Dec levels
      }
    },
    optimistic: {
      name: "Optimistic",
      description: "Aggressive scaling, 70:30 NHS:Private, 90:10 ADHD:Autism (NHS ADHD Apr, ASD Jun)",
      projections_2026: {
        // Jan: Actual, Feb-Mar: B2C only targets (no NHS)
        january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },
        february: { b2c_adhd: 135, b2c_asd: 15, nhs_adhd: 0, nhs_asd: 0 }, // 150 target
        march: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 0, nhs_asd: 0 },    // 180 target
        // Apr-May: NHS ADHD starts aggressively (ASD from June)
        april: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 378, nhs_asd: 0 },
        may: { b2c_adhd: 189, b2c_asd: 21, nhs_adhd: 441, nhs_asd: 0 },
        june: { b2c_adhd: 216, b2c_asd: 24, nhs_adhd: 504, nhs_asd: 56 },
        july: { b2c_adhd: 243, b2c_asd: 27, nhs_adhd: 567, nhs_asd: 63 },
        august: { b2c_adhd: 270, b2c_asd: 30, nhs_adhd: 630, nhs_asd: 70 },
        september: { b2c_adhd: 297, b2c_asd: 33, nhs_adhd: 693, nhs_asd: 77 },
        october: { b2c_adhd: 315, b2c_asd: 35, nhs_adhd: 735, nhs_asd: 82 },
        november: { b2c_adhd: 333, b2c_asd: 37, nhs_adhd: 777, nhs_asd: 86 },
        december: { b2c_adhd: 333, b2c_asd: 37, nhs_adhd: 777, nhs_asd: 86 }
      }
    }
  },

  // Current active scenario (default: realistic)
  activeScenario: 'realistic',

  // Legacy: Keep for backward compatibility (matches realistic scenario)
  projections_2026: {
    // Jan: Actual, Feb-Mar: B2C only targets (no NHS)
    january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },
    february: { b2c_adhd: 135, b2c_asd: 15, nhs_adhd: 0, nhs_asd: 0 },
    march: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 0, nhs_asd: 0 },
    // Apr-May: NHS ADHD starts (ASD from June), 70:30 NHS:Private
    april: { b2c_adhd: 108, b2c_asd: 12, nhs_adhd: 252, nhs_asd: 0 },
    may: { b2c_adhd: 126, b2c_asd: 14, nhs_adhd: 288, nhs_asd: 0 },
    june: { b2c_adhd: 144, b2c_asd: 16, nhs_adhd: 324, nhs_asd: 36 },
    july: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 360, nhs_asd: 40 },
    august: { b2c_adhd: 180, b2c_asd: 20, nhs_adhd: 396, nhs_asd: 44 },
    september: { b2c_adhd: 189, b2c_asd: 21, nhs_adhd: 423, nhs_asd: 47 },
    october: { b2c_adhd: 198, b2c_asd: 22, nhs_adhd: 450, nhs_asd: 50 },
    november: { b2c_adhd: 207, b2c_asd: 23, nhs_adhd: 468, nhs_asd: 52 },
    december: { b2c_adhd: 207, b2c_asd: 23, nhs_adhd: 468, nhs_asd: 52 }
  },

  // Multi-year projections with per-market scenario volumes
  annual_projections: {
    year_2027: {
      markets: ['UK', 'US (5-10 states)', 'Ireland'],
      strategy: 'Series B: US + Ireland market entry, scale NHS nationally',
      // Legacy fields kept for backward compat (titration tables read these)
      monthly_breakdown: {
        january: { b2c_adhd: 250, b2c_asd: 120, nhs_adhd: 550, nhs_asd: 280 },
        february: { b2c_adhd: 270, b2c_asd: 130, nhs_adhd: 600, nhs_asd: 300 },
        march: { b2c_adhd: 290, b2c_asd: 140, nhs_adhd: 620, nhs_asd: 310 },
        april: { b2c_adhd: 300, b2c_asd: 145, nhs_adhd: 640, nhs_asd: 320 },
        may: { b2c_adhd: 310, b2c_asd: 150, nhs_adhd: 660, nhs_asd: 340 },
        june: { b2c_adhd: 320, b2c_asd: 155, nhs_adhd: 680, nhs_asd: 350 },
        july: { b2c_adhd: 330, b2c_asd: 160, nhs_adhd: 700, nhs_asd: 360 },
        august: { b2c_adhd: 330, b2c_asd: 165, nhs_adhd: 700, nhs_asd: 370 },
        september: { b2c_adhd: 340, b2c_asd: 170, nhs_adhd: 720, nhs_asd: 380 },
        october: { b2c_adhd: 340, b2c_asd: 175, nhs_adhd: 720, nhs_asd: 390 },
        november: { b2c_adhd: 350, b2c_asd: 180, nhs_adhd: 740, nhs_asd: 400 },
        december: { b2c_adhd: 350, b2c_asd: 185, nhs_adhd: 740, nhs_asd: 410 }
      },
      // Per-market scenario volumes for P&L model
      scenarios: {
        pessimistic: {
          uk: {
            january:   { b2c_adhd: 200, b2c_asd: 96,  nhs_adhd: 440, nhs_asd: 224 },
            february:  { b2c_adhd: 216, b2c_asd: 104, nhs_adhd: 480, nhs_asd: 240 },
            march:     { b2c_adhd: 232, b2c_asd: 112, nhs_adhd: 496, nhs_asd: 248 },
            april:     { b2c_adhd: 240, b2c_asd: 116, nhs_adhd: 512, nhs_asd: 256 },
            may:       { b2c_adhd: 248, b2c_asd: 120, nhs_adhd: 528, nhs_asd: 272 },
            june:      { b2c_adhd: 256, b2c_asd: 124, nhs_adhd: 544, nhs_asd: 280 },
            july:      { b2c_adhd: 264, b2c_asd: 128, nhs_adhd: 560, nhs_asd: 288 },
            august:    { b2c_adhd: 264, b2c_asd: 132, nhs_adhd: 560, nhs_asd: 296 },
            september: { b2c_adhd: 272, b2c_asd: 136, nhs_adhd: 576, nhs_asd: 304 },
            october:   { b2c_adhd: 272, b2c_asd: 140, nhs_adhd: 576, nhs_asd: 312 },
            november:  { b2c_adhd: 280, b2c_asd: 144, nhs_adhd: 592, nhs_asd: 320 },
            december:  { b2c_adhd: 280, b2c_asd: 148, nhs_adhd: 592, nhs_asd: 328 }
          },
          us: {
            january:   { selfpay_adhd: 0,  selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            february:  { selfpay_adhd: 0,  selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            march:     { selfpay_adhd: 0,  selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            april:     { selfpay_adhd: 15, selfpay_asd: 3,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 10, oon_asd: 2 },
            may:       { selfpay_adhd: 25, selfpay_asd: 5,  innetwork_adhd: 10,  innetwork_asd: 2,  oon_adhd: 15, oon_asd: 3 },
            june:      { selfpay_adhd: 35, selfpay_asd: 7,  innetwork_adhd: 25,  innetwork_asd: 5,  oon_adhd: 20, oon_asd: 4 },
            july:      { selfpay_adhd: 45, selfpay_asd: 9,  innetwork_adhd: 40,  innetwork_asd: 8,  oon_adhd: 25, oon_asd: 5 },
            august:    { selfpay_adhd: 50, selfpay_asd: 10, innetwork_adhd: 55,  innetwork_asd: 11, oon_adhd: 30, oon_asd: 6 },
            september: { selfpay_adhd: 55, selfpay_asd: 11, innetwork_adhd: 70,  innetwork_asd: 14, oon_adhd: 35, oon_asd: 7 },
            october:   { selfpay_adhd: 60, selfpay_asd: 12, innetwork_adhd: 85,  innetwork_asd: 17, oon_adhd: 40, oon_asd: 8 },
            november:  { selfpay_adhd: 65, selfpay_asd: 13, innetwork_adhd: 100, innetwork_asd: 20, oon_adhd: 45, oon_asd: 9 },
            december:  { selfpay_adhd: 70, selfpay_asd: 14, innetwork_adhd: 110, innetwork_asd: 22, oon_adhd: 50, oon_asd: 10 }
          },
          ireland: {
            january: { b2c_adhd: 0, b2c_asd: 0 }, february: { b2c_adhd: 0, b2c_asd: 0 },
            march: { b2c_adhd: 0, b2c_asd: 0 }, april: { b2c_adhd: 0, b2c_asd: 0 },
            may: { b2c_adhd: 0, b2c_asd: 0 }, june: { b2c_adhd: 0, b2c_asd: 0 },
            july:      { b2c_adhd: 10, b2c_asd: 2 },
            august:    { b2c_adhd: 15, b2c_asd: 3 },
            september: { b2c_adhd: 20, b2c_asd: 4 },
            october:   { b2c_adhd: 25, b2c_asd: 5 },
            november:  { b2c_adhd: 30, b2c_asd: 6 },
            december:  { b2c_adhd: 35, b2c_asd: 7 }
          }
        },
        realistic: {
          uk: {
            january:   { b2c_adhd: 250, b2c_asd: 120, nhs_adhd: 550, nhs_asd: 280 },
            february:  { b2c_adhd: 270, b2c_asd: 130, nhs_adhd: 600, nhs_asd: 300 },
            march:     { b2c_adhd: 290, b2c_asd: 140, nhs_adhd: 620, nhs_asd: 310 },
            april:     { b2c_adhd: 300, b2c_asd: 145, nhs_adhd: 640, nhs_asd: 320 },
            may:       { b2c_adhd: 310, b2c_asd: 150, nhs_adhd: 660, nhs_asd: 340 },
            june:      { b2c_adhd: 320, b2c_asd: 155, nhs_adhd: 680, nhs_asd: 350 },
            july:      { b2c_adhd: 330, b2c_asd: 160, nhs_adhd: 700, nhs_asd: 360 },
            august:    { b2c_adhd: 330, b2c_asd: 165, nhs_adhd: 700, nhs_asd: 370 },
            september: { b2c_adhd: 340, b2c_asd: 170, nhs_adhd: 720, nhs_asd: 380 },
            october:   { b2c_adhd: 340, b2c_asd: 175, nhs_adhd: 720, nhs_asd: 390 },
            november:  { b2c_adhd: 350, b2c_asd: 180, nhs_adhd: 740, nhs_asd: 400 },
            december:  { b2c_adhd: 350, b2c_asd: 185, nhs_adhd: 740, nhs_asd: 410 }
          },
          us: {
            january:   { selfpay_adhd: 0,  selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            february:  { selfpay_adhd: 0,  selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            march:     { selfpay_adhd: 0,  selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            april:     { selfpay_adhd: 20, selfpay_asd: 4,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 15, oon_asd: 3 },
            may:       { selfpay_adhd: 35, selfpay_asd: 7,  innetwork_adhd: 15,  innetwork_asd: 3,  oon_adhd: 20, oon_asd: 4 },
            june:      { selfpay_adhd: 50, selfpay_asd: 10, innetwork_adhd: 35,  innetwork_asd: 7,  oon_adhd: 30, oon_asd: 6 },
            july:      { selfpay_adhd: 65, selfpay_asd: 13, innetwork_adhd: 55,  innetwork_asd: 11, oon_adhd: 35, oon_asd: 7 },
            august:    { selfpay_adhd: 70, selfpay_asd: 14, innetwork_adhd: 75,  innetwork_asd: 15, oon_adhd: 40, oon_asd: 8 },
            september: { selfpay_adhd: 75, selfpay_asd: 15, innetwork_adhd: 95,  innetwork_asd: 19, oon_adhd: 50, oon_asd: 10 },
            october:   { selfpay_adhd: 80, selfpay_asd: 16, innetwork_adhd: 115, innetwork_asd: 23, oon_adhd: 55, oon_asd: 11 },
            november:  { selfpay_adhd: 90, selfpay_asd: 18, innetwork_adhd: 135, innetwork_asd: 27, oon_adhd: 60, oon_asd: 12 },
            december:  { selfpay_adhd: 95, selfpay_asd: 19, innetwork_adhd: 150, innetwork_asd: 30, oon_adhd: 65, oon_asd: 13 }
          },
          ireland: {
            january: { b2c_adhd: 0, b2c_asd: 0 }, february: { b2c_adhd: 0, b2c_asd: 0 },
            march: { b2c_adhd: 0, b2c_asd: 0 }, april: { b2c_adhd: 0, b2c_asd: 0 },
            may: { b2c_adhd: 0, b2c_asd: 0 }, june: { b2c_adhd: 0, b2c_asd: 0 },
            july:      { b2c_adhd: 15, b2c_asd: 3 },
            august:    { b2c_adhd: 20, b2c_asd: 4 },
            september: { b2c_adhd: 28, b2c_asd: 6 },
            october:   { b2c_adhd: 35, b2c_asd: 7 },
            november:  { b2c_adhd: 42, b2c_asd: 8 },
            december:  { b2c_adhd: 50, b2c_asd: 10 }
          }
        },
        optimistic: {
          uk: {
            january:   { b2c_adhd: 350, b2c_asd: 168, nhs_adhd: 770, nhs_asd: 392 },
            february:  { b2c_adhd: 378, b2c_asd: 182, nhs_adhd: 840, nhs_asd: 420 },
            march:     { b2c_adhd: 406, b2c_asd: 196, nhs_adhd: 868, nhs_asd: 434 },
            april:     { b2c_adhd: 420, b2c_asd: 203, nhs_adhd: 896, nhs_asd: 448 },
            may:       { b2c_adhd: 434, b2c_asd: 210, nhs_adhd: 924, nhs_asd: 476 },
            june:      { b2c_adhd: 448, b2c_asd: 217, nhs_adhd: 952, nhs_asd: 490 },
            july:      { b2c_adhd: 462, b2c_asd: 224, nhs_adhd: 980, nhs_asd: 504 },
            august:    { b2c_adhd: 462, b2c_asd: 231, nhs_adhd: 980, nhs_asd: 518 },
            september: { b2c_adhd: 476, b2c_asd: 238, nhs_adhd: 1008, nhs_asd: 532 },
            october:   { b2c_adhd: 476, b2c_asd: 245, nhs_adhd: 1008, nhs_asd: 546 },
            november:  { b2c_adhd: 490, b2c_asd: 252, nhs_adhd: 1036, nhs_asd: 560 },
            december:  { b2c_adhd: 490, b2c_asd: 259, nhs_adhd: 1036, nhs_asd: 574 }
          },
          us: {
            january:   { selfpay_adhd: 0,   selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            february:  { selfpay_adhd: 0,   selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            march:     { selfpay_adhd: 0,   selfpay_asd: 0,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 0,  oon_asd: 0 },
            april:     { selfpay_adhd: 28,  selfpay_asd: 6,  innetwork_adhd: 0,   innetwork_asd: 0,  oon_adhd: 21, oon_asd: 4 },
            may:       { selfpay_adhd: 49,  selfpay_asd: 10, innetwork_adhd: 21,  innetwork_asd: 4,  oon_adhd: 28, oon_asd: 6 },
            june:      { selfpay_adhd: 70,  selfpay_asd: 14, innetwork_adhd: 49,  innetwork_asd: 10, oon_adhd: 42, oon_asd: 8 },
            july:      { selfpay_adhd: 91,  selfpay_asd: 18, innetwork_adhd: 77,  innetwork_asd: 15, oon_adhd: 49, oon_asd: 10 },
            august:    { selfpay_adhd: 98,  selfpay_asd: 20, innetwork_adhd: 105, innetwork_asd: 21, oon_adhd: 56, oon_asd: 11 },
            september: { selfpay_adhd: 105, selfpay_asd: 21, innetwork_adhd: 133, innetwork_asd: 27, oon_adhd: 70, oon_asd: 14 },
            october:   { selfpay_adhd: 112, selfpay_asd: 22, innetwork_adhd: 161, innetwork_asd: 32, oon_adhd: 77, oon_asd: 15 },
            november:  { selfpay_adhd: 126, selfpay_asd: 25, innetwork_adhd: 189, innetwork_asd: 38, oon_adhd: 84, oon_asd: 17 },
            december:  { selfpay_adhd: 133, selfpay_asd: 27, innetwork_adhd: 210, innetwork_asd: 42, oon_adhd: 91, oon_asd: 18 }
          },
          ireland: {
            january: { b2c_adhd: 0, b2c_asd: 0 }, february: { b2c_adhd: 0, b2c_asd: 0 },
            march: { b2c_adhd: 0, b2c_asd: 0 }, april: { b2c_adhd: 0, b2c_asd: 0 },
            may: { b2c_adhd: 0, b2c_asd: 0 }, june: { b2c_adhd: 0, b2c_asd: 0 },
            july:      { b2c_adhd: 21, b2c_asd: 4 },
            august:    { b2c_adhd: 28, b2c_asd: 6 },
            september: { b2c_adhd: 39, b2c_asd: 8 },
            october:   { b2c_adhd: 49, b2c_asd: 10 },
            november:  { b2c_adhd: 59, b2c_asd: 11 },
            december:  { b2c_adhd: 70, b2c_asd: 14 }
          }
        }
      }
    },
    year_2028: {
      markets: ['UK', 'US (15-20 states)', 'Ireland', 'Netherlands', 'Germany'],
      strategy: 'US insurance panels, EU beachhead markets',
      // Legacy fields for backward compat
      monthly_breakdown: {
        january: { b2c_adhd: 450, b2c_asd: 250, nhs_adhd: 900, nhs_asd: 600 },
        february: { b2c_adhd: 475, b2c_asd: 260, nhs_adhd: 950, nhs_asd: 625 },
        march: { b2c_adhd: 500, b2c_asd: 275, nhs_adhd: 1000, nhs_asd: 650 },
        april: { b2c_adhd: 525, b2c_asd: 290, nhs_adhd: 1050, nhs_asd: 675 },
        may: { b2c_adhd: 550, b2c_asd: 300, nhs_adhd: 1100, nhs_asd: 700 },
        june: { b2c_adhd: 550, b2c_asd: 310, nhs_adhd: 1100, nhs_asd: 725 },
        july: { b2c_adhd: 575, b2c_asd: 325, nhs_adhd: 1150, nhs_asd: 750 },
        august: { b2c_adhd: 575, b2c_asd: 340, nhs_adhd: 1150, nhs_asd: 775 },
        september: { b2c_adhd: 600, b2c_asd: 350, nhs_adhd: 1200, nhs_asd: 800 },
        october: { b2c_adhd: 600, b2c_asd: 360, nhs_adhd: 1200, nhs_asd: 825 },
        november: { b2c_adhd: 625, b2c_asd: 375, nhs_adhd: 1250, nhs_asd: 850 },
        december: { b2c_adhd: 625, b2c_asd: 390, nhs_adhd: 1250, nhs_asd: 875 }
      },
      scenarios: {
        pessimistic: {
          uk: {
            january:   { b2c_adhd: 360, b2c_asd: 200, nhs_adhd: 720, nhs_asd: 480 },
            february:  { b2c_adhd: 380, b2c_asd: 208, nhs_adhd: 760, nhs_asd: 500 },
            march:     { b2c_adhd: 400, b2c_asd: 220, nhs_adhd: 800, nhs_asd: 520 },
            april:     { b2c_adhd: 420, b2c_asd: 232, nhs_adhd: 840, nhs_asd: 540 },
            may:       { b2c_adhd: 440, b2c_asd: 240, nhs_adhd: 880, nhs_asd: 560 },
            june:      { b2c_adhd: 440, b2c_asd: 248, nhs_adhd: 880, nhs_asd: 580 },
            july:      { b2c_adhd: 460, b2c_asd: 260, nhs_adhd: 920, nhs_asd: 600 },
            august:    { b2c_adhd: 460, b2c_asd: 272, nhs_adhd: 920, nhs_asd: 620 },
            september: { b2c_adhd: 480, b2c_asd: 280, nhs_adhd: 960, nhs_asd: 640 },
            october:   { b2c_adhd: 480, b2c_asd: 288, nhs_adhd: 960, nhs_asd: 660 },
            november:  { b2c_adhd: 500, b2c_asd: 300, nhs_adhd: 1000, nhs_asd: 680 },
            december:  { b2c_adhd: 500, b2c_asd: 312, nhs_adhd: 1000, nhs_asd: 700 }
          },
          us: {
            january:   { selfpay_adhd: 80,  selfpay_asd: 16, innetwork_adhd: 120, innetwork_asd: 24, oon_adhd: 55,  oon_asd: 11 },
            february:  { selfpay_adhd: 85,  selfpay_asd: 17, innetwork_adhd: 135, innetwork_asd: 27, oon_adhd: 60,  oon_asd: 12 },
            march:     { selfpay_adhd: 90,  selfpay_asd: 18, innetwork_adhd: 150, innetwork_asd: 30, oon_adhd: 65,  oon_asd: 13 },
            april:     { selfpay_adhd: 95,  selfpay_asd: 19, innetwork_adhd: 165, innetwork_asd: 33, oon_adhd: 70,  oon_asd: 14 },
            may:       { selfpay_adhd: 100, selfpay_asd: 20, innetwork_adhd: 180, innetwork_asd: 36, oon_adhd: 75,  oon_asd: 15 },
            june:      { selfpay_adhd: 105, selfpay_asd: 21, innetwork_adhd: 195, innetwork_asd: 39, oon_adhd: 80,  oon_asd: 16 },
            july:      { selfpay_adhd: 110, selfpay_asd: 22, innetwork_adhd: 210, innetwork_asd: 42, oon_adhd: 85,  oon_asd: 17 },
            august:    { selfpay_adhd: 115, selfpay_asd: 23, innetwork_adhd: 225, innetwork_asd: 45, oon_adhd: 90,  oon_asd: 18 },
            september: { selfpay_adhd: 120, selfpay_asd: 24, innetwork_adhd: 240, innetwork_asd: 48, oon_adhd: 95,  oon_asd: 19 },
            october:   { selfpay_adhd: 125, selfpay_asd: 25, innetwork_adhd: 255, innetwork_asd: 51, oon_adhd: 100, oon_asd: 20 },
            november:  { selfpay_adhd: 130, selfpay_asd: 26, innetwork_adhd: 270, innetwork_asd: 54, oon_adhd: 105, oon_asd: 21 },
            december:  { selfpay_adhd: 135, selfpay_asd: 27, innetwork_adhd: 285, innetwork_asd: 57, oon_adhd: 110, oon_asd: 22 }
          },
          ireland: {
            january:   { b2c_adhd: 40,  b2c_asd: 8 },
            february:  { b2c_adhd: 43,  b2c_asd: 9 },
            march:     { b2c_adhd: 46,  b2c_asd: 9 },
            april:     { b2c_adhd: 50,  b2c_asd: 10 },
            may:       { b2c_adhd: 53,  b2c_asd: 11 },
            june:      { b2c_adhd: 56,  b2c_asd: 11 },
            july:      { b2c_adhd: 60,  b2c_asd: 12 },
            august:    { b2c_adhd: 63,  b2c_asd: 13 },
            september: { b2c_adhd: 66,  b2c_asd: 13 },
            october:   { b2c_adhd: 70,  b2c_asd: 14 },
            november:  { b2c_adhd: 73,  b2c_asd: 15 },
            december:  { b2c_adhd: 76,  b2c_asd: 15 }
          }
        },
        realistic: {
          uk: {
            january:   { b2c_adhd: 450, b2c_asd: 250, nhs_adhd: 900,  nhs_asd: 600 },
            february:  { b2c_adhd: 475, b2c_asd: 260, nhs_adhd: 950,  nhs_asd: 625 },
            march:     { b2c_adhd: 500, b2c_asd: 275, nhs_adhd: 1000, nhs_asd: 650 },
            april:     { b2c_adhd: 525, b2c_asd: 290, nhs_adhd: 1050, nhs_asd: 675 },
            may:       { b2c_adhd: 550, b2c_asd: 300, nhs_adhd: 1100, nhs_asd: 700 },
            june:      { b2c_adhd: 550, b2c_asd: 310, nhs_adhd: 1100, nhs_asd: 725 },
            july:      { b2c_adhd: 575, b2c_asd: 325, nhs_adhd: 1150, nhs_asd: 750 },
            august:    { b2c_adhd: 575, b2c_asd: 340, nhs_adhd: 1150, nhs_asd: 775 },
            september: { b2c_adhd: 600, b2c_asd: 350, nhs_adhd: 1200, nhs_asd: 800 },
            october:   { b2c_adhd: 600, b2c_asd: 360, nhs_adhd: 1200, nhs_asd: 825 },
            november:  { b2c_adhd: 625, b2c_asd: 375, nhs_adhd: 1250, nhs_asd: 850 },
            december:  { b2c_adhd: 625, b2c_asd: 390, nhs_adhd: 1250, nhs_asd: 875 }
          },
          us: {
            january:   { selfpay_adhd: 100, selfpay_asd: 20, innetwork_adhd: 150, innetwork_asd: 30, oon_adhd: 70,  oon_asd: 14 },
            february:  { selfpay_adhd: 105, selfpay_asd: 21, innetwork_adhd: 170, innetwork_asd: 34, oon_adhd: 75,  oon_asd: 15 },
            march:     { selfpay_adhd: 115, selfpay_asd: 23, innetwork_adhd: 190, innetwork_asd: 38, oon_adhd: 80,  oon_asd: 16 },
            april:     { selfpay_adhd: 120, selfpay_asd: 24, innetwork_adhd: 210, innetwork_asd: 42, oon_adhd: 90,  oon_asd: 18 },
            may:       { selfpay_adhd: 130, selfpay_asd: 26, innetwork_adhd: 230, innetwork_asd: 46, oon_adhd: 95,  oon_asd: 19 },
            june:      { selfpay_adhd: 135, selfpay_asd: 27, innetwork_adhd: 250, innetwork_asd: 50, oon_adhd: 100, oon_asd: 20 },
            july:      { selfpay_adhd: 140, selfpay_asd: 28, innetwork_adhd: 270, innetwork_asd: 54, oon_adhd: 110, oon_asd: 22 },
            august:    { selfpay_adhd: 145, selfpay_asd: 29, innetwork_adhd: 290, innetwork_asd: 58, oon_adhd: 115, oon_asd: 23 },
            september: { selfpay_adhd: 150, selfpay_asd: 30, innetwork_adhd: 310, innetwork_asd: 62, oon_adhd: 120, oon_asd: 24 },
            october:   { selfpay_adhd: 160, selfpay_asd: 32, innetwork_adhd: 330, innetwork_asd: 66, oon_adhd: 125, oon_asd: 25 },
            november:  { selfpay_adhd: 165, selfpay_asd: 33, innetwork_adhd: 350, innetwork_asd: 70, oon_adhd: 130, oon_asd: 26 },
            december:  { selfpay_adhd: 170, selfpay_asd: 34, innetwork_adhd: 370, innetwork_asd: 74, oon_adhd: 135, oon_asd: 27 }
          },
          ireland: {
            january:   { b2c_adhd: 55,  b2c_asd: 11 },
            february:  { b2c_adhd: 58,  b2c_asd: 12 },
            march:     { b2c_adhd: 62,  b2c_asd: 12 },
            april:     { b2c_adhd: 65,  b2c_asd: 13 },
            may:       { b2c_adhd: 70,  b2c_asd: 14 },
            june:      { b2c_adhd: 73,  b2c_asd: 15 },
            july:      { b2c_adhd: 78,  b2c_asd: 16 },
            august:    { b2c_adhd: 82,  b2c_asd: 16 },
            september: { b2c_adhd: 86,  b2c_asd: 17 },
            october:   { b2c_adhd: 90,  b2c_asd: 18 },
            november:  { b2c_adhd: 95,  b2c_asd: 19 },
            december:  { b2c_adhd: 100, b2c_asd: 20 }
          }
        },
        optimistic: {
          uk: {
            january:   { b2c_adhd: 630, b2c_asd: 350, nhs_adhd: 1260, nhs_asd: 840 },
            february:  { b2c_adhd: 665, b2c_asd: 364, nhs_adhd: 1330, nhs_asd: 875 },
            march:     { b2c_adhd: 700, b2c_asd: 385, nhs_adhd: 1400, nhs_asd: 910 },
            april:     { b2c_adhd: 735, b2c_asd: 406, nhs_adhd: 1470, nhs_asd: 945 },
            may:       { b2c_adhd: 770, b2c_asd: 420, nhs_adhd: 1540, nhs_asd: 980 },
            june:      { b2c_adhd: 770, b2c_asd: 434, nhs_adhd: 1540, nhs_asd: 1015 },
            july:      { b2c_adhd: 805, b2c_asd: 455, nhs_adhd: 1610, nhs_asd: 1050 },
            august:    { b2c_adhd: 805, b2c_asd: 476, nhs_adhd: 1610, nhs_asd: 1085 },
            september: { b2c_adhd: 840, b2c_asd: 490, nhs_adhd: 1680, nhs_asd: 1120 },
            october:   { b2c_adhd: 840, b2c_asd: 504, nhs_adhd: 1680, nhs_asd: 1155 },
            november:  { b2c_adhd: 875, b2c_asd: 525, nhs_adhd: 1750, nhs_asd: 1190 },
            december:  { b2c_adhd: 875, b2c_asd: 546, nhs_adhd: 1750, nhs_asd: 1225 }
          },
          us: {
            january:   { selfpay_adhd: 140, selfpay_asd: 28, innetwork_adhd: 210, innetwork_asd: 42, oon_adhd: 98,  oon_asd: 20 },
            february:  { selfpay_adhd: 147, selfpay_asd: 29, innetwork_adhd: 238, innetwork_asd: 48, oon_adhd: 105, oon_asd: 21 },
            march:     { selfpay_adhd: 161, selfpay_asd: 32, innetwork_adhd: 266, innetwork_asd: 53, oon_adhd: 112, oon_asd: 22 },
            april:     { selfpay_adhd: 168, selfpay_asd: 34, innetwork_adhd: 294, innetwork_asd: 59, oon_adhd: 126, oon_asd: 25 },
            may:       { selfpay_adhd: 182, selfpay_asd: 36, innetwork_adhd: 322, innetwork_asd: 64, oon_adhd: 133, oon_asd: 27 },
            june:      { selfpay_adhd: 189, selfpay_asd: 38, innetwork_adhd: 350, innetwork_asd: 70, oon_adhd: 140, oon_asd: 28 },
            july:      { selfpay_adhd: 196, selfpay_asd: 39, innetwork_adhd: 378, innetwork_asd: 76, oon_adhd: 154, oon_asd: 31 },
            august:    { selfpay_adhd: 203, selfpay_asd: 41, innetwork_adhd: 406, innetwork_asd: 81, oon_adhd: 161, oon_asd: 32 },
            september: { selfpay_adhd: 210, selfpay_asd: 42, innetwork_adhd: 434, innetwork_asd: 87, oon_adhd: 168, oon_asd: 34 },
            october:   { selfpay_adhd: 224, selfpay_asd: 45, innetwork_adhd: 462, innetwork_asd: 92, oon_adhd: 175, oon_asd: 35 },
            november:  { selfpay_adhd: 231, selfpay_asd: 46, innetwork_adhd: 490, innetwork_asd: 98, oon_adhd: 182, oon_asd: 36 },
            december:  { selfpay_adhd: 238, selfpay_asd: 48, innetwork_adhd: 518, innetwork_asd: 104, oon_adhd: 189, oon_asd: 38 }
          },
          ireland: {
            january:   { b2c_adhd: 77,  b2c_asd: 15 },
            february:  { b2c_adhd: 81,  b2c_asd: 17 },
            march:     { b2c_adhd: 87,  b2c_asd: 17 },
            april:     { b2c_adhd: 91,  b2c_asd: 18 },
            may:       { b2c_adhd: 98,  b2c_asd: 20 },
            june:      { b2c_adhd: 102, b2c_asd: 21 },
            july:      { b2c_adhd: 109, b2c_asd: 22 },
            august:    { b2c_adhd: 115, b2c_asd: 22 },
            september: { b2c_adhd: 120, b2c_asd: 24 },
            october:   { b2c_adhd: 126, b2c_asd: 25 },
            november:  { b2c_adhd: 133, b2c_asd: 27 },
            december:  { b2c_adhd: 140, b2c_asd: 28 }
          }
        }
      }
    },
    year_2029: {
      total_patients: 55000,
      total_revenue: 100000000,
      markets: ['UK', 'US (40+ states)', 'Ireland', 'NL', 'DE', 'Nordics'],
      strategy: 'Full US coverage, Nordic hub, SaaS licensing',
      gross_profit: 46000000,
      operating_expenses: 28000000,
      ebitda: 18000000,
      net_profit: 13500000
    }
  },

  // Unit Economics (Updated Feb 2026 - Clinical £550, CAC £300 all products)
  unit_economics: {
    // B2C ADHD - Used by calculations engine (Complete Care as default)
    b2c_adhd: {
      revenue: 1200,
      clinical_costs: 550,
      tech_admin: 60,
      cac: 300,
      total_costs: 910,
      gross_profit: 290,
      margin: 0.24
    },
    // B2C ASD - Used by calculations engine
    b2c_asd: {
      revenue: 1900,
      clinical_costs: 550,
      tech_admin: 60,
      cac: 300,
      total_costs: 910,
      gross_profit: 990,
      margin: 0.52
    },
    // ADHD Assessment Only (£590)
    adhd_assessment_only: {
      revenue: 590,
      clinical_costs: 320,
      tech_admin: 60,
      cac: 300,
      total_costs: 680,
      gross_profit: -90,  // Loss leader - 56.2% convert to £750 treatment plan
      margin: -0.15,
      notes: 'Loss leader: 56.2% convert to a £750 treatment plan (median 17 days, avg 31 days). Full conversion sequence live from Feb 2026 to increase uptake. Blended LTV with treatment plan is £1,340+ per patient.'
    },
    // ADHD Complete Care (£1,200) - Main product
    adhd_complete_care: {
      revenue: 1200,
      clinical_costs: 550,
      tech_admin: 60,
      cac: 300,
      total_costs: 910,
      gross_profit: 290,
      margin: 0.24,
      subscription_potential: 750, // 6-month plan upsell
      notes: 'Core B2C product'
    },
    // ADHD Premium (£1,990)
    adhd_premium: {
      revenue: 1990,
      clinical_costs: 650,
      tech_admin: 60,
      cac: 300,
      total_costs: 1010,
      gross_profit: 980,
      margin: 0.49,
      notes: 'High-value package with extended support'
    },
    // Adult Autism Assessment (£1,900)
    autism_adult: {
      revenue: 1900,
      clinical_costs: 550,
      tech_admin: 60,
      cac: 300,
      total_costs: 910,
      gross_profit: 990,
      margin: 0.52,
      notes: 'New service launched Jan 2026'
    },
    // Child Autism Assessment (£1,900)
    autism_child: {
      revenue: 1900,
      clinical_costs: 550,
      tech_admin: 60,
      cac: 300,
      total_costs: 910,
      gross_profit: 990,
      margin: 0.52,
      notes: 'CYP Autism assessment'
    },
    // Child ADHD Assessment (£890)
    child_adhd: {
      revenue: 890,
      clinical_costs: 320,
      tech_admin: 60,
      cac: 300,
      total_costs: 680,
      gross_profit: 210,
      margin: 0.24,
      subscription_potential: 1050, // Child 6-month plan
      notes: 'Profitable with treatment plan upsell'
    },
    // Adult 6-Month Treatment Plan (£750)
    adult_6m_plan: {
      revenue: 750,
      clinical_costs: 200,  // Lower - follow-up only
      tech_admin: 30,
      cac: 0,  // Already acquired
      total_costs: 230,
      gross_profit: 520,
      margin: 0.69,
      notes: 'High-margin recurring revenue'
    },
    // Child 6-Month Treatment Plan (£1,050)
    child_6m_plan: {
      revenue: 1050,
      clinical_costs: 250,
      tech_admin: 30,
      cac: 0,
      total_costs: 280,
      gross_profit: 770,
      margin: 0.73,
      notes: 'High-margin recurring revenue'
    },
    // NHS ADHD (future)
    nhs_adhd: {
      revenue: 1350,
      clinical_costs: 550,
      tech_admin: 60,
      cac: 50,  // Lower CAC for NHS referrals
      total_costs: 660,
      gross_profit: 690,
      margin: 0.51,
      notes: 'NHS Right to Choose pathway'
    },
    // NHS ASD (future)
    nhs_asd: {
      revenue: 2000,
      clinical_costs: 550,
      tech_admin: 60,
      cac: 50,
      total_costs: 660,
      gross_profit: 1340,
      margin: 0.67,
      notes: 'NHS ASD pathway'
    }
  },

  // Key Performance Metrics (updated with unit economics)
  metrics: {
    year_1_revenue_target: 10000000, // £8-10M target for 2026 (range depends on NHS ramp)
    year_1_patients_target: 6000, // Estimated patients for £8-10M target (realistic model: ~5,965)
    blended_gross_margin: 0.50, // ~50% blended margin with NHS
    avg_revenue_per_patient: 1540, // Blended average with NHS/Private mix
    monthly_fixed_costs_2026: 8250, // Insurance + CQC + Office + Admin + 10% overhead
    annual_fixed_costs_2026: 99000
  },

  // Investment & Use of Funds
  investment: {
    seed_amount: 250000,
    use_of_funds: {
      research_development: { amount: 112500, percentage: 45 },
      marketing_acquisition: { amount: 62500, percentage: 25 },
      operations_infrastructure: { amount: 50000, percentage: 20 },
      regulatory_compliance: { amount: 25000, percentage: 10 }
    },
    milestones: [
      'Complete MHRA certification for AI diagnostic tools',
      'Launch NHS Right to Choose channel (Apr 2026)',
      'Scale clinical team to 8+ psychiatrists',
      '✓ Achieved £174K monthly revenue (Jan 2026) - exceeded £75K target',
      '✓ Reached 264 patients/month peak (Nov 2025)',
      '✓ Total 2025 revenue: £822K across 906 patients',
      '✓ Launched Autism assessments (Jan 2026)',
      'Complete ASD pathway development and launch',
      'Build foundation for 2026 growth trajectory'
    ]
  },

  // Market & Assumptions
  assumptions: {
    market_demand_uk: 2200000, // undiagnosed ADHD patients
    market_penetration_year_1: 0.003, // 0.3% (~6,500 patients / 2.2M undiagnosed)
    clinical_capacity_per_psychiatrist: 55, // patients per month
    ai_efficiency_gain: 0.5, // 50% time reduction
    competitive_response_time: 18, // months
    nhs_adhd_launch_date: 'April 2026',
    nhs_asd_launch_date: 'June 2026',
    asd_launch_date: 'Q4 2025'
  },

  // ============================================================
  // MULTI-MARKET EXPANSION (2027-2028)
  // ============================================================

  // Currency configuration -- static planning rates for financial model
  currencies: {
    GBP: { symbol: '\u00A3', rate: 1.00, code: 'GBP' },
    USD: { symbol: '$', rate: 0.79, code: 'USD' },   // 1 USD = 0.79 GBP
    EUR: { symbol: '\u20AC', rate: 0.86, code: 'EUR' } // 1 EUR = 0.86 GBP
  },

  // UK market config (tax corrected from 19% to 25%)
  uk_market: {
    tax_rate: 0.25 // UK corporation tax from April 2023
  },

  // US Market Configuration (launches Q2 2027)
  // Benchmarked against Cerebral ($462M raised, $225M rev at scale),
  // Talkspace (public P&L), and Done ($100M+ rev).
  // Uses PMHNP-heavy lean model (50-60% cheaper than psychiatrists).
  // MSO structure required for corporate practice of medicine compliance.
  us_market: {
    launch_month: 'april',
    launch_year: 2027,

    pricing: {
      selfpay_adhd: 1295,        // USD, midpoint of $995-$1,495 range
      selfpay_asd: 2200,         // USD, midpoint of $1,800-$2,500
      innetwork_adhd: 1100,      // USD, contracted insurer rate
      innetwork_asd: 1800,       // USD, contracted insurer rate
      oon_adhd: 1295,            // USD, same as self-pay
      oon_asd: 2200,             // USD, same as self-pay
      subscription_monthly: 199  // USD/month medication management
    },

    unit_economics: {
      // Clinical costs reflect PMHNP model at $70-90/hr (vs $126-146/hr psychiatrist)
      // CAC: self-pay $400 (Talkspace benchmarked $297-449/member),
      //       in-network $100 (referral-based, lower acquisition cost),
      //       OON $350 (superbill reimbursement model, still needs marketing)
      selfpay_adhd:   { revenue: 1295, clinical_costs: 450, tech_admin: 80, cac: 400, total_costs: 930,  gross_profit: 365,  margin: 0.28 },
      selfpay_asd:    { revenue: 2200, clinical_costs: 500, tech_admin: 80, cac: 400, total_costs: 980,  gross_profit: 1220, margin: 0.55 },
      innetwork_adhd: { revenue: 1100, clinical_costs: 450, tech_admin: 80, cac: 100, total_costs: 630,  gross_profit: 470,  margin: 0.43 },
      innetwork_asd:  { revenue: 1800, clinical_costs: 500, tech_admin: 80, cac: 100, total_costs: 680,  gross_profit: 1120, margin: 0.62 },
      oon_adhd:       { revenue: 1295, clinical_costs: 450, tech_admin: 80, cac: 350, total_costs: 880,  gross_profit: 415,  margin: 0.32 },
      oon_asd:        { revenue: 2200, clinical_costs: 500, tech_admin: 80, cac: 350, total_costs: 930,  gross_profit: 1270, margin: 0.58 },
      subscription:   { revenue: 199,  clinical_costs: 60,  tech_admin: 15, cac: 0,   total_costs: 75,   gross_profit: 124,  margin: 0.62 }
    },

    subscription: {
      take_rate: 0.60,            // 60% of ADHD assessments convert
      avg_retention_months: 14,
      monthly_churn_rate: 0.071   // ~1/14
    },

    // OpEx breakdown (approximate monthly allocation at steady state):
    // Clinical staff (10 PMHNPs @ $140K + 1 MD @ $280K): ~$140K/mo
    // Marketing/CAC (30-40% of revenue, per Talkspace/Cerebral): ~$150K/mo
    // Billing/RCM (3-5% of collections): ~$15K/mo
    // Licensing/DEA/compliance (amortised): ~$15K/mo
    // Technology (HIPAA infra, EHR, platform): ~$20K/mo
    // G&A (US ops lead, legal, office): ~$40K/mo
    // Insurance credentialing (ongoing): ~$5K/mo
    // Malpractice insurance: ~$2K/mo
    opex_breakdown: {
      clinical_staff: 0.36,     // Largest line item after marketing
      marketing: 0.38,          // Aggressive acquisition per Cerebral playbook
      billing_rcm: 0.04,
      licensing_compliance: 0.04,
      technology: 0.05,
      general_admin: 0.10,
      credentialing: 0.02,
      malpractice: 0.01
    },

    tax_rate: 0.27 // ~21% federal + ~6% state blended
  },

  // Ireland Market Configuration (launches Q3 2027)
  ireland_market: {
    launch_month: 'july',
    launch_year: 2027,

    pricing: {
      b2c_adhd: 1100, // EUR
      b2c_asd: 1800   // EUR
    },

    unit_economics: {
      b2c_adhd: { revenue: 1100, clinical_costs: 480, tech_admin: 50, cac: 200, total_costs: 730, gross_profit: 370,  margin: 0.34 },
      b2c_asd:  { revenue: 1800, clinical_costs: 500, tech_admin: 50, cac: 200, total_costs: 750, gross_profit: 1050, margin: 0.58 }
    },

    tax_rate: 0.125 // 12.5% Ireland corporate tax
  },

  // Funding rounds (cash injection, not revenue)
  funding_rounds: {
    series_a: { amount_gbp: 3000000,  date: 'Q1 2026', status: 'completed' },
    series_b: { amount_gbp: 10000000, date: 'Q1 2027', status: 'planned' }
  },

  // OpEx schedules by market and year
  opex_by_market: {
    year_2027: {
      // UK: continues from 2026 Dec trajectory (~125K), scales with NHS
      uk: {
        january: 130000, february: 133000, march: 136000,
        april: 140000, may: 143000, june: 146000,
        july: 150000, august: 153000, september: 156000,
        october: 160000, november: 163000, december: 166000
      },
      // US: Series B funds US market entry. Pre-launch: MSO/PC setup ($100K legal),
      // state licensing 10 states ($40K), DEA registration ($44K), HIPAA+SOC2 ($60K),
      // 3 PMHNPs + 1 supervising MD hired Q1, marketing ramp.
      // Post-launch: clinical staff scaling to 10 PMHNPs, aggressive marketing
      // (30-40% of revenue per Cerebral/Talkspace benchmarks), billing/RCM, compliance.
      // Annual 2027 total: ~$4.7M USD
      us: {
        january: 220000, february: 240000, march: 250000,
        april: 350000, may: 380000, june: 410000,
        july: 440000, august: 460000, september: 480000,
        october: 500000, november: 520000, december: 550000
      },
      // Ireland: no costs pre-launch, lightweight from July (EUR)
      ireland: {
        january: 0, february: 0, march: 0,
        april: 0, may: 0, june: 0,
        july: 15000, august: 18000, september: 20000,
        october: 22000, november: 25000, december: 27000
      }
    },
    year_2028: {
      uk: {
        january: 170000, february: 173000, march: 176000,
        april: 180000, may: 183000, june: 186000,
        july: 190000, august: 193000, september: 196000,
        october: 200000, november: 203000, december: 206000
      },
      // US 2028: 15-20 state operations, 15+ PMHNPs, 2-3 supervising MDs,
      // full insurance panel billing, marketing at scale (Talkspace spent 61%
      // of revenue on S&M at this stage), compliance team, US operations lead.
      // Annual 2028 total: ~$8.6M USD
      us: {
        january: 580000, february: 600000, march: 630000,
        april: 660000, may: 690000, june: 720000,
        july: 740000, august: 760000, september: 780000,
        october: 800000, november: 820000, december: 850000
      },
      ireland: {
        january: 30000, february: 32000, march: 34000,
        april: 36000, may: 38000, june: 40000,
        july: 42000, august: 44000, september: 46000,
        october: 48000, november: 50000, december: 52000
      }
    }
  },

  // US subscription pipeline: active subscriber count per month
  us_subscription_pipeline: {
    year_2027: {
      january: 0, february: 0, march: 0,
      april: 15, may: 44, june: 78,
      july: 115, august: 153, september: 192,
      october: 232, november: 270, december: 308
    },
    year_2028: {
      january: 340, february: 370, march: 400,
      april: 430, may: 460, june: 490,
      july: 520, august: 550, september: 580,
      october: 610, november: 640, december: 670
    }
  },

  // UK subscription renewal pipelines (continues from 2026 pattern)
  renewal_pipeline_2027: {
    january: 90, february: 70, march: 80,
    april: 90, may: 100, june: 110,
    july: 120, august: 130, september: 140,
    october: 150, november: 160, december: 170
  },
  renewal_pipeline_2028: {
    january: 180, february: 190, march: 200,
    april: 210, may: 220, june: 230,
    july: 240, august: 250, september: 260,
    october: 270, november: 280, december: 290
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = financialData;
}