import React from "react";
import { NHButton, NHCard } from "@/components";
import Icons from "@/constants/Icons";

export const TeleconsultationCard = ({
    hospitalName = "abc",
    billDate = "12/12/2021",
    billTime = "12:00",
    amount = "1000",
    id = "1",
    billNumber = "1",
    patientName,
    className,
}) => {
    return (
        <NHCard
            title={`Bill No: ${billNumber}`}
            titleSuffix={<span className="text-blue-500 cursor-pointer">{billNumber}</span>}
            rootClass={className}
            headerContent={
                <button
                    className="p-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                    aria-label="View Details"
                >
                    {Icons.ViewBillIcon}
                </button>
            }
            footerContent={
                <div className="flex justify-between gap-4">
                    <NHButton
                        size={"small"}
                        className={"w-full bg-[#39973d] text-white"}
                        icon={Icons.call}
                    >
                        Join call
                    </NHButton>
                    <NHButton
                        size={"small"}
                        className={"w-full bg-primary text-white"}
                        icon={Icons.whiteCalendar}
                    >
                        Reschedule
                    </NHButton>
                </div>
            }

        >
            {/* Bill Details */}
            <div className="text-sm text-gray-700">
                <p className="flex justify-between">
                    <span className="text-xl text-[#818194]">Hospital Name:</span>
                    <span className="float-right text-xl font-bold text-[#4F4F4F]">{hospitalName}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-xl text-[#818194]">Bill Created Date:</span>
                    <span className="float-right text-xl font-bold text-[#4F4F4F]">{billDate}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-xl text-[#818194]">Bill Created Time:</span>
                    <span className="float-right text-xl font-bold text-[#4F4F4F]">{billTime}</span>
                </p>
                <p className="flex justify-between">
                    <span className="text-xl text-[#818194]">Total Bill Amount:</span>
                    <span className="float-right text-xl font-bold text-[#4F4F4F]">{amount}</span>
                </p>
            </div>
        </NHCard>
    );
};