// Mentalwell Financial Model - Data Configuration
// Edit this file to update all financial projections across the website

const financialData = {
  // Service Pricing
  pricing: {
    b2c_adhd_assessment: 590,
    b2c_adhd_complete: 1200,
    b2c_adhd_premium: 1990,
    b2c_asd: 1750,
    nhs_adhd: 1350,
    nhs_asd: 2000,
    subscription_6month: 750,
    treatment_adult_6month: 750,
    treatment_child_6month: 1050
  },

  // Cost Structure (per patient)
  costs: {
    clinical_adhd: 650,
    clinical_asd: 450,
    technology_admin_adhd: 120,
    technology_admin_asd: 150,
    customer_acquisition_b2c: 300,
    customer_acquisition_nhs: 50
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

  // 2025 Actuals (May-July) and Projections (Aug-Dec)
  performance_2025: {
    actuals: {
      may: { patients: 4, revenue: 3565, status: 'actual' },
      june: { patients: 10, revenue: 11040, status: 'actual' },
      july: { patients: 28, revenue: 28965, status: 'actual' },
      august: { patients: 50, revenue: 80000, status: 'actual' }
    },
    projections: {
      september: { b2c_adhd: 125, b2c_asd: 3, nhs_adhd: 2, nhs_asd: 0 },
      october: { b2c_adhd: 165, b2c_asd: 4, nhs_adhd: 5, nhs_asd: 1 },
      november: { b2c_adhd: 215, b2c_asd: 6, nhs_adhd: 8, nhs_asd: 1 },
      december: { b2c_adhd: 280, b2c_asd: 8, nhs_adhd: 10, nhs_asd: 2 }
    }
  },

  // Growth Scenarios for 2026
  scenarios: {
    pessimistic: {
      name: "Pessimistic",
      description: "Conservative growth from 300 to 750 patients/month (50% of target)",
      projections_2026: {
        january: { b2c_adhd: 280, b2c_asd: 8, nhs_adhd: 15, nhs_asd: 2 },
        february: { b2c_adhd: 390, b2c_asd: 15, nhs_adhd: 40, nhs_asd: 10 },
        march: { b2c_adhd: 380, b2c_asd: 20, nhs_adhd: 70, nhs_asd: 18 },
        april: { b2c_adhd: 350, b2c_asd: 25, nhs_adhd: 120, nhs_asd: 30 },
        may: { b2c_adhd: 320, b2c_asd: 30, nhs_adhd: 200, nhs_asd: 50 },
        june: { b2c_adhd: 300, b2c_asd: 35, nhs_adhd: 280, nhs_asd: 70 },
        july: { b2c_adhd: 280, b2c_asd: 40, nhs_adhd: 350, nhs_asd: 88 },
        august: { b2c_adhd: 260, b2c_asd: 43, nhs_adhd: 385, nhs_asd: 96 },
        september: { b2c_adhd: 180, b2c_asd: 45, nhs_adhd: 420, nhs_asd: 105 },
        october: { b2c_adhd: 180, b2c_asd: 45, nhs_adhd: 420, nhs_asd: 105 },
        november: { b2c_adhd: 180, b2c_asd: 45, nhs_adhd: 420, nhs_asd: 105 },
        december: { b2c_adhd: 180, b2c_asd: 45, nhs_adhd: 420, nhs_asd: 105 }
      }
    },
    realistic: {
      name: "Realistic",
      description: "Growing from 300 to 1500 patients/month by mid-2026 (30% private, 70% NHS)",
      projections_2026: {
        january: { b2c_adhd: 290, b2c_asd: 10, nhs_adhd: 25, nhs_asd: 5 },
        february: { b2c_adhd: 380, b2c_asd: 25, nhs_adhd: 80, nhs_asd: 20 },
        march: { b2c_adhd: 360, b2c_asd: 35, nhs_adhd: 140, nhs_asd: 35 },
        april: { b2c_adhd: 350, b2c_asd: 50, nhs_adhd: 250, nhs_asd: 63 },
        may: { b2c_adhd: 340, b2c_asd: 60, nhs_adhd: 400, nhs_asd: 100 },
        june: { b2c_adhd: 330, b2c_asd: 70, nhs_adhd: 560, nhs_asd: 140 },
        july: { b2c_adhd: 320, b2c_asd: 80, nhs_adhd: 700, nhs_asd: 175 },
        august: { b2c_adhd: 340, b2c_asd: 85, nhs_adhd: 770, nhs_asd: 193 },
        september: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 },
        october: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 },
        november: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 },
        december: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 }
      }
    },
    optimistic: {
      name: "Optimistic", 
      description: "Aggressive scaling from 300 to 3000 patients/month (2x target)",
      projections_2026: {
        january: { b2c_adhd: 300, b2c_asd: 15, nhs_adhd: 50, nhs_asd: 10 },
        february: { b2c_adhd: 380, b2c_asd: 40, nhs_adhd: 160, nhs_asd: 40 },
        march: { b2c_adhd: 360, b2c_asd: 60, nhs_adhd: 280, nhs_asd: 70 },
        april: { b2c_adhd: 350, b2c_asd: 80, nhs_adhd: 500, nhs_asd: 125 },
        may: { b2c_adhd: 340, b2c_asd: 100, nhs_adhd: 800, nhs_asd: 200 },
        june: { b2c_adhd: 400, b2c_asd: 120, nhs_adhd: 1120, nhs_asd: 280 },
        july: { b2c_adhd: 500, b2c_asd: 140, nhs_adhd: 1400, nhs_asd: 350 },
        august: { b2c_adhd: 600, b2c_asd: 160, nhs_adhd: 1540, nhs_asd: 385 },
        september: { b2c_adhd: 720, b2c_asd: 180, nhs_adhd: 1680, nhs_asd: 420 },
        october: { b2c_adhd: 720, b2c_asd: 180, nhs_adhd: 1680, nhs_asd: 420 },
        november: { b2c_adhd: 720, b2c_asd: 180, nhs_adhd: 1680, nhs_asd: 420 },
        december: { b2c_adhd: 720, b2c_asd: 180, nhs_adhd: 1680, nhs_asd: 420 }
      }
    }
  },

  // Current active scenario (default: realistic)
  activeScenario: 'realistic',

  // Legacy: Keep for backward compatibility (matches realistic scenario)
  projections_2026: {
    january: { b2c_adhd: 400, b2c_asd: 15, nhs_adhd: 40, nhs_asd: 10 },
    february: { b2c_adhd: 380, b2c_asd: 25, nhs_adhd: 80, nhs_asd: 20 },
    march: { b2c_adhd: 360, b2c_asd: 35, nhs_adhd: 140, nhs_asd: 35 },
    april: { b2c_adhd: 350, b2c_asd: 50, nhs_adhd: 250, nhs_asd: 63 },
    may: { b2c_adhd: 340, b2c_asd: 60, nhs_adhd: 400, nhs_asd: 100 },
    june: { b2c_adhd: 330, b2c_asd: 70, nhs_adhd: 560, nhs_asd: 140 },
    july: { b2c_adhd: 320, b2c_asd: 80, nhs_adhd: 700, nhs_asd: 175 },
    august: { b2c_adhd: 340, b2c_asd: 85, nhs_adhd: 770, nhs_asd: 193 },
    september: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 },
    october: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 },
    november: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 },
    december: { b2c_adhd: 360, b2c_asd: 90, nhs_adhd: 840, nhs_asd: 210 }
  },

  // Multi-year projections (aggressive expansion strategy)
  annual_projections: {
    year_2027: {
      total_patients: 25000,
      total_revenue: 38000000,
      markets: ['UK', 'Ireland'],
      strategy: 'Complete UK market penetration',
      gross_profit: 17600000, // 46.3% blended margin maintained
      operating_expenses: 12000000, // Scaled operations across multiple markets
      ebitda: 5600000,
      net_profit: 4200000,
      // Detailed monthly breakdown for titration tracking
      monthly_breakdown: {
        january: { b2c_adhd: 400, b2c_asd: 200, nhs_adhd: 900, nhs_asd: 450 },
        february: { b2c_adhd: 450, b2c_asd: 210, nhs_adhd: 1000, nhs_asd: 475 },
        march: { b2c_adhd: 500, b2c_asd: 220, nhs_adhd: 1000, nhs_asd: 500 },
        april: { b2c_adhd: 500, b2c_asd: 230, nhs_adhd: 1000, nhs_asd: 525 },
        may: { b2c_adhd: 500, b2c_asd: 240, nhs_adhd: 1000, nhs_asd: 550 },
        june: { b2c_adhd: 500, b2c_asd: 250, nhs_adhd: 1000, nhs_asd: 575 },
        july: { b2c_adhd: 500, b2c_asd: 260, nhs_adhd: 1000, nhs_asd: 600 },
        august: { b2c_adhd: 500, b2c_asd: 270, nhs_adhd: 1000, nhs_asd: 625 },
        september: { b2c_adhd: 500, b2c_asd: 280, nhs_adhd: 1000, nhs_asd: 650 },
        october: { b2c_adhd: 500, b2c_asd: 290, nhs_adhd: 1000, nhs_asd: 675 },
        november: { b2c_adhd: 500, b2c_asd: 300, nhs_adhd: 1000, nhs_asd: 700 },
        december: { b2c_adhd: 500, b2c_asd: 310, nhs_adhd: 1000, nhs_asd: 725 }
      }
    },
    year_2028: {
      total_patients: 45000,
      total_revenue: 68000000,
      markets: ['UK', 'Ireland', 'Canada'],
      strategy: 'North American expansion',
      gross_profit: 31500000, // Improved margins through scale
      operating_expenses: 20000000, // International operations
      ebitda: 11500000,
      net_profit: 8500000,
      // Detailed monthly breakdown for titration tracking
      monthly_breakdown: {
        january: { b2c_adhd: 600, b2c_asd: 350, nhs_adhd: 1200, nhs_asd: 800 },
        february: { b2c_adhd: 650, b2c_asd: 375, nhs_adhd: 1300, nhs_asd: 850 },
        march: { b2c_adhd: 700, b2c_asd: 400, nhs_adhd: 1400, nhs_asd: 900 },
        april: { b2c_adhd: 750, b2c_asd: 425, nhs_adhd: 1500, nhs_asd: 950 },
        may: { b2c_adhd: 800, b2c_asd: 450, nhs_adhd: 1600, nhs_asd: 1000 },
        june: { b2c_adhd: 800, b2c_asd: 475, nhs_adhd: 1600, nhs_asd: 1050 },
        july: { b2c_adhd: 800, b2c_asd: 500, nhs_adhd: 1600, nhs_asd: 1100 },
        august: { b2c_adhd: 800, b2c_asd: 525, nhs_adhd: 1600, nhs_asd: 1150 },
        september: { b2c_adhd: 800, b2c_asd: 550, nhs_adhd: 1600, nhs_asd: 1200 },
        october: { b2c_adhd: 800, b2c_asd: 575, nhs_adhd: 1600, nhs_asd: 1250 },
        november: { b2c_adhd: 800, b2c_asd: 600, nhs_adhd: 1600, nhs_asd: 1300 },
        december: { b2c_adhd: 800, b2c_asd: 625, nhs_adhd: 1600, nhs_asd: 1350 }
      }
    },
    year_2029: {
      total_patients: 80000,
      total_revenue: 120000000,
      markets: ['UK', 'Ireland', 'Canada', 'Australia'],
      strategy: 'Commonwealth market dominance',
      gross_profit: 55500000, // Scale efficiencies
      operating_expenses: 32000000, // Global platform operations
      ebitda: 23500000,
      net_profit: 18000000
    }
  },

  // Unit Economics (updated with new operating expenses)
  unit_economics: {
    b2c_adhd: {
      revenue: 1200,
      clinical_costs: 450,
      tech_admin: 60,
      cac: 200,
      allocated_operating_expenses: 45, // Estimated monthly allocation per patient for 2026
      base_costs: 755, // 450 + 60 + 200 + 45
      unexpected_overhead: 76, // 10% of base costs (755 * 0.10)
      total_costs: 831, // base + overhead
      gross_profit: 369, // 1200 - 831
      margin: 0.31, // Updated margin accounting for new expenses
      subscription_revenue_expected: 375, // 50% take × 50% renewal × £750
      total_ltv: 1575,
      ltv_cac_ratio: 4.4 // Adjusted for higher costs
    },
    b2c_asd: {
      revenue: 1750,
      clinical_costs: 450,
      tech_admin: 85,
      cac: 200,
      allocated_operating_expenses: 45,
      base_costs: 780, // 450 + 85 + 200 + 45
      unexpected_overhead: 78, // 10% of base costs
      total_costs: 858,
      gross_profit: 892, // 1750 - 858
      margin: 0.51, // Updated margin
      total_ltv: 1750,
      ltv_cac_ratio: 6.1 // Improved due to lower costs
    },
    nhs_adhd: {
      revenue: 1350,
      clinical_costs: 450,
      tech_admin: 60,
      cac: 0,
      allocated_operating_expenses: 45,
      base_costs: 555, // 450 + 60 + 0 + 45
      unexpected_overhead: 56, // 10% of base costs
      total_costs: 611,
      gross_profit: 739, // 1350 - 611
      margin: 0.55 // Updated margin
    },
    nhs_asd: {
      revenue: 2000,
      clinical_costs: 450,
      tech_admin: 85,
      cac: 0,
      allocated_operating_expenses: 45,
      base_costs: 580, // 450 + 85 + 0 + 45
      unexpected_overhead: 58, // 10% of base costs
      total_costs: 638,
      gross_profit: 1362, // 2000 - 638
      margin: 0.68 // Updated margin
    }
  },

  // Key Performance Metrics (updated with unit economics)
  metrics: {
    year_1_revenue_target: 21329000, // Updated to match actual 2026 projections calculation
    year_1_patients_target: 12916, // Updated to match actual projections
    blended_gross_margin: 0.484, // Weighted average based on updated unit economics: 48.4%
    avg_revenue_per_patient: 1651, // Recalculated: 21,329,000 / 12,916
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
      'Achieve £75K monthly run-rate by EOY 2025',
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