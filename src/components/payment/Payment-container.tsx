import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import StripePayment from "./Stripe-Payment";
import AppointmentBookingForm from "../booking/Booking-form";

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentTestContainer: React.FC = () => {
  const [appointmentId, setAppointmentId] = useState<number | null>(1234); // fake test ID
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAppointmentCreated = (id: number) => {
    setAppointmentId(id);
  };

  const clearMessages = () => {
    setMessage("");
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Beautiful Eyebrow Payment Testing
            </h1>
            <p className="text-gray-600">
              Test the appointment booking and payment flow
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Appointment Booking */}
            <AppointmentBookingForm
              onAppointmentCreated={handleAppointmentCreated}
              loading={loading}
              setLoading={setLoading}
              setMessage={setMessage}
            />

            {/* Payment Processing */}
            {appointmentId ? (
              <StripePayment
                appointmentId={appointmentId}
                loading={loading}
                setLoading={setLoading}
                setMessage={setMessage}
              />
            ) : (
              <div className="p-4 border rounded-lg bg-gray-50 shadow-sm flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">💳</div>
                  <p>
                    Create an appointment first to enable payment processing
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Status Display */}
          {message && (
            <div className="bg-white rounded-lg shadow-sm p-4 border">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  Status & Messages
                </h3>
                <button
                  onClick={clearMessages}
                  className="text-gray-400 hover:text-gray-600 text-sm"
                >
                  Clear
                </button>
              </div>
              <div className="bg-gray-50 rounded-md p-3">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {message}
                </pre>
              </div>
            </div>
          )}

          {/* Current State Info */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Current State
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-md">
                <div className="font-medium text-blue-800">Appointment</div>
                <div className="text-blue-600">
                  {appointmentId ? `ID: ${appointmentId}` : "Not created"}
                </div>
              </div>
              <div className="p-3 bg-green-50 rounded-md">
                <div className="font-medium text-green-800">Payment</div>
                <div className="text-green-600">
                  {appointmentId
                    ? "Ready to process"
                    : "Waiting for appointment"}
                </div>
              </div>
              <div className="p-3 bg-purple-50 rounded-md">
                <div className="font-medium text-purple-800">Status</div>
                <div className="text-purple-600">
                  {loading ? "Processing..." : "Ready"}
                </div>
              </div>
            </div>
          </div>

          {/* API Information */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-4 border">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              API Configuration
            </h3>
            <div className="text-sm text-gray-600 space-y-2">
              <p>
                <strong>Base URL:</strong>{" "}
                https://api-beautiful-eyebrow.ctrlbits.xyz/api
              </p>
              <p>
                <strong>Endpoints Used:</strong>
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>POST /appointments/ - Create appointment</li>
                <li>
                  POST /payments/create_payment_intent/ - Create payment intent
                </li>
                <li>POST /payments/confirm_payment/ - Confirm payment</li>
              </ul>
              <p className="text-amber-600">
                <strong>Note:</strong> Make sure to update the Stripe
                publishable key and add authentication headers if required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Elements>
  );
};

export default PaymentTestContainer;
