import CataloguePage from "@/components/CataloguePage";
import { STATIONS } from "@/lib/catalogues";

export default function TvRadioPage() {
  return <CataloguePage title="TV & Radio" items={STATIONS} />;
}
