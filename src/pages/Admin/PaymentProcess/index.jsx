import { NHButton, NHCard, NHInput, NHTable } from "@/components";
import { PaymentProcessModal } from "@/components/NHModalComponents/ModalTemplate/PaymentProcessModal";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import { usePaymentProcess } from '@/hook/Admin/BillingAndPayments/PaymentProcess';

export const PaymentProcess = () => {
  const {
    data,
    loading,
    isModalOpen,
    onSearch,
    onEdit,
    onViewDetails,
    onPayment,
    setIsModalOpen,
  } = usePaymentProcess();

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

  return (
    <>
      <NHCard
        title={"Billing Details"}
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

      <PaymentProcessModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        // paymentData={record}
      />
    </>
  );
};
