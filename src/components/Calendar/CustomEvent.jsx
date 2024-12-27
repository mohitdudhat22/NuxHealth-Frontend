import React from 'react';

export const CustomEvent = ({ event }) => (
  <div className="bg-blue-500 text-white p-2 rounded-md h-full flex flex-col justify-center">
    <div className="font-medium text-sm">{event.doctor}</div>
    <div className="text-xs opacity-90">{event.treatment}</div>
  </div>
);