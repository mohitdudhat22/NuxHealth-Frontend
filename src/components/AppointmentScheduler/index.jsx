import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // for drag and drop
import resourceTimelinePlugin from "@fullcalendar/resource-timeline"; // scheduler
import { NHCard } from "..";

export const AppointmentScheduler = () => {
  const [eventsData, setEventsData] = useState([
    { id: '1', title: 'Meeting', start: '2025-01-10T10:00:00', end: '2025-01-10T11:00:00', resourceId: 'a' },
    { id: '2', title: 'Lunch', start: '2025-01-11T12:00:00', end: '2025-01-11T13:00:00', resourceId: 'b' },
  ]);

  const resources = [
    { id: 'a', title: 'Room A' },
    { id: 'b', title: 'Room B' },
  ];

  return (
    <NHCard>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "resourceTimelineDay,resourceTimelineWeek,dayGridMonth",
        }}
        events={eventsData}
        resources={resources}
        editable={true} // Enables drag and drop
        selectable={true} // Enables selection of time slots
        resourceAreaHeaderContent="Rooms"
        height="100vh"
      />
    </NHCard>
  );
};
