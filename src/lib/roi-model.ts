/**
 * ROI / Value Assessment calculation model.
 * Directional — used for the Value Realization engine at /roi-calculator.
 */

import type { Family } from "@/lib/routes";

export type InputKey =
  | "entities"
  | "ftes"
  | "loadedCost"
  | "effortPct"
  | "invoicesPerMonth"
  | "posPerMonth"
  | "paymentRunsPerMonth"
  | "expenseClaimsPerMonth"
  | "ordersPerMonth"
  | "billingVolPerMonth"
  | "annualRevenue"
  | "currentDso"
  | "targetDso"
  | "currentCloseDays"
  | "targetCloseDays"
  | "closeCyclesPerYear";

export type InputSpec = {
  key: InputKey;
  label: string;
  hint?: string;
  defaultValue: number;
  suffix?: string;
  step?: number;
  min?: number;
  max?: number;
};

/** Inputs shown for every module. */
export const COMMON_INPUTS: InputSpec[] = [
  { key: "entities", label: "Number of entities in scope", defaultValue: 3, step: 1, min: 1 },
  { key: "ftes", label: "FTEs on this function", defaultValue: 10, step: 1, min: 0 },
  { key: "loadedCost", label: "Avg loaded cost per FTE (annual, ₹)", defaultValue: 1_500_000, step: 50_000, suffix: "₹" },
  { key: "effortPct", label: "% effort spent on this module", defaultValue: 60, step: 5, min: 0, max: 100, suffix: "%" },
];

/** Per-module productivity gain + extra input spec. */
export type ModuleRoiSpec = {
  slug: string;
  gainPct: number;
  extraInputs: InputSpec[];
};

const s2pVolumeInputs = (label: string, key: InputKey, dflt: number): InputSpec[] => [
  { key, label, defaultValue: dflt, step: 100, min: 0 },
];

export const MODULE_ROI: Record<string, ModuleRoiSpec> = {
  // S2P
  sourcing: { slug: "sourcing", gainPct: 30, extraInputs: [] },
  procurement: {
    slug: "procurement",
    gainPct: 35,
    extraInputs: s2pVolumeInputs("POs per month", "posPerMonth", 800),
  },
  "accounts-payable": {
    slug: "accounts-payable",
    gainPct: 45,
    extraInputs: s2pVolumeInputs("Invoices per month", "invoicesPerMonth", 5000),
  },
  payments: {
    slug: "payments",
    gainPct: 40,
    extraInputs: s2pVolumeInputs("Payment runs per month", "paymentRunsPerMonth", 30),
  },
  "travel-expense": {
    slug: "travel-expense",
    gainPct: 50,
    extraInputs: s2pVolumeInputs("Expense claims per month", "expenseClaimsPerMonth", 1500),
  },
  "petty-cash": { slug: "petty-cash", gainPct: 55, extraInputs: [] },
  "vendor-reconciliation": { slug: "vendor-reconciliation", gainPct: 60, extraInputs: [] },
  "budgeting-spend-control": { slug: "budgeting-spend-control", gainPct: 35, extraInputs: [] },
  "fixed-assets": { slug: "fixed-assets", gainPct: 40, extraInputs: [] },

  // O2C
  "order-management": {
    slug: "order-management",
    gainPct: 30,
    extraInputs: s2pVolumeInputs("Orders per month", "ordersPerMonth", 3000),
  },
  "billing-invoicing": {
    slug: "billing-invoicing",
    gainPct: 40,
    extraInputs: s2pVolumeInputs("Billing volume per month", "billingVolPerMonth", 4000),
  },
  "accounts-receivable": {
    slug: "accounts-receivable",
    gainPct: 45,
    extraInputs: [
      { key: "annualRevenue", label: "Annual revenue (₹)", defaultValue: 1_000_000_000, step: 10_000_000, suffix: "₹" },
      { key: "currentDso", label: "Current DSO (days)", defaultValue: 55, step: 1, suffix: "d" },
      { key: "targetDso", label: "Target DSO (days)", defaultValue: 48, step: 1, suffix: "d" },
    ],
  },
  collections: {
    slug: "collections",
    gainPct: 35,
    extraInputs: [
      { key: "annualRevenue", label: "Annual revenue (₹)", defaultValue: 1_000_000_000, step: 10_000_000, suffix: "₹" },
      { key: "currentDso", label: "Current DSO (days)", defaultValue: 55, step: 1, suffix: "d" },
      { key: "targetDso", label: "Target DSO (days)", defaultValue: 48, step: 1, suffix: "d" },
    ],
  },
  "customer-reconciliation": { slug: "customer-reconciliation", gainPct: 55, extraInputs: [] },

  // R2R
  "month-end-close": {
    slug: "month-end-close",
    gainPct: 40,
    extraInputs: [
      { key: "currentCloseDays", label: "Current close days", defaultValue: 9, step: 1 },
      { key: "targetCloseDays", label: "Target close days", defaultValue: 6, step: 1 },
      { key: "closeCyclesPerYear", label: "Close cycles per year", defaultValue: 12, step: 1 },
    ],
  },
  "cash-flow-visibility": { slug: "cash-flow-visibility", gainPct: 45, extraInputs: [] },
  consolidation: {
    slug: "consolidation",
    gainPct: 50,
    extraInputs: [
      { key: "currentCloseDays", label: "Current group close days", defaultValue: 14, step: 1 },
      { key: "targetCloseDays", label: "Target group close days", defaultValue: 9, step: 1 },
      { key: "closeCyclesPerYear", label: "Close cycles per year", defaultValue: 4, step: 1 },
    ],
  },
  "provisions-accruals": { slug: "provisions-accruals", gainPct: 45, extraInputs: [] },
  amortization: { slug: "amortization", gainPct: 55, extraInputs: [] },
  "year-end-close": {
    slug: "year-end-close",
    gainPct: 45,
    extraInputs: [
      { key: "currentCloseDays", label: "Current year-end days", defaultValue: 30, step: 1 },
      { key: "targetCloseDays", label: "Target year-end days", defaultValue: 22, step: 1 },
      { key: "closeCyclesPerYear", label: "Year-end cycles per year", defaultValue: 1, step: 1 },
    ],
  },
};

