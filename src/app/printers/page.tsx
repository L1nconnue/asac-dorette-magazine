import CataloguePage from "@/components/CataloguePage";
import { PRINTERS } from "@/lib/catalogues";

export default function PrintersPage() {
  return <CataloguePage title="Printers" items={PRINTERS} />;
}
