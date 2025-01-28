import { atom } from "jotai";
import CampaignService from "../../services/campaign.service";
import { Campaign, CampaignCreate } from "../../types/campaign";
import httpClient from "../../services/httpClient";
import { atomWithReset, RESET } from "jotai/utils";
import { objectToQueryString } from "../../utils/createQueryString";
import { searchAtom } from "../search/atoms";

const campaignService = new CampaignService(httpClient);

export const campaignsAtom = atom<Campaign[] | []>([]);

export const selectedCampaignIdAtom = atom<string | null>(null);

export const selectedCampaignAtom = atom((get) => {
  const campaigns = get(campaignsAtom);
  const selectedId = get(selectedCampaignIdAtom);

  if (!selectedId) return null;
  return campaigns.find((campaign) => campaign.id === selectedId) || null;
});

export const toggleCampaignStatusAtom = atom(
  null,
  async (get, set, id: string) => {
    set(selectedCampaignIdAtom, id);
    const campaign = get(selectedCampaignAtom);

    if (campaign) {
      const updatedCampaign = await campaignService.toggleStatus(
        id,
        !campaign.isRunning
      );

      set(campaignsAtom, (prevCampaigns) =>
        prevCampaigns.map((campaign) =>
          campaign.id === updatedCampaign.id ? updatedCampaign : campaign
        )
      );
    }
  }
);

export const getCampaignsAtom = atom(null, async (_get, set) => {
  const data = await campaignService.getAll();
  set(campaignsAtom, data);
});

export const newCampaignAtom = atomWithReset<CampaignCreate>({
  title: "",
  landingPageUrl: "",
  payouts: [],
});

export const createCampaignAtom = atom(null, async (get, set) => {
  const campaign = get(newCampaignAtom);
  const campaigns = get(campaignsAtom);
  const data = await campaignService.create(campaign);
  set(campaignsAtom, [...campaigns, data]);
  set(newCampaignAtom, RESET);
});

export const searchCampaignsAtom = atom(null, async (get, set) => {
  const search = get(searchAtom);
  const queryString = objectToQueryString(search);
  const data = await campaignService.search(queryString);

  set(campaignsAtom, data);
});

export const resetSearchAtoms = atom(null, (_get, set) => {
  set(searchAtom, RESET);
});
