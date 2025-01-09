import { NHButton, NHCard, NHHead, NHInput, NHTable } from "@/components";
import { PaymentProcessModal } from "@/components/NHModalComponents/ModalTemplate/PaymentProcessModal";
import Icons from "@/constants/icons";
import { Space, Tag } from "antd";
import "./PaymentProcess.css";
import { usePaymentProcess } from "@/hook/Admin/BillingAndPayments/PaymentProcess";
import { useNavigate } from "react-router-dom";
import { CashPaymentModal } from "@/components/CashPaymentModal/CashPaymentModal";
import { useState } from "react";

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

  const navigate = useNavigate();

  const [isCashPaymentModalOpen, setIsCashPaymentModalOpen] = useState(false);

  const handleCashPayment = (record) => {
    setIsCashPaymentModalOpen(true);
    // You can also set any record-specific data here if needed
  };

  const handlePay = () => {
    // Handle the payment logic here
    console.log("Payment processed");
    setIsCashPaymentModalOpen(false);
  };

  const columns = [
    {
      title: "Bill Number",
      dataIndex: "billNumber",
      key: "billNumber",
      render: (billNumber) => (
        <Tag color={billNumber === "#F6F8FB"}>{billNumber}</Tag>
      ),
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
      render: (time) => (
        <Tag color={time === "#F6F8FB"}>{time}</Tag>
      ),
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
            onClick={() =>
              navigate(`/admin/payment-process/edit-bill`, { state: { record: record } })
            }
          />
          <NHButton
            type="primary"
            size="small"
            icon={Icons.ViewBillIcon}
            className="view-btn bg-white"
            onClick={() =>
              navigate(`/admin/payment-process/bill-view/${record.billNumber}`, { state: { billData: record } })
            }
          />
          <NHButton
            type="default"
            size="small"
            icon={Icons.PaymentIcon}
            className="lock-btn bg-white"
            onClick={() => handleCashPayment(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
    <div className="payment_process_sec">
      <NHHead title="Payment Process" />
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
        <NHTable
          loading={loading}
          showPagination={true}
          tableColumn={columns}
          tableDataSource={data}
        />
      </NHCard>

      <PaymentProcessModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        // paymentData={record}
      />

<CashPaymentModal
          open={isCashPaymentModalOpen}
          handleClose={() => setIsCashPaymentModalOpen(false)}
          handlePay={handlePay}
        />
      </div>
    </>
  );
};
