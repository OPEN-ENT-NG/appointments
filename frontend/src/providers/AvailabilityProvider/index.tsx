import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { DialogModalProps } from "~/components/DialogModal/types";
import {
  CONFIRM_MODAL_VALUES,
  GRID_PER_PAGE,
  TOAST_VALUES,
} from "~/core/constants";
import { CONFIRM_MODAL_TYPE, GRID_STATE } from "~/core/enums";
import { useGetAvailableAppointmentsQuery } from "~/services/api/AppointmentService";
import {
  useDeleteGridMutation,
  useGetMyGridsQuery,
  useRestoreGridMutation,
  useSuspendGridMutation,
} from "~/services/api/GridService";
import { useGlobal } from "../GlobalProvider";
import { GRID_TYPE } from "./enum";
import {
  AvailabilityProviderContextProps,
  AvailabilityProviderProps,
  GridList,
  GridPages,
  GridTypeLength,
} from "./types";
import {
  initialDialogModalProps,
  initialGrids,
  initialGridsLength,
  initialPages,
} from "./utils";

const AvailabilityProviderContext =
  createContext<AvailabilityProviderContextProps | null>(null);

export const useAvailability = () => {
  const context = useContext(AvailabilityProviderContext);
  if (!context) {
    throw new Error(
      "useAvailability must be used within a AvailabilityProvider",
    );
  }
  return context;
};

