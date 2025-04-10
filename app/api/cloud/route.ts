// /app/api/cloudinary/assets/route.ts
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor") ?? undefined;

  try {
    const result = await cloudinary.v2.search
    .expression("resource_type:image AND folder:test AND uploaded_at>1d")
      .sort_by("public_id", "desc")
      .max_results(30)
      .next_cursor(cursor)
      .execute();

    return NextResponse.json({
      resources: result.resources.map((res) => ({
        public_id: res.public_id,
        secure_url: res.secure_url,
        format: res.format,
        width: res.width,
        height: res.height,
        created_at: res.created_at,
        tags: res.tags,
      })),
      next_cursor: result.next_cursor,
      total_count: result.total_count,
    });
  } catch (error) {
    console.error("Cloudinary search error", error);
    return NextResponse.json(
      { error: "Failed to fetch Cloudinary assets" },
      { status: 500 }
    );
  }
}
