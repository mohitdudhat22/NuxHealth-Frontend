import React from "react";
import { NHCard } from "@/components";
import Icons from "@/constants/icons";

export const BillCard = ({
    billNumber,
    billDate,
    patientName,
    phoneNumber,
    onViewClick,
    className,
}) => {
    return (
        <NHCard
            title={`Bill No:${billNumber} `}
            titleSuffix={<span className="text-blue-500 cursor-pointer">{billNumber}</span>}
            rootClass={className}
            headerContent={
                <button
                    onClick={onViewClick}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                    aria-label="View Details"
                >
                    {Icons.ViewBillIcon}
                </button>
            }
        >
            {/* Bill Details */}
            <div className="text-sm text-gray-700">
                <p className="flex justify-between">
                    <span className="text-xl text-[#818194]">Bill Date:</span>
                    <span className="float-right text-xl font-bold text-[#4F4F4F]">{billDate}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-xl text-[#818194]">Patient Name:</span>
                    <span className="float-right text-xl font-bold text-[#4F4F4F]">{patientName}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-xl text-[#818194]">Phone Number:</span>
                    <span className="float-right text-xl font-bold text-[#4F4F4F]">{phoneNumber}</span>
                </p>
            </div>
        </NHCard>
    );
};
