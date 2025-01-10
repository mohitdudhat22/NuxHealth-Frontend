import {
  useBillingAndPayments,
  usePendingBills,
} from "@/hook/Admin/BillingAndPayments";
import { Space, Tag } from "antd";
import {
  AppointmentCard,
  NHButton,
  NHCard,
  NHHead,
  NHInput,
  NHTable,
} from "@/components";
import Icons from "@/constants/icons";
import "./Billing.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const MonitorBilling = () => {
  const { loading, data, onSearch } = useBillingAndPayments();
  const navigate = useNavigate();

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
      render: (time) => <Tag color={time === "#F6F8FB"}>{time}</Tag>,
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
                `/admin/monitor-billing/bill-view/${record.billNumber}`,
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
      <div className="monitor_billing_sec">
        <NHHead />
        <NHCard
          title="Monitor Billing"
          headerContent={
            <>
              <NHInput
                prefix={Icons.SearchIcon}
                placeholder="Search"
                onChange={(e) => onSearch(e.target.value)}
              />
              <NHButton
                variant="default"
                className="bg-white border-primary"
                onClick={() => navigate("edit-design-invoice")}
              >
                {Icons.EditBillIcon}Edit Invoice Theme
              </NHButton>
              <NHButton
                icon={Icons.PlusSquare}
                onClick={() => navigate("/admin/monitor-billing/create-bill")}
                variant="primary"
              >
                Create Bill
              </NHButton>
            </>
          }
        >
          <NHTable
            loading={loading}
            tableColumn={columns}
            tableDataSource={data}
            showPagination={true}
          />
        </NHCard>
      </div>
    </>
  );
};

// PLEASE DONT DELETE THIS CODE AS IT WILL BE USED IN FUTURE FOR REFERENCE PURPOSE

// export const MonitorBilling = () => {
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [viewingPatientDetails, setViewingPatientDetails] = useState(null);

//   const { bills, loading, error } = usePendingBills();

//   const pendingBills = bills || [];

//   const handlePatientDetails = (bill) => {
//     setViewingPatientDetails(bill);
//   };

//   const handleBackToAppointments = () => {
//     setViewingPatientDetails(null);
//   };

//   return (
//     <NHCard
//       title="Pending Bills (50)">
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {pendingBills.map((bill, index) => (
//           <AppointmentCard
//             headerBg={true}
//             key={index}
//             title={
//               <>
//                 Bill No:{bill.billNumber}
//               </>
//             }
//             headerContent={
//               <>
//                 <span
//                   onClick={() => handlePatientDetails(bill)}
//                   className="cursor-pointer"
//                 >
//                   {Icons.ViewBillIcon}
//                 </span>
//               </>
//             }
//             billNo={bill.billNo}
//             billDate={bill.billDate}
//             patientName={bill.patientName}
//             patientPhoneNumber={bill.phoneNumber}
//             className="border border-slate-200"
//           />
//         ))}
//       </div>
//     </NHCard>
//   );
// };
