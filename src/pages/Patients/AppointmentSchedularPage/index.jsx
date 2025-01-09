import React, { useState, useEffect } from 'react';
import { AppointmentScheduler, NHCard, NHModal, NHSelect } from '@/components';
// import { IoClose } from "react-icons/io5";

const useAppointmentFilters = () => {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({
    countries: [
      { value: "india", label: "India" },
      { value: "usa", label: "USA" },
      { value: "uk", label: "UK" },
      { value: "canada", label: "Canada" },
    ],
    states: [
      { value: "gujarat", label: "Gujarat" },
      { value: "california", label: "California" },
      { value: "texas", label: "Texas" },
      { value: "ontario", label: "Ontario" },
    ],
    cities: [
      { value: "ahmedabad", label: "Ahmedabad" },
      { value: "losangeles", label: "Los Angeles" },
      { value: "houston", label: "Houston" },
      { value: "toronto", label: "Toronto" },
    ],
    hospitals: [
      { value: "apollo", label: "Apollo Hospital" },
      { value: "city", label: "City Hospital" },
      { value: "metro", label: "Metro Hospital" },
    ],
    doctors: [
      { value: "smith", label: "Dr. Smith" },
      { value: "patel", label: "Dr. Patel" },
      { value: "brown", label: "Dr. Brown" },
      { value: "lee", label: "Dr. Lee" },
    ],
    specialities: [
      { value: "cardiology", label: "Cardiology" },
      { value: "neurology", label: "Neurology" },
      { value: "orthopedics", label: "Orthopedics" },
      { value: "pediatrics", label: "Pediatrics" },
    ],
    appointmentTypes: [
      { value: "inperson", label: "In-Person" },
      { value: "online", label: "Online" },
      { value: "emergency", label: "Emergency" },
    ],
  });

  const updateFilters = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const queryString = new URLSearchParams(filters).toString();
      const url = `/api/appointment?${queryString}`;
      console.log(`Fetching data from: ${url}`);
      // Simulate an API call with hardcoded data
      setTimeout(() => {
        setData((prev) => ({ ...prev }));
      }, 500);
    };

    if (Object.keys(filters).length > 0) {
      fetchData();
    }
  }, [filters]);

  return { filters, data, updateFilters };
};

export const AppointmentSchedularPage = () => {
  const { filters, data, updateFilters } = useAppointmentFilters();
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isAppointmentModal, setIsAppointmentModal] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state

  const handleSelectChange = (value, key) => {
    updateFilters(key, value);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedTime) {
      setIsAppointmentModal(true);
      // alert(`Appointment booked with ${selectedDoctor} at ${selectedTime}`);
    } else {
      alert("Please select both a doctor and a time slot.");
    }
  };

  const handleOpenModal = () => {
    setIsAppointmentModal(true);
  };

  const handleCloseModal = () => {
    setIsAppointmentModal(false);
  };

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
            label="Doctor"
            name="doctor"
            placeholder="Select Doctor"
            onChange={(value) => {
              handleSelectChange(value, "doctor");
              setSelectedDoctor(value);
            }}
            options={data.doctors}
          />
          <NHSelect
            label="Speciality"
            name="speciality"
            placeholder="Select Speciality"
            onChange={(value) => handleSelectChange(value, "speciality")}
            options={data.specialities}
          />
          <NHSelect
            label="Appointment Type"
            name="appointmentType"
            placeholder="Appointment Type"
            onChange={(value) => handleSelectChange(value, "appointmentType")}
            options={data.appointmentTypes}
          />
        </div>
      </NHCard>

      {/* Time Slots */}
      <div className="mt-10">
        <NHCard>
          <h3 className="mb-3 text-3xl font-semibold pb-7">
            Available Time Slots
          </h3>
          <div>
            {/* Morning Session */}
            <h4 className="mb-2 text-2xl font-medium">Morning Session</h4>
            <div className="grid grid-cols-5 gap-2">
              {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"].map(
                (time) => (
                  <button
                    key={time}
                    className={`p-2 border border-[#A7A7A7] rounded-lg py-3 hover:bg-[#0EABEB] outline-none ${selectedTime === time
                      ? "bg-[#0EABEB] text-white hover:bg-[rgb(14,171,340)]"
                      : ""
                      }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                )
              )}
            </div>

            {/* Evening Session */}
            <h4 className="mt-4 mb-2 font-medium">Evening Session</h4>
            <div className="grid grid-cols-5 gap-2">
              {["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map(
                (time) => (
                  <button
                    key={time}
                    className={`p-2 border border-[#A7A7A7] rounded-lg py-3 hover:bg-[#0EABEB] outline-none ${selectedTime === time
                      ? "bg-[#0EABEB] text-white hover:bg-[rgb(14,171,340)]"
                      : ""
                      }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                )
              )}
            </div>
          </div>
          <button
            className="mt-10 p-3 px-5 bg-[#0EABEB] text-white rounded"
            onClick={handleBookAppointment}
          >
            Book Appointment
          </button>
        </NHCard>
      </div>

      {/* Appointment Scheduler */}
      <div className="mt-7">
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
      </div>
    </>
  );
};
