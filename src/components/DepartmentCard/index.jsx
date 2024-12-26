import React from 'react'
import { NHCard, NHTable } from '..'

const columns = [
  {
    title: 'Department Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Patient Count',
    dataIndex: 'count',
    key: 'count',
    render: (count) => (
      <span>
        <span style={{ color: '#4CAF50', marginRight: '4px' }}>👤</span>
        {count}
      </span>
    ),
  },
]

export const DepartmentCard = ({ title, departments }) => {
  return (
    <NHCard title={title}>
      <NHTable 
        columns={columns} 
        dataSource={departments} 
      />
    </NHCard>
  )
}
