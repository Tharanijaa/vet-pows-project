import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

// Stripe public key (already correct)
const stripePromise = loadStripe("pk_test_51RlQzvR4GmEosOzPm0tvNvNFONSDOW3QRCuGjVogzEDIb9PjW7h85KJNeCV51rxt2n6A4g4ENbPB8aVS4BbWYXUb00Tsyv677t");

const PaymentPage = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Payment</h1>

      {/* Stripe Elements section */}
      <Elements stripe={stripePromise}>
        <CheckoutForm formData={formData} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
