export type PhilzStatKey =
  | "premiumProperties"
  | "happyCustomers"
  | "yearsInBusiness";

export interface PhilzStat {
  value: number;
  suffix: string;
  label: string;
}

export const philzStats: Record<PhilzStatKey, PhilzStat> = {
  premiumProperties: {
    value: 40525,
    suffix: "+",
    label: "Premium Properties",
  },
  happyCustomers: {
    value: 35000,
    suffix: "+",
    label: "Happy Customers",
  },
  yearsInBusiness: {
    value: 12500,
    suffix: "+",
    label: "In Business",
  },
};