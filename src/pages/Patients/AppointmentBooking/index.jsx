import { AppointmentCard, NHButton, NHCard, NHInput, NHTabs } from '@/components';
import Icons from '@/constants/icons';
import React, { useState } from 'react'

export const AppointmentBooking = () => {

    const tabItems = [
        {
            key: "Scheduled",
            label: "Scheduled Appointment",
            children: (
                <NHCard
                    title={<span className='text-[#030229] text-[26px] font-semibold'>Scheduled Appointment</span>}
                    rootClass={"p-0"}
                    headerContent={
                        <>
                            <NHButton variant="default" className="text-black bg-white">{Icons.CalenderIcon}2 March,2022 - 13 March, 2022{Icons.CloseCircle}</NHButton>
                            <NHButton variant="default" className="">{Icons.CalenderIcon}Book Appointment</NHButton>
                        </>
                    }
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
                        <AppointmentCard
                            key={"1"}
                            headerBg={true}
                            headerContent={
                                <button
                                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                                    aria-label="View Details"
                                >
                                    {Icons.ViewBillIcon}
                                </button>
                            }
                            title={<span className='text-[#030229] text-[18px] font-medium'>Dr. Nolan George</span>}
                            appointmentType={<span className='text-[#FFC313]'>Online</span>}
                            hospitalName={"Artemis Hospital"}
                            appointmentDate={'2 Jan, 2022'}
                            appointmentTime={"10:20 AM"}
                            patientIssue={"Feeling Tired"}
                            footerContent={
                                <div className="flex justify-between gap-4">
                                    <NHButton
                                        size={"small"}
                                        className={"w-full"}
                                        onClick={() => handleJoinCall(data)}
                                    >
                                        cancel
                                    </NHButton>
                                    <NHButton
                                        size={"small"}
                                        icon={Icons.CalenderIcon}
                                        className={"w-full"}
                                        onClick={() => setSelectedAppointment(data)}
                                    >
                                        Reschedule
                                    </NHButton>
                                </div>
                            }
                            className="border border-slate-200"
                        />
                        {/* );
                        })} */}
                    </div>
                </NHCard>
            )
        },
        {
            key: "Previous",
            label: "Previous Appointment",
            children: (
                <NHCard
                    title={<span className='text-[#030229] text-[26px] font-semibold'>Previous Appointment</span>}
                    rootClass={"p-0"}
                    headerContent={
                        <>
                            <NHButton variant="default" className="text-black bg-white">{Icons.CalenderIcon}2 March,2022 - 13 March, 2022{Icons.CloseCircle}</NHButton>
                            <NHButton variant="default" className="">{Icons.CalenderIcon}Book Appointment</NHButton>
                        </>
                    }
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
                        <AppointmentCard
                            key={"1"}
                            headerBg={true}
                            headerContent={
                                <button
                                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                                    aria-label="View Details"
                                >
                                    {Icons.ViewBillIcon}
                                </button>
                            }
                            title={<span className='text-[#030229] text-[18px] font-medium'>Dr. Nolan George</span>}
                            appointmentType={<span className='text-[#FFC313]'>Online</span>}
                            hospitalName={"Artemis Hospital"}
                            appointmentDate={'2 Jan, 2022'}
                            appointmentTime={"10:20 AM"}
                            patientIssue={"Feeling Tired"}
                            className="border border-slate-200"
                        />
                        {/* );
                        })} */}
                    </div>
                </NHCard>
            )
        },
        {
            key: "Cancel",
            label: "Cancel Appointment",
            children: (
                <NHCard
                    title={<span className='text-[#030229] text-[26px] font-semibold'>Cancel Appointment</span>}
                    rootClass={"p-0"}
                    headerContent={
                        <>
                            <NHButton variant="default" className="text-black bg-white">{Icons.CalenderIcon}2 March,2022 - 13 March, 2022{Icons.CloseCircle}</NHButton>
                            <NHButton variant="default" className="">{Icons.CalenderIcon}Book Appointment</NHButton>
                        </>
                    }
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
                        <AppointmentCard
                            key={"1"}
                            headerBg={true}
                            headerContent={
                                <button
                                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                                    aria-label="View Details"
                                >
                                    {Icons.ViewBillIcon}
                                </button>
                            }
                            title={<span className='text-[#030229] text-[18px] font-medium'>Dr. Nolan George</span>}
                            appointmentType={<span className='text-[#FFC313]'>Online</span>}
                            hospitalName={"Artemis Hospital"}
                            appointmentDate={'2 Jan, 2022'}
                            appointmentCancelDate={'2 Jan, 2022'}
                            appointmentTime={"10:20 AM"}
                            patientIssue={"Feeling Tired"}
                            className="border border-slate-200"
                        />
                        {/* );
                        })} */}
                    </div>
                </NHCard>
            )
        },
        {
            key: "Pending",
            label: "Pending Appointment",
            children: (
                <NHCard
                    title={<span className='text-[#030229] text-[26px] font-semibold'>Pending Appointment</span>}
                    rootClass={"p-0"}
                    headerContent={
                        <>
                            <NHButton variant="default" className="text-black bg-white">{Icons.CalenderIcon}2 March,2022 - 13 March, 2022{Icons.CloseCircle}</NHButton>
                            <NHButton variant="default" className="">{Icons.CalenderIcon}Book Appointment</NHButton>
                        </>
                    }
                >
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {/* {patientData.map((data, index) => {
                            const { name, patientIssue, diseaseName, appointmentDate, appointmentTime } = data;
                            return ( */}
                        <AppointmentCard
                            key={"1"}
                            headerBg={true}
                            headerContent={
                                <button
                                    className="p-2 bg-white rounded-xl hover:bg-gray-300"
                                    aria-label="View Details"
                                >
                                    {Icons.ViewBillIcon}
                                </button>
                            }
                            title={<span className='text-[#030229] text-[18px] font-medium'>Dr. Nolan George</span>}
                            appointmentType={<span className='text-[#FFC313]'>Online</span>}
                            hospitalName={"Artemis Hospital"}
                            appointmentDate={'2 Jan, 2022'}
                            appointmentTime={"10:20 AM"}
                            patientIssue={"Feeling Tired"}
                            footerContent={
                                <div className="flex justify-between gap-4">
                                    <NHButton
                                        size={"small"}
                                        className={"w-full"}
                                        onClick={() => handleJoinCall(data)}
                                    >
                                        cancel
                                    </NHButton>
                                    <NHButton
                                        size={"small"}
                                        icon={Icons.CalenderIcon}
                                        className={"w-full"}
                                        onClick={() => setSelectedAppointment(data)}
                                    >
                                        Reschedule
                                    </NHButton>
                                </div>
                            }
                            className="border border-slate-200"
                        />
                        {/* );
                        })} */}
                    </div>
                </NHCard>
            )
        },
    ];


    return (
        <>
            <NHCard
                headerContent={
                    <NHInput
                        prefix={Icons.SearchIcon}
                        placeholder="Search Patient"
                    />
                }
            >
                <NHTabs
                    items={tabItems}
                    defaultActiveKey="upcoming"
                />
            </NHCard>
        </>
    );
};
