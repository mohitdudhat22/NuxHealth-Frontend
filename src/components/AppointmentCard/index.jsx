import React from 'react';
import PropTypes from 'prop-types';
import { NHCard } from '..';

export const AppointmentCard = ({ appointment }) => {
    const { patientName, doctorName, diseaseName, appointmentTime, type } = appointment;
    return (
        <NHCard>
            <div className='flex justify-between bg-gray-100 rounded-lg'>
                <h3 className="text-gray-900 font-medium text-sm">{patientName}</h3>
                <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {type === 'Online'? "Offsite" : "Onsite"}
                </span>
            </div>

            <div className='mt-2'>
                <p className="text-gray-500 text-sm">Doctor Name</p>
                <p className="text-gray-900 font-semibold">Dr. {doctorName}</p>
            </div>

            <div className='mt-2'>
                <p className="text-gray-500 text-sm">Disease Name</p>
                <p className="text-gray-900 font-semibold">{diseaseName}</p>
            </div>

            <div className='mt-2'>
                <p className="text-gray-500 text-sm">Appointment Time</p>
                <p className="text-gray-900 font-semibold">{appointmentTime}</p>
            </div>
        </NHCard>
    );
};
