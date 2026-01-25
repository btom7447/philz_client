import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/app/lib/cloudinary";

type UploadedMedia = {
  url: string;
  public_id: string;
  type: "image" | "video" | "floorPlan";
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const propertyId = formData.get("propertyId") as string;

    if (!propertyId) {
      return NextResponse.json(
        { message: "propertyId is required" },
        { status: 400 },
      );
    }

    const uploads: UploadedMedia[] = [];

    const fields = {
      images: { folder: "images", type: "image" },
      videos: { folder: "videos", type: "video" },
      floorPlans: { folder: "floor-plans", type: "floorPlan" },
    } as const;

    for (const [field, config] of Object.entries(fields)) {
      const files = formData.getAll(field) as File[];

      for (const file of files) {
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise<any>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: `properties/${propertyId}/${config.folder}`,
                resource_type: config.type === "video" ? "video" : "image",
              },
              (err, res) => {
                if (err || !res) reject(err);
                else resolve(res);
              },
            )
            .end(buffer);
        });

        uploads.push({
          url: result.secure_url,
          public_id: result.public_id,
          type: config.type,
        });
      }
    }

    return NextResponse.json({ files: uploads }, { status: 200 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
};