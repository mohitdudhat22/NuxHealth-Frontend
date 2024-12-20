export const BillOne = ({
  billData,
}) => {
  return (
    <div className=" p-3 h-[92%]">
      <div className="max-w-3xl mx-auto bg-white dark:bg-card rounded-lg shadow-lg">
        {/* Header - Adjusted image sizes and spacing */}
        <div className="flex justify-between items-center mb-2 sm:ps-6 new-lg:p-3 gap-4 sm:flex-row new-sm:flex-nowrap">
          <div className="w-1/2 sm:w-[100px] new-lg:w-[200px]">
            <img
              src="/img/logo.png"
              className="h-auto object-contain"
              alt="Logo"
              width="100%"
              height="auto"
            />
          </div>
          <div className="w-1/2 sm:w-[100px] new-lg:w-[200px]">
            <img
              src="/img/invoice.png"
              className="w-full h-auto object-contain"
              alt="Invoice"
            />
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Doctor and Bill Info */}
          <div className="grid grid-cols-1 new-sm:grid-cols-2 gap-4">
            <div>
              <p className="font-medium text-lg sm:text-2xl text-[#141414]">
                Dr.{billData?.doctorId?.name}
              </p>
              <p className="text-[#818194] text-sm mt-2">
                {billData?.description}
              </p>
            </div>
            <div className="text-left sm:text-right sm:mt-0">
              <p className="text-[#818194] mb-1">
                <strong className="text-[#141414]">Bill No:</strong>{" "}
                {billData?.billNumber}
              </p>
              <p className="text-[#818194] mb-1">
                <strong className="text-[#141414]">Bill Date:</strong>{" "}
                {new Date(billData?.createdAt).toLocaleDateString()}
              </p>
              <p className="text-[#818194]">
                <strong className="text-[#141414]">Bill Time:</strong>{" "}
                {billData?.time}
              </p>
            </div>
          </div>

          {/* Patient Info */}
          <div className="mt-6 bg-[#f6f8fb] p-3 rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 new-sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-[#818194] text-sm">
                  <strong className="text-[#141414] text-base me-2">
                    Name:
                  </strong>
                  {`${billData?.patientId?.firstName || "N/A"} ${billData?.patientId?.lastName || ""}`}
                </p>
                <p className="text-[#818194] text-sm">
                  <strong className="text-[#141414] text-base me-2">
                    Gender:
                  </strong>
                  {billData?.patientId?.gender || "N/A"}
                </p>
                <p className="text-[#818194] text-sm">
                  <strong className="text-[#141414] text-base me-2">
                    Age:
                  </strong>
                  {billData?.patientId?.age || "N/A"} Years
                </p>
                <p className="text-[#818194] text-sm">
                  <strong className="text-[#141414] text-base me-2">
                    Address:
                  </strong>
                  {billData?.patientId?.address || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[#818194] text-sm">
                  <strong className="text-[#141414] text-base me-2">
                    Disease:
                  </strong>
                  {billData?.diseaseName}
                </p>
                <p className="text-[#818194] text-sm">
                  <strong className="text-[#141414] text-base me-2">
                    Phone:
                  </strong>
                  {billData?.patientId?.phone || "NA"}
                </p>
                <p className="text-[#818194] text-sm">
                  <strong className="text-[#141414] text-base me-2">
                    Payment:
                  </strong>
                  {billData?.paymentType}
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full">
              <thead>
                <tr className="bg-[#0EABEB] text-white">
                  <th className="px-2 sm:px-4 py-2 text-sm sm:text-base rounded-tl-lg">
                    Description
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">
                    Amount
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-sm sm:text-base">
                    Qty.
                  </th>
                  <th className="px-2 sm:px-4 py-2 text-sm sm:text-base rounded-tr-lg">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-2 sm:px-4 py-2 text-[#4F4F4F] text-sm">
                    {billData?.medicineDescription}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-[#4F4F4F] text-sm">
                    ₹{(billData?.medicineQtyAmount || 0).toFixed(2)}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-[#4F4F4F] text-sm">
                    {billData?.medicineQty}
                  </td>
                  <td className="px-2 sm:px-4 py-2 text-[#141414] text-sm">
                    ₹{(billData?.medicineQtyAmount * 1 || 0).toFixed(2)}
                  </td>
                </tr>
                {/* Additional rows similar to above */}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
            <div className="space-y-2">
              {billData?.paymentType == "Insurance" ? (
                <p className="text-[#818194] text-sm font-semibold">
                  <strong className="text-[#141414] text-base">
                    Insurance Company:
                  </strong>{" "}
                  {billData?.insuranceId?.insuranceCompany}
                </p>
              ) : (
                ""
              )}
              {billData?.paymentType == "Insurance" ? (
                <p className="text-[#818194] text-sm font-semibold">
                  <strong className="text-[#141414] text-base">
                    Insurance Plan:
                  </strong>{" "}
                  {billData.insuranceId?.insurancePlan}
                </p>
              ) : (
                ""
              )}
              {billData.paymentType == "Insurance" ? (
                <p className="text-[#0EABEB] text-sm font-semibold">
                  <strong className="text-[#141414] text-base">
                    Claim Amount:
                  </strong>{" "}
                  {billData.insuranceId?.claimAmount}
                </p>
              ) : (
                ""
              )}
              {billData.paymentType == "Insurance" ? (
                <p className="text-[#0EABEB] text-sm font-semibold">
                  <strong className="text-[#141414] text-base">
                    {billData.insuranceId?.claimedAmount}
                  </strong>{" "}
                  ₹2,500.00
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="space-y-2">
              <p className="text-[#818194] text-sm font-semibold">
                <strong className="text-[#141414] text-base">Amount:</strong> ₹
                {(billData.amount * 1 || 0).toFixed(2)}
              </p>
              <p className="text-[#818194] text-sm font-semibold">
                <strong className="text-[#141414] text-base">
                  Discount {billData?.discount || 0} % :{" "}
                </strong>{" "}
                ₹{((billData?.amount * billData?.discount) / 100).toFixed(2)}
              </p>
              <p className="text-[#818194] text-sm font-semibold">
                <strong className="text-[#141414] text-base">
                  Tax {billData?.tax || 0} % :{" "}
                </strong>{" "}
                ₹{((billData?.amount * billData?.tax) / 100).toFixed(2)}
              </p>
              <p className="text-[#0EABEB] text-sm font-semibold">
                <strong>Total Amount:</strong> ₹
                {(
                  billData?.amount -
                  (billData?.amount * billData?.discount) / 100 +
                  (billData?.amount * billData?.tax) / 100
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center flex flex-col sm:flex-row new-sm:flex-nowrap
         justify-between bg-[#0EABEB] p-3 text-white rounded-b-lg gap-2">
          <p className="text-sm sm:text-base">Call: +90854 22354</p>
          <p className="text-sm sm:text-base">
            Email:{" "}
            <a href="mailto:Hello@gmail.com" className="text-white">
              Hello@gmail.com
            </a>
          </p>
        </footer>
      </div>
    </div>
  )
}
