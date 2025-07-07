import React from 'react';

const OwnerInfoStep = ({ formData, onChange, onBack, onNext }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Step 2 of 3</h2>
      <h3 className="text-lg font-semibold mb-2">Owner Information</h3>

      <form onSubmit={(e) => { e.preventDefault(); onNext(); }} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name *</label>
          <input
            type="text"
            name="ownerName"
            value={formData.ownerName}
            onChange={onChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
            className="w-full border rounded px-3 py-2"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Address (Optional)</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={onChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter your complete address"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="px-4 py-2 bg-gray-300 rounded text-gray-800"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default OwnerInfoStep;
