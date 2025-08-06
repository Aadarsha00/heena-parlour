import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type {
  GalleryItem,
  GalleryResponse,
} from "../../interface/gallery.interface";
import { getAllGalleryImages } from "../../api/gallery.api";

export default function OurWork() {
  const {
    data: galleryData,
    isLoading,
    isError,
    error,
  } = useQuery<GalleryResponse, string>({
    queryKey: ["galleryImages", "ourWork"],
    queryFn: getAllGalleryImages,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    refetchOnWindowFocus: false,
  });

  // Process the data to get first 4 images excluding salon category
  const images =
    galleryData?.results
      ?.filter((img: GalleryItem) => img.category !== "salon")
      .slice(0, 4) || [];

  // Fallback images in case API fails or no images available
  const fallbackImages = [
    {
      id: 1,
      image_url: "/pictures/image1.jpg",
      caption: "Lash application",
      category: "lashes" as const,
      is_featured: false,
    },
    {
      id: 2,
      image_url: "/pictures/img2.jpg",
      caption: "Henna hands",
      category: "henna" as const,
      is_featured: false,
    },
    {
      id: 3,
      image_url: "/pictures/img4.jpg",
      caption: "Brow treatment",
      category: "brows" as const,
      is_featured: false,
    },
    {
      id: 4,
      image_url: "/pictures/services.jpg",
      caption: "Perfect brows",
      category: "brows" as const,
      is_featured: false,
    },
  ];

  const displayImages = images.length > 0 ? images : fallbackImages;

  return (
    <section className="bg-[#f7f6e7] py-12 text-center px-6">
      <h2 className="text-4xl font-bold mb-2 font-display">Our Work</h2>
      <p className="text-gray-700 mb-10">
        Browse our gallery to see examples of our threading, henna, and lash
        services
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <span className="ml-3 text-gray-600">Loading gallery...</span>
        </div>
      ) : isError ? (
        <div className="text-red-600 mb-10">
          <p>Unable to load gallery images: {error}</p>
          <p className="text-sm text-gray-600 mt-1">
            Showing sample images instead
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap justify-center gap-9 max-w-6xl mx-auto">
        {displayImages.map((img) => (
          <div
            key={img.id}
            className="w-[260px] h-[300px] overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={img.image_url}
              alt={img.caption || `${img.category} service`}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.src = "/pictures/placeholder.jpg"; // Add a placeholder image
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <Link
          to="/gallery"
          className="inline-flex items-center text-sm font-medium text-black hover:underline transition-colors duration-200"
        >
          View Full Gallery <span className="ml-2">→</span>
        </Link>
      </div>
    </section>
  );
}
