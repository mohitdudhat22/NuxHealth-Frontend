// import "../billPayment/insuranceClaims.css";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useGlobal } from "../../hooks/useGlobal";

export default function InsuranceClaims() {
  const navigate = useNavigate();
  const { getBills, allBills } = useGlobal();
  const [searchQuery, setSearchQuery] = useState("");
  const [claimsData, setClaimsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        await getBills();
      } catch (err) {
        setError("Failed to fetch claims data");
        toast.error("Failed to fetch claims data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  useEffect(() => {
    const insuranceClaims = allBills.filter(
      (bill) => bill.paymentType === "Insurance",
    );
    setClaimsData(insuranceClaims);
  }, [allBills]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredClaims = claimsData.filter(
    (claim) =>
      claim.patientId?.firstName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      claim.doctorId?.firstName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      claim.diseaseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      claim.insuranceId?.insuranceCompany
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      claim.insuranceId?.insurancePlan
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="insurance-section p-3">
      <div className="row">
        <div className="main bg-white rounded-lg p-4 h-full mx-2">
          <div className="top flex justify-between items-center pb-5">
            <div className="heading font-bold new-xxl:text-2xl new-xl:text-xl new-lg:text-lg">
              <h3>Insurance Claims</h3>
            </div>
            <div className="search-btn flex">
              <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-80">
                <div className="text-xl text-gray-700">
                  <CiSearch />
                </div>
                <input
                  type="text"
                  placeholder="Search Doctor"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent pl-2 text-lg outline-none"
                />
              </div>
            </div>
          </div>
          <div
            className="pr-data h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
            style={{ maxHeight: "calc(100vh - 260px)" }}
          >
            {loading ? (
              <div className="loading text-center">Loading claims...</div>
            ) : error ? (
              <div className="error text-center">{error}</div>
            ) : (
              <table className="min-w-full table-auto">
                <thead className="sticky top-0 bg-gray-100 z-10">
                  <tr>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tl-lg">
                      Bill Number
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Doctor Name
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Patient Name
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Disease Name
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Insurance Company
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Insurance Plan
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold">
                      Bill Date
                    </th>
                    <th className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center  new-xxl:text-lg new-lg:text-sm new-xl:text-base font-semibold rounded-tr-lg">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim, index) => (
                      <tr key={index} className="border-b">
                        <td className="time p-2 text-center">
                          <h3 className="p-2 bg-[#F6F8FB] rounded-full text-[#718EBF] font-semibold new-xxl:w-[50%] new-xl:w-[60%] new-lg:w-[70%] new-xxl:text-lg new-lg:text-base new-xl:text-base">
                            {claim.billNumber}
                          </h3>
                        </td>
                        <td className="new-xxl:p-3 new-lg:p-4 new-xl:p-2 flex items-center space-x-4">
                          <div className="avatar">
                            <img
                              src={claim?.doctorId?.avatar || "/img/Avatar.png"}
                              alt="Avatar"
                              className="ew-xxl:w-[40px] new-xxl:h-[40px] new-lg:w-[30px] new-lg:h-[30px] new-xl:w-[30px] new-xl:h-[30px] rounded-full mr-2"
                            />
                          </div>
                          <div className="name">
                            <h3 className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                              {claim.doctorId?.name || "N/A"}
                            </h3>
                          </div>
                        </td>
                        <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg new-lg:text-base new-xl:text-base font-semibold">
                          {claim.patientId
                            ? `${claim.patientId.firstName} ${claim.patientId.lastName}`
                            : "N/A"}
                        </td>
                        <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                          {claim.diseaseName || "N/A"}
                        </td>
                        <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                          {claim.insuranceId?.insuranceCompany || "N/A"}
                        </td>
                        <td className="new-xxl:p-3 new-lg:p-1 new-xl:p-2 text-center text-[#4F4F4F]  font-semibold">
                          <h3 className="bg-gray-100 text-[#718EBF] rounded-full py-1 px-3 inline-block  new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                            {claim.insuranceId?.insurancePlan || "N/A"}
                          </h3>
                        </td>
                        <td className="p-2 text-center text-[#4F4F4F] new-xxl:text-lg font-semibold new-lg:text-base new-xl:text-base">
                          {formatDate(claim.date)}
                        </td>
                        <td className="action p-2 text-center font-semibold">
                          <div
                            className="view ttext-blue-400 bg-gray-100 rounded-lg text-center cursor-pointer new-xxl:w-10 new-xxl:h-10 new-lg:w-7 new-lg:h-7 new-xl:w-8 new-xl:h-8 flex items-center justify-center text-[#0EABEB] text-base font-semibold"
                            onClick={() => navigate(`/bill/${claim._id}`)}
                          >
                            <FaEye />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-center p-3">
                        No claims found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
