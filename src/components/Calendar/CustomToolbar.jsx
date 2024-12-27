import React from 'react';
import { format } from 'date-fns';

export const CustomToolbar = ({ date, onNavigate }) => {
  const formattedDate = format(date, "dd MMM, yyyy' - 'dd MMM, yyyy");

  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          onClick={() => onNavigate('PREV')}
        >
          ‹
        </button>
        <span className="text-sm font-medium text-gray-900">{formattedDate}</span>
        <button
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
          onClick={() => onNavigate('NEXT')}
        >
          ›
        </button>
      </div>
    </div>
  );
};