import { useState } from "react";
import dayjs from "dayjs";

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectedTime, setSelectedTime] = useState("11:00 AM");

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

  const services = [
    { name: "Full Face Threading", price: 35 },
    { name: "Eyebrow Tinting", price: 20 },
  ];

  const subTotal = services.reduce((acc, service) => acc + service.price, 0);
  const bookingDeposit = 0;
  const total = subTotal + bookingDeposit;

  const daysInMonth = viewDate.daysInMonth();
  const startDay = viewDate.startOf("month").day(); // 0 = Sunday
  // Fix: Properly calculate leading empty days for Monday start
  const leadingEmptyDays = startDay === 0 ? 6 : startDay - 1;

  const calendarDays = [
    ...Array(leadingEmptyDays).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const handleDateClick = (day: number) => {
    const fullDate = viewDate.date(day).format("YYYY-MM-DD");
    setSelectedDate(fullDate);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between px-6 pt-12 pb-6 gap-12 font-serif text-[#222] bg-[#fffefc] min-h-screen">
      <div className="w-full md:w-2/3 space-y-6 mt-10 ml-6">
        <h2 className="text-3xl font-medium ml-16">Book Your Appointment</h2>

        {/* Step Tracker */}
        <div className="relative flex justify-between items-start max-w-2xl mt-4 w-full">
          {["Services", "Date and Time", "Your Details", "Payment"].map(
            (step, index) => {
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
                    className={`z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isActive
                        ? "bg-[#A0522D] text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div
                    className={`mt-2 text-sm text-center ${
                      isActive ? "text-[#A0522D]" : "text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Calendar and Time Slot Section */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-8">
          {/* Calendar */}
          <div className="w-full sm:w-1/2 text-center font-[serif] text-black">
            <h3 className="text-2xl mb-4">Select Date and Time</h3>

            {/* Month Header */}
            <div className="text-xl mb-2">{viewDate.format("MMMM YYYY")}</div>

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
            <div className="grid grid-cols-7 gap-y-2 text-sm">
              {calendarDays.map((day, index) =>
                day ? (
                  <button
                    key={index}
                    onClick={() => handleDateClick(day)}
                    className={` text-black w-8 h-8 flex items-center justify-center rounded-none font-normal border-0 bg-transparent ml-5 ${
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
                className="bg-[#A0522D] text-white px-4 py-1 rounded"
              >
                Previous
              </button>
              <button
                onClick={() => setViewDate(viewDate.add(1, "month"))}
                className="bg-[#A0522D] text-white px-8 py-1 rounded"
              >
                Next
              </button>
            </div>
          </div>

          {/* Time Slots */}
          <div className="w-full sm:w-1/2 rounded p-4 bg-white mt-14">
            <h3 className="text-md font-semibold mb-2 text-black">
              Available Time Slots - {dayjs(selectedDate).format("MMMM D")}
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`px-3 py-2 border text-sm rounded-md ${
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
          </div>
        </div>
      </div>

      {/* Booking Summary */}
      <div className="w-full md:w-1/3 bg-yellow-50 p-4 rounded space-y-4">
        <h3 className="text-xl font-medium">Your Booking</h3>

        <div>
          <p className="font-semibold text-sm mb-2">SELECTED SERVICES</p>
          {services.map((service) => (
            <div key={service.name} className="flex justify-between text-sm">
              <span>{service.name}</span>
              <span>${service.price}</span>
            </div>
          ))}
        </div>

        <div>
          <p className="font-semibold text-sm mt-4 mb-1">APPOINTMENT DETAILS</p>
          <p className="italic text-sm">
            {dayjs(selectedDate).format("dddd, MMMM D, YYYY")}
          </p>
          <p className="italic text-sm">{selectedTime}</p>
          <p className="italic text-sm">Name Of the specialist (optional)</p>
        </div>

        <div>
          <p className="font-semibold text-sm mt-4 mb-1">PRICE SUMMARY</p>
          <div className="flex justify-between text-sm">
            <span>Sub Total</span>
            <span>${subTotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Booking Deposit</span>
            <span>${bookingDeposit}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <p className="text-xs italic mt-1">
            *$50 deposit required now, remaining balance due at appointment
          </p>
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
