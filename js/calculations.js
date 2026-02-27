// Mentalwell Financial Model - Calculations Engine
// This file contains all calculation logic for the financial model

class FinancialCalculations {
  constructor(data) {
    this.data = data;
  }

  // Calculate revenue for a given month and service mix
  calculateMonthlyRevenue(serviceVolumes) {
    const revenue = {
      b2c_revenue: 0,
      nhs_revenue: 0,
      subscription_revenue: 0,
      total_revenue: 0
    };

    // B2C Revenue
    revenue.b2c_revenue += (serviceVolumes.b2c_adhd || 0) * this.data.pricing.b2c_adhd_complete;
    revenue.b2c_revenue += (serviceVolumes.b2c_asd || 0) * this.data.pricing.b2c_asd;

    // NHS Revenue
    revenue.nhs_revenue += (serviceVolumes.nhs_adhd || 0) * this.data.pricing.nhs_adhd;
    revenue.nhs_revenue += (serviceVolumes.nhs_asd || 0) * this.data.pricing.nhs_asd;

    // Subscription Revenue (only applies to B2C ADHD patients)
    const b2c_adhd_patients = serviceVolumes.b2c_adhd || 0;
    revenue.subscription_revenue = b2c_adhd_patients * 
      this.data.market.subscription_take_rate * 
      this.data.pricing.subscription_6month / 12; // Monthly portion

    revenue.total_revenue = revenue.b2c_revenue + revenue.nhs_revenue + revenue.subscription_revenue;

    return revenue;
  }

