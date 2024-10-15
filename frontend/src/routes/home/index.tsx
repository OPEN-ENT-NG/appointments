import React from "react";

import { ID } from "edifice-ts-client";
import { Box, Typography } from "@mui/material";
import { homeStyle, titleStyle } from "./style";
import { useTranslation } from "react-i18next";
import { MyAvailabilities } from "~/containers/MyAvailabilities";

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

  const { t } = useTranslation("appointments");
  
  return (
    <Box sx={homeStyle}>
      <Box sx={titleStyle}>
      <Typography variant="h1">
        {t("appointments.title")}
      </Typography>
      </Box>
      <MyAvailabilities />
    </Box>
  );
};
