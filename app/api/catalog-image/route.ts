import { NextResponse, type NextRequest } from "next/server";

const DRIVE_ID_PATTERN = /^[\w-]+$/;

function fallback(request: NextRequest) {
  return NextResponse.redirect(new URL("/categories/gadgets.svg", request.url));
}

export async function GET(request: NextRequest) {
  const fileId = request.nextUrl.searchParams.get("id");
  if (!fileId || !DRIVE_ID_PATTERN.test(fileId)) return fallback(request);

  try {
    const response = await fetch(
      `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`,
      { next: { revalidate: 300 } }
    );
    const contentType = response.headers.get("content-type") ?? "";
    if (!response.ok || !contentType.startsWith("image/")) return fallback(request);

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=300, stale-while-revalidate=300",
      },
    });
  } catch {
    return fallback(request);
  }
}
