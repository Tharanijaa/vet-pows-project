import React from 'react';

const PaymentStep = ({ paymentData, onChange, onBack, onSubmit, loading }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Step 3 of 3</h2>
      <h3 className="text-lg font-semibold mb-2">Payment Information</h3>

      <div className="bg-green-50 border border-green-300 p-4 rounded mb-4">
        <p className="text-green-700 font-medium">
          💳 Registration Fee: ₹500
        </p>
        <p className="text-sm text-gray-600">
          Includes 2 months of FREE premium services
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentData.cardNumber}
          onChange={onChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <div className="flex gap-4">
          <input
            type="text"
            name="expiryDate"
            placeholder="MM/YY"
            value={paymentData.expiryDate}
            onChange={onChange}
            required
            className="w-full border rounded px-4 py-2"
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentData.cvv}
            onChange={onChange}
            required
            className="w-full border rounded px-4 py-2"
          />
        </div>

        <input
          type="text"
          name="cardholderName"
          placeholder="Cardholder Name"
          value={paymentData.cardholderName}
          onChange={onChange}
          required
          className="w-full border rounded px-4 py-2"
        />

        <div className="bg-blue-50 p-3 rounded text-sm text-blue-700 border border-blue-300">
          🔐 Your payment information is encrypted and secure. We use industry-standard SSL encryption.
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            {loading ? 'Processing...' : 'Complete Registration'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentStep;
