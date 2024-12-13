import { Button } from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import EventIcon from "@mui/icons-material/Event";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { LuPhoneCall } from "react-icons/lu";

// PatientCard component
const TeleConsultationCard = ({ patient }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border rounded-lg pb-4 w-full relative">
      <div className="">
        <h3 className="flex justify-between items-center mb-4 bg-[#f6f8fb] rounded-t-lg px-3 py-3 font-semibold text-lg text-[#030229]">
          {patient.name}
        </h3>
        <div className="text-sm text-gray-600 mb-2 px-3 space-y-1">
          <p className="flex items-center justify-between text-base font-normal text-[#818194]">
            Patient Issue:{" "}
            <strong lassName="text-[#4F4F4F] font-semibold ">
              {patient.patient_issue}
            </strong>
          </p>
          <p className="flex items-center justify-between font-normal text-[#818194]">
            Disease Name:{" "}
            <strong lassName="text-[#4F4F4F] font-semibold">
              {patient.disease}{" "}
            </strong>
          </p>
          <p className="flex items-center justify-between text-base font-normal text-[#818194]">
            Appointment Date:{" "}
            <strong lassName="text-[#4F4F4F] font-semibold ">
              {patient.date}
            </strong>
          </p>
          <p className="flex items-center justify-between text-base font-normal text-[#818194]">
            Appointment Time:{" "}
            <strong lassName="text-[#4F4F4F] font-semibold ">
              {patient.time}
            </strong>
          </p>
        </div>
      </div>
      <div className="px-1 py-2 flex justify-between gap-4">
        <button
          variant="contained"
          color="success"
          className="join hover:bg-[#39973D] hover:text-white   bg-[#f6f8fb] duration-200 transition-all rounded-lg py-3 w-[45%] text-[20px] flex items-center justify-center text-[#030229]"
          onClick={() => navigate("/doctor/vid?room=" + patient?.id)}
        >
          <LuPhoneCall className="me-2" />
          Join Call
        </button>
        <button
          variant="contained"
          className="reschedule hover:bg-[#0EABEB] hover:text-white bg-[#f6f8fb] duration-200 transition-all rounded-lg py-3 w-[46%] text-[20px] flex items-center justify-center text-[#030229]"
          onClick={() => navigate("/doctor/appointmentTimeSlot")}
        >
          <EventIcon />
          Reschedule
        </button>
      </div>
    </div>
  );
};

// Add PropTypes validation
TeleConsultationCard.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    issue: PropTypes.string.isRequired,
    disease: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired, // Ensure 'id' is included
  }).isRequired,
};

export default TeleConsultationCard;
