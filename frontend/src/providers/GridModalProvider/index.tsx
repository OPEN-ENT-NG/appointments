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
import { APPOINTMENTS, TOAST_VALUES } from "~/core/constants";
import { CONFIRM_MODAL_TYPE } from "~/core/enums";
import {
  useBlurGridInputsReturnType,
  useUpdateGridInputsReturnType,
} from "~/hooks/types";
import { useBlurGridInputs } from "~/hooks/useBlurGridInputs";
import { useUpdateGridInputs } from "~/hooks/useUpdateGridInputs";
import { useGetCommunicationGroupsQuery } from "~/services/api/CommunicationService";
import {
  useCreateGridMutation,
  useEditGridMutation,
  useGetMyGridsNameQuery,
} from "~/services/api/GridService";
import {
  CreateGridPayload,
  EditGridPayload,
} from "~/services/api/GridService/types";
import { useGlobal } from "../GlobalProvider";
import { GRID_MODAL_TYPE, PAGE_TYPE } from "./enum";
import {
  GridModalInputs,
  GridModalProviderContextProps,
  GridModalProviderProps,
  InputsErrors,
} from "./types";
import { useFiles } from "./useFiles";
import {
  durationOptions,
  gridInputsToCreateGridPayload,
  gridInputsToEditGridPayload,
  initialErrorInputs,
  initialGridModalInputs,
  isErrorsEmpty,
  newErrorInputs,
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
  const [editGrid] = useEditGridMutation();
  const { t } = useTranslation(APPOINTMENTS);

  const {
    files,
    totalFilesSize,
    handleAddFile,
    handleDeleteFile,
    saveInWorkspace,
  } = useFiles();

  const [selectedGridId, setSelectedGridId] = useState<number>(-1);
  const [selectedGridName, setSelectedGridName] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [modalType, setModalType] = useState<GRID_MODAL_TYPE>(
    GRID_MODAL_TYPE.CREATION,
  );

  const [confirmModalType, setConfirmModalType] = useState<CONFIRM_MODAL_TYPE>(
    CONFIRM_MODAL_TYPE.CANCEL_GRID_CREATION,
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
      existingGridsNames?.filter((name) => name !== selectedGridName) ?? [],
    );

  const blurGridModalInputs: useBlurGridInputsReturnType = useBlurGridInputs(
    inputs,
    setErrorInputs,
    existingGridsNames?.filter((name) => name !== selectedGridName) ?? [],
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
    const newErrors = newErrorInputs(blurGridModalInputs);
    setErrorInputs(newErrors);
    if (!isErrorsEmpty(newErrors)) return;

    if (modalType === GRID_MODAL_TYPE.EDIT) {
      setConfirmModalType(CONFIRM_MODAL_TYPE.CONFIRM_GRID_EDIT);
      setIsDialogOpen(true);
      return;
    }

    const savingFiles = await saveInWorkspace();

    const payload: CreateGridPayload = gridInputsToCreateGridPayload(
      inputs,
      groups ?? [],
      savingFiles,
    );
    console.log(payload);
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
    modalType,
    saveInWorkspace,
    inputs,
    groups,
    createGrid,
    t,
    resetInputs,
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

  const handleCancel = useCallback(() => {
    switch (modalType) {
      case GRID_MODAL_TYPE.CREATION:
        setConfirmModalType(CONFIRM_MODAL_TYPE.CANCEL_GRID_CREATION);
        setIsDialogOpen(true);
        break;
      case GRID_MODAL_TYPE.EDIT:
        setConfirmModalType(CONFIRM_MODAL_TYPE.CANCEL_GRID_EDIT);
        setIsDialogOpen(true);
        break;
      case GRID_MODAL_TYPE.CONSULTATION:
        resetInputs();
        setIsModalOpen(false);
        break;
      default:
        break;
    }
  }, [modalType, resetInputs]);

  const handleCancelDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDialog = useCallback(async () => {
    if (confirmModalType === CONFIRM_MODAL_TYPE.CONFIRM_GRID_EDIT) {
      const payload: EditGridPayload = gridInputsToEditGridPayload(
        inputs,
        selectedGridId ?? 0,
      );
      try {
        await editGrid(payload).unwrap();
        toast.success(t(TOAST_VALUES.EDIT_GRID.i18nKeySuccess));
      } catch (error) {
        console.error(error);
        toast.error(t(TOAST_VALUES.EDIT_GRID.i18nKeyError));
      }
    }
    setIsDialogOpen(false);
    resetInputs();
    setPage(PAGE_TYPE.FIRST);
    setIsModalOpen(false);
  }, [confirmModalType, editGrid, inputs, resetInputs, selectedGridId, t]);

  const handleDisplayGridModal = useCallback(
    (type: GRID_MODAL_TYPE, gridId?: number, gridName?: string) => {
      setModalType(type);
      if (type === GRID_MODAL_TYPE.EDIT) {
        setSelectedGridId(gridId ?? -1);
        setSelectedGridName(gridName ?? "");
      }
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
      isDialogOpen,
      handleCancelDialog,
      handleConfirmDialog,
      handleDisplayGridModal,
      page,
      modalType,
      confirmModalType,
      files,
      totalFilesSize,
      handleAddFile,
      handleDeleteFile,
    }),
    [
      inputs,
      errorInputs,
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
      handleCancel,
      isDialogOpen,
      handleConfirmDialog,
      handleDisplayGridModal,
      page,
      modalType,
      confirmModalType,
      files,
      totalFilesSize,
      handleAddFile,
      handleDeleteFile,
    ],
  );

  return (
    <GridModalProviderContext.Provider value={value}>
      {children}
    </GridModalProviderContext.Provider>
  );
};
