import CataloguePage from "@/components/CataloguePage";
import { MAGAZINES } from "@/lib/catalogues";

export default function MagazinesPage() {
  return <CataloguePage title="Magazines" items={MAGAZINES} />;
}
