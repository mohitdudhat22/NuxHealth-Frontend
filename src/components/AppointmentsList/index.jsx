import React from 'react';
import { NHCard } from '..';
import { AppointmentCard } from '../AppointmentCard';

export const AppointmentsList = () => {
  const appointments = [
    {
      patientName: 'Roger Lubin',
      doctor: 'Leo Geidt',
      disease: 'Meningococcal Disease',
      time: '10:00 AM',
      status: 'Onsite'
    },
    {
      patientName: 'Jakob Kongsaard',
      doctor: 'Leo Geidt',
      disease: 'Meningococcal Disease',
      time: '10:00 AM',
      status: 'Onsite'
    },
    {
      patientName: 'Roger Lubin',
      doctor: 'Leo Geidt',
      disease: 'Meningococcal Disease',
      time: '10:00 AM',
      status: 'Onsite'
    }
  ];

  return (
    <NHCard title={"Today's Appointments List"} headerContent={<button className="text-blue-500 text-sm">View All</button>}>
      <div className="space-y-1 grid grid-cols-1 md:grid-cols-3 gap-3">
        {appointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} />
        ))}
      </div>
    </NHCard>
  );
}; 