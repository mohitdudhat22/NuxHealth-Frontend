import React from "react";
import { NHTable, NHButton, NHCard } from "@/components";
import Logo from "@/assets/images/logo/logo.png";
import { Modal } from "antd";
import "./PrescriptionTool.css";

const PrescriptionDetails = ({
  hospitalName,
  doctorName,
  doctorspecialty,
  prescriptionDate,
  patientName,
  age,
  gender,
  address,
  additionalNote,
  patientData,
  columns,
  isSendButton,
  handlePrescription,
}) => (
  <NHCard className="min-h-full">
    <div className="p-6 mb-8 rounded-lg bg-slate-100">
      <div className="flex items-center justify-between pb-4 mb-4 ">
        <div>
          <img src={Logo} className="w-1/4 h-auto" alt="Logo" />
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold">
            {patientData?.DoctorName || doctorName}
          </h2>
          <p className="text-sm text-gray-500">
            {patientData?.doctorspecialty || doctorspecialty}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p>
            <span className="text-xl text-[#818194]">Hospital Name:</span>
            <span className="text-xl font-bold text-[#4F4F4F]">
              {patientData?.hospitalName || hospitalName}
            </span>
          </p>
          <p>
            <span className="text-xl text-[#818194]">Patient Name:</span>
            <span className="text-xl font-bold text-[#4F4F4F]">
              {patientData?.patientName || patientName}
            </span>
          </p>
          <p>
            <span className="text-xl text-[#818194]">Gender:</span>
            <span className="text-xl font-bold text-[#4F4F4F]">
              {patientData?.gender || gender}
            </span>
          </p>
          <p>
            <span className="text-xl text-[#818194]">Address:</span>
            <span className="text-xl font-bold text-[#4F4F4F]">
              {patientData?.address || address}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p>
            <span className="text-xl text-[#818194]">Prescription Date:</span>
            <span className="text-xl font-bold text-[#4F4F4F]">
              {patientData?.prescriptionDate || prescriptionDate}
            </span>
          </p>
          <p>
            <span className="text-xl text-[#818194]">Age:</span>
            <span className="text-xl font-bold text-[#4F4F4F]">
              {patientData?.age || age}
            </span>
          </p>
        </div>
      </div>
    </div>

    <NHTable
      showPagination={true}
      columns={columns}
      dataSource={
        patientData?.medications?.map((medication, index) => ({
          key: index.toString(),
          ...medication,
        })) || []
      }
      pagination={false}
      className="mb-4"
    />

    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-600">Additional Note</h3>
      <p className="text-sm text-gray-500">
        {patientData?.additionalNote || additionalNote}
      </p>
    </div>

    <div className="flex items-center justify-between mt-6">
      <p className="text-sm text-gray-500">Doctor Signature</p>
      {isSendButton && (
        <NHButton variant="primary" onClick={handlePrescription}>
          Send
        </NHButton>
      )}
    </div>
  </NHCard>
);

export const PrescriptionCard = ({
  hospitalName,
  doctorName,
  doctorspecialty,
  prescriptionDate,
  patientName,
  age,
  gender,
  address,
  additionalNote,
  patientData,
  isModalOpen,
  clickEvent,
  onCancel,
  handleClose,
  handlePrescription,
  Title,
  handleOk,
  isSendButton = false,
}) => {
  const columns = [
    { title: "Medicine Name", dataIndex: "medicineName", key: "medicineName" },
    { title: "Strength", dataIndex: "strength", key: "strength" },
    { title: "Dose", dataIndex: "dose", key: "dose" },
    { title: "Duration", dataIndex: "duration", key: "duration" },
    { title: "When to take", dataIndex: "whenToTake", key: "whenToTake" },
  ];

  return (
    <>
      {clickEvent ? (
        <Modal
          title={Title}
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={onCancel}
          className="prescription-tool-modal"
          footer={[
            <NHButton key="back" onClick={onCancel}>
              Close
            </NHButton>,
            // <NHButton key="submit" variant="primary" onClick={handleOk}>
            //   Send
            // </NHButton>,
          ]}
        >
          <PrescriptionDetails
            hospitalName={hospitalName}
            doctorName={doctorName}
            doctorspecialty={doctorspecialty}
            prescriptionDate={prescriptionDate}
            patientName={patientName}
            age={age}
            gender={gender}
            address={address}
            additionalNote={additionalNote}
            patientData={patientData}
            columns={columns}
            isSendButton={isSendButton}
            handlePrescription={handlePrescription}
          />
        </Modal>
      ) : (
        <PrescriptionDetails
          hospitalName={hospitalName}
          doctorName={doctorName}
          doctorspecialty={doctorspecialty}
          prescriptionDate={prescriptionDate}
          patientName={patientName}
          age={age}
          gender={gender}
          address={address}
          additionalNote={additionalNote}
          patientData={patientData}
          columns={columns}
          isSendButton={isSendButton}
          handlePrescription={handlePrescription}
        />
      )}
    </>
  );
};
