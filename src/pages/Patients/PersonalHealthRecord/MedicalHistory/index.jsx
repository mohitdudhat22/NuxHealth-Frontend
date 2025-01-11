import { AppointmentCard, NHButton, NHCard, NHInput } from "@/components";
import Icons from "@/constants/icons";

export const MedicalHistory = () => {
  const MedicaltData = [
    {
      patientName: "Dulce Schleifer",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Alfredo Carder",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Justin Rhiel Madsen",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Wilson Workman",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Lydia Dokidis",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Dulce Aminoff",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Chance Westervelt",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Giana Calzoni",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Ryan Aminoff",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Dulce Press",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Lydia Torff",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
    {
      patientName: "Cristofer Passaquindici Arcand",
      date: "2022-01-02",
      patientIssue:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-.",
    },
  ];

  return (
    <>
      <NHCard
        title={
          <span className="text-[#030229] text-[26px] font-semibold">
            Medical History
          </span>
        }
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {MedicaltData.map((medical, index) => (
            <AppointmentCard
              key={index}
              headerContent={
                <>
                  <span
                    onClick={() => handlePatientDetails()}
                    className="cursor-pointer"
                  >
                    {Icons.ViewBillIcon}
                  </span>
                </>
              }
              headerBg={true}
              title={
                <span className="font-semibold text-[18px]">
                  {medical.patientName}
                </span>
              }
              date={medical.date}
              patientIssue={medical.patientIssue}
              className="border border-slate-200"
            />
          ))}
        </div>
      </NHCard>
    </>
  );
};
