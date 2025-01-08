import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

// Setup the localizer by providing the moment object
const localizer = momentLocalizer(moment);

const ReSchedularAppoinmentPage = () => {
  const [events, setEvents] = useState([
    {
        title: 'Appointment 1',
        start: new Date(2022, 5, 18, 10, 0), // Year, Month (0-based), Day, Hour, Minute
        end: new Date(2022, 5, 18, 11, 0),
      },
      {
        title: 'Appointment 2',
        start: new Date(2022, 5, 19, 14, 0),
        end: new Date(2022, 5, 19, 15, 0),
      },
  ]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Appointment Name");
    if (title) {
      setEvents([...events, { title, start, end }]);
    }
  };

  // Customize the time column header
  const TimeColumnHeader = () => {
    return (
      <div className="rbc-time-header">
        <div className="rbc-label">Time</div>
      </div>
    );
  };

  // Customize the date range display
  const CustomToolbar = ({ date, onNavigate }) => {
    const startDate = moment(date).startOf('week').format('D MMMM, YYYY');
    const endDate = moment(date).endOf('week').format('D MMMM, YYYY');

    const goToPreviousWeek = () => {
        onNavigate('PREV');
      };
  
      const goToNextWeek = () => {
        onNavigate('NEXT');
      };

    return (
      <div className="rbc-toolbar">
        <span className="rbc-toolbar-label">
        <button type="button" className="bg-transparent !border-0 !text-[#0EABEB]" onClick={goToPreviousWeek}>
            <FaArrowLeft /> {/* Left arrow icon */}
          </button>  <span className="!text-[#0EABEB] font-semibold">{startDate} - {endDate}</span> <button type="button" className="bg-transparent !border-0 !text-[#0EABEB]" onClick={goToNextWeek}>
            <FaArrowRight /> {/* Right arrow icon */}
          </button>
        </span>
      </div>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="week"
        views={['month', 'week', 'day']}
        step={60} // 60 minutes
        timeslots={1} // 1 event per slot
        min={new Date(0, 0, 0, 8, 0, 0)} // Start time of the day
        max={new Date(0, 0, 0, 18, 0, 0)} // End time of the day
        components={{
          timeGutterHeader: TimeColumnHeader, // Custom time column header
          toolbar: CustomToolbar, // Custom toolbar for date range
        }}
      />
    </div>
  );
};

export default ReSchedularAppoinmentPage;
