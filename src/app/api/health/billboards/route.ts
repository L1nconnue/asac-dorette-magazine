import { NextResponse } from "next/server";
import { getBillboards } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Data quality check: what the sheet is missing, so it can be fixed at the source. */
export async function GET() {
  const { billboards, meta } = await getBillboards();
  const missing = (test: (b: (typeof billboards)[number]) => boolean) => billboards.filter(test).map((b) => b.structureId);

  return NextResponse.json({
    meta,
    counts: {
      total: billboards.length,
      missingCoordinates: missing((b) => b.lat === null || b.lng === null).length,
      missingPhoto: missing((b) => !b.photoFront).length,
      unknownOwner: missing((b) => !b.owner).length,
      unknownAvailability: missing((b) => b.availability === "Unknown").length,
      missingFormat: missing((b) => !b.formatSize).length,
    },
    structures: {
      missingCoordinates: missing((b) => b.lat === null || b.lng === null),
      missingPhoto: missing((b) => !b.photoFront),
      unknownOwner: missing((b) => !b.owner),
    },
  });
}
