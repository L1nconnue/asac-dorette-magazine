import HomePageClient from "@/components/HomePageClient";
import { getBillboards } from "@/lib/sheets";
import { PRINTERS, STATIONS } from "@/lib/catalogues";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { billboards, meta } = await getBillboards();

  const categories = [
    {
      href: "/billboards",
      key: "billboards" as const,
      count: billboards.length,
      state: meta.source === "sheet" ? ("live" as const) : ("sample" as const),
    },
    { href: "/printers", key: "printers" as const, count: PRINTERS.length, state: "preview" as const },
    { href: "/tv-radio", key: "tvRadio" as const, count: STATIONS.length, state: "preview" as const },
  ];

  return <HomePageClient categories={categories} />;
}
