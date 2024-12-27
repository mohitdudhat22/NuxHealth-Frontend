import React from 'react'
import { NHCard } from '..'

export const DepartmentCard = ({ title, departments, icon, type="patient" }) => {
  return (
    <NHCard title={title}>
      <div className="space-y-4">
        {departments.map((dept) => (
          <div key={dept.key} className="flex justify-between items-center">
            <span className="text-gray-700">{dept.name}</span>
            <div className="w-12 h-12 flex items-center justify-center">
                    {icon}
                </div>
          </div>
        ))}
      </div>
    </NHCard>
  )
}
