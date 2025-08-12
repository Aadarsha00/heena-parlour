import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../../api/services.api";
import type { Service } from "../../interface/services.interface";

export default function PriceList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["allServices"],
    queryFn: getAllServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const services = data?.results || [];

  // Format price display
  const formatPrice = (price: string, serviceName: string) => {
    // Add "from" prefix for services that typically have variable pricing
    const variablePricingServices = ["lash fills", "henna art", "henna party"];
    const isVariablePrice = variablePricingServices.some((keyword) =>
      serviceName.toLowerCase().includes(keyword)
    );

    if (serviceName.toLowerCase().includes("party packages")) {
      return "Contact for pricing";
    }

    return isVariablePrice ? `from $${price}` : `$${price}`;
  };

  if (isLoading) {
    return (
      <div className="bg-[#f6f4d9] min-h-screen py-20 px-4 flex flex-col items-center font-serif overflow-x-hidden">
        <div className="relative max-w-[640px] w-full mx-8 sm:mx-0">
          {/* Yellow Circles Behind the Card */}
          <div className="absolute top-2 left-2 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>
          <div className="absolute bottom-2 right-2 sm:-bottom-8 sm:-right-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>

          {/* White Card Content */}
          <div className="relative z-10 bg-white shadow-md px-6 py-8">
            <div className="flex justify-center items-center h-40">
              <div className="text-lg">Loading services...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f6f4d9] min-h-screen py-20 px-4 flex flex-col items-center font-serif overflow-x-hidden">
        <div className="relative max-w-[640px] w-full mx-8 sm:mx-0">
          {/* Yellow Circles Behind the Card */}
          <div className="absolute top-2 left-2 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>
          <div className="absolute bottom-2 right-2 sm:-bottom-8 sm:-right-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>

          {/* White Card Content */}
          <div className="relative z-10 bg-white shadow-md px-6 py-8">
            <div className="flex justify-center items-center h-40">
              <div className="text-lg text-red-600">
                Error loading services. Please try again later.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f4d9] min-h-screen py-20 px-4 flex flex-col items-center font-serif overflow-x-hidden">
      <h1 className="text-3xl font-bold mb-8 font-display">Full Price List</h1>
      <div className="relative max-w-[640px] w-full mx-8 sm:mx-0">
        {/* Yellow Circles Behind the Card */}
        <div className="absolute top-2 left-2 sm:-top-8 sm:-left-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>
        <div className="absolute bottom-2 right-2 sm:-bottom-8 sm:-right-8 w-12 h-12 sm:w-20 sm:h-20 bg-yellow-400 rounded-full z-10"></div>

        {/* White Card Content */}
        <div className="relative z-10 bg-white shadow-md px-6 py-8">
          <table className="w-full text-left text-sm mt-6">
            <thead>
              <tr className="border-b">
                <th className="pb-3">Service</th>
                <th className="pb-3 text-right">Price (USD)</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: Service) => (
                <tr key={service.id}>
                  <td className="py-2">{service.name}</td>
                  <td className="py-2 text-right">
                    {formatPrice(service.price, service.name)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-gray-600 mt-6 text-center max-w-md font-sans">
        All prices are subject to change. Please contact us for the most current
        pricing.
      </p>
    </div>
  );
}
