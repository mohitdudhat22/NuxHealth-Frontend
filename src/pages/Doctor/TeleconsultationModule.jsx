import { useEffect, useState } from "react";
import { Tabs, Tab, Button } from "@mui/material";
import { DateRange } from "@mui/icons-material";
import moment from "moment";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import TeleConsultationCard from "../../component/PrescriptionTools/TeleConsultationCard";
import CustomDateModal from "../../component/modals/CustomDateModal";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";

export default function TeleconsultationModule() {
  const { user } = useAuth();
  const { getAppointmetnsForDoctor, allAppointments, cancelAppointment } =
    useGlobal();

  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [openCustomDateModal, setOpenCustomDateModal] = useState(false);

  useEffect(() => {
    getAppointmetnsForDoctor(user.id);
  }, [user.id]);

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      getAppointmetnsForDoctor(user.id);
      toast.success("Appointment canceled successfully.");
    } catch (error) {
      console.error("Failed to cancel appointment", error);
      toast.error("Failed to cancel appointment.");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filterAppointments = (appointments) => {
    const [startDate, endDate] = dateRange;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return {
      today: appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        aptDate.setHours(0, 0, 0, 0);
        return (
          aptDate.getTime() === today.getTime() &&
          apt.status !== "canceled" &&
          (!startDate ||
            !endDate ||
            (aptDate >= startDate && aptDate <= endDate))
        );
      }),
      upcoming: appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return (
          aptDate.getTime() > today.getTime() &&
          apt.status !== "canceled" &&
          (!startDate ||
            !endDate ||
            (aptDate >= startDate && aptDate <= endDate))
        );
      }),
      previous: appointments.filter((apt) => {
        const aptDate = new Date(apt.date);
        return (
          aptDate.getTime() < today.getTime() &&
          apt.status !== "canceled" &&
          (!startDate ||
            !endDate ||
            (aptDate >= startDate && aptDate <= endDate))
        );
      }),
      canceled: appointments.filter((apt) => apt.status === "canceled"),
    };
  };

  const getCurrentAppointments = () => {
    const filteredAppointments = filterAppointments(allAppointments || []);
    switch (activeTab) {
      case 0:
        return filteredAppointments.today;
      case 1:
        return filteredAppointments.upcoming;
      case 2:
        return filteredAppointments.previous;
      case 3:
        return filteredAppointments.canceled;
      default:
        return filteredAppointments.today;
    }
  };

  const getCurrentName = () => {
    switch (activeTab) {
      case 0:
        return "Today Appointment";
      case 1:
        return "Upcoming Appointment";
      case 2:
        return "Previous Appointment";
      case 3:
        return "Cancel Appointment";
      default:
        return "Today Appointment";
    }
  };

  const formatAppointmentForDisplay = (appointment) => ({
    id: appointment._id,
    height: appointment.patientId.height,
    weight: appointment.patientId.weight,
    bloodGroup: appointment.patientId.bloodGroup,
    email: appointment.patientId.email,
    address: appointment.patientId.address,
    city: appointment.patientId.city,
    state: appointment.patientId.state,
    country: appointment.patientId.country,
    phone: appointment.patientId.phone,
    dob: appointment.patientId.dob,
    patientId: appointment.patientId._id,
    name: `${appointment.patientId.firstName} ${appointment.patientId.lastName}`,
    issue: appointment.patient_issue,
    disease: appointment.patient_issue,
    date: formatDate(appointment.date),
    time: formatTime(appointment.appointmentTime),
    age: appointment.patientId.age,
    gender: appointment.patientId.gender,
    avatar: appointment.patientId.avatar,
    status: appointment.status,
  });

  const handleDateSelection = (newRange) => {
    setDateRange(newRange);
    setOpenCustomDateModal(false);
  };

  const openModal = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
    console.log(patient, "patientdetails");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const renderAppointmentTable = (appointments) => {
    return (
      <div className="bg-white p-2 rounded-lg">
        <div className="">
          <div className="new-xxl:min-w-[1200px] new-xl:min-w-[1000px] new-lg:min-w-[900px]">
            <div className="grid grid-cols-7 bg-gray-100 py-3 px-3 rounded-t-lg ticky top-0 bg-gray-100 z-10">
              <div className="text-sm font-semibold text-[#030229]">
                Patient Name
              </div>
              <div className="text-sm font-semibold text-[#030229]">
                Patient Issue
              </div>
              <div className="text-sm font-semibold text-[#030229]">
                Diseases Name
              </div>
              <div className="text-sm font-semibold text-[#030229]">
                Appointment Time
              </div>
              <div className="text-sm font-semibold text-[#030229]">
                Appointment Time
              </div>

              <div className="text-sm font-semibold text-[#030229] text-center">
                Status
              </div>
              <div className="text-sm font-semibold text-[#030229] text-center">
                Action
              </div>
            </div>

            <div className="divide-y divide-gray-200 max-h-[calc(100vh-340px)] overflow-y-auto">
              {appointments.length > 0 ? (
                appointments.map((patient) => (
                  <div
                    key={patient.id}
                    className="grid grid-cols-7 py-3 px-1 items-center"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={patient.avatar || "/img/Avatar.png"}
                        alt=""
                      />
                      <span className="new-xxl:text-lg new-lg:text-sm new-xl:text-base font-medium text-[#4F4F4F]">
                        {patient.name}
                      </span>
                    </div>

                    <div className="new-xxl:text-lg new-lg:text-sm new-xl:text-base font-medium text-[#4F4F4F] overflow-hidden">
                      {patient.issue}
                    </div>

                    <div className="new-xxl:text-lg new-lg:text-sm new-xl:text-base font-medium text-[#4F4F4F] overflow-hidden">
                      {patient.disease}
                    </div>

                    <div>
                      <div className="new-xxl:text-lg new-lg:text-sm new-xl:text-base font-medium text-[#718EBF] bg-[#F6F8FB] rounded-full py-2 px-3 text-center inline-block">
                        {patient.date}
                      </div>
                    </div>

                    <div className=" flex items-center justify-center">
                      <div className="new-xxl:text-lg new-lg:text-sm new-xl:text-base font-medium text-[#718EBF] bg-[#F6F8FB] rounded-full py-2 px-3 text-center inline-block">
                        {patient.time}
                      </div>
                    </div>

                    <div className=" flex items-center justify-center">
                      <span className="flex justify-center px-3 py-2 inline-flex new-xxl:text-lg new-lg:text-sm new-xl:text-base font-medium leading-5 font-semibold rounded-full bg-[#eef1fd] text-[#5678E9]">
                        {patient.status}
                      </span>
                    </div>

                    <div className=" flex items-center justify-center">
                      <div
                        className="p-2 rounded cursor-pointer bg-[#F6F8FB] w-10 flex items-center justify-center text-center"
                        onClick={() => openModal(patient)}
                      >
                        <FaEye className="text-[#0EABEB]" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-sm text-gray-500">
                  No appointments found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const tabName = getCurrentName();
  const currentAppointments = getCurrentAppointments().map(
    formatAppointmentForDisplay
  );

  return (
    <>
      <div className="bg-[#F6F8FB] p-3 h-[92.5%]">
        <div className="teli-module p-6 bg-white rounded-lg">
          <Tabs
            className="teli-btn border-b"
            value={activeTab}
            onChange={(elem, newValue) => setActiveTab(newValue)}
          >
            <Tab label="Today Appointment" />
            <Tab label="Upcoming Appointment" />
            <Tab label="Previous Appointment" />
            <Tab label="Cancel Appointment" />
          </Tabs>

          <div className="head mt-4 mb-6 flex justify-between items-center">
            <h2 className="new-xxl:text-[26px] new-xl:text-[25px] font-bold text-[#030229]">
              {tabName}
            </h2>
            <Button
              variant="outlined"
              startIcon={<DateRange />}
              color="gray"
              onClick={() => setOpenCustomDateModal(true)}
            >
              {dateRange[0] && dateRange[1]
                ? `${moment(dateRange[0]).format("MM/DD/YYYY")} - ${moment(
                    dateRange[1]
                  ).format("MM/DD/YYYY")}`
                : "Select Date Range"}
            </Button>
          </div>

          {activeTab === 0 ? (
            <div className="box grid  new-lg:grid-cols-3 new-xl:grid-cols-3 new-xxl:grid-cols-4 gap-6 max-h-[calc(100vh-280px)] overflow-y-auto">
              {currentAppointments.map((patient) => (
                <TeleConsultationCard key={patient.id} patient={patient} />
              ))}
            </div>
          ) : (
            renderAppointmentTable(currentAppointments)
          )}
        </div>
      </div>

      <CustomDateModal
        open={openCustomDateModal}
        onClose={() => setOpenCustomDateModal(false)}
        onApply={handleDateSelection}
      />

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <PatientDetails patient={selectedPatient} closeModal={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
function PatientDetails({ patient, closeModal }) {
  console.log(patient, "???????????????");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-3 rounded-lg shadow-lg new-xxl:w-[20%] new-xl:w-[25%] new-lg:w-[25%]">
        <div className="patientdetails-section">
          <div className="row">
            <div className="details bg-white rounded-lg p-5">
              <div className="top flex justify-between items-center border-b border-gray-300 pb-2">
                <h3 className="new-xxl:text-2xl new-xl:text-lg new-lg:text-md font-bold text-gray-900">
                  Patient Details
                </h3>
                <div
                  className="icon text-red-500 new-xxl:text-3xl new-xl:text-lg new-lg:text-md cursor-pointer"
                  onClick={closeModal}
                >
                  <MdCancel />
                </div>
              </div>
              <div className="data mt-4">
                <ul>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Patient Name
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.name}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Email
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.email}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Phone Number
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.phone}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Age
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.age}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Gender
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.gender}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Blood Group
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.bloodGroup}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Height (cm)
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.height}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Weight (kg)
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.weight}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Date of Birth
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {new Date(patient?.dob).toLocaleDateString()}
                    </p>
                  </li>
                  <li className="">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600 pb-2">
                      Address
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">{`${patient?.address}, ${patient?.city}, ${patient?.state}, ${patient?.country}`}</p>
                  </li>
                  <template v-if="patient.appointment">
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Appointment Type
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {patient?.appointment?.type}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Appointment Date
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {new Date(
                          patient?.appointment?.date
                        ).toLocaleDateString()}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Appointment Time
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {new Date(
                          patient?.appointment?.appointmentTime
                        ).toLocaleTimeString()}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Doctor Name
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {patient?.appointment?.doctorId?.name}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Patient Issue
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {patient?.appointment?.patient_issue}
                      </p>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
