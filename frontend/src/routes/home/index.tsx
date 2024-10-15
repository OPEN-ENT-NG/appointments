import React from "react";

import { ID } from "edifice-ts-client";
import { Box, Typography } from "@mui/material";
import { homeStyle } from "./style";

export interface AppProps {
  _id: string;
  created: Date;
  description: string;
  map: string;
  modified: Date;
  name: string;
  owner: { userId: ID; displayName: string };
  shared: any[];
  thumbnail: string;
}

export const Home: React.FC = () => {
  return (
    <Box sx={homeStyle}>
      <Typography variant="h1">Home</Typography>
    </Box>
  );
};
