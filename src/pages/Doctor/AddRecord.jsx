const AddRecord = ({ setIsModalOpen }) => {
  return (
    <>
      {/* add record model */}
      <div className=" bg-white rounded-lg shadow-md  bg-gray w-[100%]">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-4 text-[#030229] border-b pb-2">
            Add Record
          </h2>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="file-upload"
                className="block text-sm font-medium text-[#202224] mb-2"
              >
                Upload File
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-[#4F4F4F]">
                      <span className="font-semibold text-[#5678E9]">
                        Upload a file
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-xs text-[#A7A7A7]">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input id="file-upload" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div style={{ position: "relative", padding: "15px 0px 0px" }}>
              <div
                style={{
                  position: "absolute",
                  top: "4px",
                  left: "14px",
                  backgroundColor: "white",
                  color: "#030229",
                }}
              >
                Description
              </div>
              <input
                type="text"
                name="name"
                placeholder="Enter Description"
                className="w-full"
                style={{
                  padding: "12px 14px",
                  border: "1px solid #d9d9d9",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-between">
          <button
            onClick={() => setIsModalOpen(false)}
            className="py-2  me-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 w-[47%]"
          >
            Cancel
          </button>
          <button className="py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#4F4F4F] bg-[#F6F8FB] hover:bg-[#0EABEB] hover:text-white w-[47%] transition duration-300">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddRecord;

//
