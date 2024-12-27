import Icons from '@/constants/icons'
import React from 'react'

export const CounterCard = ({ 
  title = "Total Doctors",
  count = 0,
  icon = Icons.CreateBillIcon,
  iconBgColor = "#5e5e9e26" 
}) => {
  return (
    <div className="counter-card w-[32%] bg-white rounded-lg p-4">
      <div className="content flex items-center">
        <div 
          className="logo new-xxl:w-[60px] new-xxl:h-[60px] new-xl:w-[40px] new-xl:h-[40px] new-lg:w-[30px] new-lg:h-[30px] rounded-full flex justify-center items-center"
          style={{ backgroundColor: iconBgColor }}
        >
          {icon}
        </div>
        <div className="details pl-4">
          <p className="text-[#A7A7A7] new-xxl:text-[18px] new-xl:text-[13px] new-lg:text-[10px] font-normal">
            {title}
          </p>
          <span className="block text-[#030229] new-xxl:text-[30px] new-xl:text-[25px] new-lg:text-[22px] font-extrabold">
            {count}
          </span>
        </div>
      </div>
    </div>
  )
}
