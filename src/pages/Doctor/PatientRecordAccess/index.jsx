import { NHCard, NHInput, NHSelect, NHTable } from "@/components"
import Icons from "@/constants/icons"
import { usePatientRecordAccess } from "@/hook/Doctor/PatientRecordAccess";

export const PatientRecordAccess = () => {
    const { data, handleSelectChange, columns, staticData, filter } = usePatientRecordAccess()

    return (
        <NHCard
            title="Patient Record Access"
            headerContent={
                <div className="flex items-center gap-4">
                    <NHInput
                        prefix={Icons.SearchIcon}
                        placeholder="Search Patient"
                    />
                    <NHSelect
                        name="filter"
                        value={filter}
                        onChange={(value) => handleSelectChange(value, 'filter')}
                        placeholder="Select Filter"
                        options={[
                            { value: 'day', label: 'Day' },
                            { value: 'month', label: 'Month' },
                            { value: 'year', label: 'Year' },
                        ]}
                    />
                </div>
            }
        >
            <NHTable columns={columns} showPagination={true} dataSource={data || staticData} route={"/doctor/patientrecordaccess"} />
        </NHCard>
    );
};