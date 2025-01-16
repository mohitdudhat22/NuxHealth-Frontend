import { NHCard, NHTable, PatientDetailCard } from "@/components";
import { usePatientViewDetails } from "@/hook/Doctor";

export const PatientViewDetails = () => {
  const { data, error, columns } = usePatientViewDetails();

  if (error) {
    return <div className="text-red-500">{"error"}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-[20px]">
        <PatientDetailCard
          patientName={data?.patientFullName || "Marcus Philips"}
          doctorName={data?.doctorName || "Dr. Marcus Philips"}
          patientNumber={data?.phone || "99130 44537"}
          patientIssue={data?.patientIssue || "Feeling tired"}
          patientGender={data?.gender || "Male"}
          patientAge={data?.age || "20 Years"}
          appointmentType="Online"
          patientAddress={data?.address || "B-408 Swastik society, mota varacha rajkot."}
          lastAppointmentDate={data?.lastAppointmentDate || "2 Jan, 2022"}
          lastAppointmentTime={data?.lastAppointmentTime || "4:30 PM"}
        // onAddRecord={handleAddRecord}
        />
      </div>
      <NHCard>
        <NHTable showPagination={true} columns={columns} dataSource={data?.allAppointments} />
      </NHCard>
    </>
  );
};