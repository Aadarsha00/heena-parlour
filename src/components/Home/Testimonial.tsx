const testimonials = [
  {
    name: "Sarah M",
    role: "Regular Client",
    image: "/images/sarah.jpg", // Replace with your actual path
    text: `"I've been coming here for my eyebrow threading for over a year now. The staff is skilled, friendly, and the results are always perfect. Wouldn't go anywhere else!"`,
  },
  {
    name: "Sarah M",
    role: "Regular Client",
    image: "/images/sarah.jpg",
    text: `"I've been coming here for my eyebrow threading for over a year now. The staff is skilled, friendly, and the results are always perfect. Wouldn't go anywhere else!"`,
  },
  {
    name: "Sarah M",
    role: "Regular Client",
    image: "/images/sarah.jpg",
    text: `"I've been coming here for my eyebrow threading for over a year now. The staff is skilled, friendly, and the results are always perfect. Wouldn't go anywhere else!"`,
  },
];

export default function ClientTestimonials() {
  return (
    <section className="bg-white py-16 px-6 lg:px-20 text-center">
      <h2 className="text-3xl font-semibold mb-2 font-display">
        Client Testimonials
      </h2>
      <p className="text-gray-600 mb-12">
        Browse our gallery to see examples of our threading, henna, and lash
        services.
      </p>

      <div className="flex flex-wrap justify-center gap-8 md:gap-10">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-[#fafae2] w-full max-w-sm rounded-xl shadow px-6 py-6 text-left"
          >
            {/* Stars */}
            <div className="flex mb-4">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-2xl text-black">
                    ☆
                  </span>
                ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-800 mb-6">{item.text}</p>

            {/* User Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-600">{item.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <a
          href="#"
          className="inline-flex items-center text-sm font-medium text-black hover:underline"
        >
          Read More Testimonials <span className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}
