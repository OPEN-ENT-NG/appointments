import { ChangeEvent, useState } from "react";

interface CustomFile extends File {
  id: string;
}

const createCustomFile = (file: File, id: string): CustomFile => {
  return Object.assign(file, { id });
};

export const useFiles = () => {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [totalFilesSize, setTotalFilesSize] = useState<number>(0);

  const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const newFiles = Array.from(event.target.files).map((file) =>
      createCustomFile(file, crypto.randomUUID()),
    );
    setFiles((prev) => [...prev, ...newFiles]);
    setTotalFilesSize(
      (prev) => prev + newFiles.reduce((acc, file) => acc + file.size, 0),
    );
  };

  const handleDeleteFile = (file: CustomFile) => {
    setFiles((prev) => prev.filter((f) => f.id !== file.id));
  };

  return { files, totalFilesSize, handleAddFile, handleDeleteFile };
};
