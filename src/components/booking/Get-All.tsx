/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "../../api/appointment.api";

type Appointment = {
  id: number;
  client_name: string;
  date: string;
  service: string;
};

const AppointmentsList = () => {
  const {
    data: appointments,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAppointments(),
    retry: (failureCount, error: any) => {
      // Don't retry on authentication errors
      if (error?.response?.status === 401) {
        return false;
      }
      // Retry up to 2 times for other errors
      return failureCount < 2;
    },
  });

  console.log("Appointment data:", appointments);
  console.log("Query error:", error);

  // Debug: Check the actual structure
  console.log("Data type:", typeof appointments);
  console.log("Is array:", Array.isArray(appointments));
  if (appointments && typeof appointments === "object") {
    console.log("Object keys:", Object.keys(appointments));
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border p-3 rounded-md">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    const isAuthError = (error as any)?.response?.status === 401;
    const message = isAuthError
      ? "Authentication failed. Please log in again."
      : error instanceof Error
      ? error.message
      : typeof error === "string"
      ? error
      : "Unknown error occurred";

    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <h3 className="text-red-800 font-medium mb-2">
            Error Loading Appointments
          </h3>
          <p className="text-red-600 mb-3">{message}</p>
          {!isAuthError && (
            <button
              onClick={() => refetch()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          )}
          {isAuthError && (
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Refresh Page
            </button>
          )}
        </div>
      </div>
    );
  }

  // Handle different API response structures
  const appointmentsList = Array.isArray(appointments)
    ? appointments
    : appointments?.results ||
      appointments?.appointments ||
      appointments?.data ||
      [];

  if (!appointmentsList || appointmentsList.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Appointments</h2>
        <div className="text-center py-8 text-gray-500">
          <p>No appointments found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Appointments</h2>
        <span className="text-sm text-gray-500">
          {appointmentsList.length} appointment
          {appointmentsList.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {appointmentsList.map((appointment: Appointment) => (
          <div
            key={appointment.id}
            className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-2">
              <p className="font-medium">
                <span className="text-gray-600">Client:</span>{" "}
                <span className="text-gray-900">{appointment.client_name}</span>
              </p>
              <p>
                <span className="text-gray-600">Service:</span>{" "}
                <span className="text-gray-900">{appointment.service}</span>
              </p>
              <p>
                <span className="text-gray-600">Date:</span>{" "}
                <span className="text-gray-900">
                  {new Date(appointment.date).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentsList;
