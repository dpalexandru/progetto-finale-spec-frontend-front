

export type Product = {
  // obbligatori
  title: string;
  category: string;

  // descrizione base
  brand?: string;
  dogSize?: string[]; // taglie disponibili
  color?: string[];
  material?: string;
  noPull?: boolean; // anti-tiro (di solito pettorine)
  reflective?: boolean; // riflettente
  padded?: boolean; // imbottito
  adjustable?: boolean; // regolabile
  price?: number;
  // voti
  rating?: number;
  reviewCount?: number;
  //readonly
  readonly amazonUrl?: string;
  readonly amazonImgUrls?: string;
};
