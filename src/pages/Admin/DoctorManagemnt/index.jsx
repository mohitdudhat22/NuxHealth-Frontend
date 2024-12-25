import { NHButton, NHCard, NHInput, NHOffcanvas, NHTable } from '@/components'
import Icons from '@/constants/icons'
import { Space, Tag } from 'antd/lib';
import React, { useState } from 'react'

export const DoctorManagement = () => {

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Working Time",
      dataIndex: "workingTime",
      key: "workingTime",
      render: (plan) => (
        <Tag color={"blue"}>
          {plan}
        </Tag>
      ),
    },
    {
      title: "Patient Check Up Time",
      dataIndex: "patientCheckUpTime",
      key: "patientCheckUpTime",
      render: (plan) => (
        <Tag color={"blue"}>
          {plan}
        </Tag>
      ),
    },
    {
      title: "Break Time",
      dataIndex: "breakTime",
      key: "breakTime",
      render: (plan) => (
        <Tag color={"blue"}>
          {plan}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NHButton type="primary" variant="secondary" size="small" icon={Icons.EditIcon} className="bg-white edit-btn" />
          <NHOffcanvas
            visible={isDrawerVisible}
            onOpen={openDrawer}
            onClose={closeDrawer}
            title="Doctor Management"
            placement="right"
            width={563}
            triggerButtonText=""
            icon={Icons.ViewIcon}
            variant={"secondary"}
            triggerButtonProps={{ type: "dashed" }}
            drawerProps={{ closable: true }}
          >
            <div className="p-4 bg-white rounded-lg shadow-lg">
              {/* Header Section */}
              <div className="flex items-center gap-4 p-4 rounded-t-lg bg-gradient-to-r from-blue-600 to-blue-400">
                <img
                  src="https://via.placeholder.com/80"
                  alt="Doctor"
                  className="w-20 h-20 border-2 border-white rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">Dr. Cristofer Pasquinades</h3>
                  <p className="text-blue-100">Male</p>
                </div>
                <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-md">
                  Onsite
                </span>
              </div>

              {/* Details Section */}
              <NHCard rootClass={'p-1'} >
                <div className="p-8 my-8 bg-slate-100 rounded-2xl">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Doctor Qualification</p>
                      <p className="text-2xl font-medium text-black">MBBS</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Years Of Experience</p>
                      <p className="text-2xl font-medium text-black">6+ Year</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Specialty Type</p>
                      <p className="text-2xl font-medium text-black">Obstetrics and Gynecology</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Working Time</p>
                      <p className="text-2xl font-medium text-black">6 Hour</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Patient Check Up Time</p>
                      <p className="text-2xl font-medium text-black">2 Hour</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Break Time</p>
                      <p className="text-2xl font-medium text-black">1 Hour</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-medium text-[#A7A7A7]">Description</p>
                    <p className="text-2xl font-medium text-black">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit.
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-medium text-[#A7A7A7]">Signature</p>
                    <div className="p-4 border border-none rounded-md">
                      <img
                        src="https://via.placeholder.com/150x50"
                        alt="Signature"
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              </NHCard>

              {/* Additional Information Section */}
              <NHCard rootClass={'p-1'} >
                <div className="p-8 rounded-2xl bg-slate-100 bg-gray-50">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Age</p>
                      <p className="text-2xl font-medium text-black">36 Years</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Email</p>
                      <p className="text-2xl font-medium text-black">kenzi.lawson@example.com</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Phone</p>
                      <p className="text-2xl font-medium text-black">89564 25462</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Online Consultation Rate</p>
                      <p className="text-2xl font-medium text-black">₹ 1,000</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Country</p>
                      <p className="text-2xl font-medium text-black">India</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">State</p>
                      <p className="text-2xl font-medium text-black">Gujarat</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">Zip Code</p>
                      <p className="text-2xl font-medium text-black">382002</p>
                    </div>
                    <div>
                      <p className="text-2xl font-medium text-[#A7A7A7]">City</p>
                      <p className="text-2xl font-medium text-black">Gandhinagar</p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-2xl font-medium text-[#A7A7A7]">Address</p>
                      <p className="text-2xl font-medium text-black">
                        B-105 Virat Bungalows Punagam Motavaracha Jamnagar.
                      </p>
                    </div>
                  </div>
                </div>
              </NHCard>
            </div>
          </NHOffcanvas>
          <NHButton type="primary" variant="secondary" size="small" icon={Icons.DeleteIcon} className="bg-white edit-btn" />
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      doctorName: "Dr. Marcus Philaips",
      gender: "Male",
      qualification: "MBBS",
      specialty: "Cardiologist",
      workingTime: "6 hours",
      patientCheckUpTime: "4 hours",
      breakTime: "1 hour",
    },
  ];

  const [isDrawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <NHCard title="Doctor Management" headerContent={
      <>
        <NHInput suffix={Icons.SerachIcon} placeholder={"Search"} />
        <NHButton onClick={() => setVisible(true)} variant={"primary"}>Add New Doctor</NHButton>
      </>
    }>
      <NHTable tableColumn={columns} tableDataSource={data} />
    </NHCard >
  )
}