export type RoiInputs = Partial<Record<InputKey, number>>;

export type RoiOutput = {
  fteReleased: number;
  monthlySavings: number;
  annualSavings: number;
  dsoImprovement?: number;
  cashReleased?: number;
  closeDaysReduced?: number;
  closeDaysCompressionPct?: number;
};

export function calculateRoi(
  family: Family,
  moduleSlug: string,
  inputs: RoiInputs,
): RoiOutput {
  const mod = MODULE_ROI[moduleSlug];
  if (!mod) {
    return { fteReleased: 0, monthlySavings: 0, annualSavings: 0 };
  }

  const ftes = inputs.ftes ?? 0;
  const loadedCost = inputs.loadedCost ?? 0;
  const effort = (inputs.effortPct ?? 0) / 100;
  const gain = mod.gainPct / 100;

  const fteReleased = ftes * effort * gain;
  const annualSavings = fteReleased * loadedCost;
  const monthlySavings = annualSavings / 12;

  const output: RoiOutput = {
    fteReleased: round1(fteReleased),
    monthlySavings: Math.round(monthlySavings),
    annualSavings: Math.round(annualSavings),
  };

  // O2C-specific: DSO and cash released
  if (
    family === "o2c" &&
    inputs.annualRevenue != null &&
    inputs.currentDso != null &&
    inputs.targetDso != null
  ) {
    const dsoImprovement = Math.max(0, inputs.currentDso - inputs.targetDso);
    const dailyRevenue = inputs.annualRevenue / 365;
    output.dsoImprovement = dsoImprovement;
    output.cashReleased = Math.round(dsoImprovement * dailyRevenue);
  }

  // R2R-specific: close days reduced
  if (
    family === "r2r" &&
    inputs.currentCloseDays != null &&
    inputs.targetCloseDays != null
  ) {
    const daysReduced = Math.max(0, inputs.currentCloseDays - inputs.targetCloseDays);
    output.closeDaysReduced = daysReduced;
    if (inputs.currentCloseDays > 0) {
      output.closeDaysCompressionPct = Math.round(
        (daysReduced / inputs.currentCloseDays) * 100,
      );
    }
  }

  return output;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

/**
 * Format a rupee amount using Indian convention: crore (Cr) for ≥1,00,00,000,
 * lakh (L) for ≥1,00,000, thousand (K) otherwise.
 */
export function formatInr(n: number): string {
  if (n === 0) return "₹0";
  if (n >= 10_000_000) return `₹${(n / 10_000_000).toFixed(2)} Cr`;
  if (n >= 100_000) return `₹${(n / 100_000).toFixed(1)} L`;
  if (n >= 1_000) return `₹${(n / 1_000).toFixed(0)}K`;
  return `₹${n.toFixed(0)}`;
}
