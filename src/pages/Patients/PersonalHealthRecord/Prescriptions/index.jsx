import { AppointmentCard, NHButton, NHCard, NHInput } from '@/components';
import Icons from '@/constants/icons';
import { usePatientPrescriptionData } from '@/hook/Patients';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react'

export const Prescriptions = () => {
    const { loading, data, error } = usePatientPrescriptionData();
    const [prescriptionData, setPrescriptionData] = useState([]);

    useEffect(() => {
        if (data) {
            setPrescriptionData(data);
        }
    }, [data]);
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
                    {prescriptionData.map((prescriptions, index) => (
                        <AppointmentCard
                            key={prescriptions.prescriptionId}
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
                            title={<span className="font-semibold text-[18px]">{prescriptions.DoctorName}</span>}
                            hospitalName={prescriptions.hospitalName}
                            diseaseName={prescriptions.DiseaseName}
                            date={prescriptions.prescriptionDate}
                            className="border border-slate-200"
                        />
                    ))}
                </div>
            </NHCard>
        </>
    );
}