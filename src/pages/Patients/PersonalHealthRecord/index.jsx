import { NHCard, NHTable, PatientDetailCard } from '@/components'
import React from 'react'

export const PersonalHealthRecord = () => {

    const medicalHistoryData = [
        {
            title: "Dulce Schleifer",
            subtitle: "Patient Issue",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "2 Jan, 2022",
        },
        {
            title: "Dulce Workman",
            subtitle: "Patient Issue",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "2 Jan, 2022",
        },
        {
            title: "Miracle Septimus",
            subtitle: "Patient Issue",
            description:
                "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
            date: "2 Jan, 2022",
        },
    ];

    const prescriptionHeaders = ["Hospital Name", "Date", "Disease Name", "Action"];
    const prescriptionRows = [
        ["Apollo Hospitals", "2 Jan, 2022", "Colds and Flu", <button>View</button>],
        ["Medanta The Medicity", "2 Jan, 2022", "Allergies", <button>View</button>],
        ["Manipal Hospitals", "2 Jan, 2022", "Diarrhea", <button>View</button>],
        ["Narayana Health", "2 Jan, 2022", "Colds and Flu", <button>View</button>],
    ];

    const SectionHeader = ({ title, actionText, onActionClick }) => {
        return (
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{title}</h3>
                {actionText && (
                    <button
                        onClick={onActionClick}
                        className="text-sm text-blue-500 hover:underline"
                    >
                        {actionText}
                    </button>
                )}
            </div>
        );
    };

    const Table = ({ headers, rows }) => {
        return (
            <table className="w-full border border-collapse border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="p-2 text-sm font-medium text-left border-b"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50">
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="p-2 text-sm border-b">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const Card = ({ title, subtitle, description, date }) => {
        return (
            <div className="p-4 bg-white border rounded-lg shadow-sm">
                <h4 className="text-lg font-medium">{title}</h4>
                <p className="text-sm text-gray-500">{subtitle}</p>
                <p className="mt-2 text-sm text-gray-700">{description}</p>
                <p className="mt-2 text-xs text-gray-500">{date}</p>
            </div>
        );
    };

    return (
        <div>
            <PatientDetailCard
                patientName="Marcus Philips"
                doctorName="Dr. Marcus Philips"
                patientNumber="99130 44537"
                patientIssue="Feeling tired"
                patientGender="Male"
                patientAge="20 Years"
                appointmentType="Online"
                patientAddress="B-408 Swastik society, mota varacha rajkot."
                lastAppointmentDate="2 Jan, 2022"
                lastAppointmentTime="4:30 PM"
                onEditProfile={() => { }}
            />

            <div class="grid grid-cols-[3fr_2fr] mt-8 grid-rows-2 gap-8">
                {/* Medical History Section */}
                <section>
                    {/* <NHSectionHeader title="Medical History" actionText="View All History" /> */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {medicalHistoryData.map((data, index) => (
                            <NHCard key={index} {...data} />
                        ))}
                    </div>
                </section>

                {/* Prescriptions Section */}
                <section>
                    {/* <NHSectionHeader title="Prescriptions" actionText="View All Prescription" /> */}
                    <NHTable headers={prescriptionHeaders} rows={prescriptionRows} />
                </section>

                {/* Test Reports Section */}
                <section>
                    {/* <NHSectionHeader title="Test Reports" actionText="View All Reports" /> */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <NHCard
                            title="Dr. Marcus Philips"
                            subtitle="Diseas: Viral Infection"
                            description="Pathology Test"
                            date="2 Jan, 2022"
                        />
                        <NHCard
                            title="Dr. Ryan Carder"
                            subtitle="Diseas: Allergies"
                            description="Pathology Test"
                            date="2 Jan, 2022"
                        />
                    </div>
                </section>

                {/* Patient Status Section */}
                <section>
                    {/* <NHSectionHeader title="Patient Status" /> */}
                    <div className="p-4 bg-white border rounded-lg">
                        <p>
                            <strong>Shambhu Hospital</strong> - Dr. Mathew Best - 2 Jan, 2022
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            It is a long established fact that a reader will be distracted by
                            the readable content of a page when looking at its layout.
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
