import React from 'react';
import { NHCard } from '..';
import { AppointmentCard } from '../AppointmentCard';

export const AppointmentsList = ({data}) => {
  const appointments = data ||  [
    {
      patientName: 'Roger Lubin',
      doctorName: 'Leo Geidt',
      diseaseName: 'Meningococcal Disease',
      appointmentTime: '10:00 AM',
      type: 'Online'
    },
    {
      patientName: 'Jakob Kongsaard',
      doctorName: 'Leo Geidt',
      diseaseName: 'Meningococcal Disease',
      appointmentTime: '10:00 AM',
      type: 'Online'
    },
    {
      patientName: 'Roger Lubin',
      doctorName: 'Leo Geidt',
      diseaseName: 'Meningococcal Disease',
      appointmentTime: '10:00 AM',
      type: 'Online'
    }
  ];

  return (
    <NHCard title={"Today's Appointments List"} className={"max-h-[150px] overflow-auto"} headerContent={<button className="text-blue-500 text-sm">View All</button>}>
      <div className="space-y-1 grid grid-cols-1 md:grid-cols-3 gap-3">
        {appointments.map((appointment, index) => (
          <AppointmentCard key={index} appointment={appointment} />
        ))}
      </div>
    </NHCard>
  );
}; 