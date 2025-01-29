import { NHCard, NHTable, PatientDetailCard } from "@/components";
import { usePatientViewDetails } from "@/hook/Doctor";

export const PatientViewDetails = () => {
  const { data, columns } = usePatientViewDetails();

  return (
    <>
      <div className="mb-[20px]">
        <PatientDetailCard
          avatar={data?.profilePicture}
          patientName={data?.patientFullName}
          doctorName={data?.doctorName}
          patientNumber={data?.phone}
          patientIssue={data?.patientIssue}
          patientGender={data?.gender}
          patientAge={data?.age}
          appointmentType={data?.appointmentType}
          patientAddress={data?.address}
          lastAppointmentDate={data?.lastAppointmentDate}
          lastAppointmentTime={data?.lastAppointmentTime}
        // onAddRecord={handleAddRecord}
        />
      </div>
      <NHCard>
        <NHTable showPagination={true} loading={true} columns={columns} dataSource={data?.allAppointments} scroll={{x: 800}} />
      </NHCard>
    </>
  );
};