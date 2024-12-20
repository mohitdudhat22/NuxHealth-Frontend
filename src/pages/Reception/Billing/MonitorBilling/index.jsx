import { ReceptionistGetBill } from "@/axiosApi/ApiHelper"
import { HMTable } from "@/components"
import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { FaEye } from "react-icons/fa"
import { MdAdd } from "react-icons/md"
import { RiEditBoxFill } from "react-icons/ri"
import { useNavigate } from "react-router-dom"

export const MonitorBilling = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [currentRow, setCurrentRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      const response = await ReceptionistGetBill();
      if (response.data) {
        setBills(response.data);
      }
      setLoading(false);
    };
    fetchBills();
  }, []);

  const columns = [
    {
      headerName: "Bill Number",
      accessor: "billNumber",
    },
    {
      headerName: "Patient Name",
      accessor: "patientId",
      Cell: ({ value }) => (value ? `${value.firstName} ${value.lastName}` : "N/A"),
    },
    {
      headerName: "Doctor Name",
      accessor: "doctorId",
      Cell: ({ value }) => (value ? value.name : "N/A"),
    },
    {
      headerName: "Description",
      accessor: "description",
    },
    {
      headerName: "Status",
      accessor: "status",
    },
    {
      headerName: "Date",
      accessor: "date",
      Cell: ({ value }) => new Date(value).toLocaleDateString(),
    },
    {
      headerName: "Time",
      accessor: "time",
    },
    {
      headerName: "Total Amount",
      accessor: "totalAmount",
      Cell: ({ value }) => value.toFixed(2),
    },
    {
      headerName: "Action",
      accessor: "_id",
      Cell: ({ row }) => {
        return (
          <div
            className="view text-blue-400 bg-gray-100 rounded-lg text-center cursor-pointer new-xxl:w-10 new-xxl:h-10 new-lg:w-7 new-lg:h-7 new-xl:w-8 new-xl:h-8 flex items-center justify-center text-[#4F4F4F] text-lg font-semibold"
            onClick={() => navigate(`/reception/bill/${row._id}`)}  // Navigation action
          >
            <FaEye />
          </div>
        );
      },
    },
  ];

  return (
    <div className="monitor-section bg-gray-100 p-2">
      <div className="row">
        <div className="main bg-white rounded-lg p-3 h-full">
          {/* Top Section */}
          <div className="top flex justify-between items-center pb-5">
            <div className="heading font-bold new-xxl:text-2xl new-xl:text-xl new-lg:text-lg">
              <h3>Monitor Billing</h3>
            </div>
            <div className="search-btn flex items-center">
              {/* Search Input */}
              <div className="search-btn flex">
                <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 new-xxl:w-[320px] new-xl:w-[300px] new-lg:w-[280px]">
                  <div className="text-xl text-gray-700">
                    <CiSearch />
                  </div>
                  <input
                    type="text"
                    placeholder="Search Doctor"
                    // value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent pl-2 text-lg outline-none"
                  />
                </div>
              </div>
              {/* Edit Button */}
              <button
                className="edit-btn flex items-center bg-transparent border border-[#0EABEB] rounded-lg new-xxl:px-3 new-xl:px-2 new-lg:px-2 py-2 ml-3"
                onClick={() => navigate("editinvoice")}
              >
                <div className="icon bg-white text-[#0EABEB] rounded-sm px-1 new-xxl:text-xl new-xl:text-lg new-lg:text-md mr-2">
                  <RiEditBoxFill />
                </div>
                <div className="text text-[#0EABEB] font-semibold new-xxl:text-lg new-xl:text-md new-lg:text-md">
                  Edit Design Invoice
                </div>
              </button>
              {/* Add Button */}
              <button
                className="btn flex items-center bg-[#0EABEB] rounded-lg px-4 py-2 ml-3"
                onClick={() => navigate("createbill")}
              >
                <div className="icon bg-white text-blue-400 rounded-sm w-5 h-5 text-xl mr-2">
                  <MdAdd />
                </div>
                <div className="text text-white font-semibold text-lg">
                  Create Bills
                </div>
              </button>
            </div>
          </div>
          {/* Data Table */}
          <div
            className="pr-data h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
            style={{ maxHeight: "calc(100vh - 170px)" }}
          >
            <HMTable loading={loading} column={columns} data={bills} pagination={true} />
          </div>
        </div>
      </div>
    </div>

  )
}

