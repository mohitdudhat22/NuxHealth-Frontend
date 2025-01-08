import React, { useState, useEffect } from 'react';
import { NHCard, NHSelect } from '@/components';

const useAppointmentFilters = () => {
  const [filters, setFilters] = useState({});
  const [data, setData] = useState({
    countries: [
      { value: 'india', label: 'India' },
      { value: 'usa', label: 'USA' },
      { value: 'uk', label: 'UK' },
      { value: 'canada', label: 'Canada' },
    ],
    states: [
      { value: 'gujarat', label: 'Gujarat' },
      { value: 'california', label: 'California' },
      { value: 'texas', label: 'Texas' },
      { value: 'ontario', label: 'Ontario' },
    ],
    cities: [
      { value: 'ahmedabad', label: 'Ahmedabad' },
      { value: 'losangeles', label: 'Los Angeles' },
      { value: 'houston', label: 'Houston' },
      { value: 'toronto', label: 'Toronto' },
    ],
    hospitals: [
      { value: 'apollo', label: 'Apollo Hospital' },
      { value: 'city', label: 'City Hospital' },
      { value: 'metro', label: 'Metro Hospital' },
    ],
    doctors: [
      { value: 'smith', label: 'Dr. Smith' },
      { value: 'patel', label: 'Dr. Patel' },
      { value: 'brown', label: 'Dr. Brown' },
      { value: 'lee', label: 'Dr. Lee' },
    ],
    specialities: [
      { value: 'cardiology', label: 'Cardiology' },
      { value: 'neurology', label: 'Neurology' },
      { value: 'orthopedics', label: 'Orthopedics' },
      { value: 'pediatrics', label: 'Pediatrics' },
    ],
    appointmentTypes: [
      { value: 'inperson', label: 'In-Person' },
      { value: 'online', label: 'Online' },
      { value: 'emergency', label: 'Emergency' },
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

  const handleSelectChange = (value, key) => {
    updateFilters(key, value);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && selectedTime) {
      alert(`Appointment booked with ${selectedDoctor} at ${selectedTime}`);
    } else {
      alert('Please select both a doctor and a time slot.');
    }
  };

  return (
    <>
      <NHCard className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <NHSelect
            label="Country"
            name="country"
            placeholder="Select Country"
            onChange={(value) => handleSelectChange(value, 'country')}
            options={data.countries}
          />
          <NHSelect
            label="State"
            name="state"
            placeholder="Select State"
            onChange={(value) => handleSelectChange(value, 'state')}
            options={data.states}
          />
          <NHSelect
            label="City"
            name="city"
            placeholder="Select City"
            onChange={(value) => handleSelectChange(value, 'city')}
            options={data.cities}
          />
          <NHSelect
            label="Hospital"
            name="hospital"
            placeholder="Select Hospital"
            onChange={(value) => handleSelectChange(value, 'hospital')}
            options={data.hospitals}
          />
          <NHSelect
            label="Doctor"
            name="doctor"
            placeholder="Select Doctor"
            onChange={(value) => {
              handleSelectChange(value, 'doctor');
              setSelectedDoctor(value);
            }}
            options={data.doctors}
          />
          <NHSelect
            label="Speciality"
            name="speciality"
            placeholder="Select Speciality"
            onChange={(value) => handleSelectChange(value, 'speciality')}
            options={data.specialities}
          />
          <NHSelect
            label="Appointment Type"
            name="appointmentType"
            placeholder="Appointment Type"
            onChange={(value) => handleSelectChange(value, 'appointmentType')}
            options={data.appointmentTypes}
          />
        </div>

        <div className="mt-6">
          <h3 className="mb-3 font-medium">Available Time Slots</h3>
          <div>
            {/* Morning Session */}
            <h4 className="mb-2 font-medium">Morning Session</h4>
            <div className="grid grid-cols-8 gap-2">
              {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'].map((time) => (
                <button
                  key={time}
                  className={`p-2 border rounded hover:bg-gray-100 ${selectedTime === time ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
                    }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            {/* Evening Session */}
            <h4 className="mt-4 mb-2 font-medium">Evening Session</h4>
            <div className="grid grid-cols-8 gap-2">
              {['5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'].map((time) => (
                <button
                  key={time}
                  className={`p-2 border rounded hover:bg-gray-100 ${selectedTime === time ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
                    }`}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          className="p-2 mt-6 text-white bg-blue-500 rounded"
          onClick={handleBookAppointment}
        >
          Book Appointment
        </button>
      </NHCard>

    </>
  );
};

