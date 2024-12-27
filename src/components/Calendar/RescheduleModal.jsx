import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';

const timeSlots = [
  { value: '09:00', label: '09:00 AM - 10:00 AM' },
  { value: '10:00', label: '10:00 AM - 11:00 AM' },
  { value: '11:00', label: '11:00 AM - 12:00 PM' },
  { value: '13:00', label: '01:00 PM - 02:00 PM' },
  { value: '14:00', label: '02:00 PM - 03:00 PM' },
  { value: '15:00', label: '03:00 PM - 04:00 PM' },
  { value: '16:00', label: '04:00 PM - 05:00 PM' },
  { value: '17:00', label: '05:00 PM - 06:00 PM' },
];

export const RescheduleModal = ({ isOpen, onClose, selectedDate, onReschedule }) => {
  const [time, setTime] = useState('15:00');

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center p-4">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
          <div className="px-6 py-4 border-b border-gray-200">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Reschedule Appointment
            </Dialog.Title>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Date
              </label>
              <div className="p-3 bg-gray-50 rounded-md text-sm text-gray-900">
                {selectedDate ? format(selectedDate, 'dd MMMM, yyyy') : 'Select a date'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedDate) {
                  const [hours, minutes] = time.split(':').map(Number);
                  const newDate = new Date(selectedDate);
                  newDate.setHours(hours, minutes);
                  onReschedule(newDate);
                }
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};