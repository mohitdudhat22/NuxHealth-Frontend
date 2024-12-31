import { getbill } from "@/axiosApi/ApiHelper"
import { NHButton, NHCard, NHInput, NHTable } from "@/components"
import Icons from "@/constants/icons"
import { Space, Tag } from "antd"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const useBillingAndPayments = () => {
  const navigate = useNavigate();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      setLoading(true);
      const response = await getbill();
      if (response.status === 1) {
        setBills(response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);


  const defaultColumns = [
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
      render: (_, record) =>
        <Space size="middle">
          <NHButton
            type="primary"
            size="small"
            icon={Icons.ViewBillIcon}
            className="bg-white view-btn border-primary"
            onClick={() => navigate("view-bill")}
          />
         
        </Space>
    },
  ];


  const defaultData = [
    {
      key: "1",
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      action: "View",
    },
    {
      key: "2",
      billNumber: "5654",
      patientName: "Talan Press",
      diseaseName: "Conjunctivitis",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "25 Jan, 2022",
      time: "4:30 PM",
      action: "View",
    },
    // Add more rows as needed
  ];

  return {
    bills,
    loading,
    defaultColumns,
    defaultData,
    navigate
  }
}