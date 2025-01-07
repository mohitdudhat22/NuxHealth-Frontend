import { NHButton, NHCard, NHTable } from "@/components";
import { usePatientViewDetails } from "@/hook/Doctor";
import { Space, Tag } from "antd";

export const PatientViewDetails = () => {
  const { data, error, columns, staticData } = usePatientViewDetails();
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const PatientDetailsSection = () => (
    <div className="mb-6">
      <div className="flex items-start gap-6">
        <img
          src={data?.profilePicture}
          alt="Patient"
          className="w-20 h-20 rounded-full"
        />
        <div className="grid flex-1 grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-bold text-gray-500">Patient Name</p>
            <p className="font-medium">{data.patientFullName}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Patient Number</p>
            <p className="font-medium">{data.phone}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Patient Gender</p>
            <p className="font-medium">{data.gender}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Patient Age</p>
            <p className="font-medium">{data.age}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Patient Address</p>
            <p className="font-medium">{data.address}</p>
          </div>

          <div>
            <p className="text-sm font-bold text-gray-500">Height</p>
            <p className="font-medium">{data.height} cm</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Weight</p>
            <p className="font-medium">{data.weight} kg</p>
          </div>
          <div>
            <p className="text-sm font-bold text text-gray-500">Blood Group</p>
            <p className="font-medium">{data.bloodGroup}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500">Date of Birth</p>
            <p className="font-medium">{data.dob}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="mb-[20px]">
        <NHCard
          title="Patient Details"
          headerContent={<NHButton type="primary">Add Record</NHButton>}
        >
          <PatientDetailsSection />
        </NHCard>
      </div>
      <NHCard>
        <NHTable loading={loading} showPagination={true} columns={columns} dataSource={data?.allAppointments || staticData} />
      </NHCard>
    </>
  );
};