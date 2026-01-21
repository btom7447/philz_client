import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import cloudinary from "@/app/lib/cloudinary";

export const POST = async (req: NextRequest): Promise<Response> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const images = formData.getAll("images") as File[];
    const videos = formData.getAll("videos") as File[];

    const upload = async (
      file: File,
      folder: string,
      resource_type: "image" | "video",
    ) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      return new Promise<{
        url: string;
        public_id: string;
        resource_type: "image" | "video";
      }>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder, resource_type }, (err, result) => {
            if (err || !result) return reject(err);

            resolve({
              url: result.secure_url,
              public_id: result.public_id,
              resource_type,
            });
          })
          .end(buffer);
      });
    };

    const imageUrls = await Promise.all(
      images.map((f) => upload(f, "philz-properties/images", "image")),
    );

    const videoUrls = await Promise.all(
      videos.map((f) => upload(f, "philz-properties/videos", "video")),
    );

    // rebuild payload
    const payload: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (key !== "images" && key !== "videos") {
        try {
          payload[key] = JSON.parse(value as string);
        } catch {
          payload[key] = value;
        }
      }
    });

    payload.images = imageUrls;
    payload.videos = videoUrls;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/properties`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error("Create property error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};