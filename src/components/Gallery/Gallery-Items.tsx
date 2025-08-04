import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  CategoryMap,
  GalleryCategory,
} from "../../interface/gallery.interface";
import {
  getAllGalleryImages,
  getGalleryImagesWithFilters,
} from "../../api/gallery.api";

export default function GalleryItems() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Map your API categories to display names
  const categoryMap: CategoryMap = {
    All: "All",
    threading: "Eyebrow Threading",
    lashes: "Lash Services",
    hair: "Hair Services",
    party: "Party & Events",
  };

  const categories = Object.values(categoryMap);

  // Get the API category key from display name
  const getApiCategory = (displayName: string): GalleryCategory | undefined => {
    const entry = Object.entries(categoryMap).find(
      ([display]) => display === displayName
    );
    return entry ? (entry[0] as GalleryCategory) : undefined;
  };

  // Query for gallery images with filtering
  const {
    data: galleryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["gallery-images", selectedCategory],
    queryFn: () => {
      if (selectedCategory === "All") {
        return getAllGalleryImages();
      } else {
        const apiCategory = getApiCategory(selectedCategory);
        return getGalleryImagesWithFilters({
          category: apiCategory,
        });
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const galleryItems = galleryData?.results || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#F5F3E3] min-h-screen py-14 px-6 font-serif">
        <h2 className="text-4xl font-bold text-center mb-2">Our Gallery</h2>
        <p className="text-center text-sm text-gray-700 mb-8">
          Explore Our Portfolio Of Beautiful Transformations
        </p>

        {/* Loading skeleton */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-32 h-8 bg-gray-200 rounded-full animate-pulse"
            ></div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white shadow-sm">
              <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
              <div className="p-3 border-t bg-gray-100">
                <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="bg-[#F5F3E3] min-h-screen py-14 px-6 font-serif">
        <h2 className="text-4xl font-bold text-center mb-2">Our Gallery</h2>
        <p className="text-center text-sm text-gray-700 mb-8">
          Explore Our Portfolio Of Beautiful Transformations
        </p>

        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Error Loading Gallery
            </h3>
            <p className="text-red-600 text-sm">
              {error instanceof Error
                ? error.message
                : "Failed to load gallery images. Please try again later."}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F3E3] min-h-screen py-14 px-6 font-serif">
      <h2 className="text-4xl font-bold text-center mb-2">Our Gallery</h2>
      <p className="text-center text-sm text-gray-700 mb-8">
        Explore Our Portfolio Of Beautiful Transformations
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm transition-colors ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black border border-black hover:bg-gray-50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {galleryItems.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">
            No images found for this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Construct full URL if needed */}
              <img
                src={
                  item.image_url.startsWith("http")
                    ? item.image_url
                    : `https://api-beautiful-eyebrow.ctrlbits.xyz${item.image_url}`
                }
                alt={item.caption}
                className="w-full h-48 object-cover"
                loading="lazy"
                onLoad={() => {
                  console.log("✅ Image loaded successfully:", item.image_url);
                }}
                onError={(e) => {
                  console.log("❌ Failed to load image:", item.image_url);
                  console.log(
                    "❌ Constructed URL:",
                    item.image_url.startsWith("http")
                      ? item.image_url
                      : `https://api-beautiful-eyebrow.ctrlbits.xyz${item.image_url}`
                  );
                  console.log("Full item data:", item);
                  // Create a more subtle placeholder
                  const placeholderSvg = `data:image/svg+xml;base64,${btoa(`
                    <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                      <rect width="400" height="400" fill="#f8f9fa"/>
                      <circle cx="200" cy="180" r="20" fill="#dee2e6"/>
                      <rect x="185" y="165" width="30" height="20" rx="2" fill="#f8f9fa"/>
                      <rect x="190" y="170" width="20" height="2" fill="#6c757d"/>
                      <rect x="190" y="175" width="15" height="2" fill="#6c757d"/>
                      <text x="200" y="220" font-family="Arial, sans-serif" font-size="12" fill="#6c757d" text-anchor="middle">Loading...</text>
                    </svg>
                  `)}`;
                  e.currentTarget.src = placeholderSvg;
                }}
              />
              <div className="p-3 border-t bg-gray-100">
                <h3 className="text-sm font-semibold">{item.caption}</h3>
                <p className="text-xs text-gray-600 mt-1 capitalize">
                  {item.category}
                </p>
                {item.is_featured && (
                  <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Results count */}
      {galleryData && (
        <div className="text-center mt-8 text-sm text-gray-600">
          Showing {galleryItems.length} of {galleryData.count} images
        </div>
      )}
    </div>
  );
}
