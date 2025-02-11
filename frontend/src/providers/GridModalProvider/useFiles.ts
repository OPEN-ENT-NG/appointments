import { useWorkspaceFile } from "@edifice.io/react";
import { ChangeEvent, useState } from "react";
import { APPOINTMENTS } from "~/core/constants";
import { MyCustomFile } from "./types";
import { createMyCustomFile } from "./utils";

export const useFiles = () => {
  const [files, setFiles] = useState<MyCustomFile[]>([]);
  const [totalFilesSize, setTotalFilesSize] = useState<number>(0);
  const { create } = useWorkspaceFile();

  const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles = Array.from(event.target.files).map((file) =>
      createMyCustomFile(file),
    );
    setFiles((prev) => [...prev, ...newFiles]);
    setTotalFilesSize(
      (prev) => prev + newFiles.reduce((acc, file) => acc + file.size, 0),
    );
  };

  const handleDeleteFile = (file: MyCustomFile) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  const saveInWorkspace = async () => {
    const updatedFiles = await Promise.all(
      files.map(async (file) => {
        if (file.workspaceId) return file;
        const workspaceDocument = await create(file.file, {
          visibility: "protected",
          application: APPOINTMENTS,
        });
        return { ...file, workspaceId: workspaceDocument._id ?? "" };
      }),
    );
    return updatedFiles;
  };

  return {
    files,
    totalFilesSize,
    handleAddFile,
    handleDeleteFile,
    saveInWorkspace,
  };
};
