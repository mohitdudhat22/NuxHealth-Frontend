import React, { useState } from 'react'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { AppointmentSchedular, NHCard, NHInput, NHSelect } from '@/components';

export const AppointmentSchedularPage = () => {
  const [selectedTime, setSelectedTime] = useState(null);


  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <>
      <NHCard className={"p-6"}>
        <div className="grid grid-cols-2 gap-4">
          <NHSelect
            label="Country"
            name="country"
            placeholder="Select Country"
            onChange={(value) => handleSelectChange(value, 'country')}
            options={[]} // Add your country options here
          />
          <NHSelect
            label="State"
            name="state"
            placeholder="Select State"
            onChange={(value) => handleSelectChange(value, 'state')}
            options={[]} // Add your state options here
          />
          <NHSelect
            label="City"
            name="city"
            placeholder="Select City"
            onChange={(value) => handleSelectChange(value, 'city')}
            options={[]} // Add your city options here
          />
          <NHSelect
            label="Hospital"
            name="hospital"
            placeholder="Select Hospital"
            onChange={(value) => handleSelectChange(value, 'hospital')}
            options={[]} // Add your hospital options here
          />
            <NHSelect
            label="Doctor"
            name="doctor"
            placeholder="Select Doctor"
            onChange={(value) => handleSelectChange(value, 'doctor')}
            options={[]} // Add your doctor options here
          />
          <NHSelect
            label="Speciality"
            name="speciality"
            placeholder="Select Speciality"
            onChange={(value) => handleSelectChange(value, 'doctor')}
            options={[]} // Add your doctor options here
          />
          <NHSelect
            label="Appointment Type"
            name="appointmentType"
            placeholder="Appointment Type"
            onChange={(value) => handleSelectChange(value, 'appointmentType')}
            options={[]} // Add your appointment type options here
          />
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-3">Morning Session</h3>
          <div className="grid grid-cols-8 gap-2">
            {['9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00'].map((time) => (
              <button 
                key={time} 
                className={`p-2 border rounded hover:bg-gray-100 ${
                  selectedTime === time 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : ''
                }`}
                onClick={() => handleTimeSelect(time)}
               
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-medium mb-3">Evening Session</h3>
          <div className="grid grid-cols-8 gap-2">
            {['5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00'].map((time) => (
              <button 
                key={time} 
                className={`p-2 border rounded hover:bg-gray-100 ${
                  selectedTime === time 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : ''
                }`}
                onClick={() => handleTimeSelect(time)}
               
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      </NHCard>
      <NHCard className={"p-6 mt-4"}>
        <AppointmentSchedular />
      </NHCard>
    </>
  )
}
