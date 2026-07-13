export type Billboard = {
  id: string;
  structureId: string;
  faceIds: string[];
  faceCount: number | null;
  facesOrientation: string;
  city: string;
  arrondissementCode: string;
  arrondissementName: string;
  neighborhood: string;
  roadAxis: string;
  lat: number | null;
  lng: number | null;
  formatSize: string;
  mediaType: string;
  owner: string;
  availability: Availability;
  condition: Condition;
  hasLights: TriState;
  photoFront: string;
  photoContext: string;
  lastVerified: string;
  status: string;
  notes: string;
  monthlyPriceXaf: number | null;
  priceSource: string;
};

export type Availability = "Available" | "Occupied" | "Removed" | "Unknown";
export type Condition = "Good" | "Damaged" | "To Check" | "Unknown";
export type TriState = "Yes" | "No" | "Unknown";

export type BillboardPayload = {
  billboards: Billboard[];
  meta: {
    total: number;
    withCoordinates: number;
    source: "sheet" | "sample";
    updatedAt: string;
    stale: boolean;
    message?: string;
  };
};

export type CategoryKey = "billboards" | "printers" | "tv-radio" | "magazines";

export type Category = {
  key: CategoryKey;
  name: string;
  tagline: string;
  href: string;
  state: "active" | "preview" | "coming-soon";
  count?: number;
};
