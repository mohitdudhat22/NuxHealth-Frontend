import React, { useState } from 'react'
import moment from 'moment'
// import { momentLocalizer, Calendar } from 'react-big-calendar'
// import "react-big-calendar/lib/css/react-big-calendar.css";
import events from './events';
import { NHCard } from '..';


export const AppointmentSchedular= () => {
  const [eventsData, setEventsData] = useState(events);
const localizer = momentLocalizer(moment)
  return (
    <NHCard>
      {/* <Calendar
        views={["day", "work_week", "month"]}
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
      /> */}
  </NHCard>
  )
}
