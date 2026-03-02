# Mentalwell P&L Model — VC Investment Analysis

**Perspective:** Top-tier growth equity investor (a16z / Sequoia calibre)
**Date:** 28 February 2026
**Model reviewed:** `calculations.js` + `financial-data.js` — 2026 Realistic Scenario

---

## The Headline Numbers

| Metric | Model Output | Deck Claim | Gap |
|--------|-------------|------------|-----|
| 2026 Revenue | £8.3M | £10M | -20% |
| 2026 Patients | 5,965 | 6,500+ | -8% |
| Gross Margin | 46.3% | 50% blended | -3.7pp |
| EBITDA | £2.6M (31%) | Not stated | — |
| Net Income | £2.1M | Not stated | — |
| Year-End Cash | £5.3M | Not stated | — |

The model tells a fundamentally different story than the deck narrative. That gap is the first thing any diligence team will flag.

---

## What Works Well

**1. Unit economics are real and verified.** The per-service margins (24% ADHD Complete Care through 67% NHS ASD) are grounded in actual clinical cost structures. The £550–650 clinician cost per assessment is defensible for UK psychiatrist rates. This isn't a "gross margin on software" story — it's a clinical services business with genuine margin, and the model reflects that honestly.

**2. The Jan–Mar actuals provide credibility.** January at £174K on 185 patients gives a real run-rate baseline. The model doesn't start from fantasy — it starts from Stripe-verified data, with bank-statement-verified OpEx for January. That's more grounding than most Series A models provide.

**3. NHS as a step-function catalyst is compelling.** The April inflection point — where revenue doubles from £259K (March) to £530K — is structurally driven by NHS contract activation, not a speculative growth assumption. Government-backed healthcare contracts with 51–67% margins and near-zero CAC (£50 vs £300 B2C) are genuinely differentiated. If the NHS contracts materialise, the margin expansion is mechanical.

**4. The cash position never goes negative.** Starting with £3.25M (existing + £3M raise), the model shows a trough of £3.2M in March before climbing steadily to £5.3M by December. The business is asking for £3M it arguably doesn't need — which is actually a strong signal for investors who worry about dilutive raises.

---

## Red Flags a Diligence Team Will Hammer

### 1. "Too Profitable, Too Fast" — The OpEx Problem

This is the single biggest credibility issue in the model.

The model shows £1.275M total OpEx for all of 2026 — just 15.3% of revenue. Monthly OpEx rises from £91K to £125K while revenue scales from £174K to £1.06M. That's a 6x revenue increase on a 37% OpEx increase.

For context, a healthcare services company scaling from £174K/month to £1M/month would typically need:

- **Additional clinical operations staff** (scheduling, quality assurance, patient coordination) — the model has zero incremental headcount cost
- **Compliance and regulatory overhead** — CQC inspections scale with patient volume
- **Technology infrastructure** — EMR systems, telehealth platforms, data security
- **Management layer** — you cannot run 750 patients/month with the same management team that handles 185

A realistic OpEx load for a company at this growth stage would be 25–35% of revenue, not 15%. The model makes Mentalwell look like a software company with 80%+ gross margins and minimal overhead — but it's a clinical services business with 46% gross margins.

**Recommendation:** Build a bottom-up OpEx model that shows specific hires by month, compliance costs scaling with patient volume, and technology investment. If OpEx should be £200K–250K/month by Q4 (not £125K), the EBITDA story changes dramatically — from 31% to potentially 10–15%.

### 2. NHS Concentration Risk — 63.5% Single-Payer Dependency

By December 2026, the model shows NHS generating 63.5% of total revenue. This creates several investor concerns:

- **Payment timing:** NHS contracts typically operate on 30–90 day payment cycles. The P&L model doesn't account for working capital requirements. A company billing £735K/month to the NHS won't receive that cash for 1–3 months.
- **Contract risk:** A single NHS policy change, procurement freeze, or Right to Choose pathway modification could eliminate the majority of revenue overnight.
- **Pricing power:** NHS contract rates are fixed and subject to downward renegotiation at renewal. The £1,350 ADHD and £2,000 ASD rates may not hold as the NHS builds its own capacity.
- **Regulatory dependency:** The Right to Choose pathway is a political construct that could change with government priorities.

**Recommendation:** Model a "NHS delay" scenario where contracts start 3 months late (July instead of April). Show what the business looks like if NHS is 40% of revenue instead of 63%. Demonstrate the B2C channel can sustain the business independently — the January actuals (£174K pure B2C) suggest it can, but the model needs to make this explicit.

### 3. The Revenue Gap: £8.3M vs £10M

The model produces £8.3M in the realistic scenario. The deck claims £10M. This 20% gap will immediately destroy trust with any investor who runs the numbers.

The breakdown: H1 produces £2.49M (30% of total) and H2 produces £5.82M (70%). The hockey stick is extreme — December revenue (£1.06M) is 6x January (£174K). While the NHS catalyst provides structural justification, the monthly ramp from April (372 patients) to December (750 patients) implies doubling patient volume in 9 months while maintaining service quality.

**Recommendation:** Either recalibrate the narrative to "£8–10M revenue target" or increase the realistic scenario assumptions to actually produce £10M. The optimistic scenario hits £12.7M — so £10M sits between realistic and optimistic. Label it as such.

