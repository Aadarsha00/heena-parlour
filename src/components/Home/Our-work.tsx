const images = [
  {
    src: "/images/lash-application.jpg", // replace with your image paths
    alt: "Lash application",
  },
  {
    src: "/images/henna-hands.jpg",
    alt: "Henna hands",
  },
  {
    src: "/images/brow-treatment.jpg",
    alt: "Brow treatment",
  },
  {
    src: "/images/perfect-brows.jpg",
    alt: "Perfect brows",
  },
];

export default function OurWork() {
  return (
    <section className="bg-[#f7f6e7] py-12 text-center px-6">
      <h2 className="text-4xl font-bold mb-2">Our Work</h2>
      <p className="text-gray-700 mb-10">
        Browse our gallery to see examples of our threading, henna, and lash
        services
      </p>

      <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="w-[260px] h-[300px] overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="#"
          className="inline-flex items-center text-sm font-medium text-black hover:underline"
        >
          View Full Gallery <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}
