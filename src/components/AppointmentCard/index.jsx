import React from 'react';
import PropTypes from 'prop-types';
import { NHCard } from '..';

export const AppointmentCard = ({ appointment }) => {
    const { patientName, doctor, disease, time, status } = appointment;

    return (
        <NHCard>
            <div className='flex justify-between bg-gray-100 rounded-lg'>
                <h3 className="text-gray-900 font-medium text-sm">{patientName}</h3>
                <span className="px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {status}
                </span>
            </div>

            <div className='mt-2'>
                <p className="text-gray-500 text-sm">Doctor Name</p>
                <p className="text-gray-900 font-semibold">Dr. {doctor}</p>
            </div>

            <div className='mt-2'>
                <p className="text-gray-500 text-sm">Disease Name</p>
                <p className="text-gray-900 font-semibold">{disease}</p>
            </div>

            <div className='mt-2'>
                <p className="text-gray-500 text-sm">Appointment Time</p>
                <p className="text-gray-900 font-semibold">{time}</p>
            </div>


        </NHCard>
    );
};

AppointmentCard.propTypes = {
    appointment: PropTypes.shape({
        patientName: PropTypes.string.isRequired,
        doctor: PropTypes.string.isRequired,
        disease: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }).isRequired,
}; 