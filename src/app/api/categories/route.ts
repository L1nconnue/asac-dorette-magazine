import { NextResponse } from "next/server";
import { getBillboards } from "@/lib/sheets";
import { MAGAZINES, PRINTERS, STATIONS } from "@/lib/catalogues";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { billboards, meta } = await getBillboards();
  return NextResponse.json({
    categories: [
      { key: "billboards", name: "Billboards", href: "/billboards", state: meta.source === "sheet" ? "active" : "sample", count: billboards.length },
      { key: "printers", name: "Printers", href: "/printers", state: "preview", count: PRINTERS.length },
      { key: "tv-radio", name: "TV & Radio", href: "/tv-radio", state: "preview", count: STATIONS.length },
    ],
    futureCategories: [
      { key: "magazines", name: "Magazines", href: "/magazines", state: "preview", count: MAGAZINES.length },
    ],
  });
}
