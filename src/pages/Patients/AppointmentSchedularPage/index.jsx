import React, { useState, useEffect } from "react";
import { AppointmentScheduler, NHButton, NHCard, NHDatePicker, NHInput, NHModal, NHSelect } from "@/components";
import { fetchAppointmentsByPatient, fetchDoctorSession } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";

export const AppointmentSchedularPage = () => {
  const [data, setData] = useState({
    countries: [],
    states: [],
    cities: [],
    hospitals: [],
    specialities: [],
    doctors: [],
    appointmentDate: '',
    patientIssue: '',
    diseaseName: ''
  });
  console.log("🚀 ~ AppointmentSchedularPage ~ data:", data)

  const [filters, setFilters] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctorId, setDoctorId] = useState();
  const [isAppointmentModal, setIsAppointmentModal] = useState(false);
  const [timeSlots, setTimeSlots] = useState();
  console.log("🚀 ~ AppointmentSchedularPage ~ timeSlots:", timeSlots)

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await fetchAppointmentsByPatient();
      if (response && response.length > 0) {
        const countries = response.map((item) => ({
          value: item.country,
          label: item.country,
          states: item.states,
        }));
        setData({ countries });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle selection changes and cascading updates
  const handleSelectChange = (value, key) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    if (key === "country") {
      const selectedCountry = data.countries.find((c) => c.value === value);
      const states = selectedCountry?.states.map((state) => ({
        value: state.state,
        label: state.state,
        cities: state.cities,
      })) || [];
      setData((prev) => ({ ...prev, states, cities: [], hospitals: [], specialities: [], doctors: [] }));
    } else if (key === "state") {
      const selectedState = data.states.find((s) => s.value === value);
      const cities = selectedState?.cities.map((city) => ({
        value: city.city,
        label: city.city,
        hospitals: city.hospitals,
      })) || [];
      setData((prev) => ({ ...prev, cities, hospitals: [], specialities: [], doctors: [] }));
    } else if (key === "city") {
      const selectedCity = data.cities.find((c) => c.value === value);
      const hospitals = selectedCity?.hospitals.map((hospital) => ({
        value: hospital.name,
        label: hospital.name,
        specialties: hospital.specialties,
      })) || [];
      setData((prev) => ({ ...prev, hospitals, specialities: [], doctors: [] }));
    } else if (key === "hospital") {
      const selectedHospital = data.hospitals.find((h) => h.value === value);
      const specialities = selectedHospital?.specialties.map((speciality) => ({
        value: speciality.speciality,
        label: speciality.speciality,
        doctors: speciality.doctors,
      })) || [];
      setData((prev) => ({ ...prev, specialities, doctors: [] }));
    } else if (key === "speciality") {
      const selectedSpeciality = data.specialities.find((sp) => sp.value === value);
      const doctors = selectedSpeciality?.doctors.map((doctor) => ({
        value: doctor.id,
        label: doctor.name,
      })) || [];
      setData((prev) => ({ ...prev, doctors }));
    } else { }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedTime) {
      setIsAppointmentModal(true);
    } else {
      toast.error("Please choose doctor and time slot.");
    }
  };

  const handleCloseModal = () => {
    setIsAppointmentModal(false);
  };


  const handleDoctorChange = async (value) => {
    const doctorId = value;
    const { appointmentDate } = data;
    setSelectedDoctor(doctorId);
    if (doctorId) {
      try {
        // Fetch the time slots for the selected doctor
        const response = await fetchDoctorSession(doctorId, appointmentDate);
        console.log("🚀 ~ handleDoctorChange ~ response:", response)
        setTimeSlots(response.data); // Assume response contains a timeSlots array
      } catch (error) {
        console.error("Error fetching time slots:", error);
      }
    }
  };

  const handeDateChange = (value, dateString) => {
    setData((prevData) => ({
      ...prevData, // Keep the existing state intact
      appointmentDate: dateString, // Update appointmentDate with the formatted date string
    }));
    handleDoctorChange()
  }

  const appointmentTypes = [
    { value: "inperson", label: "In-Person" },
    { value: "online", label: "Online" },
    { value: "emergency", label: "Emergency" },
  ]

  return (
    <>
      <NHCard className="p-6">
        {/* Filters Section */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <NHSelect
            label="Country"
            name="country"
            placeholder="Select Country"
            onChange={(value) => handleSelectChange(value, "country")}
            options={data.countries}
          />
          <NHSelect
            label="State"
            name="state"
            placeholder="Select State"
            onChange={(value) => handleSelectChange(value, "state")}
            options={data.states}
          />
          <NHSelect
            label="City"
            name="city"
            placeholder="Select City"
            onChange={(value) => handleSelectChange(value, "city")}
            options={data.cities}
          />
          <NHSelect
            label="Hospital"
            name="hospital"
            placeholder="Select Hospital"
            onChange={(value) => handleSelectChange(value, "hospital")}
            options={data.hospitals}
          />
          <NHSelect
            label="Speciality"
            name="speciality"
            placeholder="Select Speciality"
            onChange={(value) => handleSelectChange(value, "speciality")}
            options={data.specialities}
          />
          <NHSelect
            label="Doctor"
            name="doctor"
            placeholder="Select Doctor"
            onChange={(value) => handleDoctorChange(value)}
            options={data.doctors}
          />
          <NHSelect
            label="Appointment Type"
            name="appointmentType"
            placeholder="Appointment Type"
            onChange={(value) => handleSelectChange(value, "appointmentType")}
            options={appointmentTypes}
          />
          <NHDatePicker
            label="Appointment Date"
            name="appointmentDate"
            onChange={(value, dateString) => handeDateChange(value, dateString)}
            format={"YYYY-MM-DD"}
          />
          <NHInput
            label="Patient Issue"
            name="patientIssue"
            placeholder="Patient Issue"
            onChange={(value) => handleSelectChange(value, "patientIssue")}
          />
          <NHInput
            label="Disease Name"
            name="diseaseName"
            placeholder="Disease Name"
            onChange={(value) => handleSelectChange(value, "diseaseName")}
          />
        </div>
      </NHCard>

      {/* Time Slots */}
      <div className="mt-10">
        <NHCard>
          <h3 className="mb-3 text-3xl font-semibold pb-7">Available Time Slots</h3>
          {/* Time Slot Buttons */}
          <div className="">
            <p className="mb-8 text-2xl font-semibold text-center"> Morning Session</p>
            <div className="grid grid-cols-8 gap-2">
              {timeSlots?.morningSlots?.map(({ start }) => (
                <NHButton
                  key={start}
                  className={`p-2 border rounded-lg ${selectedTime === start ? "bg-blue-500 text-white" : ""}`}
                  onClick={() => handleTimeSelect(start)}
                >
                  {start}
                </NHButton>
              ))}
            </div>
          </div>
          <div className="">
            <p className="my-8 text-2xl font-semibold text-center"> Evening Session</p>
            <div className="grid grid-cols-8 gap-2">
              {timeSlots?.eveningSlots?.map(({ start }) => (
                <NHButton
                  key={start}
                  className={`p-2 border rounded-lg ${selectedTime === start ? "bg-blue-500 text-white" : ""}`}
                  onClick={() => handleTimeSelect(start)}
                >
                  {start}
                </NHButton>
              ))}
            </div>
          </div>

          <button className="p-3 px-5 mt-10 text-white bg-blue-500 rounded" onClick={handleBookAppointment}>
            Book Appointment
          </button>
        </NHCard >
      </div >
      {/* Appointment Scheduler */}
      < div className="mt-7" >
        <NHCard className="w-full h-auto p-6 mx-auto mt-4 sm:w-3/4 md:w-2/3 lg:w-full xl:w-full">
          <AppointmentScheduler />
        </NHCard>

        {/* Modal */}
        <NHModal
          title={
            <div className="flex items-center justify-between w-full">
              <h1 className="text-xl font-semibold">Appointment</h1>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {/* <IoClose size={24} /> */}
              </button>
            </div>
          }
          open={isAppointmentModal}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Appointment Type</p></div>
              <div><p className="text-gray-600">Online</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Patient Name</p></div>
              <div><p className="text-gray-600">John Doe</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Appointment Date</p></div>
              <div><p className="text-gray-600">19 June, 2022</p></div>
            </div>
            <div className="flex items-center justify-between">
              <div><p className="font-medium text-gray-700">Appointment Time</p></div>
              <div><p className="text-gray-600">11:00 AM - 12:00 PM</p></div>
            </div>

            <div className="pt-6">
              <p className="text-xl font-medium text-gray-700">Patient Issue</p>
              <input
                type="text"
                placeholder="Enter Patient Issue"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="mt-4">
              <p className="text-xl font-medium text-gray-700">Disease Name (Optional)</p>
              <input
                type="text"
                placeholder="Enter Disease Name"
                className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>

            <div className="flex justify-end mt-6 space-x-4">
              <button className="px-4 py-2 text-black bg-gray-300 rounded-lg hover:bg-gray-400 focus:outline-none" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
                Book Appointment
              </button>
            </div>
          </div>
        </NHModal>
      </div >
    </>
  );
};
