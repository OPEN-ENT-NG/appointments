import { Box, Button, Typography } from "@mui/material"
import { FC } from "react"
import { useTranslation } from "react-i18next";
import { spaceBetweenBoxStyle } from "~/styles/boxStyles"
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const MyAvailabilities: FC = () => {
    const { t } = useTranslation("appointments");
    
    return (
        <>
            <Box sx={spaceBetweenBoxStyle}>
                <Typography variant="h2">
                    {t("appointments.my.availability")}
                </Typography>
                <Button variant="contained">
                    <AddCircleIcon />
                    {t("appointments.create.grid")}
                </Button>
            </Box>
        </>
    )
}