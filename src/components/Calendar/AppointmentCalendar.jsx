import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { RescheduleModal } from './RescheduleModal';
import { CustomToolbar } from './CustomToolbar';
import { CustomEvent } from './CustomEvent';
import '../styles/calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const mockEvents = [
  {
    id: 1,
    title: 'Dr.Andrew - Skin Treatment',
    start: new Date(2024, 0, 15, 15, 0),
    end: new Date(2024, 0, 15, 16, 0),
    doctor: 'Dr.Andrew',
    treatment: 'Skin Treatment'
  },
  {
    id: 2,
    title: 'Dr.Andrew - Hair Treatment',
    start: new Date(2024, 0, 15, 19, 0),
    end: new Date(2024, 0, 15, 20, 0),
    doctor: 'Dr.Andrew',
    treatment: 'Hair Treatment'
  }
];

export const AppointmentCalendar = () => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSelectSlot = ({ start }) => {
    setSelectedSlot(start);
    setIsRescheduleOpen(true);
  };

  const handleReschedule = (newDate) => {
    console.log('Rescheduled to:', newDate);
    setIsRescheduleOpen(false);
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-sm">
      <Calendar
        localizer={localizer}
        events={mockEvents}
        startAccessor="start"
        endAccessor="end"
        className="min-h-[800px]"
        step={60}
        timeslots={1}
        selectable
        onSelectSlot={handleSelectSlot}
        components={{
          toolbar: CustomToolbar,
          event: CustomEvent,
        }}
        formats={{
          timeGutterFormat: (date) => format(date, 'hh a'),
          dayFormat: (date) => format(date, 'EEE dd'),
        }}
        defaultView="week"
        views={['week']}
      />

      <RescheduleModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        selectedDate={selectedSlot}
        onReschedule={handleReschedule}
      />
    </div>
  );
};