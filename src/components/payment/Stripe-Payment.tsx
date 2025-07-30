import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { createPaymentIntent, confirmPayment } from "../../api/payment.api";

interface StripePaymentProps {
  appointmentId: number;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setMessage: (message: string) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({
  appointmentId,
  loading,
  setLoading,
  setMessage,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentType, setPaymentType] = useState<"deposit" | "full">("deposit");
  const [amount, setAmount] = useState("50.00");

  const handlePayment = async () => {
    if (!stripe || !elements || !appointmentId) {
      setMessage("❌ Stripe not loaded or missing appointment ID");
      return;
    }

    try {
      setLoading(true);
      setMessage("Creating payment intent...");

      // Step 1: Create payment intent with your backend
      const paymentIntentData = await createPaymentIntent({
        appointment_id: appointmentId,
        payment_type: paymentType,
        amount: amount,
      });

      setMessage(
        "✅ Payment intent created. Processing payment with Stripe..."
      );

      const card = elements.getElement(CardElement);
      if (!card) {
        throw new Error("Card element not found");
      }

      // Step 2: Confirm payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentData.client_secret,
        {
          payment_method: {
            card: card,
            billing_details: {
              name: "Test Client",
              email: "test@example.com",
            },
          },
        }
      );

      if (error) {
        throw new Error(error.message);
      }

      setMessage(
        "✅ Payment succeeded with Stripe. Confirming with backend..."
      );

      // Step 3: Confirm payment with your backend
      const confirmData = await confirmPayment(paymentIntent.id);

      setMessage(`🎉 Payment completed successfully!
        Payment Intent ID: ${paymentIntent.id}
        Backend Response: ${JSON.stringify(confirmData, null, 2)}`);
    } catch (error) {
      setMessage(`❌ Payment failed: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Step 2: Process Payment
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Payment Type
          </label>
          <select
            value={paymentType}
            onChange={(e) =>
              setPaymentType(e.target.value as "deposit" | "full")
            }
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="deposit">Deposit</option>
            <option value="full">Full Payment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-3 border border-gray-300 rounded-md bg-white">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="mb-4 p-3 bg-gray-50 rounded-md">
        <h4 className="font-medium text-sm text-gray-700 mb-2">
          Test Card Numbers:
        </h4>
        <div className="text-xs text-gray-600 space-y-1">
          <p>
            <strong>Success:</strong> 4242 4242 4242 4242
          </p>
          <p>
            <strong>Declined:</strong> 4000 0000 0000 0002
          </p>
          <p>
            <strong>Requires SCA:</strong> 4000 0025 0000 3155
          </p>
          <p>
            <strong>Exp:</strong> Any future date | <strong>CVC:</strong> Any 3
            digits
          </p>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={!stripe || loading || !appointmentId}
        className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? "Processing Payment..." : `Pay $${amount}`}
      </button>
    </div>
  );
};

export default StripePayment;
