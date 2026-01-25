export const optimizeCloudinary = (
  url: string,
  width?: number,
  type: "image" | "video" = "image",
) => {
  if (!url.includes("cloudinary")) return url;

  const parts = url.split("/upload/");
  if (parts.length !== 2) return url;

  const transformations = [width ? `w_${width}` : null, "q_auto", "f_auto"]
    .filter(Boolean)
    .join(",");

  if (type === "video") {
    return `${parts[0]}/upload/so_0,${transformations}/${parts[1].replace(/\.\w+$/, ".jpg")}`;
  }

  return `${parts[0]}/upload/${transformations}/${parts[1]}`;
};