import { AppointmentCard, NHButton, NHCard, NHInput } from '@/components';
import Icons from '@/constants/icons';
import { Tag } from 'antd';
import React from 'react'

export const Prescriptions = () => {

    const prescriptionstData = [
        {
            "doctorName": "Dr. Ryan Vetrov",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Omar Herwitz",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Corey Dorwart",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Kadin Workman",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Leo Workman",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Emerson Levin",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Emerson Press",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Ryan Herwitz",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Jaylon Lubin",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Ruben Septimus",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Zaire Dorwart",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        },
        {
            "doctorName": "Dr. Phillip Rhiel Madsen",
            "hospitalName": "Artemis Hospital",
            "diseaseName": "Viral Infection",
            "date": "2022-01-02"
        }
    ]

    return (
        <>

            <NHCard
                title={<span className='text-[#030229] text-[26px] font-semibold'>Prescriptions</span>}
                headerContent={
                    <>
                        <div className="me-10">
                            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
                        </div>
                    </>
                }
            >
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {prescriptionstData.map((prescriptions, index) => (
                        <AppointmentCard
                            key={index}
                            headerContent={
                                <>
                                    <span
                                        onClick={() => handlePatientDetails()}
                                        className="cursor-pointer"
                                    >
                                        {Icons.ViewBillIcon}
                                    </span>
                                </>
                            }
                            headerBg={true}
                            title={prescriptions.doctorName}
                            hospitalName={prescriptions.hospitalName}
                            diseaseName={prescriptions.diseaseName}
                            date={prescriptions.date}
                            className="border border-slate-200"
                        />
                    ))}
                </div>
            </NHCard>
        </>
    );
}

