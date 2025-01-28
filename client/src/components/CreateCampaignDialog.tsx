import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  FormControl,
  SelectChangeEvent,
  FormHelperText,
} from "@mui/material";
import { useAtom } from "jotai";
import { payoutsAtom } from "../state/payouts/atoms";
import { newCampaignAtom } from "../state/campaigns/atoms";

interface CreateCampaignDialogProps {
  onCreateCampaign: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const CreateCampaignDialog: React.FC<CreateCampaignDialogProps> = ({
  onCreateCampaign,
  isOpen,
  onClose,
}) => {
  const [newCampaign, setNewCampaign] = useAtom(newCampaignAtom);
  const [payouts] = useAtom(payoutsAtom);

  const handleSubmit = () => {
    if (newCampaign.title && newCampaign.payouts.length) {
      onCreateCampaign();
      onClose();
    }
  };

  const handlePayoutsChange = (event: SelectChangeEvent<string[]>) => {
    const selectedIds = Array.isArray(event.target.value)
      ? event.target.value
      : [event.target.value];

    setNewCampaign({ ...newCampaign, payouts: selectedIds });
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Create New Campaign</DialogTitle>
        <DialogContent>
          <TextField
            label="Campaign Name"
            fullWidth
            variant="outlined"
            margin="normal"
            value={newCampaign.title}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, title: e.target.value })
            }
          />
          <TextField
            label="Campaign URL"
            fullWidth
            variant="outlined"
            margin="normal"
            value={newCampaign.landingPageUrl}
            onChange={(e) =>
              setNewCampaign({ ...newCampaign, landingPageUrl: e.target.value })
            }
          />
          <FormControl fullWidth>
            <FormHelperText>Select countries</FormHelperText>
            <Select
              multiple
              value={newCampaign.payouts}
              onChange={handlePayoutsChange}
              renderValue={(selected) => {
                return (selected as string[])
                  .map(
                    (id) => payouts!.find((payout) => payout.id === id)?.country
                  )
                  .join(", ");
              }}
            >
              {payouts!.map((payout) => (
                <MenuItem key={payout.id} value={payout.id}>
                  <Checkbox checked={newCampaign.payouts.includes(payout.id)} />
                  <ListItemText primary={payout.country} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Create Campaign
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateCampaignDialog;
