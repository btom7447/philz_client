"use client";

import { FC } from "react";
import FileUploadInput, { UploadFile } from "../FileUploadInput";

interface Props {
  files: UploadFile[];
  setFiles: (files: UploadFile[]) => void;
}

const MediaTab: FC<Props> = ({ files, setFiles }) => {
  const updateFiles = (
    type: "image" | "video" | "floorplan",
    newFiles: UploadFile[],
  ) => {
    // Merge new files of this type with existing ones of other types
    setFiles([...files.filter((f) => f.type !== type), ...newFiles]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
      <FileUploadInput
        label="Images"
        mode="image"
        files={files.filter((f) => f.type === "image")}
        setFiles={(newFiles) => updateFiles("image", newFiles)}
      />
      <FileUploadInput
        label="Videos"
        mode="video"
        files={files.filter((f) => f.type === "video")}
        setFiles={(newFiles) => updateFiles("video", newFiles)}
      />
      <FileUploadInput
        label="Floor Plan"
        mode="floorplan"
        files={files.filter((f) => f.type === "floorplan")}
        setFiles={(newFiles) => updateFiles("floorplan", newFiles)}
      />
    </div>
  );
};

export default MediaTab;