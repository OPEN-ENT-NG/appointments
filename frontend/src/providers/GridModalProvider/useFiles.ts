import { ChangeEvent, useState } from "react";
import { MyCustomFile } from "./types";
import { createMyCustomFile } from "./utils";

export const useFiles = () => {
  const [files, setFiles] = useState<MyCustomFile[]>([]);
  const [totalFilesSize, setTotalFilesSize] = useState<number>(0);

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

  return { files, totalFilesSize, handleAddFile, handleDeleteFile };
};
