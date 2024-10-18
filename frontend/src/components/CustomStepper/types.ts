export interface CustomStepperProps {
  page: number;
  setPage: (page: number) => void;
  handleCancel: () => void;
  handleSave: () => void;
}
