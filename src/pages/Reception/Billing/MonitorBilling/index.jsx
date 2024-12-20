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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBills = async () => {
      setLoading(true);
      const response = await ReceptionistGetBill();
      console.log(response)
      if (response.data) {
        setBills(response.data);
      }
      setLoading(false);
    };
    fetchBills();
  }, []);

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
            <table className="min-w-full table-auto">
              <thead className="sticky top-0 bg-gray-100 z-10">
                <tr>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tl-lg">
                    Bill Number
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Patient Name
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Doctor Name
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Description
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 px-7 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Status
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Date
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Time
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                    Total Amount
                  </th>
                  <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" className="p-3 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : bills?.length > 0 ? (
                  bills?.map((bill) => (
                    <tr key={bill._id} className="border-b">
                      <td className="text-center p-3 flex justify-center">
                        <h3 className="p-2 bg-[#F6F8FB] rounded-full text-[#718EBF] font-semibold new-xxl:w-[50%] new-xl:w-[60%] new-lg:w-[70%] new-xxl:text-lg new-lg:text-base new-xl:text-base">
                          {bill.billNumber}
                        </h3>
                      </td>
                      <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg new-lg:text-base new-xl:text-base font-semibold">
                        {bill.patientId
                          ? bill.patientId.firstName +
                          " " +
                          bill.patientId.lastName
                          : "N/A"}
                      </td>
                      <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                        {bill.doctorId ? bill.doctorId.name : "N/A"}
                      </td>
                      <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                        {bill.description}
                      </td>
                      <td
                        className={`new-xxl:p-3 new-lg:p-1 new-xl:p-2 ${bill.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "text-[#E11D29]"
                          } rounded-full text-center m-3`}
                      >
                        <h3 className="bg-red-100 p-2 rounded-full text-center new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                          {bill.status}
                        </h3>
                      </td>
                      <td className="p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                        {new Date(bill.date).toLocaleDateString()}
                      </td>
                      <td className="p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                        <h3 className="p-2 bg-[#F6F8FB] rounded-full text-[#718EBF] font-semibold new-xxl:w-[90%] new-xl:w-[80%] new-lg:w-[88%] text-center">
                          {bill.time}
                        </h3>
                      </td>
                      <td className="p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                        <h3 className="p-2 bg-[#F6F8FB] rounded-full text-[#718EBF] font-semibold new-xxl:w-[90%] new-xl:w-[80%] new-lg:w-[70%] text-center">
                          ${bill.totalAmount.toFixed(2)}
                        </h3>
                      </td>
                      <td className="action p-2 flex justify-center">
                        <div
                          className="view text-blue-400 bg-gray-100 rounded-lg text-center cursor-pointer new-xxl:w-10 new-xxl:h-10 new-lg:w-7 new-lg:h-7 new-xl:w-8 new-xl:h-8 flex items-center justify-center text-[#4F4F4F] text-lg font-semibold"
                          onClick={() =>
                            navigate(billUrl(selectedInvoice, bill))
                          }
                        >
                          <FaEye />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="p-3 text-center">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <HMTable loading={loading} columns={bills} data={bills} />
          </div>
        </div>
      </div>
    </div>

  )
}

