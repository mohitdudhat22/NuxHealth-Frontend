import { NHCard, NHInput, NHSelect, NHTable } from "@/components";
import Icons from "@/constants/icons";
import { usePatientRecordAccess } from "@/hook/Doctor/PatientRecordAccess";

export const PatientRecordAccess = () => {
  const { data, handleSelectChange, columns, filter, handleSearch } =
    usePatientRecordAccess();

  return (
    <NHCard
      title="Patient Record Access"
      headerContent={
        <div className="flex items-center gap-4">
          <NHInput
            prefix={Icons.SearchIcon}
            placeholder="Search Patient"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <NHSelect
            name="filter"
            value={filter}
            onChange={(value) => handleSelectChange(value)}
            placeholder="Select Filter"
            options={[
              { value: "day", label: "Day" },
              { value: "month", label: "Month" },
              { value: "year", label: "Year" },
            ]}
          />
        </div>
      }
    >
      <NHTable columns={columns} showPagination={true} dataSource={data} />
    </NHCard>
  );
};
