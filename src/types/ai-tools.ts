export type PricingType = "free" | "freemium" | "paid";

export interface AITool {
  id: string;
  name: string;
  description: string;
  category: string;
  pricingType: PricingType;
  popularityScore: number;
  trending: boolean;
  isNew: boolean;
  websiteUrl: string;
  logoUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  toolCount: number;
  description: string;
}
