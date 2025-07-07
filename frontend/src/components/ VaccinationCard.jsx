import React from 'react';
import { CalendarDays } from 'lucide-react';

const VaccinationCard = ({ vaccine }) => {
  const getStatus = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diff = (due - today) / (1000 * 60 * 60 * 24);

    if (diff < 0) return 'due';
    if (diff <= 7) return 'upcoming';
    return 'scheduled';
  };

  const status = getStatus(vaccine.date);

  const badgeClass =
    status === 'due'
      ? 'bg-red-100 text-red-600'
      : status === 'upcoming'
      ? 'bg-yellow-100 text-yellow-600'
      : 'bg-green-100 text-green-600';

  const badgeText =
    status === 'due'
      ? 'Due'
      : status === 'upcoming'
      ? 'Upcoming'
      : 'Scheduled';

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
      <div className="flex justify-between items-center mb-1">
        <div className="font-medium text-gray-800">{vaccine.vaccine}</div>
        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${badgeClass}`}>
          {badgeText}
        </span>
      </div>
      <div className="text-sm text-gray-600 flex items-center gap-1">
        <CalendarDays size={16} />
        <span>Due Date: {new Date(vaccine.date).toLocaleDateString()}</span>
      </div>
      {vaccine.dogName && (
        <p className="mt-1 text-xs text-gray-500">For: {vaccine.dogName}</p>
      )}
    </div>
  );
};

export default VaccinationCard;
