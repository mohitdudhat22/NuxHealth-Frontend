import { useGlobalSearch } from "@/hook/Global";
import DoctorData from "./DoctorData";
import PatientData from "./PatientData";
import { NHCard } from "@/components";
import { ReceptionData } from "./ReceptionData";

export const GlobalSearch = () => {
  const { doctorData, patientData, receptionData, loading } = useGlobalSearch();

  return (
    <>
      <div className="flex flex-col gap-xl">
        {doctorData?.length > 0 && (
          <NHCard title="Doctors" className="w-full">
            <DoctorData tableData={doctorData} loading={loading} />
          </NHCard>
        )}
        {patientData?.length > 0 && (
          <NHCard title="Patients" className="w-full">
            <PatientData tableData={patientData} loading={loading} />
          </NHCard>
        )}
        {receptionData?.length > 0 && (
          <NHCard title="Reception" className="w-full">
            <ReceptionData tableData={receptionData} loading={loading} />
          </NHCard>
        )}
      </div>
      {/*
       )} */}
    </>
  );
};
