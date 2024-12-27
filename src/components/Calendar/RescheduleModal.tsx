import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { format } from 'date-fns';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | null;
  onReschedule: (date: Date) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  selectedDate,
  onReschedule,
}) => {
  const [time, setTime] = useState('15:00');

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="relative bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Reschedule Appointment
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Date
              </label>
              <div className="mt-1 p-2 w-full border rounded-md">
                {selectedDate ? format(selectedDate, 'dd MMMM, yyyy') : 'Select a date'}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Time
              </label>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="15:00">03:00 PM - 04:00 PM</option>
                <option value="16:00">04:00 PM - 05:00 PM</option>
                <option value="17:00">05:00 PM - 06:00 PM</option>
              </select>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
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
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Reschedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};