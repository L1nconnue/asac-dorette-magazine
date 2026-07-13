import { NextResponse } from "next/server";
import { getBillboards } from "@/lib/sheets";
import { proxiedPhoto } from "@/lib/photos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const force = new URL(request.url).searchParams.get("fresh") === "1";
  const { billboards, meta } = await getBillboards(force);

  return NextResponse.json(
    {
      billboards: billboards.map((b) => ({ ...b, photoFront: proxiedPhoto(b.photoFront), photoContext: proxiedPhoto(b.photoContext) })),
      meta,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
