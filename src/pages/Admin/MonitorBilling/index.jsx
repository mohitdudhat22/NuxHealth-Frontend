import { useBillingAndPayments } from '@/hook/Admin/BillingAndPayments';
import { Space, Tag } from 'antd';
import { NHButton, NHCard, NHInput, NHTable } from '@/components';
import Icons from '@/constants/icons';

export const MonitorBilling = () => {
  const {
    bills,
    loading,
    data,
    fetchBills,
    navigate
  } = useBillingAndPayments();

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
      render: (_, record) => (
        <Space size="middle">
          <NHButton
            type="primary"
            size="small"
            icon={Icons.View}
            className="bg-white view-btn border-primary"
            onClick={() => navigate(`/view-bill/${record.key}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <NHCard title="Billing and Payments" headerContent={
      <>
        <NHInput prefix={Icons.SearchIcon} placeholder="Search" />
        <NHButton icon={Icons.PlusSquare} onClick={() => navigate("/create-bill")} variant="primary">
          Add New Bill
        </NHButton>
      </>
    }>
      <NHTable loading={loading} tableColumn={columns} tableDataSource={data} />
    </NHCard>
  );
};
