import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { PaymentProcessModal } from "@/components/NHModalComponents/ModalTemplate/PaymentProcessModal";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PaymentProcess = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false)

  const onEdit = (record) => {
    console.log("Edit record:", record);
  };

  const onViewDetails = (record) => {
    console.log("View details for:", record);
  };

  const onPayment = (record) => {
    console.log("Payment record:", record);
    setIsModalOpen(true)
  }


  const columns = [
    {
      title: "Bill Number",
      dataIndex: "billNumber",
      key: "billNumber",
      render: (text) => <a>{text}</a>,
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
        <Tag color={status === "Paid" ? "green" : "red"}>{status}</Tag>
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
      render: (_, record) => (
        <Space size="middle">
          <NHButton
            type="primary"
            size="small"
            icon={Icons.EditBillIcon}
            className="edit-btn bg-white"
            onClick={() => onEdit(record)}
          />
          <NHButton
            type="primary"
            size="small"
            icon={Icons.ViewBillIcon}
            className="view-btn bg-white"
            onClick={() => onViewDetails(record)}
          />
          <NHButton
            type="default"
            size="small"
            icon={Icons.PaymentIcon}
            className="lock-btn bg-white"
            onClick={() => onPayment(record)}
          />
        </Space>
      ),
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
      date: "2 Jan, 2024",
      time: "4:30 PM",
    },
    {
      key: "2",
      billNumber: "2565",
      patientName: "Nolan Botosh",
      diseaseName: "Mononucleosis",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "3 Jan, 2024",
      time: "5:30 PM",
    },
    {
      key: "3",
      billNumber: "5845",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Diarrhea",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "4 Jan, 2024",
      time: "7:30 PM",
    },
  ];

  return (
    <>
      <NHCard
        title={"Billing Details"}
        headerContent={
          <>
            <NHInput
              prefix={Icons.SearchIcon}
              placeholder="Search Patient"
            />
          </>
        }
      >
        <NHTable tableColumn={columns} tableDataSource={data} />
      </NHCard>

      <PaymentProcessModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        // paymentData={record}
      />

    </>
  );
};
