import { Public } from "~/containers/GridModal/types";

export interface CustomMultiAutocompleteProps {
    publicList : Public[];
    selectedPublic : Public[];
    setSelectedPublic : (selectedPublic : Public[]) => void;
}