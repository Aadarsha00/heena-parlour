import { useState } from "react";

export default function GalleryItems() {
  const categories = [
    "All",
    "Eyebrow Threading",
    "Henna Designs",
    "Lash Services",
    "Combination Works",
  ];

  const galleryItems = [
    {
      id: 1,
      category: "Eyebrow Threading",
      title: "Natural Arch Shaping",
      description: "Precision threading for a natural arch",
      image: "https://source.unsplash.com/random/400x400/?eyebrows",
    },
    {
      id: 2,
      category: "Eyebrow Threading",
      title: "Bold Definition",
      description: "Strong, defined brows with perfect symmetry",
      image: "https://source.unsplash.com/random/400x400/?brows",
    },
    {
      id: 3,
      category: "Henna Designs",
      title: "Modern Geometric",
      description: "Contemporary patterns with bold lines",
      image: "https://source.unsplash.com/random/400x400/?henna",
    },
    {
      id: 4,
      category: "Eyebrow Threading",
      title: "Natural Arch Shaping",
      description: "Precision threading for a natural arch",
      image: "https://source.unsplash.com/random/400x400/?threading",
    },
    {
      id: 5,
      category: "Lash Services",
      title: "Volume Lashes",
      description: "Full volume extensions for dramatic effect",
      image: "https://source.unsplash.com/random/400x400/?lashes",
    },
    {
      id: 6,
      category: "Lash Services",
      title: "Natural Classic Set",
      description: "Subtle enhancement for everyday elegance",
      image: "https://source.unsplash.com/random/400x400/?lash",
    },
    {
      id: 7,
      category: "Combination Works",
      title: "Complete Transformation",
      description: "Brows, lashes, and makeup in one session",
      image: "https://source.unsplash.com/random/400x400/?makeup",
    },
    {
      id: 8,
      category: "Combination Works",
      title: "Bridal Package",
      description: "Complete bridal look with all services",
      image: "https://source.unsplash.com/random/400x400/?bridal",
    },
    {
      id: 9,
      category: "Eyebrow Threading",
      title: "Brow Tinting",
      description: "Enhanced color for fuller appearance",
      image: "https://source.unsplash.com/random/400x400/?brow-tint",
    },
    {
      id: 10,
      category: "Henna Designs",
      title: "Arabic Tradition",
      description: "Classic Arabic patterns with rich detail",
      image: "https://source.unsplash.com/random/400x400/?henna-design",
    },
    {
      id: 11,
      category: "Lash Services",
      title: "Lash Lift & Tint",
      description: "Natural enhancement without extensions",
      image: "https://source.unsplash.com/random/400x400/?lash-lift",
    },
    {
      id: 12,
      category: "Combination Works",
      title: "Special Occasion",
      description: "Complete look for events and celebrations",
      image: "https://source.unsplash.com/random/400x400/?special-occasion",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

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
            className={`px-5 py-2 rounded-full text-sm ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-white text-black border border-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white shadow-sm">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 border-t bg-gray-100">
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-600 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
