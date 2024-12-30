import React from "react";
import { NHInput, NHTable, NHButton, NHSelect, NHCard } from "@/components";

export const CreatePrescription = ({ appointment }) => {

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
            render: () => (
                <button className="text-red-500 hover:text-red-700">
                    &#128465; {/* Trash Icon */}
                </button>
            ),
        },
    ];

    const data = [
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
                        { value: "After Food", label: "After Food" },
                    ]}
                />
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-4 p-4 md:flex-row">
            {/* Left Section */}
            <NHCard className="w-full md:w-1/2">
                <h2 className="mb-4 text-lg font-semibold">Create Prescription</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Patient Name</label>
                        <NHInput placeholder={appointment?.name || "Marcus Philips"} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Age</label>
                        <NHInput type="number" placeholder={appointment?.patientAge || "22 Years"} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Gender</label>
                        <NHInput placeholder={appointment?.patientGender || "Male"} />
                    </div>
                </div>

                <h3 className="mb-4 text-lg font-semibold">Drug Prescription</h3>
                <NHTable columns={columns} dataSource={data} pagination={false} />

                <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-600">Additional Note</label>
                    <textarea
                        className="w-full p-2 mt-1 border rounded-md"
                        rows="3"
                        placeholder="Additional notes"
                    />
                </div>
            </NHCard>

            {/* Right Section */}
            <NHCard className="w-full md:w-1/2 bg-blue-50">
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
                        <strong>Patient Name:</strong> {appointment?.name || "Altabar Bhujrajo"}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Age:</strong> {appointment?.patientAge || "36 Years"}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Gender:</strong> {appointment?.patientGender || "Male"}
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
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Doctor Signature</p>
                    <NHButton variant="primary">Send</NHButton>
                </div>
            </NHCard>
        </div>
    );
};
