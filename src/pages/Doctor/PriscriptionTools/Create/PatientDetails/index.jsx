import React from "react";
import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHInput,
  NHTable,
  NHTabs,
  PatientDetailCard,
} from "@/components";
import Icons from "@/constants/icons";
import medicalCertificate from "@/assets/images/Project-images/medicalCerti.png";
import document from "@/assets/images/Project-images/doc.png";
import NoPatientDetailsFound from "@/assets/images/cover/no-patient-details-found.png";
import { Empty } from "antd";

export const PatientDetails = () => {
  const patientData = [
    { createdDate: "2 Jan, 2022" },
    { createdDate: "2 Jan, 2022" },
    { createdDate: "2 Jan, 2022" },
    { createdDate: "2 Jan, 2022" },
  ];

  const tabItems = [
    {
      key: "allDocument",
      label: "All Document",
      children: (
        <NHCard rootClass={"p-0"}>
          {patientData.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <Empty
                image={NoPatientDetailsFound}
                imageStyle={{ height: "100%" }}
                description="No Documents Found"
                className="h-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {patientData.map((data, index) => {
                const { createdDate } = data;
                return (
                  <AppointmentCard
                    key={index}
                    title="Created Date"
                    headerContent={createdDate}
                    children={
                      <>
                        <img
                          src={medicalCertificate}
                          alt="medicalCertificate"
                          className="rounded-xl"
                        />
                      </>
                    }
                    className="border rounded-lg border-slate-200"
                  />
                );
              })}
            </div>
          )}
        </NHCard>
      ),
    },
    {
      key: "allPrescription",
      label: "All Prescription",
      children: (
        <NHCard rootClass={"p-0"}>
          {patientData.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <Empty
                image={NoPatientDetailsFound}
                imageStyle={{ height: "100%" }}
                description="No Prescriptions Found"
                className="h-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {patientData.map((data, index) => {
                const { createdDate } = data;
                return (
                  <AppointmentCard
                    key={index}
                    title="Created Date"
                    headerContent={createdDate}
                    children={
                      <>
                        <img
                          src={document}
                          alt="medicalCertificate"
                          className=""
                        />
                      </>
                    }
                    className="border rounded-lg border-slate-200"
                  />
                );
              })}
            </div>
          )}
        </NHCard>
      ),
    },
    {
      key: "description",
      label: "Description",
      children: (
        <NHCard rootClass={"p-0"}>
          {patientData.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <Empty
                image={NoPatientDetailsFound}
                imageStyle={{ height: "100%" }}
                description="No Descriptions Found"
                className="h-full"
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {patientData.map((data, index) => {
                const { createdDate } = data;
                return (
                  <AppointmentCard
                    key={index}
                    title="Description Date"
                    headerContent={createdDate}
                    children={
                      <>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                      </>
                    }
                    className="border rounded-lg border-slate-200"
                  />
                );
              })}
            </div>
          )}
        </NHCard>
      ),
    },
  ];

  return (
    <>
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
      // onAddRecord={handleAddRecord}
      />
      <div className="mt-8">
        <NHCard
          headerContent={
            <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
          }
        >
          <NHTabs items={tabItems} defaultActiveKey="upcoming" />
        </NHCard>
      </div>
    </>
  );
};