import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";

export const InsuranceClaims = () => {
  const navigate = useNavigate();
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
            onClick={() => navigate("view-bill")}
            className="edit-btn bg-white"
          />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      billNumber: "5654",
      doctorName: "Dr. Marcus Philaips",
      patientName: "Kadin Saris",
      diseaseName: "Internal Medicine",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Maternity",
      billDate: "2 Jun, 2024",
    },
    {
      key: "2",
      billNumber: "5655",
      doctorName: "Dr. Haylie Schleifer",
      patientName: "Jaxson Bergson",
      diseaseName: "Charlie Rosser",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Health",
      billDate: "3 Jun, 2024",
    },
    {
      key: "3",
      billNumber: "5660",
      doctorName: "Dr. Jaxson Levin",
      patientName: "Emerson Levin",
      diseaseName: "Justin Dokidis",
      insuranceCompany: "Aegon Life Insurance",
      insurancePlan: "Medical",
      billDate: "4 Jun, 2024",
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
          />
        }
      >
        <NHTable tableColumn={columns} tableDataSource={data} />
      </NHCard>
    </>
  );
};
