import { FullLogo } from "@/assets/images";
import { NHButton, NHCard, NHTable } from "@/components";
import moment from "moment";
import React from "react";

export const Invoice = ({ billData }) => {
    const { bill } = billData;

    // Table data and headers for the description section
    const tableHeaders = ["Description", "Amount", "Qty.", "Total"];
    const tableData = bill.description.map((item) => ({
        Description: item.description,
        Amount: `₹ ${item.amount}`,
        Qty: item.quantity,
        Total: `₹ ${item.amount * item.quantity}`,
    }));

    return (
        <div className="invoice">
            {/* Header Section */}
            <NHCard className="header-card">
                <div className="flex justify-between pb-5 head">
                    <img src={FullLogo} className="w-1/5 h-auto" alt="Logo" />
                    <div className="text-3xl font-light text-blue-400">Invoice</div>
                </div>
                <p className="flex justify-between text-4xl font-semibold">Dr. {bill.doctorId.fullName}
                    <div className="flex flex-col items-end">
                        <span className="text-lg font-medium"><strong>Bill No:</strong> {bill.billNumber}</span>
                        <span className="text-lg font-medium"><strong>Date:</strong> {moment(bill.date).format("DD/MM/YYYY")}</span>
                        <span className="text-lg font-medium"><strong>Bill Time:</strong> {moment(bill.time, "h:mm:ss a").format("hh:mm A")}</span>
                    </div>
                </p>

                {/* Patient Info Section */}
                <div className="patient-details">
                    <p className="text-lg font-medium"><strong>Name:</strong> {bill.patientId.fullName}</p>
                    <p className="text-lg font-medium"><strong>Gender:</strong> {bill.patientId.gender}</p>
                    <p className="text-lg font-medium"><strong>Age:</strong> {bill.patientId.age} Years</p>
                    <p className="text-lg font-medium"><strong>Address:</strong> {bill.patientId.address.fullAddress}</p>
                </div>
                <div className="appointment-details">
                    <p className="text-lg font-medium"><strong>Disease Name:</strong> {bill.appointmentId.dieseas_name}</p>
                    <p className="text-lg font-medium"><strong>Phone Number:</strong> {bill.patientId.phone}</p>
                    <p className="text-lg font-medium"><strong>Payment Type:</strong> {bill.paymentType}</p>
                </div>

                {tableData ?? <NHTable headers={tableHeaders} data={tableData} />}
                <div className="summary">
                    <p className="text-lg font-medium"><strong>Amount:</strong> ₹ {bill.amount}</p>
                    <p className="text-lg font-medium"><strong>Discount:</strong> ₹ {bill.discount}</p>
                    <p className="text-lg font-medium"><strong>Tax:</strong> ₹ {bill.tax}</p>
                    <p className="text-lg font-medium"><strong>Total Amount:</strong> ₹ {bill.totalAmount}</p>
                </div>
            </NHCard>

            {bill.paymentType !== "Cash" &&
                <NHCard className="footer-card">
                    <p className="text-lg font-medium">Call: +90854 22354</p>
                    <p className="text-lg font-medium">Email: Hello@Gmail.com</p>
                    <NHButton text="Pay Now" onClick={() => alert("Payment initiated!")} >Pay Now</NHButton>
                </NHCard>
            }
        </div>
    );
};