import React, { useEffect, useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./AppointmentTimeSlot.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RescheduleAppointmentModal } from "@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal";
import { useLocation } from "react-router-dom";

// const localizer = momentLocalizer(moment);

export const AppointmentTimeSlot = () => {
  // const location = useLocation();
  // const selectedAppointment = location.state?.appointment;

  // // Convert appointment date and time to a valid Date object
  // const getEventDate = (appointment) => {
  //   if (!appointment) return null;

  //   const dateString = `${appointment.appointmentDate} ${appointment.appointmentTime}`;
  //   return moment(dateString, "D MMM, YYYY h:mm A").toDate();
  // };

  // const [events, setEvents] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedSlot, setSelectedSlot] = useState({
  //   start: selectedAppointment ? getEventDate(selectedAppointment) : null,
  //   end: selectedAppointment
  //     ? moment(getEventDate(selectedAppointment)).add(1, "hour").toDate()
  //     : null,
  // });
  

  // useEffect(() => {
  //   if (selectedAppointment) {
  //     const newEvent = {
  //       title: "Rescheduled Appointment",
  //       start: getEventDate(selectedAppointment),
  //       end: moment(getEventDate(selectedAppointment)).toDate(), // 1-hour duration
  //     };
  //     setEvents([newEvent]);
  //   }
  // }, [selectedAppointment]);

  // const handleSelectEvent = (event) => {
  //   setSelectedSlot({ start: event.start, end: event.end });
  //   setIsModalOpen(true);
  // };

  // const handleModalOk = (date, time) => {
  //   const eventStart = moment(date)
  //     .set({
  //       hour: moment(time, "HH:mm").hour(),
  //       minute: moment(time, "HH:mm").minute(),
  //     })
  //     .toDate();
  
  //   const eventEnd = moment(eventStart).toDate();
  
  //   // Create the new rescheduled event
  //   const newEvent = {
  //     title: "Rescheduled Appointment",
  //     start: eventStart,
  //     end: eventEnd,
  //   };
  
  //   // Remove the old event (if any)
  //   const updatedEvents = events.filter(
  //     (event) => event.start !== selectedSlot.start
  //   );
  
  //   // Add the new event
  //   setEvents([...updatedEvents, newEvent]);
  //   setIsModalOpen(false);
  // };

  // const handleModalClose = () => {
  //   setIsModalOpen(false);
  // };

  // const eventPropGetter = (event) => {
  //   if (event.title === "Rescheduled Appointment") {
  //     return {
  //       style: {
  //         backgroundColor: "#0EABEB",
  //         color: "white",
  //         borderRadius: "4px",
  //         border: "none",
  //       },
  //     };
  //   }
  //   return {};
  // };

  // const TimeColumnHeader = () => {
  //   return (
  //     <div className="rbc-time-header">
  //       <div className="rbc-label text-[#0EABEB] font-semibold">Time</div>
  //     </div>
  //   );
  // };

  // const CustomToolbar = ({ date, onNavigate }) => {
  //   const startDate = moment(date).startOf("week").format("D MMMM, YYYY");
  //   const endDate = moment(date).endOf("week").format("D MMMM, YYYY");

  //   const goToPreviousWeek = () => {
  //     onNavigate("PREV");
  //   };

  //   const goToNextWeek = () => {
  //     onNavigate("NEXT");
  //   };

  //   return (
  //     <div className="rbc-toolbar">
  //       <span className="rbc-toolbar-label">
  //         <button
  //           type="button"
  //           className="bg-transparent !border-0 !text-[#0EABEB]"
  //           onClick={goToPreviousWeek}
  //         >
  //           <FaArrowLeft />
  //         </button>
  //         <span className="!text-[#0EABEB] font-semibold">
  //           {startDate} - {endDate}
  //         </span>
  //         <button
  //           type="button"
  //           className="bg-transparent !border-0 !text-[#0EABEB]"
  //           onClick={goToNextWeek}
  //         >
  //           <FaArrowRight />
  //         </button>
  //       </span>
  //     </div>
  //   );
  // };

  return (
    <div className="appointment_time-slot" style={{ height: "100%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectEvent={handleSelectEvent}
        defaultView="week"
        views={["month", "week", "day"]}
        step={60}
        timeslots={1}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0)}
        eventPropGetter={eventPropGetter}
        components={{
          timeGutterHeader: TimeColumnHeader,
          toolbar: CustomToolbar,
        }}
      />
      <RescheduleAppointmentModal
        handleOk={handleModalOk}
        handleClose={handleModalClose}
        rescheduleAppo={isModalOpen}
        Title="Reschedule Appointment"
        initialDate={selectedSlot.start}
        initialTime={moment(selectedSlot.start).format("HH:mm")} 
      />
    </div>
  );
};
