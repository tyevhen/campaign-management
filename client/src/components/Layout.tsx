import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useAtom } from "jotai";
import { getCampaignsAtom } from "../state/campaigns/atoms";
import { getPayoutsAtom } from "../state/payouts/atoms";

interface MainLayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<MainLayoutProps> = ({ children }) => {
  const [, fetchCampaigns] = useAtom(getCampaignsAtom);
  const [, fetchPayouts] = useAtom(getPayoutsAtom);

  useEffect(() => {
    fetchCampaigns();
    fetchPayouts();
  }, [fetchCampaigns, fetchPayouts]);

  return (
    <Container fixed>
      <Box
        sx={{
          height: "100vh",
          flex: 1,
          py: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Layout;
