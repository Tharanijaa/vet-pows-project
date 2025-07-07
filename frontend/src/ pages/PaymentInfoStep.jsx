import React, { useState } from 'react';

const PaymentInfoStep = ({ formData, setFormData, onNext }) => {
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onNext(); // Go to Success step
    }, 2000);
  };

  return (
    <div className="p-6 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Step 3: Payment Info</h2>
      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        <input
          type="text"
          name="cardName"
          placeholder="Name on Card"
          value={formData.cardName || ''}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={formData.cardNumber || ''}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={formData.expiry || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv || ''}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? 'Processing...' : 'Complete Registration'}
        </button>
      </form>
    </div>
  );
};

export default PaymentInfoStep;
