import React, { useState } from "react";
import { NHButton, NHCard, NHTable } from "..";
import { Space } from "antd";
import Icons from "@/constants/icons";
export const BillingCard = ({ data }) => {
  const [loading, setLoading] = useState(true);

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
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <NHButton
            type="primary"
            size="small"
            icon={Icons.ViewBillIcon}
            onClick={() => handleViewBill(record)}
            className="view-btn bg-white"
          />
        </Space>
      ),
    },
  ];

  return (
    <NHCard
      title={"Billing & Payments"}
      headerContent={<NHButton>Create Bill</NHButton>}
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
        route="/admin"
        defaultPageSize="5"
        scroll={{
          y: "220px",
          // x: "600px",
        }}
      />
    </NHCard>
  );
};
