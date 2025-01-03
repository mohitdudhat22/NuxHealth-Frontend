import React from 'react'
import { NHCard } from '..'
import { Empty } from 'antd'

export const DepartmentCard = ({ title, departments, icon, image, discrition, type="patient" }) => {
  return (
    <NHCard title={title}>
      {departments.length === 0 ? ( // Check if departments array is empty
        <div className="flex items-center justify-center w-full h-full">
          <Empty
            image={image}
            className='h-full'
            description={discrition}
          />
        </div>
      ) : (
        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.key} className="flex justify-between items-center">
              <span className="text-gray-700">{dept.name}</span>
              <div className="w-12 h-12 flex items-center justify-center">
                {icon} {dept.count}
              </div>
            </div>
          ))}
        </div>
      )}
    </NHCard>
  )
}
