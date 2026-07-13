import { NextResponse } from "next/server";
import { getBillboards } from "@/lib/sheets";
import { proxiedPhoto } from "@/lib/photos";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { billboards } = await getBillboards();
  const found = billboards.find((b) => b.structureId.toLowerCase() === id.toLowerCase());
  if (!found) return NextResponse.json({ error: "Billboard not found" }, { status: 404 });

  return NextResponse.json(
    { ...found, photoFront: proxiedPhoto(found.photoFront), photoContext: proxiedPhoto(found.photoContext) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
