# Mentalwell Investor Deck — QC Report

**Date:** 27 February 2026
**Scope:** `index.html` investor overview + supporting JS financial model
**Reviewed by:** Automated QC + manual inspection

---

## Executive Summary

The deck is well-structured with strong traction data and a clear investment thesis. However, there are **5 critical number mismatches**, **4 important data-narrative issues**, and several minor formatting and language items that should be resolved before sharing with investors.

---

## 1. CRITICAL — Number Mismatches

These are factual errors that will undermine credibility if an investor checks the math.

### 1.1 February 2026 Data Conflict (HTML vs JS)

- **HTML actuals table** shows: 99 patients, £99,142 (labelled "PARTIAL" as of Feb 18)
- **JS data file** (`financial-data.js`) stores: 160 patients, £136,500 (full month estimate)
- **JS comment** says: "B2C £136,500 + £13,500 subscription (18 renewals) = £150K total"
- **Impact:** The calculation engine uses the JS values (160 patients / £136,500), so the P&L Model tab and projections will show different February numbers than the Overview tab. An investor toggling between tabs will see contradictory figures.
- **ACTION:** Decide which February figure to display — the partial-month actual or a full-month estimate — and make it consistent everywhere. If partial, update the JS. If full-month, update the HTML table and clarify the label.

### 1.2 Renewal Pipeline: HTML Table vs JS Data

The "Renewal Pipeline" table in the Overview tab shows **different** eligible patient counts than `renewal_pipeline_2026` in the JS data:

| Month | HTML Table | JS Data | Delta |
|-------|-----------|---------|-------|
| Mar 2026 | 91 | 81 | +10 |
| Apr 2026 | 122 | 99 | +23 |
| May 2026 | 164 | 141 | +23 |
| Jun 2026 | 106 | 105 | +1 |
| Jul 2026 | 115 | 111 | +4 |
| Aug 2026 | 61 | 55 | +6 |
| **Total** | **659** | **592** | **+67** |

- The HTML table is hardcoded and does not pull from the JS data layer.
- The deck narrative and headline stat ("659 existing patients" and "£494K pipeline") are based on the HTML values, not the JS values.
- **Impact:** If an investor inspects the code or if dynamic tables elsewhere use the JS values, the numbers won't reconcile.
- **ACTION:** Reconcile the HTML table with the JS data. Determine which is correct (the HTML numbers appear to use a broader eligibility definition), update the source of truth, and ideally make the table dynamic.

### 1.3 Subscription Take Rate Claim

- **Deck claims:** 56.2% take rate (stated in multiple places)
- **Calculated from Stripe data:** Plans sold (158) / Assessments (715) = **22.1%**
- **Possible explanation:** The 56.2% likely refers to a specific cohort or calculation method (e.g., eligible ADHD patients who *could* buy a plan, excluding assessment-only and children), not all assessments. But this is never clarified.
- **ACTION:** Either show the methodology behind 56.2% clearly, or replace with a verifiable figure. Investors will want to reproduce this number.

### 1.4 August MoM Growth Rounding

- **Calculated:** 197.4%
- **Displayed:** 197.5%
- **Impact:** Minor (0.1% rounding), but in an investor model context, precision matters.
- **ACTION:** Verify rounding methodology is consistent.

### 1.5 October MoM Growth Rounding

- **Calculated:** 31.8%
- **Displayed:** 31.7%
- **Impact:** Same minor rounding issue.

---

## 2. CRITICAL — Data Inconsistencies Across Locations

### 2.1 NHS Margins: CLAUDE.md vs HTML vs JS

The NHS margins are stated differently in different files:

| Source | NHS ADHD Margin | NHS ASD Margin | NHS CAC |
|--------|----------------|----------------|---------|
| CLAUDE.md | 55% | 70% | £0 |
| HTML Unit Economics table | 51% | 67% | £50 |
| JS `unit_economics` | 51% | 67% | £50 |
| Overview proof card | "51-67% margin" | — | £50 |

- The JS data and HTML table are consistent with each other (£50 CAC → 51%/67%).
- CLAUDE.md uses £0 CAC → 55%/70%, which is outdated.
- **ACTION:** Update CLAUDE.md to match the current £50 CAC figures (51% / 67%).

### 2.2 Revenue Claim: "£1.2M" vs Calculated

- **Deck claims** "£1.2M revenue to date" (appears 6+ times)
- **Calculated from Stripe actuals** (Jun 2025 – Jan 2026 full + Feb partial):
  - Using HTML Feb (£99K): £1,094,881 (~£1.1M)
  - Using JS Feb full month (£136K): £1,132,239 (~£1.1M)
