/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import type { Appointment } from "../../interface/appointment.interface";
import api from "../axios/api.axios";
import type { Service } from "../../interface/services.interface";
import { getServiceById } from "../../api/services.api";

// API function to get appointments for a specific date
const getAppointmentsForDate = async (date: string): Promise<Appointment[]> => {
  try {
    const response = await api.get(`/appointments/?appointment_date=${date}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    throw error?.response?.data?.message || "Failed to fetch appointments";
  }
};

// Helper function to convert 24-hour time to 12-hour format
const convert24to12 = (time24: string): string => {
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours, 10);
  const period = hour >= 12 ? "PM" : "AM";
  const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${hour12}:${minutes} ${period}`;
};

const AppointmentBooking = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

  // Fetch service data using React Query
  const {
    data: service,
    isLoading: serviceLoading,
    error: serviceError,
  } = useQuery<Service>({
    queryKey: ["service", serviceId],
    queryFn: () => getServiceById(Number(serviceId)),
    enabled: !!serviceId,
  });

  // Fetch appointments for the selected date
  const {
    data: appointments = [],
    isLoading: appointmentsLoading,
    error: appointmentsError,
  } = useQuery<Appointment[]>({
    queryKey: ["appointments", selectedDate],
    queryFn: () => getAppointmentsForDate(selectedDate),
    enabled: !!selectedDate,
    staleTime: 2 * 60 * 1000,
    select: (data) => {
      // Handle different API response formats
      if (Array.isArray(data)) {
        return data;
      }
      // If API returns paginated response like { results: [...] }
      if (data && typeof data === "object" && "results" in data) {
        const results = (data as any).results || [];
        return results;
      }
      // If API returns object with appointments key
      if (data && typeof data === "object" && "appointments" in data) {
        const appointments = (data as any).appointments || [];
        return appointments;
      }
      return [];
    },
  });

  // We also need to fetch services for the booked appointments to get their durations
  const bookedServiceIds = Array.isArray(appointments)
    ? appointments.map((apt) => apt.service)
    : [];
  const { data: bookedServices = [], isLoading: bookedServicesLoading } =
    useQuery<Service[]>({
      queryKey: ["bookedServices", bookedServiceIds],
      queryFn: async () => {
        if (bookedServiceIds.length === 0) return [];
        try {
          // Fetch all services for the booked appointments
          const servicePromises = bookedServiceIds.map((id) =>
            getServiceById(id)
          );
          return Promise.all(servicePromises);
        } catch (error) {
          console.error("Error fetching booked services:", error);
          return [];
        }
      },
      enabled: bookedServiceIds.length > 0,
    });

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  // Helper function to convert time string to minutes
  const timeToMinutes = (timeStr: string): number => {
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes;

    if (period === "PM" && hours !== 12) {
      totalMinutes += 12 * 60;
    } else if (period === "AM" && hours === 12) {
      totalMinutes = minutes;
    }

    return totalMinutes;
  };

  // Calculate available time slots
  const availableTimeSlots = useMemo(() => {
    if (!service || !Array.isArray(appointments) || bookedServicesLoading)
      return timeSlots;

    const serviceDuration = service.duration_minutes;
    const blockedSlots = new Set<string>();

    // Create a map of service ID to service object for quick lookup
    const serviceMap = new Map<number, Service>();
    bookedServices.forEach((svc) => serviceMap.set(svc.id, svc));

    // For each existing appointment, calculate which time slots are blocked
    appointments.forEach((appointment) => {
      const bookedService = serviceMap.get(appointment.service);
      if (!bookedService) return; // Skip if service data not available

      try {
        // Convert 24-hour time to 12-hour format for comparison
        const appointmentTime12 = convert24to12(appointment.appointment_time);
        const appointmentStartMinutes = timeToMinutes(appointmentTime12);
        const appointmentEndMinutes =
          appointmentStartMinutes + bookedService.duration_minutes;

        // Block all time slots that would conflict with this appointment
        timeSlots.forEach((slot) => {
          const slotStartMinutes = timeToMinutes(slot);
          const slotEndMinutes = slotStartMinutes + serviceDuration;

          // Check if there's any overlap between the new service and existing appointment
          const hasOverlap =
            // New service starts during existing appointment
            (slotStartMinutes >= appointmentStartMinutes &&
              slotStartMinutes < appointmentEndMinutes) ||
            // New service ends during existing appointment
            (slotEndMinutes > appointmentStartMinutes &&
              slotEndMinutes <= appointmentEndMinutes) ||
            // New service completely encompasses existing appointment
            (slotStartMinutes <= appointmentStartMinutes &&
              slotEndMinutes >= appointmentEndMinutes);

          if (hasOverlap) {
            blockedSlots.add(slot);
          }
        });
      } catch (error) {
        console.error("Error processing appointment time:", appointment, error);
      }
    });

    // Also block slots that would run past business hours (6 PM end time)
    const businessEndTime = timeToMinutes("6:00 PM");
    timeSlots.forEach((slot) => {
      const slotStartMinutes = timeToMinutes(slot);
      const slotEndMinutes = slotStartMinutes + serviceDuration;

      if (slotEndMinutes > businessEndTime) {
        blockedSlots.add(slot);
      }
    });

    return timeSlots.filter((slot) => !blockedSlots.has(slot));
  }, [service, appointments, bookedServices, bookedServicesLoading, timeSlots]);

  // Calculate totals based on fetched service data
  const subTotal = service ? parseFloat(service.price) : 0;
  const bookingDeposit =
    service && service.requires_deposit
      ? parseFloat(service.deposit_amount)
      : 0;
  const total = subTotal + bookingDeposit;

  const daysInMonth = viewDate.daysInMonth();
  const startDay = viewDate.startOf("month").day(); // 0 = Sunday
  // Fix: Properly calculate leading empty days for Monday start
  const leadingEmptyDays = startDay === 0 ? 6 : startDay - 1;

  const calendarDays = [
    ...Array(leadingEmptyDays).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleDateClick = (day: any) => {
    const fullDate = viewDate.date(day).format("YYYY-MM-DD");
    setSelectedDate(fullDate);
  };

  // Helper function to convert 12-hour time to 24-hour format
  const convert12to24 = (time12: string): string => {
    const [time, period] = time12.split(" ");
    const [hours, minutes] = time.split(":");
    let hour = parseInt(hours, 10);

    if (period === "PM" && hour !== 12) {
      hour += 12;
    } else if (period === "AM" && hour === 12) {
      hour = 0;
    }

    return `${hour.toString().padStart(2, "0")}:${minutes}:00`;
  };

  // Handle navigation to details page
  const handleNextClick = () => {
    if (!selectedTime || !selectedDate || availableTimeSlots.length === 0) {
      alert("Please select a date and time slot before proceeding.");
      return;
    }

    // Convert time to 24-hour format for the API
    const appointmentTime24 = convert12to24(selectedTime);

    // Navigate to details page with appointment data
    navigate("detail", {
      state: {
        serviceId: Number(serviceId),
        appointmentDate: selectedDate,
        appointmentTime: appointmentTime24,
        selectedTimeDisplay: selectedTime,
        service: service,
      },
    });
  };

  // Loading state
  if (serviceLoading || appointmentsLoading || bookedServicesLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fffefc]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#A0522D]"></div>
          <p className="mt-4 text-[#222] font-serif">
            {serviceLoading
              ? "Loading service details..."
              : appointmentsLoading
              ? "Loading appointments..."
              : "Loading available time slots..."}
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (serviceError || appointmentsError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fffefc]">
        <div className="text-center">
          <p className="text-red-600 font-serif text-lg">
            {serviceError
              ? `Error loading service: ${serviceError as unknown as string}`
              : `Error loading appointments: ${
                  appointmentsError as unknown as unknown as string
                }`}
          </p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-[#A0522D] text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No service found
  if (!service) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#fffefc]">
        <div className="text-center">
          <p className="text-[#222] font-serif text-lg">Service not found</p>
          <button
            onClick={() => window.history.back()}
            className="mt-4 bg-[#A0522D] text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between px-4 lg:px-6 pt-12 pb-6 gap-6 lg:gap-12 font-serif text-[#222] bg-[#fffefc] min-h-screen overflow-x-hidden">
      <div className="w-full lg:w-2/3 space-y-6 mt-4 lg:mt-10 ml-0 lg:ml-6">
        <h2 className="text-2xl lg:text-3xl font-medium ml-7 lg:ml-16">
          Book Your Appointment
        </h2>

        {/* Step Tracker */}
        <div className="relative flex justify-between items-start max-w-full lg:max-w-2xl mt-4 w-full px-2 lg:px-0">
          {["Services", "Date and Time", "Your Details"].map((step, index) => {
            const isActive = index < 2;
            const showLine = index < 1;

            return (
              <div
                className="flex flex-col items-center flex-1 relative"
                key={step}
              >
                {showLine && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 bg-[#A0522D] z-0" />
                )}
                <div
                  className={`z-10 w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-xs lg:text-sm font-semibold ${
                    isActive
                      ? "bg-[#A0522D] text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <div
                  className={`mt-2 text-xs lg:text-sm text-center ${
                    isActive ? "text-[#A0522D]" : "text-gray-600"
                  }`}
                >
                  {step}
                </div>
              </div>
            );
          })}
        </div>

        {/* Calendar and Time Slot Section */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-8">
          {/* Calendar */}
          <div className="w-full lg:w-1/2 text-center font-[serif] text-black">
            <h3 className="text-xl lg:text-2xl mb-4">Select Date and Time</h3>

            {/* Month Header */}
            <div className="text-lg lg:text-xl mb-2">
              {viewDate.format("MMMM YYYY")}
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 text-sm lowercase mb-1">
              <div className="text-center">mon</div>
              <div className="text-center">tue</div>
              <div className="text-center">wed</div>
              <div className="text-center">thu</div>
              <div className="text-center">fri</div>
              <div className="text-center">sat</div>
              <div className="text-center">sun</div>
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-y-2 text-sm justify-items-center">
              {calendarDays.map((day, index) =>
                day ? (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={`text-black w-8 h-8 flex items-center justify-center rounded-none font-normal border-0 bg-transparent ${
                      selectedDate === viewDate.date(day).format("YYYY-MM-DD")
                        ? "text-black bg-gray-200"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </button>
                ) : (
                  <div key={index} className="w-8 h-8" />
                )
              )}
            </div>

            {/* Nav Buttons */}
            <div className="flex justify-between mt-6 px-2">
              <button
                onClick={() => setViewDate(viewDate.subtract(1, "month"))}
                className="bg-[#A0522D] text-white px-3 lg:px-4 py-1 rounded text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setViewDate(viewDate.add(1, "month"))}
                className="bg-[#A0522D] text-white px-4 lg:px-8 py-1 rounded text-sm"
              >
                Next
              </button>
            </div>
          </div>

          {/* Time Slots */}
          <div className="w-full lg:w-1/2 rounded p-4 bg-white mt-6 lg:mt-14">
            <h3 className="text-md font-semibold mb-2 text-black">
              Available Time Slots - {dayjs(selectedDate).format("MMMM D")}
            </h3>
            <p className="text-xs text-gray-600 mb-3">
              Service duration: {service.duration_minutes} minutes
            </p>

            {availableTimeSlots.length === 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-600 text-sm">
                  No available time slots for this date
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Please select a different date
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {availableTimeSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`px-2 lg:px-3 py-2 border text-xs lg:text-sm rounded-md ${
                      selectedTime === slot
                        ? "bg-yellow-200 border-yellow-400 text-yellow-800"
                        : "border-gray-600 bg-white text-black hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            )}

            {Array.isArray(appointments) &&
              timeSlots.length - availableTimeSlots.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  {timeSlots.length - availableTimeSlots.length} time slot(s)
                  unavailable due to existing bookings
                </p>
              )}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleNextClick}
            disabled={
              !selectedTime || !selectedDate || availableTimeSlots.length === 0
            }
            className={`px-8 py-2 rounded text-white font-medium ${
              selectedTime && selectedDate && availableTimeSlots.length > 0
                ? "bg-[#A0522D] hover:bg-[#8B4513] cursor-pointer"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Proceed for confirmation
          </button>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="w-full lg:w-1/3 bg-yellow-50 p-4 rounded space-y-4">
        <h3 className="text-xl font-medium">Your Booking</h3>

        <div>
          <p className="font-semibold text-sm mb-2">SELECTED SERVICES</p>
          <div className="flex justify-between text-sm">
            <span>{service.name}</span>
            <span>${parseFloat(service.price).toFixed(2)}</span>
          </div>
        </div>

        <div>
          <p className="font-semibold text-sm mt-4 mb-1">APPOINTMENT DETAILS</p>
          <p className="italic text-sm">
            {dayjs(selectedDate).format("dddd, MMMM D, YYYY")}
          </p>
          <p className="italic text-sm">{selectedTime}</p>
        </div>

        <div>
          <p className="font-semibold text-sm mt-4 mb-1">PRICE SUMMARY</p>
          <div className="flex justify-between text-sm">
            <span>Sub Total</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Booking Deposit</span>
            <span>${bookingDeposit.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          {service.requires_deposit && bookingDeposit > 0 ? (
            <p className="text-xs italic mt-1">
              *${bookingDeposit.toFixed(2)} deposit required now, remaining
              balance due at appointment
            </p>
          ) : (
            <p className="text-xs italic mt-1">
              *Full payment due at appointment
            </p>
          )}
        </div>

        <div className="bg-white p-3 rounded text-sm">
          <p className="font-semibold mb-1">Cancellation Policy</p>
          <ul className="list-disc ml-5 space-y-1">
            <li>
              Free cancellation or rescheduling up to 24 hours before
              appointment
            </li>
            <li>Late cancellations or no-shows incur a 10% service fee</li>
            <li>
              Booking deposit is non-refundable but will be applied to your
              final bill
            </li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold mb-1">Need Help?</p>
          <p className="text-orange-700">📞 (410) 555-1234</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
