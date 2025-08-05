import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPartyServices } from "../../api/services.api";
import type { Service } from "../../interface/services.interface";
import LoadingScreen from "../../ui/Loading";
import { useAuth } from "../../context/Use-Auth";

export default function HennaServices() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ["partyServices"],
    queryFn: getPartyServices,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const services = data?.results || [];

  // Separate individual services from party packages
  const individualServices = services.filter(
    (service: Service) => !service.name.toLowerCase().includes("package")
  );

  const partyPackages = services.filter((service: Service) =>
    service.name.toLowerCase().includes("package")
  );

  const handleBookNow = (e: React.MouseEvent, serviceId: number) => {
    e.preventDefault();

    if (isAuthenticated) {
      navigate(`/booking/${serviceId}`);
    } else {
      navigate("/login");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="bg-[#f8f6e9] py-12 px-6">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-[#c09300] p-3 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M12 2C7.58 2 4 6.03 4 10.5c0 4.78 6.31 10.61 7.17 11.4.26.24.66.24.92 0 .86-.79 7.17-6.62 7.17-11.4C20 6.03 16.42 2 12 2zm0 14c-2.21 0-4-1.79-4 0-.49.09-.96.24-1.4l5.16 5.16c-.44.15-.91.24-1.4.24zm3.76-1.6L10.6 9.24c.44-.15.91-.24 1.4-.24 2.21 0 4 1.79 4 4 0 .49-.09.96-.24 1.4z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold ">Henna Services</h2>
        </div>
        <div className="flex justify-center items-center">
          <div className="text-lg text-red-600">
            Error loading services. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f8f6e9] py-12 px-6">
      {/* Header */}
      <div className="flex justify-center items-center gap-3 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-black font-garamond">
          Henna Services
        </h2>
      </div>

      {/* Individual Services */}
      {individualServices.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-20 justify-center mb-14">
          {individualServices.map((service: Service) => (
            <div
              key={service.id}
              className="bg-white w-full max-w-md p-6 rounded-3xl shadow-md flex flex-col justify-between h-full"
            >
              {/* Top content with price pill */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-[16px] font-bold">{service.name}</h3>
                  <p className="text-sm mt-3">{service.description}</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Duration: {service.duration_minutes} mins
                  </p>
                </div>
                <div className="bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap ml-4">
                  ${service.price}
                </div>
              </div>

              {/* Book Now button aligned bottom-right */}
              <div className="mt-auto flex justify-end">
                <Link
                  to={`/booking/${service.id}`}
                  onClick={(e) => handleBookNow(e, service.id)}
                  className="bg-[#a4552c] text-white text-sm px-6 py-2 rounded-full hover:bg-[#8a4526] transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Party Packages */}
      {partyPackages.map((partyPackage: Service) => (
        <div
          key={partyPackage.id}
          className="bg-white max-w-[850px] mx-auto p-6 md:p-8 rounded-3xl shadow-md flex flex-col justify-between h-full mb-6"
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-[16px] font-bold mb-2">
                {partyPackage.name}
              </h3>
              <p className="text-sm mb-4">{partyPackage.description}</p>
            </div>
            <div className="bg-black text-white text-xs px-3 py-1 rounded-full whitespace-nowrap ml-4 mt-1">
              Starting From ${partyPackage.price}
            </div>
          </div>

          {/* Bullet points - you can customize these based on your needs */}
          <ul className="text-sm space-y-2 mb-6">
            <li className="flex items-start gap-2">
              <span className="text-[#c09300]">✔</span> Bridal Henna Packages
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c09300]">✔</span> Group Event Services
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#c09300]">✔</span> On-site Services
              Available
            </li>
          </ul>

          {/* Button bottom-right */}
          <div className="flex justify-end">
            <Link
              to={`/booking/${partyPackage.id}`}
              onClick={(e) => handleBookNow(e, partyPackage.id)}
              className="bg-[#a4552c] text-white text-sm px-6 py-2 rounded-full hover:bg-[#8a4526] transition-colors"
            >
              Book Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
