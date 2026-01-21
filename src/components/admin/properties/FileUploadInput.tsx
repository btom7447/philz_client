"use client";

import { X } from "lucide-react";
import { FC } from "react";

export interface UploadFile {
  file: File | null; // local file
  url: string; // preview URL
  public_id?: string; // existing Cloudinary file ID
  type: "image" | "video" | "floorplan";
}

interface Props {
  files: UploadFile[];
  setFiles: (files: UploadFile[]) => void;
  mode: "image" | "video" | "floorplan";
  label: string;
  error?: string;
}

const FileUploadInput: FC<Props> = ({
  files,
  setFiles,
  mode,
  label,
  error,
}) => {
  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const newFiles: UploadFile[] = Array.from(e.target.files).map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      type: mode,
    }));

    setFiles([...files, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const f = files[index];
    if (f.file) URL.revokeObjectURL(f.url);
    setFiles(files.filter((_, i) => i !== index));
    if (f.public_id) console.log("Marked for deletion:", f.public_id);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label className="text-lg lg:text-xl font-semibold text-gray-700">
        {label}
      </label>

      {/* Preview list */}
      {files.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {files.map((f, i) => (
            <div key={i} className="relative shrink-0">
              {mode === "image" ? (
                <img
                  src={f.url}
                  alt={f.file?.name || "existing"}
                  className="w-30 h-24 object-cover rounded-lg border border-gray-400"
                />
              ) : (
                <video
                  src={f.url}
                  className="w-36 h-24 rounded-md border"
                  controls
                />
              )}
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="cursor-pointer absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
              >
                <X className="w-5 h-5" strokeWidth={1} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* File input */}
      <input
        type="file"
        accept={
          mode === "image" ? "image/*" : mode === "video" ? "video/*" : "*/*"
        }
        multiple
        onChange={handleFiles}
        className={`w-full rounded-lg border p-4 text-xl outline-none cursor-pointer
          transition focus-within:ring-purple-800 focus-within:border-0
          ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-purple-600 focus:ring-1 focus:ring-purple-600"}
        `}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default FileUploadInput;