import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // 🚀 For redirection

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded properly");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name,
          email,
        },
      });

      if (methodError) {
        console.error("Stripe createPaymentMethod error:", methodError);
        setError(methodError.message);
        setLoading(false);
        return;
      }

      const response = await axios.post("http://localhost:5000/api/payment/create-payment-intent", {
        amount: parseInt(amount) * 100,
      });

      const { clientSecret } = response.data;

      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name,
            email,
          },
        },
      });

      if (confirmError) {
        console.error("Stripe confirmCardPayment error:", confirmError);
        setError(confirmError.message);
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", paymentIntent);
        setSuccess("🎉 Payment successful!");
        // ✅ Redirect after short delay
        setTimeout(() => {
          navigate("/dog-dashboard");
        }, 2000); // optional delay (2s)
      } else {
        setError("⚠️ Payment failed. Please try again.");
      }

    } catch (err) {
      console.error("Server or network error:", err);
      setError("Server error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md p-6 rounded space-y-4">
      <h2 className="text-xl font-semibold mb-4">Complete Your Payment</h2>

      <div>
        <label className="block mb-1 font-medium">Full Name</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Amount (LKR)</label>
        <input
          type="number"
          className="w-full border px-3 py-2 rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000"
          required
        />
      </div>

      <div className="mb-4 border p-3 rounded">
        <CardElement />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
