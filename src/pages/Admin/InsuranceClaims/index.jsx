import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import Icons from "@/constants/Icons";
import { Space, Tag } from "antd";
import { useInsuranceClaims } from '@/hook/Admin/BillingAndPayments';

export const InsuranceClaims = () => {
  const {
    claims,
    loading,
    data,
    fetchClaims,
    onSearch,
    navigate
  } = useInsuranceClaims();

  const columns = [
    {
      title: "Bill Number",
      dataIndex: "billNumber",
      key: "billNumber",
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
        <Tag color={plan === "Maternity" ? "blue" : "green"}>
          {plan}
        </Tag>
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
            type="primary"
            variant="secondary"
            size="small"
            icon={Icons.ViewBillIcon}
            onClick={() => navigate(`view-bill/${record.key}`)}
            className="edit-btn bg-white"
          />
        </Space>
      ),
    },
  ];

  return (
    <>
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
        <NHTable loading={loading} showPagination={true} tableColumn={columns} tableDataSource={data} />
      </NHCard>
    </>
  );
};