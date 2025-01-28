import { atomWithReset } from "jotai/utils";

export const searchAtom = atomWithReset({
  title: "",
  landingPageUrl: "",
  showStoppedCampaigns: false,
});
