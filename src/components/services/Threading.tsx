export default function ThreadingServices() {
  const services = [
    {
      name: "Eyebrow Threading",
      price: "$12",
      duration: "15 mins",
      description:
        "Our signature eyebrow threading service shapes and defines your brows according to your face shape. This ancient technique removes hair from the root for clean, precise lines and longer-lasting results.",
    },
    {
      name: "Full Face Threading",
      price: "$35",
      duration: "30 mins",
      description:
        "Complete facial hair removal including eyebrows, upper lip, chin, sides, and forehead. This comprehensive service leaves your skin smooth and hair-free without the irritation often caused by waxing.",
    },
    {
      name: "Upper Lip Threading",
      price: "$6",
      duration: "10 mins",
      description:
        "Precise removal of unwanted hair from the upper lip area. Threading is gentle on sensitive skin and provides cleaner, more defined results than other hair removal methods.",
    },
    {
      name: "Eyebrow Tinting",
      price: "$20",
      duration: "20 mins",
      description:
        "Enhance your brows with our safe, semi-permanent tinting service. Ideal for those with lighter or sparse eyebrows, this treatment adds definition and fullness that lasts up to four weeks.",
    },
  ];

  return (
    <section className="w-full bg-[#f8f4df] pt-10 pb-20 px-4 ">
      <div className="max-w-6xl mx-auto">
        {/* Centered Heading + Icon */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {/* Gold Circle with Threading Emoji */}

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-garamond ">
            Threading Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 ">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-3xl shadow flex flex-col justify-between h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-700 text-[15px]">
                    {service.description}
                  </p>
                </div>
                <div className="bg-black text-white text-sm px-3 py-1 rounded-full font-semibold whitespace-nowrap">
                  {service.price}
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Duration: {service.duration}
                </p>
                <a
                  href="/booking"
                  className="bg-[#A0522D] text-white text-sm px-5 py-2 rounded-full font-medium inline-block text-center"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
