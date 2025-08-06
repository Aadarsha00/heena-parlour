import { useNavigate } from "react-router-dom";

const AppointmentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white p-6 md:p-10 flex flex-col mt-5 -mb-8 md:flex-row justify-between gap-10">
      {/* Left Info Section (fully visible, but not interactive) */}
      <div className="md:w-1/2 space-y-6 max-w-[590px] md:ml-5 pointer-events-none select-none">
        <h1 className="text-3xl font-bold font-display">
          Book Your Appointment
        </h1>
        <p className="text-gray-600">
          Schedule your beauty service with us. A small non-refundable deposit
          will be required to secure your appointment.
        </p>

        {/* Cancellation Policy Box */}
        <div className="bg-[#F5F5DC] p-4 rounded-2xl">
          <h2 className="font-bold text-lg mb-1 font-display">
            Cancellation Policy
          </h2>
          <p className="text-gray-700">
            Clients can cancel or reschedule up to 24 hours before their
            appointment. Late cancellations or no-shows incur a 10% service fee,
            per salon policy.
          </p>
        </div>

        {/* Icons with text */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <span className="text-yellow-500 text-2xl">✔️</span>
            <div>
              <h3 className="font-semibold">Easy Online Booking</h3>
              <p className="text-gray-600">
                Select your services, date, and time
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-yellow-500 text-2xl">💳</span>
            <div>
              <h3 className="font-semibold">Secure Payment</h3>
              <p className="text-gray-600">
                Multiple payment options available
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-yellow-500 text-2xl">🔔</span>
            <div>
              <h3 className="font-semibold">Appointment Reminders</h3>
              <p className="text-gray-600">Email and SMS notifications</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Booking Form */}
      <div className="md:w-1/2 w-full bg-white rounded-2xl shadow-md p-6 md:p-8 border max-w-[561px] md:mr-9 max-h-[650px]">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Book Your Service
        </h2>

        <form className="space-y-6 rounded-2xl">
          <select
            className="w-full p-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed"
            disabled
          >
            <option>Select a Service.....</option>
          </select>

          <input
            type="date"
            className="w-full p-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed"
            disabled
          />

          <select
            className="w-full p-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed"
            disabled
          >
            <option>Select Preferred Stylist...</option>
          </select>

          <input
            type="time"
            className="w-full p-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed"
            disabled
          />

          <input
            type="text"
            placeholder="Full name"
            className="w-full p-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed placeholder-gray-400"
            disabled
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed placeholder-gray-400"
            disabled
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-2 border rounded text-gray-400 bg-gray-100 cursor-not-allowed placeholder-gray-400"
            disabled
          />

          {/* Book Appointment Button (only clickable element) */}
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={() => navigate("/services")}
              className="bg-black text-white px-6 py-2 rounded-full hover:opacity-90 transition-all duration-200"
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