export const AvailabilityProvider: FC<AvailabilityProviderProps> = ({
  children,
}) => {
  const { hasManageRight } = useGlobal();
  const { t } = useTranslation("appointments");
  const [gridPages, setGridPages] = useState<GridPages>(initialPages);
  const [grids, setGrids] = useState<GridList>(initialGrids);
  const [gridsLength, setGridsLength] =
    useState<GridTypeLength>(initialGridsLength);
  const [selectedGridId, setSelectedGridId] = useState<number | null>(null);
  const [dialogModalProps, setDialogModalProps] = useState<DialogModalProps>(
    initialDialogModalProps,
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const { data: myInProgressData, isLoading: isLoadingInProgress } =
    useGetMyGridsQuery(
      {
        states: [GRID_STATE.OPEN, GRID_STATE.SUSPENDED],
        page: gridPages[GRID_TYPE.IN_PROGRESS],
        limit: GRID_PER_PAGE,
      },
      { skip: !hasManageRight },
    );

  const { data: myClosedData, isLoading: isLoadingClosed } = useGetMyGridsQuery(
    {
      states: [GRID_STATE.CLOSED],
      page: gridPages[GRID_TYPE.CLOSED],
      limit: GRID_PER_PAGE,
    },
    { skip: !hasManageRight },
  );

  const { data: availableAppointments } = useGetAvailableAppointmentsQuery(
    selectedGridId as number,
    { skip: !selectedGridId },
  );

  const [deleteGrid] = useDeleteGridMutation();
  const [suspendGrid] = useSuspendGridMutation();
  const [restoreGrid] = useRestoreGridMutation();

  const handleChangePage = useCallback(
    (gridType: GRID_TYPE, newPage: number) => {
      setGridPages((prevGridPages) => ({
        ...prevGridPages,
        [gridType]: newPage,
      }));
    },
    [],
  );

  const handleDeleteGrid = useCallback(
    async (gridId: number, deleteAppointments: boolean) => {
      try {
        await deleteGrid({ gridId, deleteAppointments }).unwrap();
        toast.success(t(TOAST_VALUES.DELETE_GRID.i18nKeySuccess));
      } catch (error) {
        console.error(error);
        toast.error(t(TOAST_VALUES.DELETE_GRID.i18nKeyError));
      }
    },
    [deleteGrid, t],
  );

  const handleSuspendGrid = useCallback(
    async (gridId: number, deleteAppointments: boolean) => {
      try {
        await suspendGrid({ gridId, deleteAppointments }).unwrap();
        toast.success(t(TOAST_VALUES.SUSPEND_GRID.i18nKeySuccess));
      } catch (error) {
        console.error(error);
        toast.error(t(TOAST_VALUES.SUSPEND_GRID.i18nKeyError));
      }
    },
    [suspendGrid, t],
  );

  const handleRestoreGrid = useCallback(
    async (gridId: number) => {
      try {
        await restoreGrid({ gridId }).unwrap();
        toast.success(t(TOAST_VALUES.RESTORE_GRID.i18nKeySuccess));
      } catch (error) {
        console.error(error);
        toast.error(t(TOAST_VALUES.RESTORE_GRID.i18nKeyError));
      }
    },
    [restoreGrid, t],
  );

  const handleOpenDialogModal = useCallback(
    (gridId: number, type: CONFIRM_MODAL_TYPE) => {
      setSelectedGridId(gridId);
      setDialogModalProps({
        open: false,
        title: t(CONFIRM_MODAL_VALUES[type].titleKey),
        description: t(CONFIRM_MODAL_VALUES[type].descriptionKey),
        question: t(CONFIRM_MODAL_VALUES[type].questionKey),
        options: [
          t("appointments.confirm.modal.option.preserve.them"),
          t("appointments.confirm.modal.option.cancel.them"),
        ],
        selectedOption: selectedOption,
        handleOptionChange: (option: string) => {
          // setSelectedOption(option);
        },
        handleCancel: async () => {
          setSelectedGridId(null);
          setDialogModalProps(initialDialogModalProps);
        },
        handleConfirm: async () => {
          if (type === CONFIRM_MODAL_TYPE.DELETE_GRID) {
            handleDeleteGrid(
              gridId,
              selectedOption ===
                t("appointments.confirm.modal.option.preserve.them"),
            );
          } else if (type === CONFIRM_MODAL_TYPE.SUSPEND_GRID) {
            handleSuspendGrid(
              gridId,
              selectedOption ===
                t("appointments.confirm.modal.option.preserve.them"),
            );
          } else if (type === CONFIRM_MODAL_TYPE.RESTORE_GRID) {
            handleRestoreGrid(gridId);
          }
          setSelectedGridId(null);
          setDialogModalProps(initialDialogModalProps);
        },
      });
    },
    [handleDeleteGrid, handleRestoreGrid, handleSuspendGrid, selectedOption, t],
  );

  useEffect(() => {
    if (availableAppointments && selectedGridId) {
      if (availableAppointments.length) {
        const newSelectedOption = t(
          "appointments.confirm.modal.option.preserve.them",
        );
        console.log("newSelectedOption", newSelectedOption);
        setSelectedOption(newSelectedOption);
      }
      // setDialogModalProps((prevDialogModalProps) => ({
      //   ...prevDialogModalProps,
      //   open: true,
      // }));
    }
    // else {
    //   setSelectedOption(null);
    // }
  }, [availableAppointments, selectedGridId, t]);

  useEffect(() => {
    const myInProgressGrids = myInProgressData?.grids;
    const myInProgressGridsLength = myInProgressData?.total;

    if (myInProgressGrids) {
      setGrids((prevGrids) => ({
        ...prevGrids,
        [GRID_TYPE.IN_PROGRESS]: myInProgressGrids,
      }));
    }

    if (myInProgressGridsLength) {
      setGridsLength((prevGridsLength) => ({
        ...prevGridsLength,
        [GRID_TYPE.IN_PROGRESS]: myInProgressGridsLength,
      }));
    }
  }, [myInProgressData]);

  useEffect(() => {
    const myClosedGrids = myClosedData?.grids;
    const myClosedGridsLength = myClosedData?.total;

    if (myClosedGrids) {
      setGrids((prevGrids) => ({
        ...prevGrids,
        [GRID_TYPE.CLOSED]: myClosedGrids,
      }));
    }

    if (myClosedGridsLength) {
      setGridsLength((prevGridsLength) => ({
        ...prevGridsLength,
        [GRID_TYPE.CLOSED]: myClosedGridsLength,
      }));
    }
  }, [myClosedData]);

  const isLoading = isLoadingInProgress || isLoadingClosed;

  const value = useMemo<AvailabilityProviderContextProps>(
    () => ({
      gridPages,
      gridTypeLengths: gridsLength,
      currentGridList: grids,
      isLoading,
      dialogModalProps,
      handleChangePage,
      handleOpenDialogModal,
    }),
    [
      gridPages,
      gridsLength,
      grids,
      isLoading,
      dialogModalProps,
      handleChangePage,
      handleOpenDialogModal,
    ],
  );

  return (
    <AvailabilityProviderContext.Provider value={value}>
      {children}
    </AvailabilityProviderContext.Provider>
  );
};
