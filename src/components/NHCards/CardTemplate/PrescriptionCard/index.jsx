import React from "react";
import { NHInput, NHTable, NHButton, NHSelect, NHCard } from "@/components";
import Logo from '@/assets/images/logo/logo.png';

export const PrescriptionCard = ({
    hospitalName = "Medical Center",
    doctorName = "Dr. Bharat Patel",
    doctorSpecialty = "Obstetrics and Gynecology",
    prescriptionDate = "2 Jan, 2022",
    patient = {
        name: "Altabrao Bhajirao",
        age: "36 Years",
        gender: "Male",
        address: "B-105 Viral Bungalows PunaGam Motavaracha Jamnagar.",
    },
    medicines = [
        {
            medicine: "Calcium carbonate",
            strength: "100 Mg",
            dose: "1-0-1",
            duration: "2 Day",
            whenToTake: "Before Food",
        },
        {
            medicine: "Cyclobenzaprine",
            strength: "200 Mg",
            dose: "1-1-1",
            duration: "4 Day",
            whenToTake: "With Food",
        },
        {
            medicine: "Fluticasone Almeterol",
            strength: "150 Mg",
            dose: "0-1-0",
            duration: "5 Day",
            whenToTake: "Before Food",
        },
        {
            medicine: "Hydrochlorothiazide",
            strength: "250 Mg",
            dose: "0-0-1",
            duration: "2 Day",
            whenToTake: "After Food",
        },
        {
            medicine: "Flonase Allergy Relief",
            strength: "100 Mg",
            dose: "1-0-0",
            duration: "1 Day",
            whenToTake: "Before Food",
        },
    ],
    additionalNote = "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
}) => {
    // Medicine Table Columns
    const columns = [
        { title: "Medicine Name", dataIndex: "medicine", key: "medicine" },
        { title: "Strength", dataIndex: "strength", key: "strength" },
        { title: "Dose", dataIndex: "dose", key: "dose" },
        { title: "Duration", dataIndex: "duration", key: "duration" },
        { title: "When to take", dataIndex: "whenToTake", key: "whenToTake" },
    ];

    return (
        <NHCard className="min-h-full">
            {/* Header Section */}
            <div className="p-6 mb-8 rounded-lg bg-slate-100">
                <div className="flex items-center justify-between pb-4 mb-4 ">
                    <div>
                        <img src={Logo} className="w-1/4 h-auto" alt="Logo" />
                    </div>
                    <div className="text-right">
                        <h2 className="text-lg font-semibold">{doctorName}</h2>
                        <p className="text-sm text-gray-500">{doctorSpecialty}</p>
                    </div>
                </div>

                {/* Patient Info Section */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p>
                            <span className="text-xl text-[#818194]">Hospital Name:</span>
                            <span className={`text-xl font-bold text-[#4F4F4F]`}>
                                {hospitalName}
                            </span>
                        </p>
                        <p>
                            <span className="text-xl text-[#818194]">Patient Name:</span>
                            <span className={`text-xl font-bold text-[#4F4F4F]`}>
                                {patient.name}
                            </span>
                        </p>
                        <p>
                            <span className="text-xl text-[#818194]">Gender:</span>
                            <span className={`text-xl font-bold text-[#4F4F4F]`}>
                                {patient.gender}
                            </span>
                        </p>
                        <p>
                            <span className="text-xl text-[#818194]">Address:</span>
                            <span className={`text-xl font-bold text-[#4F4F4F]`}>
                                {patient.address}
                            </span>
                        </p>
                    </div>
                    <div className="text-right">
                        <p>
                            <span className="text-xl text-[#818194]">Prescription Date:</span>
                            <span className={`text-xl font-bold text-[#4F4F4F]`}>
                                {prescriptionDate}
                            </span>
                        </p>
                        <p>
                            <span className="text-xl text-[#818194]">Age:</span>
                            <span className={`text-xl font-bold text-[#4F4F4F]`}>
                                {patient.age}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            {/* Medicine Table */}
            <NHTable
                columns={columns}
                dataSource={medicines.map((medicine, index) => ({
                    key: index.toString(),
                    ...medicine,
                }))}
                pagination={false}
                className="mb-4"
            />

            {/* Additional Note Section */}
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600">Additional Note</h3>
                <p className="text-sm text-gray-500">{additionalNote}</p>
            </div>

            {/* Footer Section */}
            <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-gray-500">Doctor Signature</p>
                <NHButton variant="primary">Send</NHButton>
            </div>
        </NHCard>
    );
};
