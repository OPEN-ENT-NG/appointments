import { Modal } from "@mui/material";
import { FC } from "react";
import { useGlobalProvider } from "~/providers/GlobalProvider";

export const GridModal: FC = () => {
    const { 
        displayModals : { grid },
        handleDisplayModal,
    } = useGlobalProvider();
    return (
        <Modal>
            <div>
                <h2>Modal</h2>
            </div>
        </Modal>
    )
}