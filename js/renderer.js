// Mentalwell Financial Model - HTML Renderer
// This file generates dynamic HTML content from financial data

class FinancialRenderer {
  constructor(data, calculator) {
    this.data = data;
    this.calc = calculator;
  }

  // Render the service portfolio pricing table
  renderServicePricingTable() {
    return `
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Adult Price</th>
            <th>Child Price (Under 18)</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>ADHD Assessment Only</strong></td>
            <td>${this.calc.formatCurrency(this.data.pricing.b2c_adhd_assessment)}</td>
            <td>£890</td>
            <td>Diagnostic assessment only</td>
          </tr>
          <tr>
            <td><strong>ADHD Complete Care Package</strong></td>
            <td>${this.calc.formatCurrency(this.data.pricing.b2c_adhd_complete)}</td>
            <td>-</td>
            <td>Assessment + ongoing support</td>
          </tr>
          <tr>
            <td><strong>ADHD Premium Package</strong></td>
            <td>${this.calc.formatCurrency(this.data.pricing.b2c_adhd_premium)}</td>
            <td>-</td>
            <td>Enhanced support package</td>
          </tr>
          <tr>
            <td><strong>ASD Assessment (B2C)</strong></td>
            <td>${this.calc.formatCurrency(this.data.pricing.b2c_asd)}</td>
            <td>${this.calc.formatCurrency(this.data.pricing.b2c_asd)}</td>
            <td>Launching ${this.data.assumptions.asd_launch_date}</td>
          </tr>
          <tr>
            <td><strong>NHS ADHD Contract</strong></td>
            <td>${this.calc.formatCurrency(this.data.pricing.nhs_adhd)}</td>
            <td>${this.calc.formatCurrency(this.data.pricing.nhs_adhd)}</td>
            <td>Right to Choose rate</td>
          </tr>
          <tr>
            <td><strong>NHS ASD Contract</strong></td>
            <td>${this.calc.formatCurrency(this.data.pricing.nhs_asd)}</td>
            <td>${this.calc.formatCurrency(this.data.pricing.nhs_asd)}</td>
            <td>Higher complexity assessment</td>
          </tr>
          <tr>
            <td><strong>Treatment Plans</strong></td>
            <td>${this.calc.formatCurrency(this.data.pricing.treatment_adult_6month)} (6m)</td>
            <td>${this.calc.formatCurrency(this.data.pricing.treatment_child_6month)} (6m)</td>
            <td>Post-diagnosis support</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // Render the 2025 performance table
  render2025PerformanceTable() {
    const performance = this.calc.generate2025Performance();
    
    let tableRows = '';
    performance.forEach(row => {
      const rowStyle = row.backgroundColor ? `style="background: ${row.backgroundColor};"` : '';
      const statusStyle = `style="color: ${row.statusColor}; font-weight: 600;"`;
      const rowClass = row.isTotal ? 'total-row' : '';
      
      tableRows += `
        <tr ${rowStyle} class="${rowClass}">
          <td><strong>${row.month}</strong></td>
          <td ${statusStyle}>${row.status}</td>
          <td>${row.patients}</td>
          <td>${this.calc.formatCurrency(row.revenue)}</td>
          <td>${this.calc.formatCurrency(row.revenue)}</td>
          <td>${row.momGrowth}</td>
          <td>${row.notes}</td>
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Status</th>
            <th>B2C ADHD Patients</th>
            <th>B2C Revenue</th>
            <th>Total Revenue</th>
            <th>MoM Growth</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

  // Render the 2026 projections table
  render2026ProjectionsTable(scenario = null) {
    const projections = this.calc.generate2026Projections(scenario);
    
    let tableRows = '';
    projections.forEach(row => {
      const rowClass = row.isTotal ? 'total-row' : '';
      const cellClass = row.isTotal ? '' : 'class="projection"';
      const actualLabel = row.month === 'January 2026' ? ' <span style="font-size: 11px; color: var(--color-success); font-weight: 600;">(actual)</span>' : '';

      tableRows += `
        <tr class="${rowClass}">
          <td><strong>${row.month}</strong>${actualLabel}</td>
          <td ${cellClass}>${row.b2c_adhd}</td>
          <td ${cellClass}>${row.b2c_asd}</td>
          <td ${cellClass}>${row.nhs_adhd}</td>
          <td ${cellClass}>${row.nhs_asd}</td>
          <td ${cellClass}>${row.total_patients}</td>
          <td ${cellClass}>${this.calc.formatCurrency(row.b2c_revenue)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(row.nhs_revenue)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(row.subscription_revenue)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(row.total_revenue)}</td>
          <!-- <td ${cellClass}>${this.calc.formatCurrency(row.gross_profit)}</td> -->
          <!-- <td ${cellClass}>${row.gross_margin}</td> -->
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>B2C ADHD</th>
            <th>B2C ASD</th>
            <th>NHS ADHD</th>
            <th>NHS ASD</th>
            <th>Total Patients</th>
            <th>B2C Revenue</th>
            <th>NHS Revenue</th>
            <th>Subscription Revenue</th>
            <th>Total Revenue</th>
            <!-- <th>Gross Profit</th> -->
            <!-- <th>Gross Margin</th> -->
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

  // Render the annual summary table
  renderAnnualSummaryTable() {
    const summary = this.calc.generateAnnualSummary();
    
    let tableRows = '';
    summary.forEach(row => {
      tableRows += `
        <tr>
          <td><strong>${row.year}</strong></td>
          <td class="projection">${row.total_patients.toLocaleString()}</td>
          <td class="projection">${row.total_revenue}</td>
          <td class="projection">${row.gross_profit}</td>
          <td class="projection">${row.operating_expenses}</td>
          <td class="projection">${row.ebitda}</td>
          <td class="projection">${row.net_profit}</td>
        </tr>
      `;
    });

    return `
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Total Patients</th>
            <th>Total Revenue</th>
            <th>Gross Profit</th>
            <th>Operating Expenses</th>
            <th>EBITDA</th>
            <th>Net Profit</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

  // Render unit economics tables
  renderUnitEconomicsTable(serviceType = 'b2c') {
    const services = serviceType === 'b2c' 
      ? { 'ADHD Package': this.data.unit_economics.b2c_adhd, 'Autism': this.data.unit_economics.b2c_asd }
      : { 'NHS ADHD': this.data.unit_economics.nhs_adhd, 'NHS Autism': this.data.unit_economics.nhs_asd };

    let tableRows = '';
    
    // Assessment Revenue row
    let adhdRevenue = serviceType === 'b2c' ? this.data.unit_economics.b2c_adhd.revenue : this.data.unit_economics.nhs_adhd.revenue;
    let asdRevenue = serviceType === 'b2c' ? this.data.unit_economics.b2c_asd.revenue : this.data.unit_economics.nhs_asd.revenue;
    
    tableRows += `
      <tr>
        <td><strong>Assessment Revenue</strong></td>
        <td><strong>${this.calc.formatCurrency(adhdRevenue)}</strong></td>
        <td><strong>${this.calc.formatCurrency(asdRevenue)}</strong></td>
        <td>One-time diagnostic fee</td>
      </tr>
    `;

    // Cost rows
    const costRows = [
      ['Clinical Costs', 'clinical_costs'],
      ['Technology & Admin', 'tech_admin'],
      ['Customer Acquisition Cost', 'cac']
    ];

    costRows.forEach(([label, key]) => {
      const adhdData = serviceType === 'b2c' ? this.data.unit_economics.b2c_adhd : this.data.unit_economics.nhs_adhd;
      const asdData = serviceType === 'b2c' ? this.data.unit_economics.b2c_asd : this.data.unit_economics.nhs_asd;
      
      const adhdCost = key === 'clinical_costs' ? adhdData.clinical_costs :
                      key === 'tech_admin' ? adhdData.tech_admin :
                      key === 'cac' ? adhdData.cac : 0;
      
      const asdCost = key === 'clinical_costs' ? asdData.clinical_costs :
                     key === 'tech_admin' ? asdData.tech_admin :
                     key === 'cac' ? asdData.cac : 0;

      tableRows += `
        <tr>
          <td>${label}</td>
          <td>${this.calc.formatCurrency(adhdCost)}</td>
          <td>${this.calc.formatCurrency(asdCost)}</td>
          <td>${this.getCostNotes(key, serviceType)}</td>
        </tr>
      `;
    });

    // Total costs and profit
    const adhdData = serviceType === 'b2c' ? this.data.unit_economics.b2c_adhd : this.data.unit_economics.nhs_adhd;
    const asdData = serviceType === 'b2c' ? this.data.unit_economics.b2c_asd : this.data.unit_economics.nhs_asd;

    tableRows += `
      <tr class="total-row">
        <td><strong>Total Assessment Costs</strong></td>
        <td><strong>${this.calc.formatCurrency(adhdData.total_costs)}</strong></td>
        <td><strong>${this.calc.formatCurrency(asdData.total_costs)}</strong></td>
        <td></td>
      </tr>
      <tr style="background: #66ec37; color: white;">
        <td><strong>Assessment Gross Profit</strong></td>
        <td><strong>${this.calc.formatCurrency(adhdData.gross_profit)}</strong></td>
        <td><strong>${this.calc.formatCurrency(asdData.gross_profit)}</strong></td>
        <td>${this.calc.formatPercentage(adhdData.margin)} / ${this.calc.formatPercentage(asdData.margin)} margin</td>
      </tr>
    `;

    const title = serviceType === 'b2c' ? 'Updated B2C Unit Economics (Complete Care Package)' : 'NHS Unit Economics (Contract Rates)';
    const col1Title = serviceType === 'b2c' ? 'ADHD Package' : 'NHS ADHD';
    const col2Title = serviceType === 'b2c' ? 'Autism' : 'NHS Autism';

    return `
      <h2>${title}</h2>
      <table>
        <thead>
          <tr>
            <th>Service Type</th>
            <th>${col1Title}</th>
            <th>${col2Title}</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

  // Render key performance metrics cards
  renderKPICards(scenario = null) {
    const metrics = this.calc.calculateKPIMetrics(scenario);
    
    return `
      <div class="metric-card">
        <div class="metric-value">${metrics.year_1_revenue}</div>
        <div class="metric-label">Year 1 Revenue Projection</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value">${metrics.blended_gross_margin}</div>
        <div class="metric-label">Blended Gross Margin</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value">${metrics.total_patients_year_1}</div>
        <div class="metric-label">Total Patients Year 1</div>
      </div>
      
      <div class="metric-card">
        <div class="metric-value">${metrics.avg_revenue_per_patient}</div>
        <div class="metric-label">Avg Revenue per Patient</div>
      </div>
    `;
  }

  // Render use of funds breakdown
  renderUseOfFunds() {
    const funds = this.data.investment.use_of_funds;
    
    return `
      <h4 style="margin: 0 0 10px 0; color: white;">Use of Funds</h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
        <li><strong>Research & Development (${funds.research_development.percentage}% - ${this.calc.formatCurrency(funds.research_development.amount)})</strong></li>
        <li>AI model enhancement and validation: £45K</li>
        <li>ASD pathway development: £25K</li>
        <li>Technology infrastructure scaling: £20K</li>
        <li><strong>Marketing & Customer Acquisition (${funds.marketing_acquisition.percentage}% - ${this.calc.formatCurrency(funds.marketing_acquisition.amount)})</strong></li>
        <li>Digital advertising campaigns: £30K</li>
        <li>Partnership development: £20K</li>
      </ul>
    `;
  }

  // Render milestones list
  renderMilestones() {
    let milestoneList = '';
    this.data.investment.milestones.forEach(milestone => {
      milestoneList += `<li>${milestone}</li>`;
    });

    return `
      <h4 style="margin: 0 0 10px 0; color: white;">Key Milestones</h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
        ${milestoneList}
      </ul>
    `;
  }

  // Render additional fund allocation
  renderAdditionalFunds() {
    const funds = this.data.investment.use_of_funds;
    
    return `
      <h4 style="margin: 15px 0 10px 0; color: white;">Additional Fund Allocation:</h4>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px;">
        <li><strong>Operations & Infrastructure (${funds.operations_infrastructure.percentage}% - ${this.calc.formatCurrency(funds.operations_infrastructure.amount)})</strong> - Clinical team expansion, operational systems, quality assurance</li>
        <li><strong>Regulatory & Compliance (${funds.regulatory_compliance.percentage}% - ${this.calc.formatCurrency(funds.regulatory_compliance.amount)})</strong> - MHRA certification, NHS contract preparation, legal compliance</li>
      </ul>
    `;
  }

  // Render scenario comparison table
  renderScenarioComparison() {
    const scenarios = ['pessimistic', 'realistic', 'optimistic'];
    let comparisonData = [];

    scenarios.forEach(scenario => {
      const projections = this.calc.generate2026Projections(scenario);
      const totals = projections[projections.length - 1]; // Last row is totals
      const scenarioInfo = this.data.scenarios[scenario];
      
      comparisonData.push({
        name: scenarioInfo.name,
        description: scenarioInfo.description,
        totalPatients: totals.total_patients,
        totalRevenue: totals.total_revenue,
        grossProfit: totals.gross_profit,
        grossMargin: totals.gross_margin
      });
    });

    let tableRows = '';
    comparisonData.forEach(row => {
      tableRows += `
        <tr>
          <td><strong>${row.name}</strong><br><small style="color: #5c5c5c;">${row.description}</small></td>
          <td>${row.totalPatients.toLocaleString()}</td>
          <td>${this.calc.formatCurrency(row.totalRevenue)}</td>
          <td>${this.calc.formatCurrency(row.grossProfit)}</td>
          <td>${row.grossMargin}</td>
        </tr>
      `;
    });

    return `
      <h2>Scenario Comparison - Year 1 (2026)</h2>
      <table>
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Total Patients</th>
            <th>Total Revenue</th>
            <th>Gross Profit</th>
            <th>Gross Margin</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

  // Render full P&L Model for 2026
  renderPnLModel(scenario = null) {
    const { monthly, annual } = this.calc.generatePnL2026(scenario);

    // Helpers for formatting
    const fmt = (amount) => this.calc.formatCurrency(Math.round(amount));
    const fmtProfit = (amount) => {
      const rounded = Math.round(amount);
      if (rounded < 0) return `<span style="color: #ef4444;">-${this.calc.formatCurrency(Math.abs(rounded))}</span>`;
      return `<span style="color: #22c55e;">${this.calc.formatCurrency(rounded)}</span>`;
    };
    const fmtPct = (decimal) => {
      const pct = Math.round(decimal * 100);
      if (pct < 0) return `<span style="color: #ef4444;">${pct}%</span>`;
      return `${pct}%`;
    };

    // Find EBITDA positive month
    let ebitdaPositiveMonth = null;
    for (const m of monthly) {
      if (m.ebitda > 0 && !ebitdaPositiveMonth) {
        ebitdaPositiveMonth = m.month;
      }
    }

    const dec = monthly[monthly.length - 1];
    const decAnnualized = dec.totalRevenue * 12;

    // --- SUMMARY CARDS ---
    const summaryHTML = `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
        <div class="metric-card">
          <div class="metric-value">${fmt(annual.totalRevenue)}</div>
          <div class="metric-label">2026 Revenue</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${Math.round(annual.grossMargin * 100)}%</div>
          <div class="metric-label">Gross Margin</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${fmt(annual.ebitda)}</div>
          <div class="metric-label">2026 EBITDA</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${fmt(decAnnualized)}</div>
          <div class="metric-label">Dec Run Rate (annualised)</div>
        </div>
      </div>
    `;

    // --- P&L SUMMARY TABLE ---
    let pnlRows = '';
    monthly.forEach(m => {
      const actualLabel = m.isActual ? ' <span style="font-size: 11px; color: var(--color-success); font-weight: 600;">(actual)</span>' : '';

      pnlRows += `
        <tr>
          <td><strong>${m.month}</strong>${actualLabel}</td>
          <td>${m.patients}</td>
          <td>${fmt(m.totalRevenue)}</td>
          <td>${fmt(m.totalCogs)}</td>
          <td>${fmtProfit(m.grossProfit)}</td>
          <td>${fmtPct(m.grossMargin)}</td>
          <td>${fmt(m.totalOpex)}</td>
          <td>${fmtProfit(m.ebitda)}</td>
          <td>${fmtPct(m.ebitdaMargin)}</td>
          <td>${fmtProfit(m.netIncome)}</td>
        </tr>
      `;
    });

    pnlRows += `
      <tr class="total-row">
        <td><strong>2026 TOTAL</strong></td>
        <td><strong>${annual.patients.toLocaleString()}</strong></td>
        <td><strong>${fmt(annual.totalRevenue)}</strong></td>
        <td><strong>${fmt(annual.totalCogs)}</strong></td>
        <td><strong>${fmtProfit(annual.grossProfit)}</strong></td>
        <td><strong>${fmtPct(annual.grossMargin)}</strong></td>
        <td><strong>${fmt(annual.totalOpex)}</strong></td>
        <td><strong>${fmtProfit(annual.ebitda)}</strong></td>
        <td><strong>${fmtPct(annual.ebitdaMargin)}</strong></td>
        <td><strong>${fmtProfit(annual.netIncome)}</strong></td>
      </tr>
    `;

    const pnlTableHTML = `
      <h2>P&L Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Patients</th>
            <th>Revenue</th>
            <th>COGS</th>
            <th>Gross Profit</th>
            <th>GP%</th>
            <th>OpEx</th>
            <th>EBITDA</th>
            <th>EBITDA%</th>
            <th>Net Income</th>
          </tr>
        </thead>
        <tbody>
          ${pnlRows}
        </tbody>
      </table>
    `;

    // --- REVENUE BREAKDOWN TABLE ---
    let revRows = '';
    monthly.forEach(m => {
      const actualLabel = m.isActual ? ' <span style="font-size: 11px; color: var(--color-success); font-weight: 600;">(actual)</span>' : '';

      revRows += `
        <tr>
          <td><strong>${m.month}</strong>${actualLabel}</td>
          <td>${fmt(m.b2cAdhdRev)}</td>
          <td>${fmt(m.b2cAsdRev)}</td>
          <td>${fmt(m.nhsAdhdRev)}</td>
          <td>${fmt(m.nhsAsdRev)}</td>
          <td>${fmt(m.subscriptionRev)}</td>
          <td><strong>${fmt(m.totalRevenue)}</strong></td>
        </tr>
      `;
    });

    revRows += `
      <tr class="total-row">
        <td><strong>2026 TOTAL</strong></td>
        <td><strong>${fmt(annual.b2cAdhdRev)}</strong></td>
        <td><strong>${fmt(annual.b2cAsdRev)}</strong></td>
        <td><strong>${fmt(annual.nhsAdhdRev)}</strong></td>
        <td><strong>${fmt(annual.nhsAsdRev)}</strong></td>
        <td><strong>${fmt(annual.subscriptionRev)}</strong></td>
        <td><strong>${fmt(annual.totalRevenue)}</strong></td>
      </tr>
    `;

    const b2cPct = Math.round(annual.b2cRev / annual.totalRevenue * 100);
    const nhsPct = Math.round(annual.nhsRev / annual.totalRevenue * 100);
    const subPct = Math.round(annual.subscriptionRev / annual.totalRevenue * 100);

    const revenueTableHTML = `
      <h2>Revenue by Channel</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>B2C ADHD</th>
            <th>B2C ASD</th>
            <th>NHS ADHD</th>
            <th>NHS ASD</th>
            <th>Subscriptions</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          ${revRows}
        </tbody>
      </table>
      <div class="highlight" style="margin-top: 15px;">
        <strong>Revenue mix:</strong> B2C ${b2cPct}% | NHS ${nhsPct}% | Subscriptions ${subPct}%.
        NHS ADHD launches April 2026, NHS ASD from June. NHS becomes the primary revenue driver by mid-year.
      </div>
    `;

    // --- COST BREAKDOWN TABLE ---
    let costRows = '';
    monthly.forEach(m => {
      costRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmt(m.clinicalCosts)}</td>
          <td>${fmt(m.techAdmin)}</td>
          <td>${fmt(m.marketingCac)}</td>
          <td>${fmt(m.subscriptionCogs)}</td>
          <td><strong>${fmt(m.totalCogs)}</strong></td>
        </tr>
      `;
    });

    costRows += `
      <tr class="total-row">
        <td><strong>2026 TOTAL</strong></td>
        <td><strong>${fmt(annual.clinicalCosts)}</strong></td>
        <td><strong>${fmt(annual.techAdmin)}</strong></td>
        <td><strong>${fmt(annual.marketingCac)}</strong></td>
        <td><strong>${fmt(annual.subscriptionCogs)}</strong></td>
        <td><strong>${fmt(annual.totalCogs)}</strong></td>
      </tr>
    `;

    const costTableHTML = `
      <h2>Cost of Revenue Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Clinical Costs</th>
            <th>Tech & Admin</th>
            <th>Marketing (CAC)</th>
            <th>Subscription Delivery</th>
            <th>Total COGS</th>
          </tr>
        </thead>
        <tbody>
          ${costRows}
        </tbody>
      </table>
    `;

    // --- OPEX NOTE ---
    const opexNote = `
      <div class="highlight" style="margin-top: 15px;">
        <strong>Operating expenses:</strong> ${fmt(monthly[0].totalOpex)}/month (Jan, bank statement verified) scaling to ${fmt(dec.totalOpex)}/month (Dec).
        Annual total: ${fmt(annual.totalOpex)}. Breakdown: staff costs (~48%), marketing (~19%), NI/pension (~9%), software (~5%), rent/facilities (~5%), insurance/compliance (~3%), other (~11%).
        Dec 2025 actual: £64K. Jan-Feb 2026 verified from NatWest bank statements. Growth driven by headcount and marketing spend for NHS launch.
      </div>
    `;

    // --- MODEL ASSUMPTIONS ---
    const assumptionsHTML = `
      <div class="highlight highlight-warning" style="margin-top: 20px;">
        <strong>Model assumptions:</strong>
        <ul style="margin: 10px 0 0 0; padding-left: 20px;">
          <li>B2C ADHD at ${fmt(this.data.pricing.b2c_adhd_complete)} (Complete Care), B2C ASD at ${fmt(this.data.pricing.b2c_asd)}, NHS ADHD at ${fmt(this.data.pricing.nhs_adhd)}, NHS ASD at ${fmt(this.data.pricing.nhs_asd)}</li>
          <li>NHS ADHD launches April 2026, NHS ASD launches June 2026, targeting 70:30 NHS:Private mix</li>
          <li>Subscription revenue from Stripe-verified renewal pipeline at 50% uptake x ${fmt(this.data.pricing.subscription_6month)}</li>
          <li>Subscription COGS at treatment plan margins (69% gross profit = ${fmt(this.data.unit_economics.adult_6m_plan.total_costs)} cost per subscription)</li>
          <li>CAC covers full marketing spend: ${fmt(this.data.unit_economics.b2c_adhd.cac)} per B2C patient, ${fmt(this.data.unit_economics.nhs_adhd.cac)} per NHS referral</li>
          <li>OpEx based on 2025 management accounts, scaling from ${fmt(monthly[0].totalOpex)}/month to ${fmt(dec.totalOpex)}/month</li>
          <li>UK corporation tax at 19%, depreciation ${fmt(2000)}/month</li>
          <li>January uses Stripe + bank-statement-verified actuals (${monthly[0].patients} patients, ${fmt(monthly[0].totalRevenue)} revenue, COGS from actual product mix)</li>
        </ul>
      </div>
    `;

    // --- EBITDA MILESTONE ---
    const ebitdaNote = ebitdaPositiveMonth
      ? `<div class="highlight" style="margin-top: 15px; background: #f0fdf4; border-left: 4px solid #22c55e;">
          <strong>EBITDA turns positive in ${ebitdaPositiveMonth}</strong> once NHS volumes push revenue past the cost base.
          December EBITDA: ${fmtProfit(dec.ebitda)} on ${fmt(dec.totalRevenue)} revenue (${fmtPct(dec.ebitdaMargin)} margin).
          Annualised December run rate: ${fmt(decAnnualized)}.
        </div>`
      : '';

    return summaryHTML + pnlTableHTML + ebitdaNote + revenueTableHTML + costTableHTML + opexNote + assumptionsHTML;
  }

  // Multi-market P&L renderer for 2027 and 2028
  renderMultiMarketPnLModel(year, scenario = null) {
    const { monthly, annual, byMarket } = year === 2027
      ? this.calc.generatePnL2027(scenario)
      : this.calc.generatePnL2028(scenario);

    if (!monthly.length) return '<p>No data available for this year/scenario combination.</p>';

    const fmt = (amount) => this.calc.formatCurrency(Math.round(amount));
    const fmtUSD = (amount) => '$' + Math.round(amount).toLocaleString();
    const fmtEUR = (amount) => '\u20AC' + Math.round(amount).toLocaleString();
    const fmtProfit = (amount) => {
      const rounded = Math.round(amount);
      if (rounded < 0) return `<span style="color: #ef4444;">-${this.calc.formatCurrency(Math.abs(rounded))}</span>`;
      return `<span style="color: #22c55e;">${this.calc.formatCurrency(rounded)}</span>`;
    };
    const fmtProfitUSD = (amount) => {
      const rounded = Math.round(amount);
      if (rounded < 0) return `<span style="color: #ef4444;">-$${Math.abs(rounded).toLocaleString()}</span>`;
      return `<span style="color: #22c55e;">$${rounded.toLocaleString()}</span>`;
    };
    const fmtProfitEUR = (amount) => {
      const rounded = Math.round(amount);
      if (rounded < 0) return `<span style="color: #ef4444;">-\u20AC${Math.abs(rounded).toLocaleString()}</span>`;
      return `<span style="color: #22c55e;">\u20AC${rounded.toLocaleString()}</span>`;
    };
    const fmtPct = (decimal) => {
      const pct = Math.round(decimal * 100);
      if (pct < 0) return `<span style="color: #ef4444;">${pct}%</span>`;
      return `${pct}%`;
    };

    // Find EBITDA positive month
    let ebitdaPositiveMonth = null;
    for (const m of monthly) {
      if (m.ebitda > 0 && !ebitdaPositiveMonth) {
        ebitdaPositiveMonth = m.month;
      }
    }

    const dec = monthly[monthly.length - 1];
    const decAnnualized = dec.totalRevenue * 12;

    // ==========================================
    // 1. SUMMARY CARDS
    // ==========================================
    const summaryHTML = `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px;">
        <div class="metric-card">
          <div class="metric-value">${fmt(annual.totalRevenue)}</div>
          <div class="metric-label">${year} Revenue (consolidated GBP)</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${Math.round(annual.grossMargin * 100)}%</div>
          <div class="metric-label">Blended Gross Margin</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${fmtProfit(annual.ebitda)}</div>
          <div class="metric-label">${year} EBITDA</div>
        </div>
        <div class="metric-card">
          <div class="metric-value">${fmt(decAnnualized)}</div>
          <div class="metric-label">Dec Run Rate (annualised)</div>
        </div>
      </div>
    `;

    // ==========================================
    // 2. CONSOLIDATED P&L TABLE
    // ==========================================
    let pnlRows = '';
    monthly.forEach(m => {
      pnlRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${m.patients.toLocaleString()}</td>
          <td>${fmt(m.totalRevenue)}</td>
          <td>${fmt(m.totalCogs)}</td>
          <td>${fmtProfit(m.grossProfit)}</td>
          <td>${fmtPct(m.grossMargin)}</td>
          <td>${fmt(m.totalOpex)}</td>
          <td>${fmtProfit(m.ebitda)}</td>
          <td>${fmtPct(m.ebitdaMargin)}</td>
          <td>${fmtProfit(m.netIncome)}</td>
        </tr>
      `;
    });
    pnlRows += `
      <tr class="total-row">
        <td><strong>${year} TOTAL</strong></td>
        <td><strong>${annual.patients.toLocaleString()}</strong></td>
        <td><strong>${fmt(annual.totalRevenue)}</strong></td>
        <td><strong>${fmt(annual.totalCogs)}</strong></td>
        <td><strong>${fmtProfit(annual.grossProfit)}</strong></td>
        <td><strong>${fmtPct(annual.grossMargin)}</strong></td>
        <td><strong>${fmt(annual.totalOpex)}</strong></td>
        <td><strong>${fmtProfit(annual.ebitda)}</strong></td>
        <td><strong>${fmtPct(annual.ebitdaMargin)}</strong></td>
        <td><strong>${fmtProfit(annual.netIncome)}</strong></td>
      </tr>
    `;

    const pnlTableHTML = `
      <h2>Consolidated P&L -- ${year}</h2>
      <p style="color: #6b7280; margin-bottom: 10px;">All figures in GBP. US and Ireland revenues converted at planning rates (1 USD = 0.79 GBP, 1 EUR = 0.86 GBP).</p>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Patients</th>
            <th>Revenue</th>
            <th>COGS</th>
            <th>Gross Profit</th>
            <th>GP%</th>
            <th>OpEx</th>
            <th>EBITDA</th>
            <th>EBITDA%</th>
            <th>Net Income</th>
          </tr>
        </thead>
        <tbody>
          ${pnlRows}
        </tbody>
      </table>
    `;

    // EBITDA milestone
    const ebitdaNote = ebitdaPositiveMonth
      ? `<div class="highlight" style="margin-top: 15px; background: #f0fdf4; border-left: 4px solid #22c55e;">
          <strong>EBITDA turns positive in ${ebitdaPositiveMonth}.</strong>
          December EBITDA: ${fmtProfit(dec.ebitda)} on ${fmt(dec.totalRevenue)} revenue (${fmtPct(dec.ebitdaMargin)} margin).
          Annualised December run rate: ${fmt(decAnnualized)}.
        </div>`
      : '';

    // ==========================================
    // 3. REVENUE BY MARKET
    // ==========================================
    let revMarketRows = '';
    monthly.forEach(m => {
      const ukRev = m.uk.rev.totalRevenue;
      const usRevGBP = m.us.revenueGBP;
      const ieRevGBP = m.ie.revenueGBP;
      const total = m.totalRevenue;
      revMarketRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmt(ukRev)}</td>
          <td>${fmt(usRevGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtUSD(m.us.revenueUSD)})</span></td>
          <td>${fmt(ieRevGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtEUR(m.ie.revenueEUR)})</span></td>
          <td><strong>${fmt(total)}</strong></td>
        </tr>
      `;
    });
    revMarketRows += `
      <tr class="total-row">
        <td><strong>${year} TOTAL</strong></td>
        <td><strong>${fmt(byMarket.uk.revenue)}</strong></td>
        <td><strong>${fmt(byMarket.us.revenueGBP)}</strong> <span style="color:#6b7280;font-size:11px;">(${fmtUSD(byMarket.us.revenueUSD)})</span></td>
        <td><strong>${fmt(byMarket.ireland.revenueGBP)}</strong> <span style="color:#6b7280;font-size:11px;">(${fmtEUR(byMarket.ireland.revenueEUR)})</span></td>
        <td><strong>${fmt(annual.totalRevenue)}</strong></td>
      </tr>
    `;

    const ukRevPct = annual.totalRevenue > 0 ? Math.round(byMarket.uk.revenue / annual.totalRevenue * 100) : 0;
    const usRevPct = annual.totalRevenue > 0 ? Math.round(byMarket.us.revenueGBP / annual.totalRevenue * 100) : 0;
    const ieRevPct = annual.totalRevenue > 0 ? Math.round(byMarket.ireland.revenueGBP / annual.totalRevenue * 100) : 0;

    const revMarketHTML = `
      <h2>Revenue by Market</h2>
      <table>
        <thead><tr><th>Month</th><th>UK (GBP)</th><th>US (GBP)</th><th>Ireland (GBP)</th><th>Total</th></tr></thead>
        <tbody>${revMarketRows}</tbody>
      </table>
      <div class="highlight" style="margin-top: 15px;">
        <strong>Revenue mix:</strong> UK ${ukRevPct}% | US ${usRevPct}% | Ireland ${ieRevPct}%.
      </div>
    `;

    // ==========================================
    // 4. UK REVENUE BY CHANNEL
    // ==========================================
    let ukRevRows = '';
    monthly.forEach(m => {
      const r = m.uk.rev;
      ukRevRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmt(r.b2cAdhdRev)}</td>
          <td>${fmt(r.b2cAsdRev)}</td>
          <td>${fmt(r.nhsAdhdRev)}</td>
          <td>${fmt(r.nhsAsdRev)}</td>
          <td>${fmt(r.subscriptionRev)}</td>
          <td><strong>${fmt(r.totalRevenue)}</strong></td>
        </tr>
      `;
    });
    ukRevRows += `
      <tr class="total-row">
        <td><strong>TOTAL</strong></td>
        <td><strong>${fmt(monthly.reduce((s,m) => s + m.uk.rev.b2cAdhdRev, 0))}</strong></td>
        <td><strong>${fmt(monthly.reduce((s,m) => s + m.uk.rev.b2cAsdRev, 0))}</strong></td>
        <td><strong>${fmt(monthly.reduce((s,m) => s + m.uk.rev.nhsAdhdRev, 0))}</strong></td>
        <td><strong>${fmt(monthly.reduce((s,m) => s + m.uk.rev.nhsAsdRev, 0))}</strong></td>
        <td><strong>${fmt(monthly.reduce((s,m) => s + m.uk.rev.subscriptionRev, 0))}</strong></td>
        <td><strong>${fmt(byMarket.uk.revenue)}</strong></td>
      </tr>
    `;

    const ukRevHTML = `
      <h2>UK Revenue by Channel</h2>
      <table>
        <thead><tr><th>Month</th><th>B2C ADHD</th><th>B2C ASD</th><th>NHS ADHD</th><th>NHS ASD</th><th>Subscriptions</th><th>UK Total</th></tr></thead>
        <tbody>${ukRevRows}</tbody>
      </table>
    `;

    // ==========================================
    // 5. US REVENUE BY CHANNEL (USD)
    // ==========================================
    let usRevRows = '';
    monthly.forEach(m => {
      const r = m.us.rev;
      usRevRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmtUSD(r.selfpayAdhdRev)}</td>
          <td>${fmtUSD(r.selfpayAsdRev)}</td>
          <td>${fmtUSD(r.innetworkAdhdRev)}</td>
          <td>${fmtUSD(r.innetworkAsdRev)}</td>
          <td>${fmtUSD(r.oonAdhdRev)}</td>
          <td>${fmtUSD(r.oonAsdRev)}</td>
          <td>${fmtUSD(r.subscriptionRev)}</td>
          <td>${fmtUSD(r.totalRevenue)}</td>
          <td>${fmt(m.us.revenueGBP)}</td>
        </tr>
      `;
    });
    usRevRows += `
      <tr class="total-row">
        <td><strong>TOTAL</strong></td>
        <td><strong>${fmtUSD(monthly.reduce((s,m) => s + m.us.rev.selfpayAdhdRev, 0))}</strong></td>
        <td><strong>${fmtUSD(monthly.reduce((s,m) => s + m.us.rev.selfpayAsdRev, 0))}</strong></td>
        <td><strong>${fmtUSD(monthly.reduce((s,m) => s + m.us.rev.innetworkAdhdRev, 0))}</strong></td>
        <td><strong>${fmtUSD(monthly.reduce((s,m) => s + m.us.rev.innetworkAsdRev, 0))}</strong></td>
        <td><strong>${fmtUSD(monthly.reduce((s,m) => s + m.us.rev.oonAdhdRev, 0))}</strong></td>
        <td><strong>${fmtUSD(monthly.reduce((s,m) => s + m.us.rev.oonAsdRev, 0))}</strong></td>
        <td><strong>${fmtUSD(monthly.reduce((s,m) => s + m.us.rev.subscriptionRev, 0))}</strong></td>
        <td><strong>${fmtUSD(byMarket.us.revenueUSD)}</strong></td>
        <td><strong>${fmt(byMarket.us.revenueGBP)}</strong></td>
      </tr>
    `;

    const usRevHTML = `
      <h2>US Revenue by Channel (USD)</h2>
      <p style="color: #6b7280; margin-bottom: 10px;">${year === 2027 ? 'US launches April 2027. Jan-Mar shows zero revenue (pre-launch setup costs only).' : 'Full-year US operations across 15-20 states.'}</p>
      <table style="font-size: 13px;">
        <thead><tr><th>Month</th><th>Self-Pay ADHD</th><th>Self-Pay ASD</th><th>In-Network ADHD</th><th>In-Network ASD</th><th>OON ADHD</th><th>OON ASD</th><th>Subscriptions</th><th>US Total (USD)</th><th>US Total (GBP)</th></tr></thead>
        <tbody>${usRevRows}</tbody>
      </table>
    `;

    // ==========================================
    // 6. IRELAND REVENUE (EUR)
    // ==========================================
    let ieRevRows = '';
    monthly.forEach(m => {
      const r = m.ie.rev;
      ieRevRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmtEUR(r.adhdRev)}</td>
          <td>${fmtEUR(r.asdRev)}</td>
          <td>${fmtEUR(r.totalRevenue)}</td>
          <td>${fmt(m.ie.revenueGBP)}</td>
        </tr>
      `;
    });
    ieRevRows += `
      <tr class="total-row">
        <td><strong>TOTAL</strong></td>
        <td><strong>${fmtEUR(monthly.reduce((s,m) => s + m.ie.rev.adhdRev, 0))}</strong></td>
        <td><strong>${fmtEUR(monthly.reduce((s,m) => s + m.ie.rev.asdRev, 0))}</strong></td>
        <td><strong>${fmtEUR(byMarket.ireland.revenueEUR)}</strong></td>
        <td><strong>${fmt(byMarket.ireland.revenueGBP)}</strong></td>
      </tr>
    `;

    const ieRevHTML = `
      <h2>Ireland Revenue (EUR)</h2>
      <p style="color: #6b7280; margin-bottom: 10px;">${year === 2027 ? 'Ireland launches July 2027. B2C only, no NHS equivalent.' : 'Full-year Ireland operations.'}</p>
      <table>
        <thead><tr><th>Month</th><th>B2C ADHD</th><th>B2C ASD</th><th>IE Total (EUR)</th><th>IE Total (GBP)</th></tr></thead>
        <tbody>${ieRevRows}</tbody>
      </table>
    `;

    // ==========================================
    // 7. COST BREAKDOWN BY MARKET
    // ==========================================
    let costRows = '';
    monthly.forEach(m => {
      costRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmt(m.uk.cogs.total)}</td>
          <td>${fmt(m.us.cogsGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtUSD(m.us.cogsUSD)})</span></td>
          <td>${fmt(m.ie.cogsGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtEUR(m.ie.cogsEUR)})</span></td>
          <td><strong>${fmt(m.totalCogs)}</strong></td>
        </tr>
      `;
    });
    costRows += `
      <tr class="total-row">
        <td><strong>TOTAL</strong></td>
        <td><strong>${fmt(byMarket.uk.cogs)}</strong></td>
        <td><strong>${fmt(byMarket.us.cogsGBP)}</strong></td>
        <td><strong>${fmt(byMarket.ireland.cogsGBP)}</strong></td>
        <td><strong>${fmt(annual.totalCogs)}</strong></td>
      </tr>
    `;

    const costHTML = `
      <h2>COGS by Market</h2>
      <table>
        <thead><tr><th>Month</th><th>UK COGS</th><th>US COGS (GBP)</th><th>Ireland COGS (GBP)</th><th>Total COGS</th></tr></thead>
        <tbody>${costRows}</tbody>
      </table>
    `;

    // ==========================================
    // 8. OPEX BY MARKET
    // ==========================================
    let opexRows = '';
    monthly.forEach(m => {
      opexRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmt(m.uk.opex)}</td>
          <td>${fmt(m.us.opexGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtUSD(m.us.opexUSD)})</span></td>
          <td>${fmt(m.ie.opexGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtEUR(m.ie.opexEUR)})</span></td>
          <td><strong>${fmt(m.totalOpex)}</strong></td>
        </tr>
      `;
    });
    opexRows += `
      <tr class="total-row">
        <td><strong>TOTAL</strong></td>
        <td><strong>${fmt(byMarket.uk.opex)}</strong></td>
        <td><strong>${fmt(byMarket.us.opexGBP)}</strong></td>
        <td><strong>${fmt(byMarket.ireland.opexGBP)}</strong></td>
        <td><strong>${fmt(annual.totalOpex)}</strong></td>
      </tr>
    `;

    const opexHTML = `
      <h2>Operating Expenses by Market</h2>
      <table>
        <thead><tr><th>Month</th><th>UK OpEx</th><th>US OpEx (GBP)</th><th>Ireland OpEx (GBP)</th><th>Total OpEx</th></tr></thead>
        <tbody>${opexRows}</tbody>
      </table>
    `;

    // ==========================================
    // 9. TAX BY JURISDICTION
    // ==========================================
    let taxRows = '';
    monthly.forEach(m => {
      taxRows += `
        <tr>
          <td><strong>${m.month}</strong></td>
          <td>${fmt(m.uk.tax)}</td>
          <td>${fmt(m.us.taxGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtUSD(m.us.taxUSD)})</span></td>
          <td>${fmt(m.ie.taxGBP)} <span style="color:#6b7280;font-size:11px;">(${fmtEUR(m.ie.taxEUR)})</span></td>
          <td><strong>${fmt(m.tax)}</strong></td>
        </tr>
      `;
    });
    taxRows += `
      <tr class="total-row">
        <td><strong>TOTAL</strong></td>
        <td><strong>${fmt(byMarket.uk.tax)}</strong></td>
        <td><strong>${fmt(byMarket.us.taxGBP)}</strong></td>
        <td><strong>${fmt(byMarket.ireland.taxGBP)}</strong></td>
        <td><strong>${fmt(annual.tax)}</strong></td>
      </tr>
    `;

    const taxHTML = `
      <h2>Tax by Jurisdiction</h2>
      <table>
        <thead><tr><th>Month</th><th>UK (25%)</th><th>US (27%)</th><th>Ireland (12.5%)</th><th>Total Tax</th></tr></thead>
        <tbody>${taxRows}</tbody>
      </table>
    `;

    // ==========================================
    // 10. US UNIT ECONOMICS TABLE
    // ==========================================
    const usUE = this.data.us_market.unit_economics;
    const usUERows = [
      ['Self-Pay ADHD', usUE.selfpay_adhd],
      ['Self-Pay ASD', usUE.selfpay_asd],
      ['In-Network ADHD', usUE.innetwork_adhd],
      ['In-Network ASD', usUE.innetwork_asd],
      ['Out-of-Network ADHD', usUE.oon_adhd],
      ['Out-of-Network ASD', usUE.oon_asd],
      ['Monthly Subscription', usUE.subscription]
    ].map(([name, ue]) => `
      <tr>
        <td>${name}</td>
        <td>${fmtUSD(ue.revenue)}</td>
        <td>${fmtUSD(ue.clinical_costs)}</td>
        <td>${fmtUSD(ue.tech_admin)}</td>
        <td>${fmtUSD(ue.cac)}</td>
        <td>${fmtUSD(ue.total_costs)}</td>
        <td>${fmtProfitUSD(ue.gross_profit)}</td>
        <td>${fmtPct(ue.margin)}</td>
      </tr>
    `).join('');

    const usUEHTML = `
      <h2>US Unit Economics (USD)</h2>
      <table>
        <thead><tr><th>Channel</th><th>Revenue</th><th>Clinical</th><th>Tech/Admin</th><th>CAC</th><th>Total Cost</th><th>Profit</th><th>Margin</th></tr></thead>
        <tbody>${usUERows}</tbody>
      </table>
    `;

    // ==========================================
    // 11. IRELAND UNIT ECONOMICS TABLE
    // ==========================================
    const ieUE = this.data.ireland_market.unit_economics;
    const ieUERows = [
      ['B2C ADHD', ieUE.b2c_adhd],
      ['B2C ASD', ieUE.b2c_asd]
    ].map(([name, ue]) => `
      <tr>
        <td>${name}</td>
        <td>${fmtEUR(ue.revenue)}</td>
        <td>${fmtEUR(ue.clinical_costs)}</td>
        <td>${fmtEUR(ue.tech_admin)}</td>
        <td>${fmtEUR(ue.cac)}</td>
        <td>${fmtEUR(ue.total_costs)}</td>
        <td>${fmtProfitEUR(ue.gross_profit)}</td>
        <td>${fmtPct(ue.margin)}</td>
      </tr>
    `).join('');

    const ieUEHTML = `
      <h2>Ireland Unit Economics (EUR)</h2>
      <table>
        <thead><tr><th>Service</th><th>Revenue</th><th>Clinical</th><th>Tech/Admin</th><th>CAC</th><th>Total Cost</th><th>Profit</th><th>Margin</th></tr></thead>
        <tbody>${ieUERows}</tbody>
      </table>
    `;

    // ==========================================
    // 12. UK UNIT ECONOMICS SUMMARY
    // ==========================================
    const ukUEData = [
      ['B2C ADHD (Complete)', this.data.unit_economics.b2c_adhd],
      ['B2C ASD', this.data.unit_economics.b2c_asd],
      ['NHS ADHD', this.data.unit_economics.nhs_adhd],
      ['NHS ASD', this.data.unit_economics.nhs_asd],
      ['Treatment Plan (6m)', this.data.unit_economics.adult_6m_plan]
    ];
    const ukUERows = ukUEData.map(([name, ue]) => `
      <tr>
        <td>${name}</td>
        <td>${fmt(ue.revenue)}</td>
        <td>${fmt(ue.clinical_costs)}</td>
        <td>${fmt(ue.tech_admin)}</td>
        <td>${fmt(ue.cac)}</td>
        <td>${fmt(ue.total_costs)}</td>
        <td>${fmtProfit(ue.gross_profit)}</td>
        <td>${fmtPct(ue.margin)}</td>
      </tr>
    `).join('');

    const ukUEHTML = `
      <h2>UK Unit Economics (GBP)</h2>
      <table>
        <thead><tr><th>Service</th><th>Revenue</th><th>Clinical</th><th>Tech/Admin</th><th>CAC</th><th>Total Cost</th><th>Profit</th><th>Margin</th></tr></thead>
        <tbody>${ukUERows}</tbody>
      </table>
    `;

    // ==========================================
    // 13. MODEL ASSUMPTIONS (structured tables)
    // ==========================================
    const assumptionsHTML = `
      <h2>Model Assumptions</h2>

      <h3>Pricing</h3>
      <table style="font-size: 13px;">
        <thead><tr><th>Market</th><th>Service</th><th>Price</th><th>Currency</th></tr></thead>
        <tbody>
          <tr><td>UK</td><td>B2C ADHD Complete Care</td><td>${fmt(this.data.pricing.b2c_adhd_complete)}</td><td>GBP</td></tr>
          <tr><td>UK</td><td>B2C ASD Assessment</td><td>${fmt(this.data.pricing.b2c_asd)}</td><td>GBP</td></tr>
          <tr><td>UK</td><td>NHS ADHD</td><td>${fmt(this.data.pricing.nhs_adhd)}</td><td>GBP</td></tr>
          <tr><td>UK</td><td>NHS ASD</td><td>${fmt(this.data.pricing.nhs_asd)}</td><td>GBP</td></tr>
          <tr><td>UK</td><td>Treatment Plan (6m)</td><td>${fmt(this.data.pricing.subscription_6month)}</td><td>GBP</td></tr>
          <tr><td>US</td><td>Self-Pay ADHD</td><td>${fmtUSD(this.data.us_market.pricing.selfpay_adhd)}</td><td>USD</td></tr>
          <tr><td>US</td><td>Self-Pay ASD</td><td>${fmtUSD(this.data.us_market.pricing.selfpay_asd)}</td><td>USD</td></tr>
          <tr><td>US</td><td>In-Network ADHD</td><td>${fmtUSD(this.data.us_market.pricing.innetwork_adhd)}</td><td>USD</td></tr>
          <tr><td>US</td><td>In-Network ASD</td><td>${fmtUSD(this.data.us_market.pricing.innetwork_asd)}</td><td>USD</td></tr>
          <tr><td>US</td><td>Out-of-Network ADHD</td><td>${fmtUSD(this.data.us_market.pricing.oon_adhd)}</td><td>USD</td></tr>
          <tr><td>US</td><td>Out-of-Network ASD</td><td>${fmtUSD(this.data.us_market.pricing.oon_asd)}</td><td>USD</td></tr>
          <tr><td>US</td><td>Monthly Subscription</td><td>${fmtUSD(this.data.us_market.pricing.subscription_monthly)}/mo</td><td>USD</td></tr>
          <tr><td>Ireland</td><td>B2C ADHD</td><td>${fmtEUR(this.data.ireland_market.pricing.b2c_adhd)}</td><td>EUR</td></tr>
          <tr><td>Ireland</td><td>B2C ASD</td><td>${fmtEUR(this.data.ireland_market.pricing.b2c_asd)}</td><td>EUR</td></tr>
        </tbody>
      </table>

      <h3>Operating Assumptions</h3>
      <table style="font-size: 13px;">
        <thead><tr><th>Parameter</th><th>Value</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>USD/GBP planning rate</td><td>0.79</td><td>1 USD = 0.79 GBP</td></tr>
          <tr><td>EUR/GBP planning rate</td><td>0.86</td><td>1 EUR = 0.86 GBP</td></tr>
          <tr><td>UK corporation tax</td><td>25%</td><td>From April 2023</td></tr>
          <tr><td>US effective tax rate</td><td>27%</td><td>21% federal + ~6% state blend</td></tr>
          <tr><td>Ireland corporation tax</td><td>12.5%</td><td>Standard Irish rate</td></tr>
          <tr><td>US subscription take rate</td><td>60%</td><td>ADHD patients converting to monthly management</td></tr>
          <tr><td>US avg retention</td><td>14 months</td><td>7.1% monthly churn</td></tr>
          <tr><td>UK subscription take rate</td><td>50%</td><td>From renewal pipeline at ${fmt(this.data.pricing.subscription_6month)}/6mo</td></tr>
          <tr><td>Series A</td><td>${fmt(this.data.funding_rounds.series_a.amount_gbp)}</td><td>${this.data.funding_rounds.series_a.date} (${this.data.funding_rounds.series_a.status})</td></tr>
          <tr><td>Series B</td><td>${fmt(this.data.funding_rounds.series_b.amount_gbp)}</td><td>${this.data.funding_rounds.series_b.date} (${this.data.funding_rounds.series_b.status}) -- primarily funds US market entry</td></tr>
          <tr><td>US market launch</td><td>April ${year === 2027 ? '2027' : '(launched 2027)'}</td><td>Self-pay first. Credentialing takes 90-180 days, so insurance panels come online from May</td></tr>
          <tr><td>Ireland market launch</td><td>July ${year === 2027 ? '2027' : '(launched 2027)'}</td><td>B2C only, no NHS equivalent</td></tr>
          <tr><td>US staffing model</td><td>PMHNP-heavy</td><td>PMHNPs at $130-165K/yr are 50-60% cheaper than psychiatrists at $260-305K/yr. Cerebral and Done both scaled with NPs</td></tr>
          <tr><td>US marketing approach</td><td>Lean (38% of OpEx)</td><td>Talkspace spent 61-89% of revenue on S&M during growth. Cerebral burned $8-12M/mo at peak. Our model is intentionally leaner</td></tr>
          <tr><td>Q1 2027 setup costs</td><td>$200-350K one-time</td><td>MSO/PC legal ($50-100K), state licensing 10 states ($40K), DEA $888/state/prescriber ($44K), HIPAA+SOC2 ($50-80K)</td></tr>
        </tbody>
      </table>

      <h3>US OpEx allocation (benchmarked against Cerebral / Talkspace)</h3>
      <p style="color: #6b7280; margin-bottom: 10px;">Series B (${fmt(this.data.funding_rounds.series_b.amount_gbp)}) primarily funds US market entry. Talkspace spent 61-89% of revenue on S&M during growth. Cerebral burned $25-40M/month at peak with 5,000 staff. This model uses a lean PMHNP-heavy approach at ~$4.8M/yr (2027) and ~$8.6M/yr (2028).</p>
      <table style="font-size: 13px;">
        <thead><tr><th>Category</th><th>% of US OpEx</th><th>Steady-state $/mo</th><th>Detail</th></tr></thead>
        <tbody>
          <tr><td>Clinical staff</td><td>36%</td><td>~$140K</td><td>10 PMHNPs @ $140K/yr + 1 supervising MD @ $280K/yr (PMHNPs are 50-60% cheaper than psychiatrists)</td></tr>
          <tr><td>Marketing / acquisition</td><td>38%</td><td>~$150K</td><td>30-40% of revenue. Cerebral spent $8-12M/mo at peak; Talkspace CAC was $297-449/member</td></tr>
          <tr><td>G&A</td><td>10%</td><td>~$40K</td><td>US operations lead, legal counsel, virtual office</td></tr>
          <tr><td>Technology</td><td>5%</td><td>~$20K</td><td>HIPAA-compliant infrastructure, EHR integration, platform hosting</td></tr>
          <tr><td>Licensing & compliance</td><td>4%</td><td>~$15K</td><td>State licensing ($500/state avg), DEA ($888/state/prescriber), Joint Commission</td></tr>
          <tr><td>Billing / RCM</td><td>4%</td><td>~$15K</td><td>Revenue cycle management at 3-5% of collections</td></tr>
          <tr><td>Credentialing</td><td>2%</td><td>~$5K</td><td>Insurance panel credentialing ($300-600/payer), 90-180 day timeline</td></tr>
          <tr><td>Malpractice insurance</td><td>1%</td><td>~$2K</td><td>$375-1,000/yr per PMHNP, $5-12K/yr per psychiatrist</td></tr>
        </tbody>
      </table>

      <h3>US setup costs (one-time, amortised into Q1 2027 OpEx)</h3>
      <table style="font-size: 13px;">
        <thead><tr><th>Item</th><th>Cost</th><th>Notes</th></tr></thead>
        <tbody>
          <tr><td>MSO / PC legal structure</td><td>$50,000-$100,000</td><td>Required in most states (corporate practice of medicine doctrine)</td></tr>
          <tr><td>State licensing (10 states, 5 providers)</td><td>~$40,000</td><td>$500 avg per state per provider + IMLC at $700</td></tr>
          <tr><td>DEA registration (10 states, 5 prescribers)</td><td>~$44,000</td><td>$888 per state per prescriber for Schedule II (ADHD meds)</td></tr>
          <tr><td>HIPAA + SOC 2 compliance</td><td>$50,000-$80,000</td><td>Risk assessment, audit, ongoing monitoring</td></tr>
          <tr><td>Insurance credentialing (initial batch)</td><td>$15,000-$30,000</td><td>$300-600 per payer x 5 providers x 5-10 payers</td></tr>
        </tbody>
      </table>

      <h3>Volume Assumptions (${year}, ${scenario || 'realistic'} scenario)</h3>
      <table style="font-size: 13px;">
        <thead><tr><th>Market</th><th>Annual Patients</th><th>Trajectory</th></tr></thead>
        <tbody>
          <tr><td>UK</td><td>${byMarket.uk.patients.toLocaleString()}</td><td>Continued NHS scale-up, ~70:30 NHS:B2C mix</td></tr>
          <tr><td>US</td><td>${byMarket.us.patients.toLocaleString()}</td><td>${year === 2027 ? 'Ramp from April, self-pay first, insurance panels from May' : 'Full year, 15-20 state coverage'}</td></tr>
          <tr><td>Ireland</td><td>${byMarket.ireland.patients.toLocaleString()}</td><td>${year === 2027 ? 'Ramp from July, B2C only' : 'Full year B2C operations'}</td></tr>
          <tr><td><strong>Total</strong></td><td><strong>${annual.patients.toLocaleString()}</strong></td><td></td></tr>
        </tbody>
      </table>
    `;

    return summaryHTML + pnlTableHTML + ebitdaNote + revMarketHTML + ukRevHTML + usRevHTML + ieRevHTML + costHTML + opexHTML + taxHTML + usUEHTML + ieUEHTML + ukUEHTML + assumptionsHTML;
  }

  // Render 3-Statement Financial Model
  renderThreeStatementModel(scenario = null) {
    const projections = this.calc.generate2026Projections(scenario);
    
    // Calculate monthly financial statements
    let monthlyData = [];
    let cumulativeCash = 250000; // Starting with £250k seed funding
    let cumulativeEquity = 250000;
    let cumulativeRetainedEarnings = 0;
    
    projections.forEach((row, index) => {
      if (!row.isTotal) {
        // Income Statement Calculations
        // Use the exact same revenue calculation as projections table
        const revenue = this.calc.calculateMonthlyRevenue({
          b2c_adhd: row.b2c_adhd,
          b2c_asd: row.b2c_asd,
          nhs_adhd: row.nhs_adhd,
          nhs_asd: row.nhs_asd
        });
        const totalRevenue = revenue.total_revenue;
        const totalPatients = row.total_patients;
        
        // Cost of Goods Sold (Variable Costs) - use same calculation as projections
        const costs = this.calc.calculateMonthlyCosts({
          b2c_adhd: row.b2c_adhd,
          b2c_asd: row.b2c_asd,
          nhs_adhd: row.nhs_adhd,
          nhs_asd: row.nhs_asd
        });
        const totalCOGS = costs.total_costs;
        
        // Gross Profit
        const grossProfit = totalRevenue - totalCOGS;
        const grossMargin = totalRevenue > 0 ? grossProfit / totalRevenue : 0;
        
        // Operating Expenses (Fixed Costs)
        const insurance = this.data.operating_expenses.insurance;
        const cqcRegistration = this.data.operating_expenses.cqc_registration;
        
        // Office rent starts Jan 2026
        const officeRent = index >= 0 ? this.data.operating_expenses.office_rent.monthly_cost : 0;
        
        // Admin salaries start Jan 2026
        const adminSalaries = index >= 0 ? this.data.operating_expenses.admin_salaries.monthly_cost_total : 0;
        
        // Marketing and other operating expenses
        const marketingExpenses = Math.max(10000, totalRevenue * 0.15); // 15% of revenue or £10k minimum
        const otherOperatingExpenses = (insurance + cqcRegistration + officeRent + adminSalaries) * 0.15; // 15% overhead
        
        const totalOperatingExpenses = insurance + cqcRegistration + officeRent + adminSalaries + marketingExpenses + otherOperatingExpenses;
        
        // EBITDA and Net Income
        const ebitda = grossProfit - totalOperatingExpenses;
        const depreciation = 2000; // Monthly depreciation
        const ebit = ebitda - depreciation;
        const interestExpense = 0; // No debt initially
        const taxRate = 0.19; // UK corporation tax rate
        const taxExpense = Math.max(0, ebit * taxRate);
        const netIncome = ebit - taxExpense;
        
        // Balance Sheet Calculations
        // Assets
        const cashFromOperations = netIncome + depreciation; // Simplified cash flow
        cumulativeCash += cashFromOperations;
        
        const accountsReceivable = totalRevenue * 0.25; // 1 week of sales
        const equipment = Math.max(50000 - (index * depreciation), 10000); // Depreciating equipment
        const totalAssets = cumulativeCash + accountsReceivable + equipment;
        
        // Liabilities
        const accountsPayable = totalCOGS * 0.15; // 15% of COGS
        const accruedExpenses = totalOperatingExpenses * 0.20; // 20% of OpEx
        const totalLiabilities = accountsPayable + accruedExpenses;
        
        // Equity
        cumulativeRetainedEarnings += netIncome;
        const totalEquity = cumulativeEquity + cumulativeRetainedEarnings;
        
        // Cash Flow Statement
        const operatingCashFlow = netIncome + depreciation + (accountsPayable - (index > 0 ? monthlyData[index-1].accountsPayable : 0));
        const investingCashFlow = index === 0 ? -50000 : 0; // Initial equipment purchase
        const financingCashFlow = index === 0 ? 250000 : 0; // Initial funding
        const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;
        
        monthlyData.push({
          month: row.month,
          // Income Statement
          totalRevenue,
          totalCOGS,
          grossProfit,
          grossMargin,
          totalOperatingExpenses,
          ebitda,
          ebit,
          taxExpense,
          netIncome,
          // Balance Sheet
          cash: cumulativeCash,
          accountsReceivable,
          equipment,
          totalAssets,
          accountsPayable,
          accruedExpenses,
          totalLiabilities,
          equity: cumulativeEquity,
          retainedEarnings: cumulativeRetainedEarnings,
          totalEquity,
          // Cash Flow
          operatingCashFlow,
          investingCashFlow,
          financingCashFlow,
          netCashFlow
        });
      }
    });
    
    return {
      incomeStatement: this.renderIncomeStatement(monthlyData),
      balanceSheet: this.renderBalanceSheet(monthlyData),
      cashFlow: this.renderCashFlowStatement(monthlyData)
    };
  }

  // Render Income Statement
  renderIncomeStatement(monthlyData) {
    let tableRows = '';
    
    monthlyData.forEach(data => {
      const cellClass = 'class="projection"';
      
      tableRows += `
        <tr>
          <td><strong>${data.month}</strong></td>
          <td ${cellClass}>${this.calc.formatCurrency(data.totalRevenue)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.totalCOGS)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.grossProfit)}</td>
          <td ${cellClass}>${this.calc.formatPercentage(data.grossMargin)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.totalOperatingExpenses)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.ebitda)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.netIncome)}</td>
        </tr>
      `;
    });
    
    // Add annual totals
    const annualTotals = monthlyData.reduce((acc, data) => ({
      totalRevenue: acc.totalRevenue + data.totalRevenue,
      totalCOGS: acc.totalCOGS + data.totalCOGS,
      grossProfit: acc.grossProfit + data.grossProfit,
      totalOperatingExpenses: acc.totalOperatingExpenses + data.totalOperatingExpenses,
      ebitda: acc.ebitda + data.ebitda,
      netIncome: acc.netIncome + data.netIncome
    }), { totalRevenue: 0, totalCOGS: 0, grossProfit: 0, totalOperatingExpenses: 0, ebitda: 0, netIncome: 0 });
    
    const annualGrossMargin = annualTotals.totalRevenue > 0 ? annualTotals.grossProfit / annualTotals.totalRevenue : 0;
    
    tableRows += `
      <tr class="total-row">
        <td><strong>Annual Total</strong></td>
        <td><strong>${this.calc.formatCurrency(annualTotals.totalRevenue)}</strong></td>
        <td><strong>${this.calc.formatCurrency(annualTotals.totalCOGS)}</strong></td>
        <td><strong>${this.calc.formatCurrency(annualTotals.grossProfit)}</strong></td>
        <td><strong>${this.calc.formatPercentage(annualGrossMargin)}</strong></td>
        <td><strong>${this.calc.formatCurrency(annualTotals.totalOperatingExpenses)}</strong></td>
        <td><strong>${this.calc.formatCurrency(annualTotals.ebitda)}</strong></td>
        <td><strong>${this.calc.formatCurrency(annualTotals.netIncome)}</strong></td>
      </tr>
    `;

    return `
      <h3>Income Statement</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Revenue</th>
            <th>Cost of Goods Sold</th>
            <th>Gross Profit</th>
            <th>Gross Margin</th>
            <th>Operating Expenses</th>
            <th>EBITDA</th>
            <th>Net Income</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

  // Render Balance Sheet
  renderBalanceSheet(monthlyData) {
    let tableRows = '';
    
    monthlyData.forEach(data => {
      const cellClass = 'class="projection"';
      
      tableRows += `
        <tr>
          <td><strong>${data.month}</strong></td>
          <td ${cellClass}>${this.calc.formatCurrency(data.cash)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.accountsReceivable)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.equipment)}</td>
          <td ${cellClass}><strong>${this.calc.formatCurrency(data.totalAssets)}</strong></td>
          <td ${cellClass}>${this.calc.formatCurrency(data.accountsPayable)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.accruedExpenses)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.totalLiabilities)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.equity)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.retainedEarnings)}</td>
          <td ${cellClass}><strong>${this.calc.formatCurrency(data.totalEquity)}</strong></td>
        </tr>
      `;
    });

    return `
      <h3>Balance Sheet</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Cash</th>
            <th>Accounts Receivable</th>
            <th>Equipment (Net)</th>
            <th>Total Assets</th>
            <th>Accounts Payable</th>
            <th>Accrued Expenses</th>
            <th>Total Liabilities</th>
            <th>Share Capital</th>
            <th>Retained Earnings</th>
            <th>Total Equity</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
    `;
  }

  // Render Cash Flow Statement
  renderCashFlowStatement(monthlyData) {
    let tableRows = '';
    
    monthlyData.forEach(data => {
      const cellClass = 'class="projection"';
      
      tableRows += `
        <tr>
          <td><strong>${data.month}</strong></td>
          <td ${cellClass}>${this.calc.formatCurrency(data.netIncome)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.operatingCashFlow)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.investingCashFlow)}</td>
          <td ${cellClass}>${this.calc.formatCurrency(data.financingCashFlow)}</td>
          <td ${cellClass}><strong>${this.calc.formatCurrency(data.netCashFlow)}</strong></td>
          <td ${cellClass}><strong>${this.calc.formatCurrency(data.cash)}</strong></td>
        </tr>
      `;
    });

    return `
      <h3>Cash Flow Statement</h3>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Net Income</th>
            <th>Operating Cash Flow</th>
            <th>Investing Cash Flow</th>
            <th>Financing Cash Flow</th>
            <th>Net Cash Flow</th>
            <th>Ending Cash Balance</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="highlight" style="margin-top: 15px;">
        <strong>💰 Key Insights:</strong> 3-statement model shows complete financial picture with revenue growth, profitability progression, balance sheet strength, and cash generation. Model assumes £250k initial funding, UK tax rates, and healthcare industry working capital patterns.
      </div>
    `;
  }

  // Render titration tracking table
  renderTitrationTrackingTable(scenario = null) {
    const projections = this.calc.generate2026Projections(scenario);
    const titrationRate = 0.90; // 90% of ADHD patients start titration
    const titrationDuration = 3; // 3 months
    const scaAcceptanceRate = 0.50; // 50% accepted to shared care
    const prescriberCapacity = 462; // appointments per month per prescriber
    
    let titrationData = [];
    let activeTitrationCohorts = []; // Track cohorts by start month
    let cumulativeStablePatients = 0;
    
    projections.forEach((row, index) => {
      if (!row.isTotal) {
        // New ADHD patients starting titration this month
        const newAdhdPatients = row.b2c_adhd + row.nhs_adhd;
        const newTitrationPatients = Math.round(newAdhdPatients * titrationRate);
        
        // Add new cohort
        if (newTitrationPatients > 0) {
          activeTitrationCohorts.push({
            startMonth: row.month,
            startIndex: index,
            patients: newTitrationPatients,
            monthsRemaining: titrationDuration
          });
        }
        
        // Update existing cohorts
        let currentTitrationPatients = 0;
        let completingThisMonth = 0;
        
        activeTitrationCohorts = activeTitrationCohorts.map(cohort => {
          if (cohort.monthsRemaining > 0) {
            currentTitrationPatients += cohort.patients;
            if (cohort.monthsRemaining === 1) {
              completingThisMonth += cohort.patients;
            }
            return { ...cohort, monthsRemaining: cohort.monthsRemaining - 1 };
          }
          return cohort;
        }).filter(cohort => cohort.monthsRemaining >= 0);
        
        // Calculate discharges and stable patients
        const dischargedToSCA = Math.round(completingThisMonth * scaAcceptanceRate);
        const newStablePatients = completingThisMonth - dischargedToSCA;
        cumulativeStablePatients += newStablePatients;
        
        const totalActivePatients = currentTitrationPatients + cumulativeStablePatients;
        const prescribersNeeded = Math.ceil(totalActivePatients / prescriberCapacity);
        
        titrationData.push({
          month: row.month,
          newAdhdPatients: newAdhdPatients,
          newTitrationStarts: newTitrationPatients,
          activeTitrationPatients: currentTitrationPatients,
          completingTitration: completingThisMonth,
          dischargedToSCA: dischargedToSCA,
          newStablePatients: newStablePatients,
          cumulativeStablePatients: cumulativeStablePatients,
          totalActivePatients: totalActivePatients,
          prescribersNeeded: prescribersNeeded
        });
      }
    });
    
    let tableRows = '';
    titrationData.forEach(data => {
      const cellClass = 'class="projection"';
      
      tableRows += `
        <tr>
          <td><strong>${data.month}</strong></td>
          <td ${cellClass}>${data.newAdhdPatients}</td>
          <td ${cellClass}>${data.newTitrationStarts}</td>
          <td ${cellClass}>${data.activeTitrationPatients}</td>
          <td ${cellClass}>${data.completingTitration}</td>
          <td ${cellClass}>${data.dischargedToSCA}</td>
          <td ${cellClass}>${data.newStablePatients}</td>
          <td ${cellClass}>${data.cumulativeStablePatients}</td>
          <td ${cellClass}><strong>${data.totalActivePatients}</strong></td>
          <td ${cellClass}><strong>${data.prescribersNeeded}</strong></td>
        </tr>
      `;
    });
    
    // Add annual totals
    const totals = titrationData.reduce((acc, data) => ({
      newAdhdPatients: acc.newAdhdPatients + data.newAdhdPatients,
      newTitrationStarts: acc.newTitrationStarts + data.newTitrationStarts,
      completingTitration: acc.completingTitration + data.completingTitration,
      dischargedToSCA: acc.dischargedToSCA + data.dischargedToSCA,
      newStablePatients: acc.newStablePatients + data.newStablePatients,
      finalStablePatients: titrationData[titrationData.length - 1].cumulativeStablePatients,
      finalActivePatients: titrationData[titrationData.length - 1].totalActivePatients,
      finalPrescribersNeeded: titrationData[titrationData.length - 1].prescribersNeeded
    }), { newAdhdPatients: 0, newTitrationStarts: 0, completingTitration: 0, dischargedToSCA: 0, newStablePatients: 0, finalStablePatients: 0, finalActivePatients: 0, finalPrescribersNeeded: 0 });
    
    tableRows += `
      <tr class="total-row">
        <td><strong>Annual Total</strong></td>
        <td><strong>${totals.newAdhdPatients.toLocaleString()}</strong></td>
        <td><strong>${totals.newTitrationStarts.toLocaleString()}</strong></td>
        <td><strong>-</strong></td>
        <td><strong>${totals.completingTitration.toLocaleString()}</strong></td>
        <td><strong>${totals.dischargedToSCA.toLocaleString()}</strong></td>
        <td><strong>${totals.newStablePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalStablePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalActivePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalPrescribersNeeded.toLocaleString()}</strong></td>
      </tr>
    `;

    return `
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>New ADHD Patients</th>
            <th>Starting Titration</th>
            <th>Active in Titration</th>
            <th>Completing Titration</th>
            <th>Discharged to SCA</th>
            <th>New Stable Patients</th>
            <th>Cumulative Stable</th>
            <th>Total Active Patients</th>
            <th>Prescribers Needed</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="highlight" style="margin-top: 15px;">
        <strong>💊 Titration Flow:</strong> ${Math.round(titrationRate * 100)}% of ADHD patients start ${titrationDuration}-month medication titration. After completion, ${Math.round(scaAcceptanceRate * 100)}% are discharged to GP with Shared Care Agreement, ${Math.round((1-scaAcceptanceRate) * 100)}% remain as stable patients under our ongoing care. 1 prescriber handles ${prescriberCapacity} appointments/month.
      </div>
    `;
  }

  // Render HR planning table
  renderHRPlanningTable(scenario = null) {
    const projections = this.calc.generate2026Projections(scenario);
    const clinicianCapacity = 80; // assessments per month per clinician
    const adminRatio = 10; // 1 admin per 10 clinicians
    
    // Use clinical costs from unit economics (£450 per assessment)
    const clinicalCostPerAssessment = this.data.unit_economics.b2c_adhd.clinical_costs;
    const adminCostPerClinicianMonth = 2917; // £35k/year ÷ 12 months
    
    let tableRows = '';
    
    projections.forEach(row => {
      if (!row.isTotal) {
        // Calculate required clinicians based on total patients
        const totalAssessments = row.total_patients;
        const cliniciansFullTime = Math.ceil(totalAssessments / clinicianCapacity);
        const cliniciansPartTime = Math.ceil(totalAssessments / (clinicianCapacity / 2)); // Part-time = half capacity
        
        // Scale to 5 admins from July onwards
        const monthsNeedingFiveAdmins = ['July', 'August', 'September', 'October', 'November', 'December'];
        let adminNeeded;
        if (monthsNeedingFiveAdmins.includes(row.month)) {
          adminNeeded = 5;
        } else {
          adminNeeded = Math.ceil(cliniciansFullTime / adminRatio);
        }
        
        // Clinical ops managers: 1 until June, then 2 from July onwards
        let clinicalOpsManagers;
        if (monthsNeedingFiveAdmins.includes(row.month)) {
          clinicalOpsManagers = 2;
        } else {
          clinicalOpsManagers = 1;
        }
        
        const totalStaffFullTime = cliniciansFullTime + adminNeeded + clinicalOpsManagers;
        const totalStaffPartTime = cliniciansPartTime + adminNeeded + clinicalOpsManagers;
        
        // Calculate costs using unit economics
        const clinicianMonthlyCost = totalAssessments * clinicalCostPerAssessment;
        const adminMonthlyCost = adminNeeded * adminCostPerClinicianMonth;
        const clinicalOpsManagerCost = clinicalOpsManagers * (55000 / 12); // £55k/year for ops managers
        const totalMonthlyCost = clinicianMonthlyCost + adminMonthlyCost + clinicalOpsManagerCost;
        
        const cellClass = 'class="projection"';
        
        tableRows += `
          <tr>
            <td><strong>${row.month}</strong></td>
            <td ${cellClass}>${totalAssessments}</td>
            <td ${cellClass}>${cliniciansFullTime}</td>
            <td ${cellClass}>${cliniciansPartTime}</td>
            <td ${cellClass}>${adminNeeded}</td>
            <td ${cellClass}>${clinicalOpsManagers}</td>
            <td ${cellClass}>${totalStaffFullTime}</td>
            <td ${cellClass}>${totalStaffPartTime}</td>
            <td ${cellClass}>${this.calc.formatCurrency(clinicianMonthlyCost)}</td>
            <td ${cellClass}>${this.calc.formatCurrency(adminMonthlyCost)}</td>
            <td ${cellClass}>${this.calc.formatCurrency(clinicalOpsManagerCost)}</td>
            <td ${cellClass}>${this.calc.formatCurrency(totalMonthlyCost)}</td>
          </tr>
        `;
      }
    });

    // Add totals row
    const totalRow = projections[projections.length - 1];
    if (totalRow && totalRow.isTotal) {
      const totalAssessments = totalRow.total_patients;
      const cliniciansFullTime = Math.ceil(totalAssessments / clinicianCapacity);
      const cliniciansPartTime = Math.ceil(totalAssessments / (clinicianCapacity / 2));
      
      // Calculate weighted average admin cost (5 admins from July onwards)
      // Jan-June: calculated based on ratio, July-Dec: 5 admins
      let totalAnnualAdminCost = 0;
      let totalAnnualOpsManagerCost = 0;
      projections.forEach(monthRow => {
        if (!monthRow.isTotal) {
          const monthsNeedingFiveAdmins = ['July', 'August', 'September', 'October', 'November', 'December'];
          const monthClinicians = Math.ceil(monthRow.total_patients / clinicianCapacity);
          
          // Admin staff calculation
          let monthAdmins;
          if (monthsNeedingFiveAdmins.includes(monthRow.month)) {
            monthAdmins = 5;
          } else {
            monthAdmins = Math.ceil(monthClinicians / adminRatio);
          }
          totalAnnualAdminCost += monthAdmins * adminCostPerClinicianMonth;
          
          // Clinical ops managers calculation
          let monthOpsManagers;
          if (monthsNeedingFiveAdmins.includes(monthRow.month)) {
            monthOpsManagers = 2;
          } else {
            monthOpsManagers = 1;
          }
          totalAnnualOpsManagerCost += monthOpsManagers * (55000 / 12);
        }
      });
      
      const adminNeeded = 5; // Show 5 as the target admin staff
      const clinicalOpsManagers = 2; // Show 2 as the target ops managers
      const totalStaffFullTime = cliniciansFullTime + adminNeeded + clinicalOpsManagers;
      const totalStaffPartTime = cliniciansPartTime + adminNeeded + clinicalOpsManagers;
      
      const annualClinicianCost = totalAssessments * clinicalCostPerAssessment;
      const totalAnnualCost = annualClinicianCost + totalAnnualAdminCost + totalAnnualOpsManagerCost;
      
      tableRows += `
        <tr class="total-row">
          <td><strong>Annual Total</strong></td>
          <td><strong>${totalAssessments.toLocaleString()}</strong></td>
          <td><strong>${cliniciansFullTime}</strong></td>
          <td><strong>${cliniciansPartTime}</strong></td>
          <td><strong>${adminNeeded}</strong></td>
          <td><strong>${clinicalOpsManagers}</strong></td>
          <td><strong>${totalStaffFullTime}</strong></td>
          <td><strong>${totalStaffPartTime}</strong></td>
          <td><strong>${this.calc.formatCurrency(annualClinicianCost)}</strong></td>
          <td><strong>${this.calc.formatCurrency(totalAnnualAdminCost)}</strong></td>
          <td><strong>${this.calc.formatCurrency(totalAnnualOpsManagerCost)}</strong></td>
          <td><strong>${this.calc.formatCurrency(totalAnnualCost)}</strong></td>
        </tr>
      `;
    }

    return `
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Assessments</th>
            <th>Clinicians (Full-Time)</th>
            <th>Clinicians (Part-Time)</th>
            <th>Admin Staff</th>
            <th>Clinical Ops Managers</th>
            <th>Total Staff (Full-Time)</th>
            <th>Total Staff (Part-Time)</th>
            <th>Clinical Costs</th>
            <th>Admin Costs</th>
            <th>Ops Manager Costs</th>
            <th>Total Staff Costs</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="highlight" style="margin-top: 15px;">
        <strong>📊 Assumptions:</strong> Full-time clinician handles ${clinicianCapacity} assessments/month, part-time handles ${clinicianCapacity/2} assessments/month. Admin staff scales to 5 from July onwards. Clinical ops managers: 1 until June, then 2 from July. Clinical costs: £${clinicalCostPerAssessment}/assessment from unit economics. Admin costs: £35k/year, Ops managers: £55k/year.
      </div>
    `;
  }

  // Render titration tracking table for Year 2 (2027)
  renderTitration2027TrackingTable() {
    const projections = this.data.annual_projections.year_2027.monthly_breakdown;
    const titrationRate = 0.90; // 90% of ADHD patients start titration
    const titrationDuration = 3; // 3 months
    const scaAcceptanceRate = 0.50; // 50% accepted to shared care
    const prescriberCapacity = 462; // appointments per month per prescriber
    
    let titrationData = [];
    let activeTitrationCohorts = []; // Track cohorts by start month
    let cumulativeStablePatients = 0;
    
    Object.entries(projections).forEach(([month, volumes], index) => {
      // New ADHD patients starting titration this month
      const newAdhdPatients = volumes.b2c_adhd + volumes.nhs_adhd;
      const newTitrationPatients = Math.round(newAdhdPatients * titrationRate);
      
      // Add new cohort
      if (newTitrationPatients > 0) {
        activeTitrationCohorts.push({
          startMonth: month,
          startIndex: index,
          patients: newTitrationPatients,
          monthsRemaining: titrationDuration
        });
      }
      
      // Update existing cohorts
      let currentTitrationPatients = 0;
      let completingThisMonth = 0;
      
      activeTitrationCohorts = activeTitrationCohorts.map(cohort => {
        if (cohort.monthsRemaining > 0) {
          currentTitrationPatients += cohort.patients;
          if (cohort.monthsRemaining === 1) {
            completingThisMonth += cohort.patients;
          }
          return { ...cohort, monthsRemaining: cohort.monthsRemaining - 1 };
        }
        return cohort;
      }).filter(cohort => cohort.monthsRemaining >= 0);
      
      // Calculate discharges and stable patients
      const dischargedToSCA = Math.round(completingThisMonth * scaAcceptanceRate);
      const newStablePatients = completingThisMonth - dischargedToSCA;
      cumulativeStablePatients += newStablePatients;
      
      const totalActivePatients = currentTitrationPatients + cumulativeStablePatients;
      const prescribersNeeded = Math.ceil(totalActivePatients / prescriberCapacity);
      
      titrationData.push({
        month: month.charAt(0).toUpperCase() + month.slice(1) + ' 2027',
        newAdhdPatients: newAdhdPatients,
        newTitrationStarts: newTitrationPatients,
        activeTitrationPatients: currentTitrationPatients,
        completingTitration: completingThisMonth,
        dischargedToSCA: dischargedToSCA,
        newStablePatients: newStablePatients,
        cumulativeStablePatients: cumulativeStablePatients,
        totalActivePatients: totalActivePatients,
        prescribersNeeded: prescribersNeeded
      });
    });
    
    let tableRows = '';
    titrationData.forEach(data => {
      const cellClass = 'class="projection"';
      
      tableRows += `
        <tr>
          <td><strong>${data.month}</strong></td>
          <td ${cellClass}>${data.newAdhdPatients.toLocaleString()}</td>
          <td ${cellClass}>${data.newTitrationStarts.toLocaleString()}</td>
          <td ${cellClass}>${data.activeTitrationPatients.toLocaleString()}</td>
          <td ${cellClass}>${data.completingTitration.toLocaleString()}</td>
          <td ${cellClass}>${data.dischargedToSCA.toLocaleString()}</td>
          <td ${cellClass}>${data.newStablePatients.toLocaleString()}</td>
          <td ${cellClass}>${data.cumulativeStablePatients.toLocaleString()}</td>
          <td ${cellClass}><strong>${data.totalActivePatients.toLocaleString()}</strong></td>
          <td ${cellClass}><strong>${data.prescribersNeeded.toLocaleString()}</strong></td>
        </tr>
      `;
    });
    
    // Add annual totals
    const totals = titrationData.reduce((acc, data) => ({
      newAdhdPatients: acc.newAdhdPatients + data.newAdhdPatients,
      newTitrationStarts: acc.newTitrationStarts + data.newTitrationStarts,
      completingTitration: acc.completingTitration + data.completingTitration,
      dischargedToSCA: acc.dischargedToSCA + data.dischargedToSCA,
      newStablePatients: acc.newStablePatients + data.newStablePatients,
      finalStablePatients: titrationData[titrationData.length - 1].cumulativeStablePatients,
      finalActivePatients: titrationData[titrationData.length - 1].totalActivePatients,
      finalPrescribersNeeded: titrationData[titrationData.length - 1].prescribersNeeded
    }), { newAdhdPatients: 0, newTitrationStarts: 0, completingTitration: 0, dischargedToSCA: 0, newStablePatients: 0, finalStablePatients: 0, finalActivePatients: 0, finalPrescribersNeeded: 0 });
    
    tableRows += `
      <tr class="total-row">
        <td><strong>YEAR 2 TOTAL</strong></td>
        <td><strong>${totals.newAdhdPatients.toLocaleString()}</strong></td>
        <td><strong>${totals.newTitrationStarts.toLocaleString()}</strong></td>
        <td><strong>-</strong></td>
        <td><strong>${totals.completingTitration.toLocaleString()}</strong></td>
        <td><strong>${totals.dischargedToSCA.toLocaleString()}</strong></td>
        <td><strong>${totals.newStablePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalStablePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalActivePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalPrescribersNeeded.toLocaleString()}</strong></td>
      </tr>
    `;

    return `
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>New ADHD Patients</th>
            <th>Starting Titration</th>
            <th>Active in Titration</th>
            <th>Completing Titration</th>
            <th>Discharged to SCA</th>
            <th>New Stable Patients</th>
            <th>Cumulative Stable</th>
            <th>Total Active Patients</th>
            <th>Prescribers Needed</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="highlight" style="margin-top: 15px;">
        <strong>💊 Year 2 Titration Flow:</strong> ${Math.round(titrationRate * 100)}% of ADHD patients start ${titrationDuration}-month medication titration. After completion, ${Math.round(scaAcceptanceRate * 100)}% are discharged to GP with Shared Care Agreement, ${Math.round((1-scaAcceptanceRate) * 100)}% remain as stable patients under our ongoing care. 1 prescriber handles ${prescriberCapacity} appointments/month.
      </div>
    `;
  }

  // Render titration tracking table for Year 3 (2028)
  renderTitration2028TrackingTable() {
    const projections = this.data.annual_projections.year_2028.monthly_breakdown;
    const titrationRate = 0.90; // 90% of ADHD patients start titration
    const titrationDuration = 3; // 3 months
    const scaAcceptanceRate = 0.50; // 50% accepted to shared care
    const prescriberCapacity = 462; // appointments per month per prescriber
    
    let titrationData = [];
    let activeTitrationCohorts = []; // Track cohorts by start month
    let cumulativeStablePatients = 0;
    
    Object.entries(projections).forEach(([month, volumes], index) => {
      // New ADHD patients starting titration this month
      const newAdhdPatients = volumes.b2c_adhd + volumes.nhs_adhd;
      const newTitrationPatients = Math.round(newAdhdPatients * titrationRate);
      
      // Add new cohort
      if (newTitrationPatients > 0) {
        activeTitrationCohorts.push({
          startMonth: month,
          startIndex: index,
          patients: newTitrationPatients,
          monthsRemaining: titrationDuration
        });
      }
      
      // Update existing cohorts
      let currentTitrationPatients = 0;
      let completingThisMonth = 0;
      
      activeTitrationCohorts = activeTitrationCohorts.map(cohort => {
        if (cohort.monthsRemaining > 0) {
          currentTitrationPatients += cohort.patients;
          if (cohort.monthsRemaining === 1) {
            completingThisMonth += cohort.patients;
          }
          return { ...cohort, monthsRemaining: cohort.monthsRemaining - 1 };
        }
        return cohort;
      }).filter(cohort => cohort.monthsRemaining >= 0);
      
      // Calculate discharges and stable patients
      const dischargedToSCA = Math.round(completingThisMonth * scaAcceptanceRate);
      const newStablePatients = completingThisMonth - dischargedToSCA;
      cumulativeStablePatients += newStablePatients;
      
      const totalActivePatients = currentTitrationPatients + cumulativeStablePatients;
      const prescribersNeeded = Math.ceil(totalActivePatients / prescriberCapacity);
      
      titrationData.push({
        month: month.charAt(0).toUpperCase() + month.slice(1) + ' 2028',
        newAdhdPatients: newAdhdPatients,
        newTitrationStarts: newTitrationPatients,
        activeTitrationPatients: currentTitrationPatients,
        completingTitration: completingThisMonth,
        dischargedToSCA: dischargedToSCA,
        newStablePatients: newStablePatients,
        cumulativeStablePatients: cumulativeStablePatients,
        totalActivePatients: totalActivePatients,
        prescribersNeeded: prescribersNeeded
      });
    });
    
    let tableRows = '';
    titrationData.forEach(data => {
      const cellClass = 'class="projection"';
      
      tableRows += `
        <tr>
          <td><strong>${data.month}</strong></td>
          <td ${cellClass}>${data.newAdhdPatients.toLocaleString()}</td>
          <td ${cellClass}>${data.newTitrationStarts.toLocaleString()}</td>
          <td ${cellClass}>${data.activeTitrationPatients.toLocaleString()}</td>
          <td ${cellClass}>${data.completingTitration.toLocaleString()}</td>
          <td ${cellClass}>${data.dischargedToSCA.toLocaleString()}</td>
          <td ${cellClass}>${data.newStablePatients.toLocaleString()}</td>
          <td ${cellClass}>${data.cumulativeStablePatients.toLocaleString()}</td>
          <td ${cellClass}><strong>${data.totalActivePatients.toLocaleString()}</strong></td>
          <td ${cellClass}><strong>${data.prescribersNeeded.toLocaleString()}</strong></td>
        </tr>
      `;
    });
    
    // Add annual totals
    const totals = titrationData.reduce((acc, data) => ({
      newAdhdPatients: acc.newAdhdPatients + data.newAdhdPatients,
      newTitrationStarts: acc.newTitrationStarts + data.newTitrationStarts,
      completingTitration: acc.completingTitration + data.completingTitration,
      dischargedToSCA: acc.dischargedToSCA + data.dischargedToSCA,
      newStablePatients: acc.newStablePatients + data.newStablePatients,
      finalStablePatients: titrationData[titrationData.length - 1].cumulativeStablePatients,
      finalActivePatients: titrationData[titrationData.length - 1].totalActivePatients,
      finalPrescribersNeeded: titrationData[titrationData.length - 1].prescribersNeeded
    }), { newAdhdPatients: 0, newTitrationStarts: 0, completingTitration: 0, dischargedToSCA: 0, newStablePatients: 0, finalStablePatients: 0, finalActivePatients: 0, finalPrescribersNeeded: 0 });
    
    tableRows += `
      <tr class="total-row">
        <td><strong>YEAR 3 TOTAL</strong></td>
        <td><strong>${totals.newAdhdPatients.toLocaleString()}</strong></td>
        <td><strong>${totals.newTitrationStarts.toLocaleString()}</strong></td>
        <td><strong>-</strong></td>
        <td><strong>${totals.completingTitration.toLocaleString()}</strong></td>
        <td><strong>${totals.dischargedToSCA.toLocaleString()}</strong></td>
        <td><strong>${totals.newStablePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalStablePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalActivePatients.toLocaleString()}</strong></td>
        <td><strong>${totals.finalPrescribersNeeded.toLocaleString()}</strong></td>
      </tr>
    `;

    return `
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>New ADHD Patients</th>
            <th>Starting Titration</th>
            <th>Active in Titration</th>
            <th>Completing Titration</th>
            <th>Discharged to SCA</th>
            <th>New Stable Patients</th>
            <th>Cumulative Stable</th>
            <th>Total Active Patients</th>
            <th>Prescribers Needed</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>
      <div class="highlight" style="margin-top: 15px;">
        <strong>💊 Year 3 Titration Flow:</strong> ${Math.round(titrationRate * 100)}% of ADHD patients start ${titrationDuration}-month medication titration. After completion, ${Math.round(scaAcceptanceRate * 100)}% are discharged to GP with Shared Care Agreement, ${Math.round((1-scaAcceptanceRate) * 100)}% remain as stable patients under our ongoing care. 1 prescriber handles ${prescriberCapacity} appointments/month.
      </div>
    `;
  }

  // Helper function to get cost notes
  getCostNotes(costType, serviceType) {
    const notes = {
      clinical_costs: serviceType === 'b2c' ? 'Higher complexity for ASD' : 'Same clinical complexity',
      tech_admin: serviceType === 'b2c' ? 'Platform costs, admin support' : 'Same platform costs',
      cac: serviceType === 'b2c' ? 'Marketing, advertising' : 'Contract-based referrals'
    };
    return notes[costType] || '';
  }

  // Initialize all dynamic content
  initializeDynamicContent() {
    // Update service pricing table
    const servicePricingContainer = document.querySelector('#service-pricing-table');
    if (servicePricingContainer) {
      servicePricingContainer.innerHTML = this.renderServicePricingTable();
    }

    // Update 2025 performance table
    const performance2025Container = document.querySelector('#performance-2025-table');
    if (performance2025Container) {
      performance2025Container.innerHTML = this.render2025PerformanceTable();
    }

    // Update 2026 projections table
    const projections2026Container = document.querySelector('#projections-2026-table');
    if (projections2026Container) {
      projections2026Container.innerHTML = this.render2026ProjectionsTable();
    }

    // Update annual summary table
    const annualSummaryContainer = document.querySelector('#annual-summary-table');
    if (annualSummaryContainer) {
      annualSummaryContainer.innerHTML = this.renderAnnualSummaryTable();
    }

    // Update KPI cards
    const kpiContainer = document.querySelector('#kpi-cards');
    if (kpiContainer) {
      kpiContainer.innerHTML = this.renderKPICards();
    }

    // Update unit economics tables
    const b2cUnitEconomicsContainer = document.querySelector('#b2c-unit-economics');
    if (b2cUnitEconomicsContainer) {
      b2cUnitEconomicsContainer.innerHTML = this.renderUnitEconomicsTable('b2c');
    }

    const nhsUnitEconomicsContainer = document.querySelector('#nhs-unit-economics');
    if (nhsUnitEconomicsContainer) {
      nhsUnitEconomicsContainer.innerHTML = this.renderUnitEconomicsTable('nhs');
    }

    // Update use of funds
    const useOfFundsContainer = document.querySelector('#use-of-funds');
    if (useOfFundsContainer) {
      useOfFundsContainer.innerHTML = this.renderUseOfFunds();
    }

    const milestonesContainer = document.querySelector('#milestones');
    if (milestonesContainer) {
      milestonesContainer.innerHTML = this.renderMilestones();
    }

    const additionalFundsContainer = document.querySelector('#additional-funds');
    if (additionalFundsContainer) {
      additionalFundsContainer.innerHTML = this.renderAdditionalFunds();
    }
  }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FinancialRenderer;
}