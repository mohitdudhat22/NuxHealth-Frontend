import { NHButton, NHCard, NHInput, NHTable } from "@/components"
import Icons from "@/constants/icons"
import { Space, Tag } from "antd"
import { useNavigate } from "react-router-dom"

export const MonitorBilling = () => {
  const navigate = useNavigate();
  const columns = [
    {
      title: "Bill Number",
      dataIndex: "billNumber",
      key: "billNumber",
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
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Paid" ? "green" : "red"}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) =>
        <Space size="middle">
          <NHButton
            type="primary"
            size="small"
            icon={Icons.ViewBillIcon}
            className="view-btn bg-white border-primary"
            onClick={() => navigate("view-bill")}
          />
        </Space>
    },
  ];

  const data = [
    {
      key: "1",
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      action: "View",
    },
    {
      key: "2",
      billNumber: "5654",
      patientName: "Talan Press",
      diseaseName: "Conjunctivitis",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "25 Jan, 2022",
      time: "4:30 PM",
      action: "View",
    },
    // Add more rows as needed
  ];

  return (
    <>
      <NHCard title={"Monitor Billing"} headerContent={
        <div className="flex items-center gap-md">
        <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
        <NHButton variant="default" className="bg-white border-primary" onClick={() => navigate("edit-invoice")}>{Icons.EditBillIcon}Edit Invoice Theme</NHButton>
        <NHButton variant="primary" onClick={() => navigate("create-bill")}>Create Bills</NHButton>
        </div>
      }>
        <NHTable tableColumn={columns} tableDataSource={data} />
      </NHCard >
    </>

  )
}