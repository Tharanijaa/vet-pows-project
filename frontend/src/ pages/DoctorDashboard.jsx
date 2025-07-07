import React from 'react';
import { FaClock } from 'react-icons/fa';

const DoctorDashboard = () => {
  const appointments = [
    {
      time: '9:00 AM',
      pet: 'Buddy',
      breed: 'Golden Retriever',
      owner: 'John Smith',
      reason: 'Vaccination',
      phone: '+1 234-567-8901',
      status: 'Confirmed',
    },
    {
      time: '10:30 AM',
      pet: 'Luna',
      breed: 'Labrador',
      owner: 'Sarah Davis',
      reason: 'Emergency - Stomach upset',
      phone: '+1 234-567-8902',
      status: 'Urgent',
    },
    {
      time: '2:00 PM',
      pet: 'Max',
      breed: 'German Shepherd',
      owner: 'Mike Brown',
      reason: 'Regular Checkup',
      phone: '+1 234-567-8903',
      status: 'In Progress',
    },
    {
      time: '3:30 PM',
      pet: 'Bella',
      breed: 'Poodle',
      owner: 'Lisa Wilson',
      reason: 'Skin condition',
      phone: '+1 234-567-8904',
      status: 'Confirmed',
    },
  ];

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Confirmed</span>;
      case 'urgent':
        return <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-semibold">Urgent</span>;
      case 'in progress':
        return <span className="bg-orange-800 text-white text-xs px-2 py-1 rounded">In Progress</span>;
      case 'pending':
        return <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-[#fdfaf6] min-h-screen font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-orange-800">Doctor Dashboard</h1>
        <p className="text-gray-600">Welcome back, Dr. Johnson</p>
        <div className="flex justify-end gap-3 mt-2 text-sm">
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Online</span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">4 Appointments Today</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Today's Appointments" value="4" subtitle="1 urgent case" />
        <StatCard title="My Patients" value="45" subtitle="3 new this week" />
        <StatCard title="Consultations" value="28" subtitle="This month" />
        <StatCard title="Rating" value="4.9" subtitle="⭐ Excellent" />
      </div>

      <div className="flex gap-6 border-b mb-6 text-sm">
        {["Today's Appointments", 'My Patients', 'Profile'].map((tab, idx) => (
          <button key={idx} className="pb-2 border-b-2 border-orange-800 text-orange-800 font-semibold">
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4 text-orange-800">Today's Schedule</h2>
        <p className="text-sm text-gray-500 mb-6">Manage your appointments for today</p>
        <div className="space-y-4">
          {appointments.map((a, i) => (
            <div key={i} className="border rounded-lg p-4 flex justify-between items-center bg-[#fefcf8]">
              <div className="flex items-start gap-4">
                <FaClock className="text-orange-700 mt-1" />
                <div>
                  <p className="text-sm font-semibold text-orange-900">{a.time}</p>
                  <p className="text-base font-medium text-orange-900">
                    {a.pet}{' '}
                    <span className="text-xs text-gray-500">
                      ({a.breed}) • {a.owner}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">{a.reason}</p>
                  <p className="text-sm text-gray-400">{a.phone}</p>
                </div>
              </div>
              <div className="text-right space-y-2">
                {getStatusBadge(a.status)}
                <button className="text-sm px-3 py-1 bg-orange-100 hover:bg-orange-200 rounded text-orange-800 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white p-4 rounded shadow text-center border-t-4 border-orange-600">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-orange-800">{value}</p>
    <p className="text-xs text-orange-600">{subtitle}</p>
  </div>
);

export default DoctorDashboard;
