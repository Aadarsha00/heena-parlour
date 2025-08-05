import React from "react";
import { Calendar, Clock, Eye, CreditCard } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Appointment } from "../../interface/appointment.interface";
import StatusBadge from "./Status-Badge";
import PaymentButton from "./Payment-Button";
import CancelButton from "./Cancel-Button";

// Utility function to format date and time
const formatDateTime = (date: string, time: string): string => {
  const dateTime = new Date(`${date}T${time}`);
  return dateTime.toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Payment Status Badge Component
const PaymentStatusBadge: React.FC<{ paymentStatus: string }> = ({
  paymentStatus,
}) => {
  const getPaymentBadgeStyles = () => {
    switch (paymentStatus?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "unpaid":
        return "bg-red-100 text-red-800 border-red-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentDisplayText = () => {
    switch (paymentStatus?.toLowerCase()) {
      case "paid":
        return "Paid";
      case "pending":
        return "Payment Pending";
      case "unpaid":
        return "Unpaid";
      case "failed":
        return "Payment Failed";
      case "refunded":
        return "Refunded";
      default:
        return paymentStatus || "Unknown";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPaymentBadgeStyles()}`}
    >
      <CreditCard className="h-3 w-3 mr-1" />
      {getPaymentDisplayText()}
    </span>
  );
};

interface AppointmentCardProps {
  appointment: Appointment;
  onCancel: (id: number) => void;
  onViewDetails: (appointment: Appointment) => void;
  cancelLoading: boolean;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onCancel,
  onViewDetails,
  cancelLoading,
}) => {
  const queryClient = useQueryClient();

  const showPaymentButton =
    appointment.status === "confirmed" &&
    appointment.payment_status === "pending";
  const showCancelButton =
    appointment.status !== "cancelled" && appointment.status !== "completed";

  const handlePaymentSuccess = () => {
    // Invalidate and refetch appointment data
    queryClient.invalidateQueries({ queryKey: ["appointments"] });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Appointment #{appointment.id}
          </h3>
          <p className="text-sm text-gray-600">
            {formatDateTime(
              appointment.appointment_date,
              appointment.appointment_time
            )}
          </p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <StatusBadge
            status={appointment.status}
            paymentStatus={appointment.payment_status}
          />
          <PaymentStatusBadge paymentStatus={appointment.payment_status} />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          Service ID: {appointment.service}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          Stylist ID: {appointment.stylist}
        </div>
        {appointment.notes && (
          <p className="text-sm text-gray-600 italic">"{appointment.notes}"</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 justify-between items-center">
        <button
          onClick={() => onViewDetails(appointment)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </button>

        <div className="flex gap-2">
          {showPaymentButton && (
            <PaymentButton
              appointmentId={appointment.id}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
          {showCancelButton && (
            <CancelButton
              appointment={appointment}
              onCancel={onCancel}
              isLoading={cancelLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;
