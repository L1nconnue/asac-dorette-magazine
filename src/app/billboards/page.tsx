import BillboardsExplorer from "@/components/BillboardsExplorer";
import { getBillboards } from "@/lib/sheets";
import { proxiedPhoto } from "@/lib/photos";

export const dynamic = "force-dynamic";

const DEFAULT_STYLE = "/map-styles/themedia-dark.json";

function mapStyleFromEnv(value: string | undefined) {
  const candidate = value?.trim();
  if (!candidate) return DEFAULT_STYLE;
  if (candidate === DEFAULT_STYLE || candidate.startsWith("/map-styles/")) return candidate;
  return DEFAULT_STYLE;
}

export default async function BillboardsPage() {
  const payload = await getBillboards();
  const initial = {
    ...payload,
    billboards: payload.billboards.map((b) => ({
      ...b,
      photoFront: proxiedPhoto(b.photoFront) ?? "",
      photoContext: proxiedPhoto(b.photoContext) ?? "",
    })),
  };

  return <BillboardsExplorer initial={initial} mapStyle={mapStyleFromEnv(process.env.MAP_STYLE_URL)} />;
}
