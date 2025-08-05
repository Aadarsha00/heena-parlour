import React from "react";
import { CheckCircle, XCircle, CreditCard, AlertCircle } from "lucide-react";

interface StatusBadgeProps {
  status: string;
  paymentStatus: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, paymentStatus }) => {
  const getStatusInfo = () => {
    if (status === "cancelled") {
      return {
        text: "Cancelled",
        color: "bg-red-100 text-red-800",
        icon: XCircle,
      };
    }
    if (status === "completed") {
      return {
        text: "Completed",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      };
    }
    if (status === "confirmed" && paymentStatus === "paid") {
      return {
        text: "Confirmed & Paid",
        color: "bg-green-100 text-green-800",
        icon: CheckCircle,
      };
    }
    if (status === "confirmed" && paymentStatus === "pending") {
      return {
        text: "Payment Pending",
        color: "bg-yellow-100 text-yellow-800",
        icon: CreditCard,
      };
    }
    if (status === "booked") {
      return {
        text: "Waiting Confirmation",
        color: "bg-blue-100 text-blue-800",
        icon: AlertCircle,
      };
    }
    return {
      text: status,
      color: "bg-gray-100 text-gray-800",
      icon: AlertCircle,
    };
  };

  const { text, color, icon: Icon } = getStatusInfo();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      <Icon className="w-3 h-3 mr-1" />
      {text}
    </span>
  );
};

export default StatusBadge;
