import { IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function TeleConsultationTable({ patient }) {
  const navigate = useNavigate();
  return (
    <tr className="border-t">
      <td className="p-3">{patient.name}</td>
      <td className="p-3">{patient.disease}</td>
      <td className="p-3">{patient.issue}</td>
      <td className="p-3">{patient.time}</td>
      <td className="p-3 text-blue-600">{patient.time}</td>
      <td className="p-3">{patient.age}</td>
      <td className="p-3 gender">
        <span
          className={
            patient.gender === "Male" ? "text-blue-500" : "text-pink-500"
          }
        >
          {patient.gender === "Male" ? "♂" : "♀"}
        </span>
      </td>
      <td className="p-3">
        <IconButton color="primary">
          <Visibility
            onClick={() =>
              navigate(`/doctor/patientDetail/${patient.patientId}`)
            }
          />
        </IconButton>
      </td>
    </tr>
  );
}

// Add PropTypes validation
TeleConsultationTable.propTypes = {
  patient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    disease: PropTypes.string.isRequired,
    issue: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    patientId: PropTypes.string.isRequired,
  }).isRequired,
};
