import type { ReactNode } from "react";
import {
  Compass,
  FileSearch,
  FileText,
  CreditCard,
  Plane,
  Wallet,
  UserCheck,
  PiggyBank,
  Building2,
  PackageCheck,
  Receipt,
  IndianRupee,
  HandCoins,
  Users,
  CalendarCheck,
  TrendingUp,
  Layers,
  Scale,
  LineChart,
  Award,
} from "lucide-react";

/** Icon per module slug (last segment of path). */
export const MODULE_ICONS: Record<string, ReactNode> = {
  // S2P
  sourcing: <Compass className="h-4 w-4" />,
  procurement: <FileSearch className="h-4 w-4" />,
  "accounts-payable": <FileText className="h-4 w-4" />,
  payments: <CreditCard className="h-4 w-4" />,
  "travel-expense": <Plane className="h-4 w-4" />,
  "petty-cash": <Wallet className="h-4 w-4" />,
  "vendor-reconciliation": <UserCheck className="h-4 w-4" />,
  "budgeting-spend-control": <PiggyBank className="h-4 w-4" />,
  "fixed-assets": <Building2 className="h-4 w-4" />,
  // O2C
  "order-management": <PackageCheck className="h-4 w-4" />,
  "billing-invoicing": <Receipt className="h-4 w-4" />,
  "accounts-receivable": <IndianRupee className="h-4 w-4" />,
  collections: <HandCoins className="h-4 w-4" />,
  "customer-reconciliation": <Users className="h-4 w-4" />,
  // R2R
  "month-end-close": <CalendarCheck className="h-4 w-4" />,
  "cash-flow-visibility": <TrendingUp className="h-4 w-4" />,
  consolidation: <Layers className="h-4 w-4" />,
  "provisions-accruals": <Scale className="h-4 w-4" />,
  amortization: <LineChart className="h-4 w-4" />,
  "year-end-close": <Award className="h-4 w-4" />,
};

export function moduleSlug(path: string): string {
  return path.split("/").pop() ?? "";
}

export function iconForModule(path: string): ReactNode | null {
  return MODULE_ICONS[moduleSlug(path)] ?? null;
}
