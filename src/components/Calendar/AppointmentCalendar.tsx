import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { RescheduleModal } from './RescheduleModal';
import { CustomToolbar } from './CustomToolbar';
import { CustomEvent } from './types';
import './Calendar.css';

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

const timeSlots = Array.from({ length: 14 }, (_, i) => {
  const hour = i + 8; // Start from 8 AM
  return format(new Date().setHours(hour, 0), 'hh:mm a');
});

export const AppointmentCalendar = () => {
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);

  const events: CustomEvent[] = [
    {
      id: 1,
      title: 'Dr.Andrew - Skin Treatment',
      start: new Date(2024, 0, 15, 15, 0), // 3 PM
      end: new Date(2024, 0, 15, 16, 0),   // 4 PM
      doctor: 'Dr.Andrew',
      treatment: 'Skin Treatment'
    },
    // Add more events as needed
  ];

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setSelectedSlot(start);
    setIsRescheduleOpen(true);
  };

  return (
    <div className="appointment-calendar">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 800 }}
        step={60}
        timeslots={1}
        selectable
        onSelectSlot={handleSelectSlot}
        components={{
          toolbar: CustomToolbar,
          event: CustomEventComponent,
        }}
        formats={{
          timeGutterFormat: (date: Date) => format(date, 'hh a'),
          dayFormat: (date: Date) => format(date, 'EEE dd'),
        }}
      />

      <RescheduleModal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        selectedDate={selectedSlot}
        onReschedule={(newDate) => {
          console.log('Rescheduled to:', newDate);
          setIsRescheduleOpen(false);
        }}
      />
    </div>
  );
};

const CustomEventComponent = ({ event }: { event: CustomEvent }) => (
  <div className="custom-event">
    <div className="event-doctor">{event.doctor}</div>
    <div className="event-treatment">{event.treatment}</div>
  </div>
);