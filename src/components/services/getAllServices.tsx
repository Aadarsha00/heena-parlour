/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getAllServices } from "../../api/services.api";

export const AllServices = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
  });

  if (isLoading) return <div>Loading services...</div>;
  if (isError) return <div>Error: {error as unknown as string}</div>;

  console.log("Services:", data);

  return (
    <div>
      <h2>All Services</h2>
      <ul>
        {data.map((service: any) => (
          <li key={service.id}>
            <strong>{service.title}</strong> - {service.price}
          </li>
        ))}
      </ul>
    </div>
  );
};
