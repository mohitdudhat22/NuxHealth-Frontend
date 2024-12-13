import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Material UI eye icon
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes
import { FaEye } from "react-icons/fa";

const CreatePrescription = ({
  id,
  name,
  age,
  gender,
  appointmentType,
  time,
  isNew,
  patientId,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border rounded-lg pb-4 w-full relative">
      <div className="flex justify-between items-center mb-4 bg-[#f6f8fb] rounded-t-lg px-3 py-2">
        <h2 className="font-semibold text-lg text-[#030229] px-3">{name}</h2>
        <div className="flex items-center">
          {!isNew ? (
            <span className="bg-blue-100 text-blue-500 px-3 py-2 rounded-full text-sm font-medium mr-2">
              New
            </span>
          ) : (
            <span className="bg-green-100 text-green-500 px-3 py-2 rounded-full text-sm font-medium mr-2">
              Old
            </span>
          )}
          <div className="text-[#A7A7A7] w-10 h-10 rounded-md bg-white border text-xl flex items-center justify-center hover:text-[#0EABEB] cursor-pointer duration-100 transition">
            <FaEye
              onClick={() => navigate(`/doctor/prescriptionView/${patientId}`)}
            />
          </div>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-4 px-3 space-y-2">
        <p className="flex items-center justify-between text-base font-normal text-[#818194]">
          Appointment Type:{" "}
          <span className="text-[#5678E9] font-semibold ">
            {appointmentType}
          </span>
        </p>
        <p className="flex items-center justify-between text-base font-normal text-[#818194]">
          Patient Age:{" "}
          <span className="font-semibold text-[#4F4F4F]">{age} Years</span>
        </p>
        <p className="flex items-center justify-between text-base font-normal text-[#818194]">
          Patient Gender:{" "}
          <span className="font-semibold text-[#4F4F4F]">{gender}</span>
        </p>
        <p className="flex items-center justify-between text-base font-normal text-[#818194]">
          Appointment Time:{" "}
          <span className="font-semibold text-[#4F4F4F]">{time}</span>
        </p>
      </div>
      <button
        variant="contained"
        className="hover:bg-[#0EABEB] hover:text-white text-[#4F4F4F] w-[93%] py-2 mx-3 text-[20px] bg-[#F6F8FB] duration-200 transition-all"
        style={{
          borderRadius: "8px",
        }}
        onClick={() => navigate(`/doctor/createPrescriptionForm/${id}`)}
      >
        Create Prescription
      </button>
      <div
        className="absolute top-0 left-0 w-full h-full rounded-lg"
        style={{
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)",
          zIndex: -1,
        }}
      ></div>
    </div>
  );
};

// Add PropTypes validation
CreatePrescription.propTypes = {
  id: PropTypes.string.isRequired, // Validate id as a required string
  name: PropTypes.string.isRequired, // Validate name as a required string
  age: PropTypes.number, // Validate age as a required number
  gender: PropTypes.string, // Validate gender as a required string
  appointmentType: PropTypes.string.isRequired, // Validate appointmentType as a required string
  time: PropTypes.string.isRequired, // Validate time as a required string
  isNew: PropTypes.bool.isRequired, // Validate isNew as a required boolean
  patientId: PropTypes.string, // Validate patientId as a required string
};

export default CreatePrescription;
