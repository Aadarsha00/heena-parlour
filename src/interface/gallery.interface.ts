// Gallery category types
export type GalleryCategory = "hair" | "lashes" | "threading" | "party";

// Gallery image interface -
export interface GalleryImage {
  id: number;
  caption: string;
  image_url: string;
  category: GalleryCategory;
  is_featured: boolean;
}

// Gallery response interface (for paginated responses)
export interface GalleryResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GalleryImage[];
}

// Grouped gallery response (for by_category endpoint)
export interface GroupedGalleryResponse {
  [key: string]: GalleryImage[];
}

// Category display mapping type
export interface CategoryMap {
  [key: string]: string;
}

// API filter parameters interface
export interface GalleryFilterParams {
  category?: GalleryCategory;
  is_featured?: boolean;
}
