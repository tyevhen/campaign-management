import React from "react";
import {
  TextField,
  Button,
  Grid2,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useAtom } from "jotai";
import { searchAtom } from "../state/search/atoms";
import { searchCampaignsAtom } from "../state/campaigns/atoms";

const SearchComponent: React.FC = () => {
  const [search, setSearch] = useAtom(searchAtom);
  const [, searchCampaigns] = useAtom(searchCampaignsAtom);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, title: e.target.value });
  };

  const handleLandingPageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch({ ...search, landingPageUrl: e.target.value });
  };

  const handleShowStoppedCampaignsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch({
      ...search,
      showStoppedCampaigns: e.target.checked,
    });
  };

  const handleSearchSubmit = async () => {
    await searchCampaigns();
  };

  return (
    <Grid2 container sx={{ mt: 3, mb: 3 }} spacing={2} alignItems="center">
      <Grid2>
        <TextField
          label="Search by Title"
          variant="outlined"
          fullWidth
          value={search.title}
          onChange={handleTitleChange}
        />
      </Grid2>
      <Grid2>
        <TextField
          label="Search by Landing Page URL"
          variant="outlined"
          fullWidth
          value={search.landingPageUrl}
          onChange={handleLandingPageUrlChange}
        />
      </Grid2>
      <Grid2>
        <FormControlLabel
          control={
            <Checkbox
              checked={search.showStoppedCampaigns}
              onChange={handleShowStoppedCampaignsChange}
              color="primary"
            />
          }
          label="Show stopped campaigns"
        />
      </Grid2>
      <Grid2>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearchSubmit}
          fullWidth
        >
          Search
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default SearchComponent;
