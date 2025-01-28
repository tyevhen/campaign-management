import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import {
  campaignsAtom,
  createCampaignAtom,
  resetSearchAtoms,
  selectedCampaignAtom,
  toggleCampaignStatusAtom,
} from "../state/campaigns/atoms";
import { Campaign } from "../types/campaign";
import CreateCampaignDialog from "./CreateCampaignDialog";
import { useAtom } from "jotai";
import SearchComponent from "./SearchComponent";

const CampaignsTable: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [campaigns] = useAtom(campaignsAtom);

  const [, createCampaign] = useAtom(createCampaignAtom);
  const [,] = useAtom(selectedCampaignAtom);
  const [, toggleCampaignStatus] = useAtom(toggleCampaignStatusAtom);
  const [, resetSearch] = useAtom(resetSearchAtoms);

  const handleCreateCampaign = async () => {
    await createCampaign();
    setOpenDialog(false);
    resetSearch();
  };

  const handleChangeCampaignStatus = async (id: string) => {
    await toggleCampaignStatus(id);
  };  

  return (
    <div>
      <Button variant="contained" onClick={() => setOpenDialog(true)}>
        Create Campaign
      </Button>
      <SearchComponent></SearchComponent>
      <CreateCampaignDialog
        isOpen={openDialog}
        onClose={() => setOpenDialog(false)}
        onCreateCampaign={handleCreateCampaign}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Landing page URL</TableCell>
              <TableCell>Payouts</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns!.map((campaign: Campaign) => (
              <TableRow key={campaign.id}>
                <TableCell>{campaign.title}</TableCell>
                <TableCell>{campaign.landingPageUrl}</TableCell>
                <TableCell>
                  {campaign.campaignPayouts && campaign.campaignPayouts.length
                    ? campaign.campaignPayouts
                        .map(
                          (item) => `${item.payout.country}: ${item.amount}$`
                        )
                        .join(", ")
                    : ""}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={campaign.isRunning ? "error" : "success"}
                    onClick={() => handleChangeCampaignStatus(campaign.id)}
                  >
                    {campaign.isRunning ? "Stop" : "Start"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CampaignsTable;
