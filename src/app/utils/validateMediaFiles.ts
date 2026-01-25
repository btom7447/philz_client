import { UploadFile } from "@/components/admin/properties/FileUploadInput";

const MAX_IMAGE_COUNT = 10;
const MAX_VIDEO_COUNT = 2;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB
const MAX_VIDEO_DURATION = 5 * 60; // 5 minutes in seconds

export const validateMediaFiles = async (files: UploadFile[]) => {
  const images = files.filter((f) => f.type === "image");
  const videos = files.filter((f) => f.type === "video");

  // Image validations
  if (images.length === 0) throw new Error("Please upload at least one image.");
  if (images.length > MAX_IMAGE_COUNT)
    throw new Error(`You can upload up to ${MAX_IMAGE_COUNT} images.`);
  for (const f of images) {
    if (!f.file) continue;
    if (!f.file.type.startsWith("image/"))
      throw new Error(`"${f.file.name}" is not a valid image.`);
    if (f.file.size > MAX_IMAGE_SIZE)
      throw new Error(`"${f.file.name}" exceeds 10MB.`);
  }

  // Video validations
  if (videos.length > MAX_VIDEO_COUNT)
    throw new Error(`You can upload up to ${MAX_VIDEO_COUNT} videos.`);

  for (const f of videos) {
    if (!f.file) continue;
    if (!f.file.type.startsWith("video/"))
      throw new Error(`"${f.file.name}" is not a valid video.`);
    if (f.file.size > MAX_VIDEO_SIZE)
      throw new Error(`"${f.file.name}" exceeds 50MB.`);

    // Check video duration
    const duration = await getVideoDuration(f.file);
    if (duration > MAX_VIDEO_DURATION) {
      throw new Error(
        `"${f.file.name}" is longer than 5 minutes (${formatTime(duration)}).`,
      );
    }
  }
};

// Helper: get video duration using HTMLVideoElement
const getVideoDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const video = document.createElement("video");
    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      resolve(video.duration); // seconds
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Cannot read video "${file.name}".`));
    };

    video.src = url;
  });
};

// Helper: format seconds to mm:ss
const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
};