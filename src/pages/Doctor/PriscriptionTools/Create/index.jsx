import { AppointmentCard, NHButton, NHCard, NHInput, NHTable, NHTabs } from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { useState } from "react";
import { CreatePrescription } from "../..";

export const Create = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const appointmentData = [
        {
            "name": "Jaydon Philips",
            "appointmentType": "Onsite",
            "patientAge": "25 Years",
            "patientGender": "Male",
            "appointmentTime": "10:00 AM",
            "status": "New"
        },
        {
            "name": "Charlie Herwitz",
            "appointmentType": "Onsite",
            "patientAge": "25 Years",
            "patientGender": "Female",
            "appointmentTime": "10:00 AM",
            "status": "New"
        },
        {
            "name": "Talan Lipshutz",
            "appointmentType": "Onsite",
            "patientAge": "32 Years",
            "patientGender": "Male",
            "appointmentTime": "10:10 AM",
            "status": "New"
        },
        {
            "name": "Abram Septimus",
            "appointmentType": "Onsite",
            "patientAge": "45 Years",
            "patientGender": "Male",
            "appointmentTime": "10:10 AM",
            "status": "New"
        },
        {
            "name": "Cooper Donin",
            "appointmentType": "Onsite",
            "patientAge": "35 Years",
            "patientGender": "Female",
            "appointmentTime": "10:10 AM",
            "status": "Old"
        },
        {
            "name": "Lincoln Arcand",
            "appointmentType": "Onsite",
            "patientAge": "25 Years",
            "patientGender": "Female",
            "appointmentTime": "10:10 AM",
            "status": "Old"
        },
        {
            "name": "Jakob Carder",
            "appointmentType": "Onsite",
            "patientAge": "23 Years",
            "patientGender": "Male",
            "appointmentTime": "10:10 AM",
            "status": "New"
        },
        {
            "name": "Wilson Botosh",
            "appointmentType": "Onsite",
            "patientAge": "18 Years",
            "patientGender": "Male",
            "appointmentTime": "10:10 AM",
            "status": "New"
        },
        {
            "name": "Cristofer Saris",
            "appointmentType": "Onsite",
            "patientAge": "46 Years",
            "patientGender": "Male",
            "appointmentTime": "10:10 AM",
            "status": "Old"
        },
        {
            "name": "James Bothman",
            "appointmentType": "Onsite",
            "patientAge": "15 Years",
            "patientGender": "Male",
            "appointmentTime": "10:10 AM",
            "status": "New"
        },
        {
            "name": "Ryan Bator",
            "appointmentType": "Onsite",
            "patientAge": "42 Years",
            "patientGender": "Female",
            "appointmentTime": "10:10 AM",
            "status": "Old"
        },
        {
            "name": "Jakob Saris",
            "appointmentType": "Onsite",
            "patientAge": "27 Years",
            "patientGender": "Female",
            "appointmentTime": "10:10 AM",
            "status": "Old"
        }
    ]



    return (
        <>
            <NHCard
                title="Today Appointment"
                headerContent={
                    <>
                        <div className="me-10">
                            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
                        </div>
                        <NHButton variant="default" className="text-black bg-white">
                            {Icons.CalenderIcon}2 March, 2024
                        </NHButton>
                    </>
                }
            >  {!selectedAppointment ?
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {appointmentData.map((appointment, index) => (
                        <AppointmentCard
                            key={index}
                            headerContent={
                                <>
                                    <Tag color={appointment.status === "New" ? "blue" : "green"}>
                                        {appointment.status}
                                    </Tag>
                                    {Icons.ViewBillIcon}
                                </>
                            }
                            doctorName={appointment.name}
                            appointmentType={appointment.appointmentType}
                            patientAge={appointment.patientAge}
                            gender={appointment.patientGender}
                            appointmentTime={appointment.appointmentTime}
                            footerContent={
                                <NHButton
                                    size={"large"}
                                    className={"w-full"}
                                    onClick={() => setSelectedAppointment(appointment)}
                                >
                                    Create Prescription
                                </NHButton>
                            }
                            className="border border-slate-200"
                        />
                    ))}
                </div>
                :
                (<CreatePrescription appointment={selectedAppointment} />)
                }
            </NHCard>
        </>
    );
};
