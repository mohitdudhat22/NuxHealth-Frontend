import React, { useState } from "react";
import { NHInput, NHTable, NHButton, NHSelect, NHCard, PrescriptionCard } from "@/components";
import Icons from "@/constants/icons";

export const CreatePrescription = ({
    appointment = {},
    appointmentTime,
    appointmentType,
    status,
}) => {

    // Destructure with defaults to handle missing appointment data
    const {
        patientId
    } = appointment;

    // State to manage table data and additional note
    const [tableData, setTableData] = useState([
        {
            key: "1",
            medicine: <NHInput placeholder="Medicine" />,
            strength: <NHInput placeholder="100 Mg" />,
            dose: <NHInput placeholder="1-0-1" />,
            duration: <NHInput placeholder="2 Days" />,
            whenToTake: (
                <NHSelect
                    options={[
                        { value: "Before Food", label: "Before Food" },
                        { value: "With Food", label: "With Food" },
                        { value: "After Food", label: "After Food" },
                    ]}
                />
            ),
        },
        {
            key: "2",
            medicine: <NHInput placeholder="Medicine" />,
            strength: <NHInput placeholder="100 Mg" />,
            dose: <NHInput placeholder="1-0-1" />,
            duration: <NHInput placeholder="2 Days" />,
            whenToTake: (
                <NHSelect
                    options={[
                        { value: "Before Food", label: "Before Food" },
                        { value: "With Food", label: "With Food" },
                        { value: "After Food", label: "After Food" },
                    ]}
                />
            ),
        },
        {
            key: "3",
            medicine: <NHInput placeholder="Medicine" />,
            strength: <NHInput placeholder="100 Mg" />,
            dose: <NHInput placeholder="1-0-1" />,
            duration: <NHInput placeholder="2 Days" />,
            whenToTake: (
                <NHSelect
                    options={[
                        { value: "Before Food", label: "Before Food" },
                        { value: "With Food", label: "With Food" },
                        { value: "After Food", label: "After Food" },
                    ]}
                />
            ),
        },
        {
            key: "4",
            medicine: <NHInput placeholder="Medicine" />,
            strength: <NHInput placeholder="100 Mg" />,
            dose: <NHInput placeholder="1-0-1" />,
            duration: <NHInput placeholder="2 Days" />,
            whenToTake: (
                <NHSelect
                    options={[
                        { value: "Before Food", label: "Before Food" },
                        { value: "With Food", label: "With Food" },
                        { value: "After Food", label: "After Food" },
                    ]}
                />
            ),
        },
        {
            key: "5",
            medicine: <NHInput placeholder="Medicine" />,
            strength: <NHInput placeholder="100 Mg" />,
            dose: <NHInput placeholder="1-0-1" />,
            duration: <NHInput placeholder="2 Days" />,
            whenToTake: (
                <NHSelect
                    options={[
                        { value: "Before Food", label: "Before Food" },
                        { value: "With Food", label: "With Food" },
                        { value: "After Food", label: "After Food" },
                    ]}
                />
            ),
        },
    ]);
    const [additionalNote, setAdditionalNote] = useState("");

    // Function to delete a row from the table
    const handleDelete = (index) => {
        setTableData((prevData) => prevData.filter((_, i) => i !== index));
    };

    // Table columns with delete functionality
    const columns = [
        { title: "Medicine Name", dataIndex: "medicine", key: "medicine" },
        { title: "Strength", dataIndex: "strength", key: "strength" },
        { title: "Dose", dataIndex: "dose", key: "dose" },
        { title: "Duration", dataIndex: "duration", key: "duration" },
        { title: "When to take", dataIndex: "whenToTake", key: "whenToTake" },
        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: (_, record, index) => (
                <NHButton size={"small"} icon={Icons.Delete} className="delete-btn" onClick={() => handleDelete(index)} />
            ),
        },
    ];

    return (
        <div className="flex gap-4 p-4 md:flex-row">
            {/* Left Section */}
            <div className="w-full md:w-[58%]">
                <NHCard className="w-full">
                    <h2 className="mb-4 text-lg font-semibold">Create Prescription</h2>
                    <div className="flex gap-4 mb-6">
                        <div className="w-3/5">
                            <label className="block text-sm font-medium text-gray-600">Patient Name</label>
                            <NHInput disabled value={patientId.fullName} />
                        </div>
                        <div className="w-1/5">
                            <label className="block text-sm font-medium text-gray-600">Age</label>
                            <NHInput disabled value={patientId.age} />
                        </div>
                        <div className="w-1/5">
                            <label className="block text-sm font-medium text-gray-600">Gender</label>
                            <NHInput disabled value={patientId.gender} />
                        </div>
                    </div>

                    <h3 className="mb-4 text-lg font-semibold">Drug Prescription</h3>
                    <NHTable columns={columns} dataSource={tableData} pagination={false} />

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-600">Additional Note</label>
                        <textarea
                            className="w-full p-2 mt-1 border border-[rgb(211,211,211)] rounded-md"
                            rows="3"
                            placeholder="Additional notes"
                            value={additionalNote}
                            onChange={(e) => setAdditionalNote(e.target.value)}
                        />
                    </div>
                </NHCard>
            </div>

            {/* Right Section */}
            <div className="w-[42%]">
                <PrescriptionCard
                    hospitalName="Global Medical Center"
                    doctorName="Dr. Alice Monroe"
                    doctorSpecialty="Pediatrics"
                    prescriptionDate="5 Jan, 2024"
                    patient={{
                        name: "Jane Doe",
                        age: "28 Years",
                        gender: "Female",
                        address: "123 Elm Street, Springfield",
                    }}

                    additionalNote="Take medicines as prescribed. Drink plenty of water."
                />
            </div>

            {/* <div className="w-full md:w-2/5">
                <NHCard className="w-full bg-blue-50">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-semibold text-blue-600">Hospital</h2>
                            <p className="text-sm text-gray-600">Medical Center</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Dr. Bharat Patel</h3>
                            <p className="text-sm text-gray-500">Obstetrics and Gynecology</p>
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-gray-600">
                            <strong>Patient Name:</strong> {name}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Age:</strong> {patientAge}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Gender:</strong> {patientGender}
                        </p>
                        <p className="text-sm text-gray-600">
                            <strong>Address:</strong> B-105 Viral Bungalows
                        </p>
                    </div>

                    <div className="mb-4">
                        <NHTable
                            columns={columns.slice(0, -1)} // Exclude "Actions" column
                            dataSource={[
                                {
                                    key: "1",
                                    medicine: "Calcium carbonate",
                                    strength: "100 Mg",
                                    dose: "1-0-1",
                                    duration: "2 Days",
                                    whenToTake: "Before Food",
                                },
                            ]}
                            pagination={false}
                        />
                    </div>

                    <div className="mb-4 text-sm text-gray-600">
                        <strong>Additional Note:</strong>
                        <p>{additionalNote || "No additional notes provided."}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">Doctor Signature</p>
                        <NHButton variant="primary">Send</NHButton>
                    </div>
                </NHCard>
            </div> */}
        </div>
    );
};