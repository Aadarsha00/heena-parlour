import { Link } from "react-router-dom";

export default function LashServices() {
  const services = [
    {
      id: 1,
      name: "Classic Lashes",
      price: "$85",
      duration: "90 mins",
      description:
        "Our classic lash extensions add length and a moderate amount of volume to your natural lashes. Each extension is applied to a single natural lash for a subtle, elegant enhancement.",
    },
    {
      id: 2,
      name: "Hybrid Lashes",
      price: "$95",
      duration: "120 mins",
      description:
        "A perfect blend of classic and volume techniques, hybrid lashes offer a natural yet dramatic look. This service combines single extensions with handmade volume fans for added texture and dimension.",
    },
    {
      id: 3,
      name: "Volume Lashes",
      price: "$110",
      duration: "150 mins",
      description:
        "For a glamorous, full look, our volume lashes involve applying multiple lightweight extensions to each natural lash. The result is dramatically increased volume and density with a fluffy, luxurious effect.",
    },
    {
      id: 4,
      name: "Lash Fills",
      price: "Starting at$40",
      duration: "60-90 mins",
      description:
        "Maintain your beautiful lash extensions with our fill service. Recommended every 2–3 weeks, fills replace extensions that have shed naturally with your lash cycle, keeping your look full and fresh.",
    },
    {
      id: 5,
      name: "Lash Removal",
      price: "$15",
      duration: "30 mins",
      description:
        "Professional removal of lash extensions using a specialized solution that breaks down the adhesive bond. Our gentle technique ensures your natural lashes remain undamaged in the process.",
    },
    {
      id: 6,
      name: "Lash Tint",
      price: "$25",
      duration: "30 mins",
      description:
        "Darken your natural lashes with our safe, semi-permanent tinting service. Perfect for those who want to enhance their lashes without extensions or daily mascara application. Results last 4–6 weeks.",
    },
  ];

  return (
    <section className="w-full bg-white pt-10 pb-20 px-4 font-sans">
      <div className="max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <div className="w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center">
            <span className="text-white text-lg">👁️</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-black font-garamond">
            Lash Services
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-8 ">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#F5F5DC] p-6 rounded-3xl shadow flex flex-col justify-between h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-700 text-[15px]">
                    {service.description}
                  </p>
                </div>
                <div className="bg-black text-white text-sm px-3 py-1 rounded-full font-semibold whitespace-nowrap ml-4">
                  {service.price}
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Duration: {service.duration}
                </p>
                <Link
                  to={`/booking/${service.id}`}
                  className="bg-black text-white text-sm px-5 py-2 rounded-full font-medium"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
