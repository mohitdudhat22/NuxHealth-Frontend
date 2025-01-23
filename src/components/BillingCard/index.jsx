import React, { useState } from "react";
import { NHButton, NHCard, NHTable } from "..";
import Icons from "@/constants/icons";
import { useNavigate } from "react-router-dom";

export const BillingCard = ({ data, userRole }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Bill ID",
      dataIndex: "billsNo",
      key: "billsNo",
    },
    {
      title: "Patient Name",
      dataIndex: "patientName",
      key: "patientName",
    },
    {
      title: "Condition",
      dataIndex: "diseaseName",
      key: "diseaseName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      render: (_, record) => (
        <NHButton
          isView
          onClick={() => {
            const route =
              userRole === "admin"
                ? `/admin/monitor-billing/bill-view/${record?.billsNo}`
                : `/reception/bills/bill-view/${record?.billsNo}`;
            navigate(route, { state: { billData: record } });
          }}
        />
      ),
    },
  ];

  const getCreateBillRoute = () => {
    if (userRole === "admin") {
      return "/admin/monitor-billing/create-bill";
    } else if (userRole === "reception") {
      return "/reception/bills/create-bill";
    }
    return "/"; // Default route if user role is not recognized
  };

  return (
    <NHCard
      title={"Billing & Payments"}
      // headerContent={
      //   <NHButton
      //     icon={Icons?.PlusSquare}
      //     onClick={() => navigate(getCreateBillRoute())}
      //     variant="primary"
      //   >
      //     Create Bill
      //   </NHButton>
      // }
    >
      <div className="mb-4">
        <p className="text-xl text-[#030229] font-semibold">
          Pending Bills: <span className="text-red-500">50</span>
        </p>
      </div>
      <NHTable
        loading={loading}
        showPagination={true}
        columns={columns}
        dataSource={data}
        defaultPageSize="5"
        scroll={{
          x: 500,
          y: 300,
        }}
      />
    </NHCard>
  );
};
