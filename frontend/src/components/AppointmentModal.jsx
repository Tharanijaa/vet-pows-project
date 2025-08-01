import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AppointmentModal = ({ isOpen, onClose, doctor, onAppointmentBooked }) => {
  const [dogs, setDogs] = useState([]);
  const [selectedDogId, setSelectedDogId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchDogs = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            setErrorMsg('❌ You must be logged in to fetch pets.');
            return;
          }
          const res = await axios.get(`${API_URL}/animals`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDogs(res.data);
          setErrorMsg(''); // Clear previous errors on success
        } catch (err) {
          console.error('Failed to fetch dogs:', err);
          setErrorMsg('Failed to fetch your pets. Please try again.');
        }
      };
      fetchDogs();
    }
  }, [isOpen]);

  const handleBooking = async () => {
    setErrorMsg('');
    if (!doctor || !selectedDogId || !date || !time || !reason.trim()) {
      setErrorMsg('❌ All fields are required!');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMsg('❌ You must be logged in.');
        setLoading(false);
        return;
      }

      // Only use doctor._id for booking
      if (!doctor._id) {
        setErrorMsg('❌ Doctor ID is missing. Please contact support.');
        setLoading(false);
        return;
      }


      const userId = localStorage.getItem('userid');
      if (!userId) {
        setErrorMsg('❌ User ID not found. Please log in again.');
        setLoading(false);
        return;
      }
      const payload = {
        veterinarian: doctor._id,
        pet: selectedDogId,
        date,
        time,
        reason: reason.trim(),
        createdBy: userId.toString(),
      };


//       const payload = {
//   doctorId: doctor._id, // ✅ change to match backend field name
//   petId: selectedDogId, // ✅ more standard naming
//   date,
//   time,
//   reason: reason.trim(),
//   userId: userId.toString(),
// };


      // Debug: Log payload before sending
      console.log('Booking payload:', payload);

      await axios.post(`${API_URL}/appointments`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('✅ Appointment booked successfully!');
      setDate('');
      setTime('');
      setReason('');
      setSelectedDogId('');
      if (onAppointmentBooked) {
        onAppointmentBooked(); // Refresh appointments in parent
      }
      onClose();
    } catch (error) {
      console.error('Booking error:', error?.response?.data || error.message);
      setErrorMsg('❌ Booking failed: ' + (error?.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
          type="button"
        >
          &#x2715;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Book Appointment</h2>

        <div className="mb-4 text-center">
          <p>
            <strong>Doctor:</strong> {doctor?.name || doctor?.fullName || 'N/A'}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-3 text-red-600 font-semibold text-center">{errorMsg}</div>
        )}

        <label htmlFor="dog" className="block mb-2 font-semibold">
          Select Pet
        </label>
        <select
          id="dog"
          value={selectedDogId}
          onChange={(e) => setSelectedDogId(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        >
          <option value="">-- Select your pet --</option>
          {dogs.map((dog) => (
            <option key={dog._id} value={dog._id}>
              {dog.name || dog.petName || 'Unnamed Pet'}
            </option>
          ))}
        </select>

        <label htmlFor="date" className="block mb-2 font-semibold">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
          min={new Date().toISOString().split('T')[0]}
        />

        <label htmlFor="time" className="block mb-2 font-semibold">
          Time
        </label>
        <input
          id="time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2"
        />

        <label htmlFor="reason" className="block mb-2 font-semibold">
          Reason
        </label>
        <textarea
          id="reason"
          rows="3"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Describe the reason for the appointment"
          className="w-full mb-4 border border-gray-300 rounded px-3 py-2 resize-none"
        />

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleBooking}
            disabled={loading}
            className={`px-4 py-2 text-white rounded ${
              loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;









