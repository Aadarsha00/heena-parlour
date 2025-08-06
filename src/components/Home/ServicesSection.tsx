/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import ServiceCard from "../../ui/Service-Card";
import {
  getLashServices,
  getPartyServices,
  getThreadingServices,
} from "../../api/services.api";
import { Link } from "react-router-dom";

// Static service data with hardcoded images, titles, and descriptions
const staticServices = [
  {
    id: 1,
    title: "Threading",
    description:
      "Perfect your features with our precise threading services. We shape your brows to complement your face.",
    image: "./pictures/img2.jpg",
    apiCategory: "threading",
  },
  {
    id: 2,
    title: "Henna",
    description:
      "Transform your look with beautiful henna designs. Our skilled artists create intricate patterns for any occasion.",
    image: "./pictures/image1.jpg",
    apiCategory: "party", // Assuming henna is under party services
  },
  {
    id: 3,
    title: "Lash Extension",
    description:
      "Enhance your natural beauty with our premium lash extensions. Get fuller, longer lashes that last.",
    image: "./pictures/img4.jpg",
    apiCategory: "lashes",
  },
];

const ServicesSection = () => {
  // Fetch threading services
  const { data: threadingServices } = useQuery({
    queryKey: ["services", "threading"],
    queryFn: getThreadingServices,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch lash services
  const { data: lashServices } = useQuery({
    queryKey: ["services", "lashes"],
    queryFn: getLashServices,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch party services (for henna)
  const { data: partyServices } = useQuery({
    queryKey: ["services", "party"],
    queryFn: getPartyServices,
    staleTime: 5 * 60 * 1000,
  });

  // Function to get services (name and price) for a specific category
  const getServicesForCategory = (category: string) => {
    let services: any;
    switch (category) {
      case "threading":
        services = threadingServices?.results || [];
        break;
      case "lashes":
        services = lashServices?.results || [];
        break;
      case "party":
        services = partyServices?.results || [];
        break;
      default:
        services = [];
    }

    // Get first 3 services with both name and price
    return services.slice(0, 3).map((service: any) => ({
      name: service.name,
      price: `${service.price}`,
    }));
  };

  // Combine static data with API service names and prices
  const servicesWithPrices = staticServices.map((staticService) => ({
    ...staticService,
    prices: getServicesForCategory(staticService.apiCategory),
  }));

  return (
    <section className="bg-[#f7f6e7] py-16 mt-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2 font-display">Our Services</h2>
          <p className="text-gray-700">
            Discover our range of beauty services, each performed with skill,
            precision, and care.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {servicesWithPrices.map((service) => (
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
          <Link
            to="/services"
            className="inline-flex items-center text-sm font-medium text-black hover:underline"
          >
            View Our Full Services <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
