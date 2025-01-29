import { NHButton, NHCard, NHHead, NHInput, NHTable } from "@/components";
import Icons from "@/constants/Icons";
import { Space, Tag } from "antd";
import "./InsuranceBilling.css";
import { useInsuranceClaims } from "@/hook/Admin/BillingAndPayments";

export const InsuranceClaims = () => {
  const { claims, loading, data, fetchClaims, onSearch, navigate } =
    useInsuranceClaims();

  const columns = [
    {
      title: "Bill Number",
      dataIndex: "billNumber",
      key: "billNumber",
      render: (billNumber) => (
        <Tag color={billNumber === "billNumber" ? "#F6F8FB" : "#F6F8FB"}>
          {billNumber}
        </Tag>
      ),
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Disease Name",
      dataIndex: "diseaseName",
      key: "diseaseName",
    },
    {
      title: "Insurance Company",
      dataIndex: "insuranceCompany",
      key: "insuranceCompany",
    },
    {
      title: "Insurance Plan",
      dataIndex: "insurancePlan",
      key: "insurancePlan",
      render: (plan) => (
        <Tag color={plan === "Maternity" ? "#F6F8FB" : "#F6F8FB"}>{plan}</Tag>
      ),
    },
    {
      title: "Bill Date",
      dataIndex: "billDate",
      key: "billDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton
            isView
            onClick={() =>
              navigate(
                `/admin/insurance-claims/insurance-bill-view/${record.billNumber}`,
                { state: { billData: record } }
              )
            }
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="insurance_sec">
        <NHHead title="Insurance Claims" />
        <NHCard
          title={"Insurance Claims"}
          headerContent={
            <NHInput
              prefix={Icons.SearchIcon}
              placeholder="Search Patient"
              onChange={(e) => onSearch(e.target.value)}
            />
          }
        >
          <NHTable
            loading={loading}
            showPagination={true}
            tableColumn={columns}
            tableDataSource={data}
            scroll={{
              x: 900,
              y: 500,
            }}
          />
        </NHCard>
      </div>
    </>
  );
};
