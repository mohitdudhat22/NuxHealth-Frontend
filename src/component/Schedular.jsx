import { useState } from "react";
import TimeSlot from "./TimeSlot";
import AppointmentModal from "./AppointmentModal";
import "./Schedular.css";
const days = [
  "Sun 17",
  "Mon 18",
  "Tue 19",
  "Wed 20",
  "Thu 21",
  "Fri 22",
  "Sat 23",
];
const times = [
  "08 AM",
  "09 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "01 PM",
  "02 PM",
  "03 PM",
  "04 PM",
  "05 PM",
  "06 PM",
  "07 PM",
  "08 PM",
  "09 PM",
];

const Scheduler = () => {
  const [modalData, setModalData] = useState(null);

  const handleSlotClick = (day, time) => {
    setModalData({ day, time });
  };

  return (
    <div className="scheduler-container">
      <h2>Appointment Time Slot</h2>
      <div className="scheduler">
        <div className="time-col">
          <div className="day-header">Time</div>
          {times.map((time, index) => (
            <div key={index} className="time-cell">
              {time}
            </div>
          ))}
        </div>
        <div className="days-row">
          {days.map((day, index) => (
            <div key={index} className="day-col">
              <div className="day-header">{day}</div>
              {times.map((time, timeIndex) => (
                <TimeSlot
                  key={timeIndex}
                  day={day}
                  time={time}
                  onClick={() => handleSlotClick(day, time)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {modalData && (
        <AppointmentModal
          modalData={modalData}
          onClose={() => setModalData(null)}
        />
      )}
    </div>
  );
};

export default Scheduler;
