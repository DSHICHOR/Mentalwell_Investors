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

  // Market Assumptions
  market: {
    subscription_take_rate: 0.5,
    subscription_renewal_rate: 0.5,
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
        patients: 99,  // Partial month (as of Feb 18)
        revenue: 99142,
        status: 'actual',
        note: 'Partial month data',
        breakdown: {
          adhd_assessment_only: 26,
          adhd_complete_care: 35,
          adhd_premium: 3,
          adhd_reassessment: 2,
          adult_12m_plan: 1,
          adult_6m_plan: 13,
          adult_autism: 6,
          cyp_autism: 1,
          child_6m_plan: 3,
          child_adhd_assessment: 7,
          consultation: 1
        }
      }
    }
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
  // Target: £10M annual revenue, 70:30 NHS:Private mix (from April), 90:10 ADHD:Autism
  // No NHS until April 2026
  scenarios: {
    pessimistic: {
      name: "Pessimistic",
      description: "Conservative growth to £5M annual (50% of target)",
      projections_2026: {
        // Jan-Mar: B2C only (no NHS)
        january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },   // Actual: 185 patients
        february: { b2c_adhd: 180, b2c_asd: 20, nhs_adhd: 0, nhs_asd: 0 },
        march: { b2c_adhd: 180, b2c_asd: 20, nhs_adhd: 0, nhs_asd: 0 },
        // Apr onwards: NHS starts, 70:30 NHS:Private, 90:10 ADHD:Autism
        april: { b2c_adhd: 72, b2c_asd: 8, nhs_adhd: 162, nhs_asd: 18 },
        may: { b2c_adhd: 81, b2c_asd: 9, nhs_adhd: 180, nhs_asd: 20 },
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
      description: "Target £10M annual revenue, 70:30 NHS:Private, 90:10 ADHD:Autism (NHS from April)",
      projections_2026: {
        // Jan-Mar: B2C only (no NHS) - based on Jan actuals
        january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },   // Actual: 185 patients, £174K
        february: { b2c_adhd: 200, b2c_asd: 22, nhs_adhd: 0, nhs_asd: 0 }, // Growing B2C
        march: { b2c_adhd: 225, b2c_asd: 25, nhs_adhd: 0, nhs_asd: 0 },    // Pre-NHS ramp
        // Apr onwards: NHS starts, targeting 70:30 NHS:Private, 90:10 ADHD:Autism
        april: { b2c_adhd: 108, b2c_asd: 12, nhs_adhd: 252, nhs_asd: 28 },   // ~400 total, ~£540K
        may: { b2c_adhd: 126, b2c_asd: 14, nhs_adhd: 288, nhs_asd: 32 },     // ~460 total, ~£620K
        june: { b2c_adhd: 144, b2c_asd: 16, nhs_adhd: 324, nhs_asd: 36 },    // ~520 total, ~£700K
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
      description: "Aggressive scaling to £15M annual (150% of target)",
      projections_2026: {
        // Jan-Mar: B2C only (no NHS)
        january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },
        february: { b2c_adhd: 225, b2c_asd: 25, nhs_adhd: 0, nhs_asd: 0 },
        march: { b2c_adhd: 270, b2c_asd: 30, nhs_adhd: 0, nhs_asd: 0 },
        // Apr onwards: NHS starts aggressively
        april: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 378, nhs_asd: 42 },
        may: { b2c_adhd: 189, b2c_asd: 21, nhs_adhd: 441, nhs_asd: 49 },
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
    // Jan-Mar: B2C only (no NHS) - based on Jan actuals
    january: { b2c_adhd: 182, b2c_asd: 3, nhs_adhd: 0, nhs_asd: 0 },
    february: { b2c_adhd: 200, b2c_asd: 22, nhs_adhd: 0, nhs_asd: 0 },
    march: { b2c_adhd: 225, b2c_asd: 25, nhs_adhd: 0, nhs_asd: 0 },
    // Apr onwards: NHS starts, 70:30 NHS:Private, 90:10 ADHD:Autism
    april: { b2c_adhd: 108, b2c_asd: 12, nhs_adhd: 252, nhs_asd: 28 },
    may: { b2c_adhd: 126, b2c_asd: 14, nhs_adhd: 288, nhs_asd: 32 },
    june: { b2c_adhd: 144, b2c_asd: 16, nhs_adhd: 324, nhs_asd: 36 },
    july: { b2c_adhd: 162, b2c_asd: 18, nhs_adhd: 360, nhs_asd: 40 },
    august: { b2c_adhd: 180, b2c_asd: 20, nhs_adhd: 396, nhs_asd: 44 },
    september: { b2c_adhd: 189, b2c_asd: 21, nhs_adhd: 423, nhs_asd: 47 },
    october: { b2c_adhd: 198, b2c_asd: 22, nhs_adhd: 450, nhs_asd: 50 },
    november: { b2c_adhd: 207, b2c_asd: 23, nhs_adhd: 468, nhs_asd: 52 },
    december: { b2c_adhd: 207, b2c_asd: 23, nhs_adhd: 468, nhs_asd: 52 }
  },

  // Multi-year projections (phased expansion, pending NHS integration + market entry)
  annual_projections: {
    year_2027: {
      total_patients: 15000,
      total_revenue: 22000000,
      markets: ['UK'],
      strategy: 'Deepen NHS partnerships, scale B2C nationally',
      gross_profit: 10200000, // 46.3% blended margin maintained
      operating_expenses: 7000000,
      ebitda: 3200000,
      net_profit: 2400000,
      // Detailed monthly breakdown for titration tracking
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
      }
    },
    year_2028: {
      total_patients: 30000,
      total_revenue: 50000000,
      markets: ['UK', 'Ireland'],
      strategy: 'Ireland launch, UK market leadership',
      gross_profit: 23000000, // Improved margins through scale
      operating_expenses: 14000000,
      ebitda: 9000000,
      net_profit: 6800000,
      // Detailed monthly breakdown for titration tracking
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
      }
    },
    year_2029: {
      total_patients: 55000,
      total_revenue: 100000000,
      markets: ['UK', 'Ireland', 'US', 'Canada'],
      strategy: 'North American expansion',
      gross_profit: 46000000, // Scale efficiencies
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
      gross_profit: -90,  // Loss leader - converts to packages
      margin: -0.15,
      notes: 'Entry product - most convert to Complete Care'
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
    year_1_revenue_target: 10000000, // £10M target for 2026
    year_1_patients_target: 6500, // Estimated patients for £10M target
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
      'Launch NHS Right to Choose channel (Dec 2025)',
      'Scale clinical team to 8+ psychiatrists',
      '✓ Achieved £174K monthly revenue (Jan 2026) - exceeded £75K target',
      '✓ Reached 264 patients/month peak (Nov 2025)',
      '✓ Total 2025 revenue: £822K across 906 patients (Stripe verified)',
      '✓ Launched Autism assessments (Jan 2026)',
      'Complete ASD pathway development and launch',
      'Build foundation for 2026 growth trajectory'
    ]
  },

  // Market & Assumptions
  assumptions: {
    market_demand_uk: 2200000, // undiagnosed ADHD patients
    market_penetration_year_1: 0.0059, // 0.59% (12,916 patients / 2.2M undiagnosed)
    clinical_capacity_per_psychiatrist: 55, // patients per month
    ai_efficiency_gain: 0.5, // 50% time reduction
    competitive_response_time: 18, // months
    nhs_launch_date: 'December 2025',
    asd_launch_date: 'Q4 2025'
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = financialData;
}