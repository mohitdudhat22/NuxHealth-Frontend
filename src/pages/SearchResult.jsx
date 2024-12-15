import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import { useDoctor } from "../hooks/useDoctor";
import { usePatient } from "../hooks/usePatient";
import { useGlobal } from "../hooks/useGlobal";

 const SearchResult = () => {
  const { getAllDoctors, allDoctors } = useDoctor();
  const { getAllPatients, allPatients } = usePatient();
  const { searchTerm, setSearchTerm } = useGlobal();
  const { selectedOption, setSelectedOption } = useGlobal();
  const [activeTab, setActiveTab] = useState("today");
  const [filteredAppointments, setFilteredAppointments] = useState([]);

  const filteredDoctors = allDoctors.filter((doctor) =>
    doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const searchFilteredAppointments = filteredAppointments?.filter(
    (appointment) =>
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const filterAppointments = () => {
    if (!allPatients || !Array.isArray(allPatients)) return [];

    const allAppointments = allPatients.flatMap((patient) =>
      (patient.appointmentId || []).map((apt) => ({
        name: `${patient.firstName} ${patient.lastName}`,
        issue: apt.patient_issue,
        doctor: "Dr. " + (apt.doctorId?.name || "Unknown"),
        disease: apt.type,
        time: new Date(apt.appointmentTime).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
        type: apt.type === "follow_up" ? "Follow-up" : "Consultation",
        phone: patient.phone,
        age: `${patient.age} Years`,
        gender: patient.gender,
        address: patient.address,
        date: new Date(apt.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: apt.status,
        appointmentDate: new Date(apt.date),
        patientDetails: {
          ...patient,
          appointment: apt,
        },
      })),
    );

    const uniqueAppointments = allAppointments.filter(
      (value, index, self) =>
        index ===
        self.findIndex(
          (t) =>
            t.appointmentDate.getTime() === value.appointmentDate.getTime() &&
            t.name === value.name,
        ),
    );

    return uniqueAppointments;
  };

  useEffect(() => {
    const filtered = filterAppointments();
    setFilteredAppointments(filtered);
  }, [allPatients, activeTab]);
  useEffect(() => {
    getAllDoctors();
    getAllPatients();
  }, []);

  const renderDoctorsTable = (selectedOption = "All") => {
    const tableHeight = selectedOption == "Doctor" ? "100%" : "350px";
    return (
      <>
        <div className="bg-white p-2 mx-3 my-3 rounded-lg">
          <h1 className="text-xl font-bold text-[#030229] mb-2">Doctor</h1>
          <div
            className={`pr-data overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200`}
            style={{ height: tableHeight }}
          >
            <table className="min-w-full table-auto mb-10">
              <thead className="bg-[#F6F8FB]">
                <tr>
                  <th className="p-3 text-left text-lg font-semibold text-gray-700 rounded-tl-lg">
                    Doctor Name
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Gender
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Qualification
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Specialty
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Working Time
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Patient Check Up Time
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Break Time
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229] rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.length > 0 ? (
                  filteredDoctors.map((doctor) => (
                    <tr key={doctor._id} className="border-b">
                      <td className="flex items-center p-3 space-x-3 text-md font-semibold text-[#4F4F4F]">
                        <div className="w-10 h-10">
                          <img
                            src={doctor.avatar}
                            alt={doctor.name}
                            className="w-full h-full rounded-full border border-gray-300 object-cover"
                          />
                        </div>
                        <h3 className="text-md font-semibold text-[#4F4F4F]">
                          {doctor.name}
                        </h3>
                      </td>
                      <td className="p-3 text-lg font-semibold text-[#4F4F4F]">
                        {doctor.gender === "female" ? (
                          <BsGenderFemale className="text-pink-500" />
                        ) : (
                          <BsGenderMale className="text-blue-500 " />
                        )}
                      </td>
                      <td className="p-3 text-md font-semibold text-[#4F4F4F]">
                        {doctor.qualification}
                      </td>
                      <td className="p-3 text-md font-semibold text-[#4F4F4F]">
                        {doctor.speciality}
                      </td>
                      <td className="p-3 text-md font-semibold text-[#4F4F4F]">
                        {doctor.workingOn}
                      </td>
                      <td className="p-3 text-md font-semibold">
                        <p className="text-[#718EBF] rounded-full bg-[#F6F8FB] py-2 text-center">
                          {doctor.patientCheckupTime}
                        </p>
                      </td>
                      <td className="p-3 text-md font-semibold text-[#4F4F4F]">
                        <p className="text-[#718EBF] rounded-full bg-[#F6F8FB] py-2 text-center">
                          {doctor.breakTime}
                        </p>
                      </td>
                      <td className="p-3 flex items-center space-x-4 text-gray-600">
                        {/* <div
                        className="p-2 rounded hover:bg-blue-100 cursor-pointer"
                        onClick={() => navigate(`/doctorEdit/${doctor._id}`)}
                      >
                        <FaEdit className="text-blue-600" />
                      </div> */}
                        <div
                          className="p-2 rounded cursor-pointer bg-[#F6F8FB]"
                          onClick={() => handleViewDoctorDetails(doctor)}
                        >
                          <FaEye className="text-[#0EABEB]" />
                        </div>
                        {/* <div
                        className="p-2 rounded hover:bg-red-100 cursor-pointer"
                        onClick={() => handleDeleteDoctor(doctor._id)}
                      >
                        <MdDelete className="text-red-600" />
                      </div> */}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="p-6 text-center">
                      <div className="flex flex-col items-center space-y-2 text-gray-500">
                        <img
                          src="/img/no_doctors.png"
                          alt="No data"
                          className="w-20 h-20"
                        />
                        <h1 className="text-lg font-semibold">
                          No Doctor Found
                        </h1>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const renderPatientsTable = (selectedOption = "All") => {
    const tableHeight = selectedOption == "Patient" ? "800px" : "350px";
    return (
      <>
        <div className="bg-white p-2 mx-3 rounded-lg">
          <h1 className="text-xl font-bold text-[#030229] mb-2">Patient</h1>
          <div
            className={`pr-data overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 `}
            style={{ height: tableHeight }}
          >
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="p-3 text-left text-md font-semibold text-[#030229] rounded-tl-lg">
                    Patient Name
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Patient Issue
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Doctor Name
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Diseases Name
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Appointment Time
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229]">
                    Appointment Type
                  </th>
                  <th className="p-3 text-left text-md font-semibold text-[#030229] rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchFilteredAppointments.length > 0 ? (
                  searchFilteredAppointments.map((appointment, index) => (
                    <tr key={index} className="border-b">
                      <td className="flex items-center p-3">
                        <div className="avatar w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={
                              appointment.patientDetails?.avatar ||
                              "/img/Avatar.png"
                            }
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-md font-semibold text-[#4F4F4F]">
                            {appointment.name}
                          </h3>
                        </div>
                      </td>
                      <td className="p-3">
                        <h3 className="text-md font-semibold text-[#4F4F4F]">
                          {appointment.issue}
                        </h3>
                      </td>
                      <td className="p-3">
                        <h3 className="text-md font-semibold text-[#4F4F4F]">
                          {appointment.doctor}
                        </h3>
                      </td>
                      <td className="p-3">
                        <h3 className="text-md font-semibold text-[#4F4F4F]">
                          {appointment.disease}
                        </h3>
                      </td>
                      <td className="p-3">
                        <h3 className="text-md font-semibold text-[#4F4F4F]">
                          <p className="text-[#718EBF] rounded-full bg-[#F6F8FB] py-2 text-center">
                            {appointment.time}
                          </p>
                        </h3>
                      </td>
                      <td className="p-3">
                        <h3 className="bg-[#eef1fd] text-[#5678E9] rounded-full px-4 py-2 text-center text-lg font-semibold">
                          {appointment.type}
                        </h3>
                      </td>
                      <td className="p-3">
                        <div
                          className="p-2 rounded cursor-pointer  bg-[#F6F8FB] w-[40%]"
                          onClick={() => openModal(appointment)}
                        >
                          <FaEye className="text-[#0EABEB]" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-3 text-center text-gray-500">
                      No appointments found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const renderTable = () => {
    switch (selectedOption) {
      case "Doctor":
        return renderDoctorsTable(selectedOption);
      case "Patient":
        return renderPatientsTable(selectedOption);
      case "All":
        return (
          <>
            {renderDoctorsTable(selectedOption)}
            {renderPatientsTable(selectedOption)}
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className=" bg-[#F6F8FB] p-[20px] h-[93%]">
      <div className="bg-white rounded-lg p-2">{renderTable()}</div>
    </div>
  );
};

export default SearchResult