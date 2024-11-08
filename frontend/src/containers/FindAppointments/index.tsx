import { FC } from "react";

import { SearchInput } from "@cgi-learning-hub/ui";
import { Box } from "@mui/material";

import { containerStyle } from "./style";

export const FindAppointments: FC = () => {
  return (
    <Box sx={containerStyle}>
      <SearchInput />
      <Box>
        
      </Box>
    </Box>
  );
};
