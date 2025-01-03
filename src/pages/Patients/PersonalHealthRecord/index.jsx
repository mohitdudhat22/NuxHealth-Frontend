import { NHButton, NHCard, NHInput, NHTable, PatientDetailCard } from '@/components';
import Icons from '@/constants/icons';
import { usePatientDashboardData } from '@/hook/Patients';
import React, { useState } from 'react';
import { Prescriptions } from './Prescriptions';
import { MedicalHistory } from './MedicalHistory';

export const PersonalHealthRecord = () => {

    const [currentView, setCurrentView] = useState("dashboard");

    const { data, loading, error } = usePatientDashboardData();

    // if (loading) return <p>Loading patient data...</p>;
    // if (error) return <p>Error fetching data: {error}</p>;

    const patientData = data?.patientProfile;
    const prescriptions = data?.prescriptions || [];
    console.log(data)

    const prescriptionHeaders = ['Hospital Name', 'Date', 'Disease Name', 'Action'];
    const prescriptionRows = prescriptions.map((prescription) => [
        prescription.hospitalName,
        new Date(prescription.prescriptionDate).toLocaleDateString(),
        prescription.DiseaseName,
        <button key={prescription.prescriptionId} className="text-blue-500 hover:underline">
            View
        </button>,
    ]);

    const medicalHistoryData = [
        {
            title: 'Dulce Schleifer',
            subtitle: 'Patient Issue',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
            date: '2 Jan, 2022',
        },
        {
            title: 'Dulce Workman',
            subtitle: 'Patient Issue',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
            date: '2 Jan, 2022',
        },
        {
            title: 'Miracle Septimus',
            subtitle: 'Patient Issue',
            description: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s.',
            date: '2 Jan, 2022',
        },
    ];

    const columns = [
        {
            title: "Hospital Name",
            dataIndex: "hospitalName",
            key: "hospitalName",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Disease Name",
            dataIndex: "diseaseName",
            key: "diseaseName",
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <NHButton size={"small"} icon={Icons.SearchIcon} className="view-btn" />
            ),
        },
    ];

    const SectionHeader = ({ title, actionText, onActionClick }) => {
        return (
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                {actionText && (
                    <button
                        onClick={onActionClick}
                        className="text-sm text-red-600 hover:underline"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        );
    };

    const renderView = () => {
        switch (currentView) {
            case "dashboard":
                return (
                    <>
                        <PatientDetailCard
                            patientName={patientData?.fullName}
                            doctorName="Dr. Marcus Philips"
                            patientNumber={patientData?.phone}
                            patientIssue="Feeling tired"
                            patientGender={patientData?.gender}
                            patientAge={`${patientData?.age} Years`}
                            appointmentType="Online"
                            patientAddress={`${patientData?.address.fullAddress}, ${patientData?.address.city}`}
                            lastAppointmentDate="2 Jan, 2022"
                            lastAppointmentTime="4:30 PM"
                            onEditProfile={() => { }}
                        />

                        <div className="grid grid-cols-[3fr_2fr] mt-8 grid-rows-2 gap-8">
                            {/* Medical History Section */}
                            <section>
                                <SectionHeader
                                    title="Medical History"
                                    actionText="View All History"
                                    onActionClick={() => setCurrentView("medical-history")}
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {medicalHistoryData.map((data, index) => (
                                        <NHCard key={index} {...data} />
                                    ))}
                                </div>
                            </section>

                            {/* Prescriptions Section */}
                            <section>
                                <NHCard
                                    title={<span className='text-[#030229] text-[26px] font-semibold'>Prescriptions</span>}
                                    headerContent={<span className='text-[#5678E9] text-xl' onClick={() => setCurrentView("prescriptions")}>View All Prescription</span>}>

                                    <NHTable
                                        loading={loading}
                                        showPagination={true}
                                        tableColumn={columns}
                                        tableDataSource={prescriptions}
                                    />

                                </NHCard>
                            </section>

                            {/* Test Reports Section */}
                            <section>
                                <SectionHeader
                                    title="Test Reports"
                                    actionText="View All Reports"
                                    onActionClick={() => setCurrentView("test-reports")}
                                />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <NHCard
                                        title="Dr. Marcus Philips"
                                        subtitle="Disease: Viral Infection"
                                        description="Pathology Test"
                                        date="2 Jan, 2022"
                                    />
                                    <NHCard
                                        title="Dr. Ryan Carder"
                                        subtitle="Disease: Allergies"
                                        description="Pathology Test"
                                        date="2 Jan, 2022"
                                    />
                                </div>
                            </section>
                        </div>
                    </>
                );
            case "medical-history":
                return (
                    <MedicalHistory />
                );
            case "prescriptions":
                return (
                    <Prescriptions />
                );
            case "test-reports":
                return (
                    <TestReports />
                );
            default:
                return null;
        }
    };

    return <div>{renderView()}</div>;
};