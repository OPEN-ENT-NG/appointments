import { Public } from "~/providers/GridModalProvider/types";


export interface CustomMultiAutocompleteProps {
    options : Public[];
    selectedPublic : Public[];
    handleSelectedChange : (selectedPublic : Public[]) => void;
}