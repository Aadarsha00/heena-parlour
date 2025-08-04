import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getThreadingServices } from "../../api/services.api";
import type { Service } from "../../interface/services.interface";
import LoadingScreen from "../../ui/Loading";

export default function ThreadingServices() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["threadingServices"],
    queryFn: getThreadingServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const services = data?.results || [];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <section className="w-full bg-[#f8f4df] pt-10 pb-20 px-4 ">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] font-garamond ">
              Threading Services
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-lg text-red-600">
              Error loading services. Please try again later.
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          {services.map((service: Service) => (
            <div
              key={service.id}
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
                  ${service.price}
                </div>
              </div>

              <div className="mt-auto flex justify-between items-center">
                <p className="text-sm text-gray-500">
                  Duration: {service.duration_minutes} mins
                </p>
                <Link
                  to={`/booking/${service.id}`}
                  className="bg-[#A0522D] text-white text-sm px-5 py-2 rounded-full font-medium inline-block text-center"
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