### 4. Subscription Revenue Is Underweight at 4.2%

The deck highlights a "56.2% subscription take rate" and positions treatment plans as a key differentiator. But subscription revenue is only £350K — 4.2% of total. At £750 per 6-month plan, that's about 467 subscriptions across the year.

This matters because subscriptions are the highest-margin product (69% gross margin) and the only recurring revenue stream. A VC would want to see this as 15–20% of revenue by year-end, not 4%.

The model appears to use a modest subscription attach rate and doesn't aggressively model renewals from the 592-patient pipeline. If even 30% of the pipeline renews at £750, that's an additional £133K — but the model doesn't seem to capture this growth.

**Recommendation:** Build a cohort-based subscription model showing: initial attach rate, renewal rate by cohort, expansion to 12-month plans, and ADHD medication management subscriptions. This is where the "software-like" economics live, and the model barely scratches the surface.

### 5. Clinician Capacity Looks Easy — Suspiciously Easy

The model peaks at 750 patients/month in December, requiring just 10 clinicians at 80 assessments/month. The company currently has 12 ADHD assessors and 3 autism assessors.

This means the company already has the clinical capacity to deliver the entire 2026 plan with headroom. That's unusual for a healthcare business scaling 6x — and suggests either:

- The capacity assumption (80/clinician/month) is aggressive (that's 4 assessments per working day, every day)
- The model is understating the clinical complexity (ASD assessments take significantly longer than ADHD)
- The constraint isn't clinicians but something else (prescribers, admin, scheduling)

The 3 prescribers handling 462 appointments/month capacity is a tighter bottleneck — with 750 patients and a 90% titration start rate, prescriber demand could exceed capacity by Q3.

**Recommendation:** Show the prescriber capacity constraint explicitly. Model prescriber hiring and ramp time (6–8 weeks for NHS credentialing). Show utilisation rates by role, not just headline clinician numbers.

### 6. COGS Structure Doesn't Scale with Complexity

The model shows clinical costs as a flat per-assessment fee (£550 for ADHD, £550 for ASD). In reality, costs scale non-linearly:

- **ASD assessments require multi-disciplinary teams** (psychologist + SLT + observer) — costing more than a single psychiatrist ADHD assessment
- **Complex cases require extended sessions** — the model assumes uniform cost
- **Quality assurance overhead increases** with volume (clinical governance, peer review, complaints handling)
- **NHS contract compliance** adds documentation and reporting costs not captured in the per-unit model

The 46.3% gross margin is plausible at current scale but may compress to 40–42% at 750 patients/month as complexity cases increase and QA overhead grows.

**Recommendation:** Show gross margin sensitivity to clinical complexity mix. Model a scenario where 15% of cases require extended assessment (1.5x cost).

---

## What a Top-Tier VC Would Want to See

### Must-Haves for Due Diligence

1. **Cohort analysis of B2C patients** — retention, LTV, referral rates by acquisition month
2. **NHS contract term sheets or LOIs** — the entire model hinges on April activation
3. **Working capital model** — NHS payment cycles will create a significant cash gap the P&L doesn't capture
4. **Bottom-up hiring plan** — map every hire to a trigger (patient volume, regulatory requirement, management span)
5. **Unit economics by acquisition channel** — Google PPC vs organic vs referral; the £300 blended CAC needs decomposition

### Model Improvements

1. **Add a Balance Sheet and Cash Flow Statement** — the P&L alone doesn't tell the cash story, especially with NHS receivables
2. **Build monthly OpEx waterfall** — show each line item growing independently, not as a lump sum
3. **Add a sensitivity table** — vary NHS launch date (April/July/September) × take rate (50%/70%/90%) × B2C growth (flat/10%/20%)
4. **Model working capital explicitly** — DSO for NHS (60 days), DPO for clinicians (30 days), cash conversion cycle
5. **Show path to £10M** — if realistic is £8.3M, what specific lever gets you to £10M? (10% more patients? 15% price increase? Higher subscription attach?)
6. **Include 2025 actual monthly P&L** — investors want to see the full margin trajectory from June 2025, not just revenue

---

## Bottom Line

**The business is compelling. The model undermines it.**

Mentalwell has genuine traction (£822K in 7 months from standing start), a structural growth catalyst (NHS Right to Choose), and defensible unit economics (51–67% NHS margins). These are rare and valuable in healthcare services.

But the P&L model is built to impress rather than to withstand scrutiny. The 31% EBITDA margin, the non-scaling OpEx, the gap between model output and deck claims, and the absence of working capital analysis will all trigger concern in a serious diligence process.

The fix isn't complicated: build a more conservative model that produces £7–8M with realistic OpEx, then show the upside case. A VC would rather invest in a founder who presents £8M with a credible path to £12M than one who claims £10M but can only model £8.3M.

The underlying business — an AI-enabled ADHD/ASD assessment platform with NHS contract distribution — is exactly the kind of "boring but defensible" healthcare infrastructure that top-tier growth funds look for. The model just needs to tell that story honestly.

---

*Analysis generated 28 February 2026*
*Perspective: Growth equity investment review*
