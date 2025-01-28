import { Payout } from "./payout";

export interface CampaignCreate {
  title: string;
  landingPageUrl: string;
  payouts: string[];
}

export interface Campaign {
  id: string;
  title: string;
  landingPageUrl: string;
  isRunning: boolean;
  campaignPayouts: CampaignPayout[];
  createdAt: string;
  updatedAt?: string;
}

export interface CampaignPayout {
  id: string;
  campaignId: string;
  payoutId: string;
  payout: Payout;
  amount: number;
  createdAt: string;
  updatedAt?: string;
}

