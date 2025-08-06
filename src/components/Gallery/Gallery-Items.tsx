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
  const categoryMap: CategoryMap = {
    All: "All",
    brows: "Eye Brows",
    henna: "Henna",
    lashes: "Lashes",
    salon: "Salon",
  };

  const categories = Object.values(categoryMap);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Map display label back to API key
  const getApiCategory = (displayName: string): GalleryCategory | undefined => {
    const entry = Object.entries(categoryMap).find(
      ([, label]) => label === displayName
    );
    return entry ? (entry[0] as GalleryCategory) : undefined;
  };

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
    staleTime: 5 * 60 * 1000,
  });

  const galleryItems = galleryData?.results || [];

  return (
    <div className="bg-[#F5F3E3] min-h-screen py-14 px-6 font-serif">
      <h2 className="text-4xl font-bold text-center mb-2">Our Gallery</h2>
      <p className="text-center text-sm text-gray-700 mb-8">
        Explore Our Portfolio Of Beautiful Transformations
      </p>

      {/* Category Buttons */}
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

      {/* Loading State */}
      {isLoading && (
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
      )}

      {/* Error State */}
      {isError && (
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
      )}

      {/* Gallery Grid */}
      {!isLoading && !isError && (
        <>
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
                  <img
                    src={
                      item.image_url.startsWith("http")
                        ? item.image_url
                        : `https://api-beautiful-eyebrow.ctrlbits.xyz${item.image_url}`
                    }
                    alt={item.caption || "Gallery image"}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                    onError={(e) => {
                      const placeholderSvg = `data:image/svg+xml;base64,${btoa(`
                        <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                          <rect width="400" height="400" fill="#f8f9fa"/>
                          <text x="200" y="200" font-size="16" text-anchor="middle" fill="#ccc">Image not found</text>
                        </svg>
                      `)}`;
                      e.currentTarget.src = placeholderSvg;
                    }}
                  />
                  <div className="p-3 border-t bg-gray-100">
                    <h3 className="text-sm font-semibold">
                      {item.caption || "Untitled"}
                    </h3>
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
          <div className="text-center mt-8 text-sm text-gray-600">
            Showing {galleryItems.length} of {galleryData?.count} images
          </div>
        </>
      )}
    </div>
  );
}
