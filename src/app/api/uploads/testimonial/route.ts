import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

type UploadedImage = {
  url: string;
  public_id: string;
  type: "image";
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const testimonialId = formData.get("testimonialId") as string;

    if (!testimonialId) {
      return NextResponse.json(
        { message: "testimonialId is required" },
        { status: 400 },
      );
    }

    const uploads: UploadedImage[] = [];
    const files = formData.getAll("images") as File[];

    if (!files.length) {
      return NextResponse.json({ files: uploads }, { status: 200 });
    }

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const result = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: `testimonials/${testimonialId}/images`,
              resource_type: "image",
            },
            (error, result) => {
              if (error || !result) reject(error);
              else resolve(result);
            },
          )
          .end(buffer);
      });

      uploads.push({
        url: result.secure_url,
        public_id: result.public_id,
        type: "image",
      });
    }

    return NextResponse.json({ files: uploads });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
};