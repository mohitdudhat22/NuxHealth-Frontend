import React from 'react';
import { NHButton, NHCard, NHTable } from '..';
import { Space } from 'antd';
import Icons from '@/constants/icons';
export const BillingCard = () => {
  const bills = [
    { id: '5614', patientName: 'David Watson', condition: 'Colds and Flu', status: 'Paid' },
    { id: '5614', patientName: 'James George', condition: 'Colds and Flu', status: 'Unpaid' },
    { id: '5614', patientName: 'Craig Tyrell', condition: 'Allergies', status: 'Paid' },
  ];

  const columns = [
    {
      title: 'Bill ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Patient Name',
      dataIndex: 'patientName',
      key: 'patientName',
    },
    {
      title: 'Condition',
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    
    {
      title: "Action",
      key: "action",
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
    <NHCard title={'Billing & Payments'} headerContent={<NHButton>Create Bill</NHButton>}>    
      <div className="mb-4">
        <p className="text-xl text-gray-500">
          Pending Bills: <span className="text-red-500">50</span>
        </p>
      </div>
      <NHTable columns={columns} dataSource={bills} />
    </NHCard>
  );
}; 