import { useEffect, useState } from "react";
import {
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
} from "@mui/material";
import { Search, Visibility } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";

export default function PatientRecordAccess() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("Month");
  const navigate = useNavigate();
  const { getAppointmetnsForDoctor, allAppointments } = useGlobal();
  const { user } = useAuth();

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      await getAppointmetnsForDoctor(user.id);
    };
    fetchAppointments();
  }, []);

  useEffect(() => {
    // Map appointments to patients format
    const mappedPatients = allAppointments.map((appointment) => ({
      id: appointment._id,
      patientsId: appointment.patientId._id,
      patientName: `${appointment.patientId.firstName} ${appointment.patientId.lastName}`,
      diseaseName: appointment.type || "N/A", // or any relevant field for "diseaseName"
      patientIssue: appointment.patient_issue || "N/A",
      lastAppointmentDate: new Date(appointment.date),
      lastAppointmentTime: new Date(
        appointment.appointmentTime,
      ).toLocaleTimeString(),
      age: `${appointment.patientId.age} Years`,
      gender: appointment.patientId.gender,
    }));
    setPatients(mappedPatients);
  }, [allAppointments]);

  const filterByTime = (patients, timeFilter) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Set to start of today

    return patients.filter((patient) => {
      const appointmentDate = new Date(patient.lastAppointmentDate);
      appointmentDate.setHours(0, 0, 0, 0); // Set to start of appointment day

      const diffTime = now - appointmentDate;
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      switch (timeFilter) {
        case "Month":
          return diffDays <= 30;
        case "Week":
          return diffDays <= 7;
        case "Day":
          return diffDays === 0;
        default:
          return true;
      }
    });
  };

  const filteredPatients = filterByTime(patients, timeFilter).filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-[#e4e3e3] p-6 h-full">
      <div className="patioentRecord p-6 bg-white rounded-lg shadow-md">
        {/* ... (rest of the JSX remains the same) ... */}
        <tbody>
          {filteredPatients.map((patient, index) => (
            <tr key={index}>
              <td className="p-3 text-sm">{patient.patientName}</td>
              <td className="p-3 text-sm">{patient.diseaseName}</td>
              <td className="p-3 text-sm">{patient.patientIssue}</td>
              <td className="p-3 text-sm">
                {patient.lastAppointmentDate.toLocaleDateString()}
              </td>
              <td className="p-3 text-sm">{patient.lastAppointmentTime}</td>
              <td className="p-3 text-sm">{patient.age}</td>
              <td className="p-3 gender">
                <span
                  className={
                    patient.gender === "Male"
                      ? "text-blue-500"
                      : "text-pink-500"
                  }
                >
                  {patient.gender === "Male" ? "♂" : "♀"}
                </span>
              </td>
              <td className="p-3">
                <IconButton color="primary">
                  <Visibility
                    onClick={() =>
                      navigate(`/doctor/patientDetail/${patient.patientsId}`)
                    }
                  />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
        {/* ... (rest of the JSX remains the same) ... */}
      </div>
    </div>
  );
}
