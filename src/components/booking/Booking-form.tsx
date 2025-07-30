import React, { useState } from "react";
import { createAppointment } from "../../api/booking.api";

interface AppointmentBookingProps {
  onAppointmentCreated: (appointmentId: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
}

const AppointmentBookingForm: React.FC<AppointmentBookingProps> = ({
  onAppointmentCreated,
  loading,
  setLoading,
  setMessage,
}) => {
  const [formData, setFormData] = useState({
    client_name: "Test Client",
    client_email: "test@example.com",
    client_phone: "+1234567890",
    service: 1,
    stylist: 1,
    appointment_date: "2024-08-01",
    appointment_time: "14:30:00",
    notes: "Test appointment for payment integration",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "service" || name === "stylist" ? parseInt(value) : value,
    }));
  };

  const handleCreateAppointment = async () => {
    try {
      setLoading(true);
      setMessage("Creating appointment...");

      const appointment = await createAppointment(formData);
      onAppointmentCreated(appointment.id);
      setMessage(`✅ Appointment created successfully! ID: ${appointment.id}`);
    } catch (error) {
      setMessage(`❌ Failed to create appointment: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Step 1: Create Appointment
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            name="client_name"
            value={formData.client_name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Email
          </label>
          <input
            type="email"
            name="client_email"
            value={formData.client_email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="client_phone"
            value={formData.client_phone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Service ID
          </label>
          <input
            type="number"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stylist ID
          </label>
          <input
            type="number"
            name="stylist"
            value={formData.stylist}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Date
          </label>
          <input
            type="date"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Appointment Time
          </label>
          <input
            type="time"
            name="appointment_time"
            value={formData.appointment_time}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleCreateAppointment}
        disabled={loading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Creating Appointment..." : "Create Appointment"}
      </button>
    </div>
  );
};

export default AppointmentBookingForm;
