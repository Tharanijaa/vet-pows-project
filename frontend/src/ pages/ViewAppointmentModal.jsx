import React from 'react';

const ViewAppointmentModal = ({ appointment, onClose }) => {
  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Appointment Details</h2>
        <p><strong>Pet:</strong> {appointment?.pet?.name || 'N/A'}</p>
        <p><strong>Owner:</strong> {appointment?.owner?.name || 'N/A'}</p>
        <p><strong>Reason:</strong> {appointment?.reason || 'N/A'}</p>
        <p><strong>Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
        <div className="mt-4 text-right">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAppointmentModal;
