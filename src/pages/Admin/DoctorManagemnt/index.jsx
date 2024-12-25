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
          <NHButton type="primary" variant="secondary" size="small" icon={Icons.Dashboard} className="bg-white edit-btn" />
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
        {/* <NHButton onClick={() => setVisible(true)} variant={"primary"}>Add New Doctor</NHButton> */}
        <NHOffcanvas
          visible={isDrawerVisible}
          onOpen={openDrawer}
          onClose={closeDrawer}
          title="Doctor Management"
          placement="right"
          width={400}
          triggerButtonText="Add New Doctor"
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
            <div className="p-4 my-8 bg-slate-100 rounded-2xl">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Doctor Qualification</p>
                  <p className="font-semibold">MBBS</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Years Of Experience</p>
                  <p className="font-semibold">6+ Year</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Specialty Type</p>
                  <p className="font-semibold">Obstetrics and Gynecology</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Working Time</p>
                  <p className="font-semibold">6 Hour</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Patient Check Up Time</p>
                  <p className="font-semibold">2 Hour</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Break Time</p>
                  <p className="font-semibold">1 Hour</p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              </div>

              <div className="mt-4">
                <p className="text-sm font-medium text-gray-500">Signature</p>
                <div className="p-4 border border-gray-300 rounded-md">
                  <img
                    src="https://via.placeholder.com/150x50"
                    alt="Signature"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information Section */}
            <div className="p-4 rounded-2xl bg-slate-100 bg-gray-50">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Age</p>
                  <p className="font-semibold">36 Years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="font-semibold">kenzi.lawson@example.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="font-semibold">89564 25462</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Online Consultation Rate</p>
                  <p className="font-semibold">₹ 1,000</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Country</p>
                  <p className="font-semibold">India</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">State</p>
                  <p className="font-semibold">Gujarat</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Zip Code</p>
                  <p className="font-semibold">382002</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">City</p>
                  <p className="font-semibold">Gandhinagar</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="font-semibold">
                    B-105 Virat Bungalows Punagam Motavaracha Jamnagar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </NHOffcanvas>
      </>
    }>
      <NHTable tableColumn={columns} tableDataSource={data} />
    </NHCard >
  )
}
