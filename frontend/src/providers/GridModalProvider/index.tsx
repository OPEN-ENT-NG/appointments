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
import { TOAST_VALUES } from "~/core/constants";
import {
  useBlurGridInputsReturnType,
  useUpdateGridInputsReturnType,
} from "~/hooks/types";
import { useBlurGridInputs } from "~/hooks/useBlurGridInputs";
import { useUpdateGridInputs } from "~/hooks/useUpdateGridInputs";
import { useGetCommunicationGroupsQuery } from "~/services/api/CommunicationService";
import {
  useCreateGridMutation,
  useGetMyGridsNameQuery,
} from "~/services/api/GridService";
import { CreateGridPayload } from "~/services/api/GridService/types";
import { useGlobal } from "../GlobalProvider";
import { GRID_MODAL_TYPE, PAGE_TYPE } from "./enum";
import {
  GridModalInputs,
  GridModalProviderContextProps,
  GridModalProviderProps,
  InputsErrors,
} from "./types";
import {
  durationOptions,
  gridInputsToGridPayload,
  initialErrorInputs,
  initialGridModalInputs,
  periodicityOptions,
} from "./utils";

const GridModalProviderContext =
  createContext<GridModalProviderContextProps | null>(null);

export const useGridModal = () => {
  const context = useContext(GridModalProviderContext);
  if (!context) {
    throw new Error("useGridModal must be used within a GridModalProvider");
  }
  return context;
};

export const GridModalProvider: FC<GridModalProviderProps> = ({ children }) => {
  const { structures, hasManageRight } = useGlobal();
  const [createGrid] = useCreateGridMutation();
  const { t } = useTranslation("appointments");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [modalType, setModalType] = useState<GRID_MODAL_TYPE>(
    GRID_MODAL_TYPE.CREATION,
  );

  const [page, setPage] = useState<PAGE_TYPE>(PAGE_TYPE.FIRST);

  const [inputs, setInputs] = useState<GridModalInputs>(
    initialGridModalInputs(structures),
  );

  const [errorInputs, setErrorInputs] =
    useState<InputsErrors>(initialErrorInputs);

  useEffect(() => {
    if (structures.length)
      setInputs((prev) => ({
        ...prev,
        structure: structures[0],
      }));
  }, [structures]);

  const { data: groups, refetch: refetchGroups } =
    useGetCommunicationGroupsQuery(inputs.structure.id, {
      skip: !(inputs.structure.id && hasManageRight),
    });

  const { data: existingGridsNames } = useGetMyGridsNameQuery(undefined, {
    skip: !hasManageRight,
  });

  const updateGridModalInputs: useUpdateGridInputsReturnType =
    useUpdateGridInputs(
      inputs,
      setInputs,
      setErrorInputs,
      structures,
      existingGridsNames ?? [],
    );

  const blurGridModalInputs: useBlurGridInputsReturnType = useBlurGridInputs(
    inputs,
    setErrorInputs,
    existingGridsNames ?? [],
  );

  const updateFirstPageErrors = useCallback(() => {
    blurGridModalInputs.handleNameBlur();
    blurGridModalInputs.handleVideoCallLinkBlur();
  }, [blurGridModalInputs]);

  const resetInputs = useCallback(() => {
    setInputs(initialGridModalInputs(structures));
    setErrorInputs(initialErrorInputs);
  }, [structures]);

  const handleSubmit = useCallback(async () => {
    const newErrors = {
      name: blurGridModalInputs.newNameError,
      videoCallLink: blurGridModalInputs.newVideoCallLinkError,
      validityPeriod: blurGridModalInputs.newValidityPeriodError,
      weekSlots: blurGridModalInputs.newWeekSlotsError,
      slots: blurGridModalInputs.newSlotsError,
    };
    setErrorInputs(newErrors);
    if (
      newErrors.name ||
      newErrors.videoCallLink ||
      newErrors.validityPeriod ||
      newErrors.weekSlots ||
      newErrors.slots.ids.length
    )
      return;

    const payload: CreateGridPayload = gridInputsToGridPayload(
      inputs,
      groups ?? [],
    );
    try {
      await createGrid(payload).unwrap();
      toast.success(t(TOAST_VALUES.CREATE_GRID.i18nKeySuccess));
      resetInputs();
      setPage(PAGE_TYPE.FIRST);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error(t(TOAST_VALUES.CREATE_GRID.i18nKeyError));
    }
  }, [
    blurGridModalInputs,
    createGrid,
    groups,
    inputs,
    resetInputs,
    setPage,
    setIsModalOpen,
    t,
  ]);

  const handlePrev = () => {
    setPage(PAGE_TYPE.FIRST);
  };

  const handleNext = useCallback(() => {
    const newErrors = {
      name: blurGridModalInputs.newNameError,
      videoCallLink: blurGridModalInputs.newVideoCallLinkError,
      validityPeriod: "",
      weekSlots: "",
      slots: {
        ids: [],
        error: "",
      },
    };
    setErrorInputs(newErrors);
    if (newErrors.name || newErrors.videoCallLink) return;
    setPage(PAGE_TYPE.SECOND);
  }, [blurGridModalInputs]);

  const handleCancel = () => {
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(true);
  };

  const handleCancelDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDialog = useCallback(() => {
    setIsDialogOpen(false);
    resetInputs();
    setPage(PAGE_TYPE.FIRST);
    setIsModalOpen(false);
  }, [resetInputs]);

  const handleDisplayGridModal = useCallback(
    (type: GRID_MODAL_TYPE) => {
      setModalType(type);
      setIsModalOpen(true);
    },
    [setIsModalOpen],
  );

  const isDisplayFirstPage = useMemo(
    () =>
      modalType === GRID_MODAL_TYPE.EDIT ||
      modalType === GRID_MODAL_TYPE.CONSULTATION ||
      page === PAGE_TYPE.FIRST,
    [modalType, page],
  );

  const isDisplaySecondPage = useMemo(
    () =>
      modalType === GRID_MODAL_TYPE.EDIT ||
      modalType === GRID_MODAL_TYPE.CONSULTATION ||
      page === PAGE_TYPE.SECOND,
    [modalType, page],
  );

  useEffect(() => {
    if (inputs.structure.id && hasManageRight) refetchGroups();
  }, [hasManageRight, inputs.structure, refetchGroups]);

  const value = useMemo<GridModalProviderContextProps>(
    () => ({
      inputs,
      setInputs,
      errorInputs,
      setErrorInputs,
      existingGridsNames: existingGridsNames ?? [],
      structureOptions: structures,
      publicOptions: groups ?? [],
      durationOptions,
      periodicityOptions,
      updateGridModalInputs,
      blurGridModalInputs,
      updateFirstPageErrors,
      resetInputs,
      isDisplayFirstPage,
      isDisplaySecondPage,
      handlePrev,
      handleNext,
      handleSubmit,
      isModalOpen,
      handleCancel,
      handleClose,
      isDialogOpen,
      handleCancelDialog,
      handleConfirmDialog,
      handleDisplayGridModal,
      page,
      modalType,
    }),
    [
      inputs,
      errorInputs,
      existingGridsNames,
      structures,
      groups,
      updateGridModalInputs,
      blurGridModalInputs,
      updateFirstPageErrors,
      resetInputs,
      isDisplayFirstPage,
      isDisplaySecondPage,
      handleNext,
      handleSubmit,
      isModalOpen,
      isDialogOpen,
      handleConfirmDialog,
      handleDisplayGridModal,
      page,
      modalType,
    ],
  );

  return (
    <GridModalProviderContext.Provider value={value}>
      {children}
    </GridModalProviderContext.Provider>
  );
};