- **Neither reaches £1.2M.** To hit £1.2M, you'd need the full estimated February (£150K including subscriptions): £821,659 + £174,080 + £150,000 = £1,145,739 — still under £1.2M.
- **Possible explanation:** The £1.2M figure may include additional subscription renewals or January subscription revenue not captured in the base figures. But no source shows exactly £1.2M.
- **ACTION:** Either verify the £1.2M with a clear reconciliation (show what's included), or round down to "£1.1M+" which is defensible.

---

## 3. IMPORTANT — Data-Narrative Alignment

### 3.1 2026 Revenue Target vs Model Output

- **Narrative claims:** "£10M projected revenue" for 2026 (repeated throughout)
- **Model output (realistic scenario):** £8.3M (5,965 patients)
- **Scenario comparison:**
  - Pessimistic: £5.3M (3,727 patients) — narrative says "~£5M"
  - Realistic: £8.3M (5,965 patients) — narrative says "~£10M"
  - Optimistic: £12.7M (9,167 patients) — narrative says "~£15M"
- **Impact:** The £10M headline is roughly 20% above what the realistic model actually produces. An investor running the model will see £8.3M, not £10M.
- **ACTION:** Either adjust scenario volumes upward to produce £10M in the realistic case, or qualify the £10M figure (e.g., "£8-10M depending on NHS ramp speed"). Alternatively, include subscription revenue more aggressively in the model.

### 3.2 "6,500 patients" Claim vs Model

- The deck says "6,500+ total in 2026" but the realistic model produces 5,965.
- **ACTION:** Align the stated target with the model output, or note it as a stretch target.

### 3.3 "50% Blended Gross Margin" Claim

- The Summary box and Business Plan section both state "50% Blended Gross Margin"
- This figure is not directly computed or displayed anywhere in the model for the user to verify.
- **ACTION:** Add the blended margin calculation to the KPI section or P&L summary so the claim is backed by visible data.

### 3.4 "1,000+ B2C Patients" Highlight

- The highlights strip says "1,000+ B2C Patients"
- Total patients (all channels, Jun 2025 – Feb 2026): 1,190
- Since all revenue to date is B2C (NHS hasn't launched), this is essentially true, but the partial Feb figure means the "1,000+" label may be based on a specific cutoff date.
- **Impact:** Low risk, but ensure the cutoff is clear.

---

## 4. IMPORTANT — Language Polish

### 4.1 Casual or Imprecise Phrasing

| Location | Current | Suggested |
|----------|---------|-----------|
| Proof card | "We are CQC-licensed and NHS-approved" | "Mentalwell holds CQC registration and NHS Right to Choose accreditation" |
| Proof card | "near-zero default risk" | "government-backed receivables with minimal default exposure" |
| Dec dip note | "since resolved" | "addressed in January 2026 with revised PPC strategy" |
| Dec dip note | "We also deliberately slowed growth" | "Growth was moderated to prioritise clinical governance ahead of NHS launch" |
| Sensitivity section | "The business runs without NHS" | "The B2C channel alone sustains £3-4M annual run rate" |
| Renewal pipeline | "100% have renewed so far, small sample" | "100% observed renewal rate (n=18, early cohort)" |
| Brand section | "No one has done it for ADHD" | Consider more measured language: "No scaled ADHD-focused consumer brand exists in the market" |
| Brand section | "the seat is empty" | "The category-defining position remains open" |
| Investment conclusion | "the business runs without NHS" (repeated) | Varies (consolidate to one version) |

### 4.2 Contractions and Informal Tone

Several sections use contractions ("We're", "don't", "can't", "won't") and first-person informal phrasing. For a Series A raise, consider whether the tone matches the investor audience. Some investors prefer polished, third-person language; others appreciate the founder voice. This is a stylistic choice, not an error.

---

## 5. MINOR — Formatting & Consistency

### 5.1 Currency Mixing

- UK figures are in GBP (£) throughout — **good**.
- US/global market figures use USD ($) — **correct**.
- The Summary box mixes: "£1.2M", "£10M", "$50B+", "50%" — the $ for addressable market jumps out. Consider noting "(US + UK combined)" or converting to £.

### 5.2 Number Formatting

- Most numbers use comma separators consistently (£240,537).
- Some round numbers lack commas: "15000 patients", "30000 patients" in the multi-year table should be "15,000" and "30,000" — these are hardcoded HTML values and do use commas, so this is fine.

### 5.3 Date Formatting

- Inconsistent date references: "Feb 2026", "February 2026", "H2 2026", "Q4 2026" — all acceptable but varies by section.

### 5.4 Team Photo Loading

- All team photos use external URLs (static.wixstatic.com) with `onerror="this.style.display='none'"` fallback. If Wix CDN is slow or blocked, the team section will appear empty.
- **ACTION:** Consider hosting team photos locally in `/assets/images/team/`.

### 5.5 Commented-Out Sections

- "Risk Analysis & Mitigation" section is commented out in the HTML but still present in source. An investor inspecting source code will see it.
- The HR Planning and Deck tabs are also commented out.
- **ACTION:** Remove commented-out sections before sharing, or move them to a separate file.

### 5.6 Password-Protected Content

- The deck has a password overlay — good for confidentiality. Ensure the password mechanism is robust (currently client-side JavaScript, which is bypassable).

---

## 6. Summary of Actions by Priority

### Must Fix Before Investor Distribution

1. **Reconcile February 2026 data** — HTML table vs JS data (pick one source of truth)
2. **Reconcile renewal pipeline** — HTML table vs JS data (67-patient gap)
3. **Verify £1.2M revenue claim** — show clear reconciliation or adjust to £1.1M+
4. **Align £10M target with model output** — model shows £8.3M realistic; close the gap or qualify
5. **Clarify 56.2% subscription take rate** — show methodology or use verifiable figure

### Should Fix

6. Update CLAUDE.md NHS margins (55%/70% → 51%/67%)
7. Polish casual language in key investor-facing sections
8. Remove commented-out HTML sections from source
9. Host team photos locally

### Nice to Have

10. Standardise date formatting across sections
11. Add explicit blended margin calculation to KPI display
12. Consider converting $50B+ addressable market to £ for consistency

---

*Report generated 27 February 2026*
