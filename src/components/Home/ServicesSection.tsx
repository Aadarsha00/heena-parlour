import ServiceCard from "../../ui/Service-Card";

const services = [
  {
    id: 1,
    title: "Threading",
    description:
      "Perfect your features with our precise threading services. We shape your brows to complement your face.",
    image:
      "https://images.unsplash.com/photo-1588776814546-dc3d9c20f43e?auto=format&fit=crop&w=600&q=80",
    prices: [
      { name: "Eyebrow Threading", price: "$12" },
      { name: "Upper Lip Threading", price: "$6" },
      { name: "Full Face Threading", price: "$35" },
    ],
  },
  {
    id: 2,
    title: "Henna",
    description:
      "Perfect your features with our precise threading services. We shape your brows to complement your face.",
    image:
      "https://images.unsplash.com/photo-1602352737633-f7e148fe9d71?auto=format&fit=crop&w=600&q=80",
    prices: [
      { name: "Eyebrow Threading", price: "$12" },
      { name: "Upper Lip Threading", price: "$6" },
      { name: "Full Face Threading", price: "$35" },
    ],
  },
  {
    id: 3,
    title: "Lash Extension",
    description:
      "Perfect your features with our precise threading services. We shape your brows to complement your face.",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b9642738?auto=format&fit=crop&w=600&q=80",
    prices: [
      { name: "Eyebrow Threading", price: "$12" },
      { name: "Upper Lip Threading", price: "$6" },
      { name: "Full Face Threading", price: "$35" },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-[#f7f6e7] py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <p className="text-gray-700">
            Discover our range of beauty services, each performed with skill,
            precision, and care.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              prices={service.prices}
            />
          ))}
        </div>
        <div className="text-center">
          <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
            View Full Services Menu
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