  // Calculate costs for a given month and service mix using unit economics
  calculateMonthlyCosts(serviceVolumes, monthYear = null) {
    const costs = {
      clinical_costs: 0,
      tech_admin_costs: 0,
      cac_costs: 0,
      operating_expenses: 0,
      total_costs: 0
    };

    // Use unit economics total costs for each service type
    costs.total_costs += (serviceVolumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.total_costs;
    costs.total_costs += (serviceVolumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.total_costs;
    costs.total_costs += (serviceVolumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.total_costs;
    costs.total_costs += (serviceVolumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.total_costs;

    // For backward compatibility, break down costs (though total_costs is what matters)
    costs.clinical_costs += (serviceVolumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.clinical_costs;
    costs.clinical_costs += (serviceVolumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.clinical_costs;
    costs.clinical_costs += (serviceVolumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.clinical_costs;
    costs.clinical_costs += (serviceVolumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.clinical_costs;

    costs.tech_admin_costs += (serviceVolumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.tech_admin;
    costs.tech_admin_costs += (serviceVolumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.tech_admin;
    costs.tech_admin_costs += (serviceVolumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.tech_admin;
    costs.tech_admin_costs += (serviceVolumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.tech_admin;

    costs.cac_costs += (serviceVolumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.cac;
    costs.cac_costs += (serviceVolumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.cac;
    costs.cac_costs += (serviceVolumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.cac;
    costs.cac_costs += (serviceVolumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.cac;

    return costs;
  }

  // Calculate monthly operating expenses based on date
  calculateMonthlyOperatingExpenses(monthYear = null) {
    let totalOperatingExpenses = 0;
    
    // Insurance (always present)
    totalOperatingExpenses += this.data.operating_expenses.insurance;
    
    // CQC registration (always present) 
    totalOperatingExpenses += this.data.operating_expenses.cqc_registration;
    
    // Office rent (from 2026 onwards)
    if (monthYear && monthYear.includes('2026')) {
      totalOperatingExpenses += this.data.operating_expenses.office_rent.monthly_cost;
    }
    
    // Admin salaries (from 2026 onwards)
    if (monthYear && monthYear.includes('2026')) {
      totalOperatingExpenses += this.data.operating_expenses.admin_salaries.monthly_cost_total;
    }
    
    return totalOperatingExpenses;
  }

  // Generate 2025 performance data with actuals and projections
  generate2025Performance() {
    const performance = [];
    
    // Add actuals
    Object.entries(this.data.performance_2025.actuals).forEach(([month, data]) => {
      const monthName = month.charAt(0).toUpperCase() + month.slice(1);
      const momGrowth = this.calculateMoMGrowth(performance, data.revenue);
      
      performance.push({
        month: `${monthName} 2025`,
        status: 'ACTUAL',
        statusColor: '#66ec37',
        backgroundColor: '#f0ffed',
        patients: data.patients,
        revenue: data.revenue,
        momGrowth: momGrowth,
        notes: this.getMonthNotes(month)
      });
    });

    // Add projections
    Object.entries(this.data.performance_2025.projections).forEach(([month, volumes]) => {
      const monthName = month.charAt(0).toUpperCase() + month.slice(1);
      const totalPatients = Object.values(volumes).reduce((sum, val) => sum + val, 0);
      const revenue = this.calculateMonthlyRevenue(volumes);
      const momGrowth = this.calculateMoMGrowth(performance, revenue.total_revenue);

      performance.push({
        month: `${monthName} 2025`,
        status: 'PROJECTED',
        statusColor: '#e4880f',
        backgroundColor: '#fdf5ec',
        patients: totalPatients,
        revenue: revenue.total_revenue,
        momGrowth: momGrowth,
        notes: this.getMonthNotes(month)
      });
    });

    // Add total row
    const totalRevenue = performance.reduce((sum, month) => sum + month.revenue, 0);
    const totalPatients = performance.reduce((sum, month) => sum + month.patients, 0);

    performance.push({
      month: '2025 TOTAL',
      status: 'COMBINED',
      statusColor: 'white',
      backgroundColor: '#030765',
      isTotal: true,
      patients: totalPatients,
      revenue: totalRevenue,
      momGrowth: '-',
      notes: 'Foundation year complete'
    });

    return performance;
  }

  // Generate 2026 projections
  generate2026Projections(scenario = null) {
    const projections = [];

    // Use specified scenario or active scenario or default to legacy projections
    const projectionData = scenario 
      ? this.data.scenarios[scenario]?.projections_2026 
      : this.data.scenarios[this.data.activeScenario]?.projections_2026 || this.data.projections_2026;

    Object.entries(projectionData).forEach(([month, volumes]) => {
      const monthName = month.charAt(0).toUpperCase() + month.slice(1);
      const totalPatients = Object.values(volumes).reduce((sum, val) => sum + val, 0);

      // Subscription revenue from renewal pipeline at 50% uptake
      const pipelineEligible = this.data.renewal_pipeline_2026?.[month] || 0;
      const subscriptionRevenue = Math.round(pipelineEligible * 0.5) * this.data.pricing.subscription_6month;

      // Check for actuals (full months only, skip partial)
      const actuals = this.data.performance_2026?.actuals?.[month];
      const useActuals = actuals && actuals.status === 'actual' && !actuals.note;

      let b2cRevenue, nhsRevenue, patients;
      if (useActuals) {
        b2cRevenue = actuals.revenue;
        nhsRevenue = 0;
        patients = actuals.patients;
      } else {
        const revenue = this.calculateMonthlyRevenue(volumes);
        b2cRevenue = revenue.b2c_revenue;
        nhsRevenue = revenue.nhs_revenue;
        patients = totalPatients;
      }

      const totalRevenue = b2cRevenue + nhsRevenue + subscriptionRevenue;

      // Use bank-statement-verified costs for actual months, projected costs otherwise
      let totalCosts;
      if (useActuals && actuals.actual_costs) {
        const ac = actuals.actual_costs;
        totalCosts = (ac.clinical || 0) + (ac.tech_admin || 0) + (ac.marketing_cac || 0) + (ac.subscription_cogs || 0);
      } else {
        const costs = this.calculateMonthlyCosts(volumes, `${monthName} 2026`);
        totalCosts = costs.total_costs;
      }
      const grossProfit = totalRevenue - totalCosts;
      const grossMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) : 0;

      projections.push({
        month: `${monthName} 2026`,
        b2c_adhd: volumes.b2c_adhd,
        b2c_asd: volumes.b2c_asd,
        nhs_adhd: volumes.nhs_adhd,
        nhs_asd: volumes.nhs_asd,
        total_patients: patients,
        b2c_revenue: b2cRevenue,
        nhs_revenue: nhsRevenue,
        subscription_revenue: subscriptionRevenue,
        total_revenue: totalRevenue,
        gross_profit: grossProfit,
        gross_margin: Math.round(grossMargin * 100) + '%',
        isActual: useActuals || false
      });
    });

    // Calculate totals - need to recalculate costs for annual total
    const totals = projections.reduce((acc, month) => {
      acc.b2c_adhd += month.b2c_adhd;
      acc.b2c_asd += month.b2c_asd;
      acc.nhs_adhd += month.nhs_adhd;
      acc.nhs_asd += month.nhs_asd;
      acc.total_patients += month.total_patients;
      acc.b2c_revenue += month.b2c_revenue;
      acc.nhs_revenue += month.nhs_revenue;
      acc.subscription_revenue += month.subscription_revenue;
      return acc;
    }, {
      b2c_adhd: 0, b2c_asd: 0, nhs_adhd: 0, nhs_asd: 0,
      total_patients: 0, b2c_revenue: 0, nhs_revenue: 0, 
      subscription_revenue: 0
    });

    // Calculate total annual costs using unit economics
    const totalAnnualCosts = (totals.b2c_adhd * this.data.unit_economics.b2c_adhd.total_costs) +
                            (totals.b2c_asd * this.data.unit_economics.b2c_asd.total_costs) +
                            (totals.nhs_adhd * this.data.unit_economics.nhs_adhd.total_costs) +
                            (totals.nhs_asd * this.data.unit_economics.nhs_asd.total_costs);

    // Subscription revenue is sum of monthly pipeline values (already accumulated above)
    totals.total_revenue = totals.b2c_revenue + totals.nhs_revenue + totals.subscription_revenue;
    totals.gross_profit = totals.total_revenue - totalAnnualCosts;
    totals.gross_margin = Math.round((totals.gross_profit / totals.total_revenue) * 100) + '%';

    projections.push({
      month: 'TOTAL YEAR 1 (2026)',
      isTotal: true,
      ...totals
    });

    return projections;
  }

  // Generate full P&L for 2026 (monthly + annual totals)
  generatePnL2026(scenario = null) {
    const monthly = [];

    const projectionData = scenario
      ? this.data.scenarios[scenario]?.projections_2026
      : this.data.scenarios[this.data.activeScenario]?.projections_2026 || this.data.projections_2026;

    Object.entries(projectionData).forEach(([month, volumes]) => {
      const monthName = month.charAt(0).toUpperCase() + month.slice(1);

      // Check for actuals (full months only, skip partial)
      const actuals = this.data.performance_2026?.actuals?.[month];
      const useActuals = actuals && actuals.status === 'actual' && !actuals.note;

      // --- REVENUE ---
      let b2cAdhdRev, b2cAsdRev, nhsAdhdRev, nhsAsdRev, patients;

      if (useActuals) {
        // January actuals: allocate revenue proportionally based on projected volume mix
        const totalB2cVol = (volumes.b2c_adhd || 0) + (volumes.b2c_asd || 0);
        const adhdShare = totalB2cVol > 0 ? volumes.b2c_adhd / totalB2cVol : 1;
        b2cAdhdRev = Math.round(actuals.revenue * adhdShare);
        b2cAsdRev = actuals.revenue - b2cAdhdRev;
        nhsAdhdRev = 0;
        nhsAsdRev = 0;
        patients = actuals.patients;
      } else {
        b2cAdhdRev = (volumes.b2c_adhd || 0) * this.data.pricing.b2c_adhd_complete;
        b2cAsdRev = (volumes.b2c_asd || 0) * this.data.pricing.b2c_asd;
        nhsAdhdRev = (volumes.nhs_adhd || 0) * this.data.pricing.nhs_adhd;
        nhsAsdRev = (volumes.nhs_asd || 0) * this.data.pricing.nhs_asd;
        patients = Object.values(volumes).reduce((sum, val) => sum + val, 0);
      }

      // Subscription revenue from renewal pipeline at 50% uptake
      const pipelineEligible = this.data.renewal_pipeline_2026?.[month] || 0;
      const subscriptionCount = Math.round(pipelineEligible * 0.5);
      const subscriptionRev = subscriptionCount * this.data.pricing.subscription_6month;

      const b2cRev = b2cAdhdRev + b2cAsdRev;
      const nhsRev = nhsAdhdRev + nhsAsdRev;
      const totalRevenue = b2cRev + nhsRev + subscriptionRev;

      // --- COGS (variable costs per patient) ---
      let clinicalCosts, techAdmin, marketingCac, subscriptionCogs;

      if (useActuals && actuals.actual_costs) {
        // Bank-statement-verified costs for actual months
        clinicalCosts = actuals.actual_costs.clinical;
        techAdmin = actuals.actual_costs.tech_admin;
        marketingCac = actuals.actual_costs.marketing_cac || 0;
        subscriptionCogs = actuals.actual_costs.subscription_cogs || 0;
      } else {
        // Projected months: unit economics × volumes
        clinicalCosts =
          (volumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.clinical_costs +
          (volumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.clinical_costs +
          (volumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.clinical_costs +
          (volumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.clinical_costs;

        techAdmin =
          (volumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.tech_admin +
          (volumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.tech_admin +
          (volumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.tech_admin +
          (volumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.tech_admin;

        marketingCac =
          (volumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.cac +
          (volumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.cac +
          (volumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.cac +
          (volumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.cac;
      }

      // Subscription COGS using treatment plan unit economics (adult 6m: £230/subscription)
      subscriptionCogs = (subscriptionCogs !== undefined && useActuals && actuals.actual_costs)
        ? subscriptionCogs
        : subscriptionCount * this.data.unit_economics.adult_6m_plan.total_costs;

      const totalCogs = clinicalCosts + techAdmin + marketingCac + subscriptionCogs;

      // --- GROSS PROFIT ---
      const grossProfit = totalRevenue - totalCogs;
      const grossMargin = totalRevenue > 0 ? grossProfit / totalRevenue : 0;

      // --- OPERATING EXPENSES (monthly schedule from 2025 management accounts) ---
      const totalOpex = this.data.opex_monthly_2026?.[month] || 90000;

      // --- EBITDA ---
      const ebitda = grossProfit - totalOpex;
      const ebitdaMargin = totalRevenue > 0 ? ebitda / totalRevenue : 0;

      // --- NET INCOME ---
      const depreciation = 2000;
      const ebt = ebitda - depreciation;
      const tax = Math.max(0, ebt * 0.19);
      const netIncome = ebt - tax;

      monthly.push({
        month: `${monthName} 2026`,
        monthKey: month,
        isActual: useActuals || false,
        patients,
        b2cAdhdRev, b2cAsdRev, nhsAdhdRev, nhsAsdRev,
        b2cRev, nhsRev, subscriptionRev, totalRevenue,
        clinicalCosts, techAdmin, marketingCac, subscriptionCogs, totalCogs,
        grossProfit, grossMargin,
        totalOpex,
        ebitda, ebitdaMargin, depreciation, tax, netIncome
      });
    });

    // --- ANNUAL TOTALS ---
    const numericKeys = [
      'patients', 'b2cAdhdRev', 'b2cAsdRev', 'nhsAdhdRev', 'nhsAsdRev',
      'b2cRev', 'nhsRev', 'subscriptionRev', 'totalRevenue',
      'clinicalCosts', 'techAdmin', 'marketingCac', 'subscriptionCogs', 'totalCogs',
      'grossProfit', 'totalOpex',
      'ebitda', 'depreciation', 'tax', 'netIncome'
    ];

    const annual = {};
    numericKeys.forEach(key => { annual[key] = 0; });
    monthly.forEach(m => {
      numericKeys.forEach(key => { annual[key] += m[key]; });
    });

    annual.grossMargin = annual.totalRevenue > 0 ? annual.grossProfit / annual.totalRevenue : 0;
    annual.ebitdaMargin = annual.totalRevenue > 0 ? annual.ebitda / annual.totalRevenue : 0;
    annual.month = '2026 ANNUAL TOTAL';
    annual.isTotal = true;

    return { monthly, annual };
  }

  // Calculate month-over-month growth
  calculateMoMGrowth(performanceArray, currentRevenue) {
    if (performanceArray.length === 0) return '-';
    const lastMonth = performanceArray[performanceArray.length - 1];
    if (lastMonth.isTotal) return '-'; // Skip total rows
    
    const growth = ((currentRevenue - lastMonth.revenue) / lastMonth.revenue) * 100;
    return growth.toFixed(1) + '%';
  }

  // Get descriptive notes for each month
  getMonthNotes(month) {
    const notes = {
      may: 'Strong foundation month',
      june: 'Rapid scaling begins',
      july: 'Momentum building',
      august: 'Conservative growth',
      september: 'Steady expansion',
      october: 'Market maturation',
      november: 'Pre-NHS preparation',
      december: 'NHS launch (10 patients @ £1,350)'
    };
    return notes[month] || '';
  }

  // Generate annual summary data
  generateAnnualSummary() {
    // Get actual 2026 projections
    const projections2026 = this.generate2026Projections('realistic');
    const totals2026 = projections2026[projections2026.length - 1];
    
    return [
      {
        year: 'Year 1 (2026)',
        total_patients: totals2026.total_patients,
        total_revenue: this.formatCurrency(totals2026.total_revenue),
        gross_profit: this.formatCurrency(totals2026.gross_profit),
        operating_expenses: 'Variable by volume',
        ebitda: this.formatCurrency(totals2026.gross_profit - 1500000), // Estimate fixed costs
        net_profit: this.formatCurrency(totals2026.gross_profit - 1800000) // Estimate total costs
      },
      {
        year: 'Year 2 (2027)',
        total_patients: this.data.annual_projections.year_2027.total_patients,
        total_revenue: this.formatCurrency(this.data.annual_projections.year_2027.total_revenue),
        gross_profit: this.formatCurrency(this.data.annual_projections.year_2027.gross_profit),
        operating_expenses: this.formatCurrency(this.data.annual_projections.year_2027.operating_expenses),
        ebitda: this.formatCurrency(this.data.annual_projections.year_2027.ebitda),
        net_profit: this.formatCurrency(this.data.annual_projections.year_2027.net_profit)
      },
      {
        year: 'Year 3 (2028)',
        total_patients: this.data.annual_projections.year_2028.total_patients,
        total_revenue: this.formatCurrency(this.data.annual_projections.year_2028.total_revenue),
        gross_profit: this.formatCurrency(this.data.annual_projections.year_2028.gross_profit),
        operating_expenses: this.formatCurrency(this.data.annual_projections.year_2028.operating_expenses),
        ebitda: this.formatCurrency(this.data.annual_projections.year_2028.ebitda),
        net_profit: this.formatCurrency(this.data.annual_projections.year_2028.net_profit)
      }
    ];
  }

  // Utility function to format currency
  formatCurrency(amount) {
    return '£' + amount.toLocaleString();
  }

  // Utility function to format percentage
  formatPercentage(decimal) {
    return Math.round(decimal * 100) + '%';
  }

  // Switch to a different scenario
  switchScenario(scenarioName) {
    if (this.data.scenarios[scenarioName]) {
      this.data.activeScenario = scenarioName;
      return true;
    }
    return false;
  }

  // Get current scenario information
  getCurrentScenario() {
    const scenarioKey = this.data.activeScenario || 'realistic';
    return {
      key: scenarioKey,
      ...this.data.scenarios[scenarioKey]
    };
  }

  // Get all available scenarios
  getAllScenarios() {
    return Object.entries(this.data.scenarios).map(([key, scenario]) => ({
      key,
      ...scenario
    }));
  }

  // Calculate key performance metrics
  calculateKPIMetrics(scenario = null) {
    // Generate projections for the specified scenario to get dynamic metrics
    const projections = this.generate2026Projections(scenario);
    const totals = projections[projections.length - 1]; // Last row is totals

    return {
      year_1_revenue: this.formatCurrency(totals.total_revenue),
      blended_gross_margin: totals.gross_margin,
      total_patients_year_1: totals.total_patients.toLocaleString(),
      avg_revenue_per_patient: this.formatCurrency(Math.round(totals.total_revenue / totals.total_patients))
    };
  }

  // --- MULTI-MARKET P&L ENGINE (2027-2028) ---

  convertToGBP(amount, currencyCode) {
    const rate = this.data.currencies[currencyCode]?.rate || 1;
    return Math.round(amount * rate);
  }

  // Calculate UK monthly revenue from volumes + subscription pipeline
  calculateUKMonthlyRevenue(ukVolumes, month, year) {
    const b2cAdhdRev = (ukVolumes.b2c_adhd || 0) * this.data.pricing.b2c_adhd_complete;
    const b2cAsdRev = (ukVolumes.b2c_asd || 0) * this.data.pricing.b2c_asd;
    const nhsAdhdRev = (ukVolumes.nhs_adhd || 0) * this.data.pricing.nhs_adhd;
    const nhsAsdRev = (ukVolumes.nhs_asd || 0) * this.data.pricing.nhs_asd;

    const pipeline = year === 2027
      ? this.data.renewal_pipeline_2027
      : this.data.renewal_pipeline_2028;
    const pipelineEligible = pipeline?.[month] || 0;
    const subscriptionCount = Math.round(pipelineEligible * 0.5);
    const subscriptionRev = subscriptionCount * this.data.pricing.subscription_6month;

    return {
      b2cAdhdRev, b2cAsdRev, nhsAdhdRev, nhsAsdRev, subscriptionRev, subscriptionCount,
      assessmentRevenue: b2cAdhdRev + b2cAsdRev + nhsAdhdRev + nhsAsdRev,
      totalRevenue: b2cAdhdRev + b2cAsdRev + nhsAdhdRev + nhsAsdRev + subscriptionRev
    };
  }

  // Calculate UK monthly COGS
  calculateUKMonthlyCOGS(ukVolumes, subscriptionCount) {
    const clinical =
      (ukVolumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.clinical_costs +
      (ukVolumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.clinical_costs +
      (ukVolumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.clinical_costs +
      (ukVolumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.clinical_costs;

    const techAdmin =
      (ukVolumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.tech_admin +
      (ukVolumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.tech_admin +
      (ukVolumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.tech_admin +
      (ukVolumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.tech_admin;

    const cac =
      (ukVolumes.b2c_adhd || 0) * this.data.unit_economics.b2c_adhd.cac +
      (ukVolumes.b2c_asd || 0) * this.data.unit_economics.b2c_asd.cac +
      (ukVolumes.nhs_adhd || 0) * this.data.unit_economics.nhs_adhd.cac +
      (ukVolumes.nhs_asd || 0) * this.data.unit_economics.nhs_asd.cac;

    const subscriptionCogs = subscriptionCount * this.data.unit_economics.adult_6m_plan.total_costs;

    return { clinical, techAdmin, cac, subscriptionCogs, total: clinical + techAdmin + cac + subscriptionCogs };
  }

  // Calculate US monthly revenue from volumes + subscriptions (all in USD)
  calculateUSMonthlyRevenue(usVolumes, month, year) {
    const ue = this.data.us_market.unit_economics;
    const selfpayAdhdRev = (usVolumes.selfpay_adhd || 0) * ue.selfpay_adhd.revenue;
    const selfpayAsdRev = (usVolumes.selfpay_asd || 0) * ue.selfpay_asd.revenue;
    const innetworkAdhdRev = (usVolumes.innetwork_adhd || 0) * ue.innetwork_adhd.revenue;
    const innetworkAsdRev = (usVolumes.innetwork_asd || 0) * ue.innetwork_asd.revenue;
    const oonAdhdRev = (usVolumes.oon_adhd || 0) * ue.oon_adhd.revenue;
    const oonAsdRev = (usVolumes.oon_asd || 0) * ue.oon_asd.revenue;

    const pipeline = this.data.us_subscription_pipeline[`year_${year}`];
    const activeSubscribers = pipeline?.[month] || 0;
    const subscriptionRev = activeSubscribers * ue.subscription.revenue;

    const assessmentRevenue = selfpayAdhdRev + selfpayAsdRev + innetworkAdhdRev + innetworkAsdRev + oonAdhdRev + oonAsdRev;

    return {
      selfpayAdhdRev, selfpayAsdRev, innetworkAdhdRev, innetworkAsdRev,
      oonAdhdRev, oonAsdRev, subscriptionRev, activeSubscribers,
      assessmentRevenue,
      totalRevenue: assessmentRevenue + subscriptionRev
    };
  }

  // Calculate US monthly COGS (all in USD)
  calculateUSMonthlyCOGS(usVolumes, activeSubscribers) {
    const ue = this.data.us_market.unit_economics;

    const clinical =
      (usVolumes.selfpay_adhd || 0) * ue.selfpay_adhd.clinical_costs +
      (usVolumes.selfpay_asd || 0) * ue.selfpay_asd.clinical_costs +
      (usVolumes.innetwork_adhd || 0) * ue.innetwork_adhd.clinical_costs +
      (usVolumes.innetwork_asd || 0) * ue.innetwork_asd.clinical_costs +
      (usVolumes.oon_adhd || 0) * ue.oon_adhd.clinical_costs +
      (usVolumes.oon_asd || 0) * ue.oon_asd.clinical_costs;

    const techAdmin =
      (usVolumes.selfpay_adhd || 0) * ue.selfpay_adhd.tech_admin +
      (usVolumes.selfpay_asd || 0) * ue.selfpay_asd.tech_admin +
      (usVolumes.innetwork_adhd || 0) * ue.innetwork_adhd.tech_admin +
      (usVolumes.innetwork_asd || 0) * ue.innetwork_asd.tech_admin +
      (usVolumes.oon_adhd || 0) * ue.oon_adhd.tech_admin +
      (usVolumes.oon_asd || 0) * ue.oon_asd.tech_admin;

    const cac =
      (usVolumes.selfpay_adhd || 0) * ue.selfpay_adhd.cac +
      (usVolumes.selfpay_asd || 0) * ue.selfpay_asd.cac +
      (usVolumes.innetwork_adhd || 0) * ue.innetwork_adhd.cac +
      (usVolumes.innetwork_asd || 0) * ue.innetwork_asd.cac +
      (usVolumes.oon_adhd || 0) * ue.oon_adhd.cac +
      (usVolumes.oon_asd || 0) * ue.oon_asd.cac;

    const subscriptionCogs = activeSubscribers * ue.subscription.clinical_costs + activeSubscribers * ue.subscription.tech_admin;

    return { clinical, techAdmin, cac, subscriptionCogs, total: clinical + techAdmin + cac + subscriptionCogs };
  }

  // Calculate Ireland monthly revenue (all in EUR)
  calculateIrelandMonthlyRevenue(ieVolumes) {
    const ue = this.data.ireland_market.unit_economics;
    const adhdRev = (ieVolumes.b2c_adhd || 0) * ue.b2c_adhd.revenue;
    const asdRev = (ieVolumes.b2c_asd || 0) * ue.b2c_asd.revenue;
    return { adhdRev, asdRev, totalRevenue: adhdRev + asdRev };
  }

  // Calculate Ireland monthly COGS (all in EUR)
  calculateIrelandMonthlyCOGS(ieVolumes) {
    const ue = this.data.ireland_market.unit_economics;
    const clinical =
      (ieVolumes.b2c_adhd || 0) * ue.b2c_adhd.clinical_costs +
      (ieVolumes.b2c_asd || 0) * ue.b2c_asd.clinical_costs;
    const techAdmin =
      (ieVolumes.b2c_adhd || 0) * ue.b2c_adhd.tech_admin +
      (ieVolumes.b2c_asd || 0) * ue.b2c_asd.tech_admin;
    const cac =
      (ieVolumes.b2c_adhd || 0) * ue.b2c_adhd.cac +
      (ieVolumes.b2c_asd || 0) * ue.b2c_asd.cac;
    return { clinical, techAdmin, cac, total: clinical + techAdmin + cac };
  }

  // Core multi-market P&L generator for 2027 and 2028
  generateMultiMarketPnL(year, scenario = null) {
    const months = ['january','february','march','april','may','june','july','august','september','october','november','december'];
    const scenarioKey = scenario || this.data.activeScenario || 'realistic';
    const yearKey = `year_${year}`;
    const yearData = this.data.annual_projections[yearKey];

    if (!yearData?.scenarios?.[scenarioKey]) return { monthly: [], annual: {}, byMarket: {} };

    const scenarioData = yearData.scenarios[scenarioKey];
    const monthly = [];

    months.forEach(month => {
      const monthName = month.charAt(0).toUpperCase() + month.slice(1);
      const ukVol = scenarioData.uk?.[month] || { b2c_adhd: 0, b2c_asd: 0, nhs_adhd: 0, nhs_asd: 0 };
      const usVol = scenarioData.us?.[month] || { selfpay_adhd: 0, selfpay_asd: 0, innetwork_adhd: 0, innetwork_asd: 0, oon_adhd: 0, oon_asd: 0 };
      const ieVol = scenarioData.ireland?.[month] || { b2c_adhd: 0, b2c_asd: 0 };

      // --- UK (GBP) ---
      const ukRev = this.calculateUKMonthlyRevenue(ukVol, month, year);
      const ukCogs = this.calculateUKMonthlyCOGS(ukVol, ukRev.subscriptionCount);
      const ukOpex = this.data.opex_by_market[yearKey]?.uk?.[month] || 0;
      const ukGP = ukRev.totalRevenue - ukCogs.total;
      const ukEbitda = ukGP - ukOpex;
      const ukDepreciation = 2000;
      const ukEbt = ukEbitda - ukDepreciation;
      const ukTax = Math.max(0, ukEbt * this.data.uk_market.tax_rate);
      const ukNet = ukEbt - ukTax;
      const ukPatients = (ukVol.b2c_adhd || 0) + (ukVol.b2c_asd || 0) + (ukVol.nhs_adhd || 0) + (ukVol.nhs_asd || 0);

      // --- US (USD -> GBP) ---
      const usRev = this.calculateUSMonthlyRevenue(usVol, month, year);
      const usCogs = this.calculateUSMonthlyCOGS(usVol, usRev.activeSubscribers);
      const usOpexUSD = this.data.opex_by_market[yearKey]?.us?.[month] || 0;
      const usGP_USD = usRev.totalRevenue - usCogs.total;
      const usEbitda_USD = usGP_USD - usOpexUSD;
      const usDepreciation_USD = 1500;
      const usEbt_USD = usEbitda_USD - usDepreciation_USD;
      const usTax_USD = Math.max(0, usEbt_USD * this.data.us_market.tax_rate);
      const usNet_USD = usEbt_USD - usTax_USD;
      const usPatients = (usVol.selfpay_adhd || 0) + (usVol.selfpay_asd || 0) + (usVol.innetwork_adhd || 0) + (usVol.innetwork_asd || 0) + (usVol.oon_adhd || 0) + (usVol.oon_asd || 0);

      // Convert US to GBP
      const usRevGBP = this.convertToGBP(usRev.totalRevenue, 'USD');
      const usCogsGBP = this.convertToGBP(usCogs.total, 'USD');
      const usOpexGBP = this.convertToGBP(usOpexUSD, 'USD');
      const usGP_GBP = this.convertToGBP(usGP_USD, 'USD');
      const usEbitdaGBP = this.convertToGBP(usEbitda_USD, 'USD');
      const usTaxGBP = this.convertToGBP(usTax_USD, 'USD');
      const usNetGBP = this.convertToGBP(usNet_USD, 'USD');

      // --- Ireland (EUR -> GBP) ---
      const ieRev = this.calculateIrelandMonthlyRevenue(ieVol);
      const ieCogs = this.calculateIrelandMonthlyCOGS(ieVol);
      const ieOpexEUR = this.data.opex_by_market[yearKey]?.ireland?.[month] || 0;
      const ieGP_EUR = ieRev.totalRevenue - ieCogs.total;
      const ieEbitda_EUR = ieGP_EUR - ieOpexEUR;
      const ieDepreciation_EUR = 500;
      const ieEbt_EUR = ieEbitda_EUR - ieDepreciation_EUR;
      const ieTax_EUR = Math.max(0, ieEbt_EUR * this.data.ireland_market.tax_rate);
      const ieNet_EUR = ieEbt_EUR - ieTax_EUR;
      const iePatients = (ieVol.b2c_adhd || 0) + (ieVol.b2c_asd || 0);

      // Convert Ireland to GBP
      const ieRevGBP = this.convertToGBP(ieRev.totalRevenue, 'EUR');
      const ieCogsGBP = this.convertToGBP(ieCogs.total, 'EUR');
      const ieOpexGBP = this.convertToGBP(ieOpexEUR, 'EUR');
      const ieGP_GBP = this.convertToGBP(ieGP_EUR, 'EUR');
      const ieEbitdaGBP = this.convertToGBP(ieEbitda_EUR, 'EUR');
      const ieTaxGBP = this.convertToGBP(ieTax_EUR, 'EUR');
      const ieNetGBP = this.convertToGBP(ieNet_EUR, 'EUR');

      // --- CONSOLIDATED (GBP) ---
      const totalPatients = ukPatients + usPatients + iePatients;
      const totalRevenue = ukRev.totalRevenue + usRevGBP + ieRevGBP;
      const totalCogs = ukCogs.total + usCogsGBP + ieCogsGBP;
      const grossProfit = totalRevenue - totalCogs;
      const grossMargin = totalRevenue > 0 ? grossProfit / totalRevenue : 0;
      const totalOpex = ukOpex + usOpexGBP + ieOpexGBP;
      const ebitda = grossProfit - totalOpex;
      const ebitdaMargin = totalRevenue > 0 ? ebitda / totalRevenue : 0;
      const totalDepreciation = ukDepreciation + this.convertToGBP(usDepreciation_USD, 'USD') + this.convertToGBP(ieDepreciation_EUR, 'EUR');
      const totalTax = ukTax + usTaxGBP + ieTaxGBP;
      const netIncome = ebitda - totalDepreciation - totalTax;

      monthly.push({
        month: `${monthName} ${year}`,
        monthKey: month,
        patients: totalPatients,
        totalRevenue, totalCogs, grossProfit, grossMargin,
        totalOpex, ebitda, ebitdaMargin,
        depreciation: totalDepreciation, tax: totalTax, netIncome,

        // Per-market detail for drilldown
        uk: {
          patients: ukPatients, volumes: ukVol, rev: ukRev, cogs: ukCogs,
          opex: ukOpex, grossProfit: ukGP, ebitda: ukEbitda,
          depreciation: ukDepreciation, tax: ukTax, netIncome: ukNet,
          currency: 'GBP'
        },
        us: {
          patients: usPatients, volumes: usVol, rev: usRev, cogs: usCogs,
          opexUSD: usOpexUSD, opexGBP: usOpexGBP,
          grossProfitUSD: usGP_USD, grossProfitGBP: usGP_GBP,
          ebitdaUSD: usEbitda_USD, ebitdaGBP: usEbitdaGBP,
          depreciationUSD: usDepreciation_USD,
          taxUSD: usTax_USD, taxGBP: usTaxGBP,
          netIncomeUSD: usNet_USD, netIncomeGBP: usNetGBP,
          revenueUSD: usRev.totalRevenue, revenueGBP: usRevGBP,
          cogsUSD: usCogs.total, cogsGBP: usCogsGBP,
          currency: 'USD'
        },
        ie: {
          patients: iePatients, volumes: ieVol, rev: ieRev, cogs: ieCogs,
          opexEUR: ieOpexEUR, opexGBP: ieOpexGBP,
          grossProfitEUR: ieGP_EUR, grossProfitGBP: ieGP_GBP,
          ebitdaEUR: ieEbitda_EUR, ebitdaGBP: ieEbitdaGBP,
          depreciationEUR: ieDepreciation_EUR,
          taxEUR: ieTax_EUR, taxGBP: ieTaxGBP,
          netIncomeEUR: ieNet_EUR, netIncomeGBP: ieNetGBP,
          revenueEUR: ieRev.totalRevenue, revenueGBP: ieRevGBP,
          cogsEUR: ieCogs.total, cogsGBP: ieCogsGBP,
          currency: 'EUR'
        }
      });
    });

    // --- ANNUAL TOTALS ---
    const numericKeys = [
      'patients', 'totalRevenue', 'totalCogs', 'grossProfit',
      'totalOpex', 'ebitda', 'depreciation', 'tax', 'netIncome'
    ];

    const annual = {};
    numericKeys.forEach(key => { annual[key] = 0; });
    monthly.forEach(m => {
      numericKeys.forEach(key => { annual[key] += m[key]; });
    });
    annual.grossMargin = annual.totalRevenue > 0 ? annual.grossProfit / annual.totalRevenue : 0;
    annual.ebitdaMargin = annual.totalRevenue > 0 ? annual.ebitda / annual.totalRevenue : 0;
    annual.month = `${year} ANNUAL TOTAL`;
    annual.isTotal = true;

    // Per-market annual totals
    const ukAnnual = { revenue: 0, cogs: 0, opex: 0, grossProfit: 0, ebitda: 0, tax: 0, netIncome: 0, patients: 0 };
    const usAnnual = { revenueUSD: 0, revenueGBP: 0, cogsUSD: 0, cogsGBP: 0, opexUSD: 0, opexGBP: 0, grossProfitUSD: 0, grossProfitGBP: 0, ebitdaUSD: 0, ebitdaGBP: 0, taxUSD: 0, taxGBP: 0, netIncomeUSD: 0, netIncomeGBP: 0, patients: 0 };
    const ieAnnual = { revenueEUR: 0, revenueGBP: 0, cogsEUR: 0, cogsGBP: 0, opexEUR: 0, opexGBP: 0, grossProfitEUR: 0, grossProfitGBP: 0, ebitdaEUR: 0, ebitdaGBP: 0, taxEUR: 0, taxGBP: 0, netIncomeEUR: 0, netIncomeGBP: 0, patients: 0 };

    monthly.forEach(m => {
      ukAnnual.revenue += m.uk.rev.totalRevenue;
      ukAnnual.cogs += m.uk.cogs.total;
      ukAnnual.opex += m.uk.opex;
      ukAnnual.grossProfit += m.uk.grossProfit;
      ukAnnual.ebitda += m.uk.ebitda;
      ukAnnual.tax += m.uk.tax;
      ukAnnual.netIncome += m.uk.netIncome;
      ukAnnual.patients += m.uk.patients;

      usAnnual.revenueUSD += m.us.revenueUSD;
      usAnnual.revenueGBP += m.us.revenueGBP;
      usAnnual.cogsUSD += m.us.cogsUSD;
      usAnnual.cogsGBP += m.us.cogsGBP;
      usAnnual.opexUSD += m.us.opexUSD;
      usAnnual.opexGBP += m.us.opexGBP;
      usAnnual.grossProfitUSD += m.us.grossProfitUSD;
      usAnnual.grossProfitGBP += m.us.grossProfitGBP;
      usAnnual.ebitdaUSD += m.us.ebitdaUSD;
      usAnnual.ebitdaGBP += m.us.ebitdaGBP;
      usAnnual.taxUSD += m.us.taxUSD;
      usAnnual.taxGBP += m.us.taxGBP;
      usAnnual.netIncomeUSD += m.us.netIncomeUSD;
      usAnnual.netIncomeGBP += m.us.netIncomeGBP;
      usAnnual.patients += m.us.patients;

      ieAnnual.revenueEUR += m.ie.revenueEUR;
      ieAnnual.revenueGBP += m.ie.revenueGBP;
      ieAnnual.cogsEUR += m.ie.cogsEUR;
      ieAnnual.cogsGBP += m.ie.cogsGBP;
      ieAnnual.opexEUR += m.ie.opexEUR;
      ieAnnual.opexGBP += m.ie.opexGBP;
      ieAnnual.grossProfitEUR += m.ie.grossProfitEUR;
      ieAnnual.grossProfitGBP += m.ie.grossProfitGBP;
      ieAnnual.ebitdaEUR += m.ie.ebitdaEUR;
      ieAnnual.ebitdaGBP += m.ie.ebitdaGBP;
      ieAnnual.taxEUR += m.ie.taxEUR;
      ieAnnual.taxGBP += m.ie.taxGBP;
      ieAnnual.netIncomeEUR += m.ie.netIncomeEUR;
      ieAnnual.netIncomeGBP += m.ie.netIncomeGBP;
      ieAnnual.patients += m.ie.patients;
    });

    return { monthly, annual, byMarket: { uk: ukAnnual, us: usAnnual, ireland: ieAnnual } };
  }

  generatePnL2027(scenario = null) {
    return this.generateMultiMarketPnL(2027, scenario);
  }

  generatePnL2028(scenario = null) {
    return this.generateMultiMarketPnL(2028, scenario);
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FinancialCalculations;
}