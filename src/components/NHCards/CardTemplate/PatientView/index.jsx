import { NHButton } from '@/components'
import Icons from '@/constants/icons'
import React from 'react'

export const PatientView = () => {
  return (
    <div className='p-6 bg-white rounded-xl'>
      <div className="flex items-center justify-between py-3">
        <div className="title">
          <p className='text-[#030229] text-[26px] font-bold'>Patient Details</p>
        </div>

        <div className="edit-btn">
          <NHButton
            type="primary"
            size="small"
            icon={Icons.EditBillIcon}
          >
            Edit Profile
          </NHButton>
        </div>
      </div>

      <div className="flex items-center justify-between flex-1 pb-3 bottom pt-9">
        <div className="img w-[22%] pl-3">
          <div className="img-box w-[150px] h-[150px] bg-[#D9D9D9] rounded-full border border-[#DFE0EB]">
            <img src="https://i.pravatar.cc/300" alt="" className='w-[150px] rounded-full' />
          </div>
        </div>

        <div className="grid grid-cols-7 details gap-y-6">
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Name</span>
            <p className='text-[#141414] text-[18px] font-normal	'>Marcus Philips</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Number</span>
            <p className='text-[#141414] text-[18px] font-normal	'>99130 44537</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Email</span>
            <p className='text-[#141414] text-[18px] font-normal	'>John@gmail.com</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Gender</span>
            <p className='text-[#141414] text-[18px] font-normal	'>Male</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>DOB</span>
            <p className='text-[#141414] text-[18px] font-normal	'>2 Jan, 2022</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Age</span>
            <p className='text-[#141414] text-[18px] font-normal	'>20 Years</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Blood Group</span>
            <p className='text-[#141414] text-[18px] font-normal	'>B+</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Height (cm)</span>
            <p className='text-[#141414] text-[18px] font-normal	'>160</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Weight (Kg)</span>
            <p className='text-[#141414] text-[18px] font-normal	'>50</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Country</span>
            <p className='text-[#141414] text-[18px] font-normal	'>India</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>State</span>
            <p className='text-[#141414] text-[18px] font-normal	'>Gujarat</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>City</span>
            <p className='text-[#141414] text-[18px] font-normal	'>Ahmedabad</p>
          </div>
          <div className="">
            <span className='text-[#A7A7A7] text-[20px] font-medium	'>Address</span>
            <p className='text-[#141414] text-[18px] font-normal	'>B-408 Swastik society, mota varacha rajkot.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
