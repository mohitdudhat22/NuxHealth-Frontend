import { FaImage } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const AllFiles = () => {
  return (
    <div className="p-6 bg-[#f6f8fb] h-[92%]">
      <div className="allFile-section p-6 bg-white w-full h-[100%] flex justify-center items-center">
        <div className="content border rounded-lg p-4 new-xxl:w-[50%] new-xl:w-[60%] new-lg:w-[70%]">
          <div className="tital text-[24px] font-bold pb-3 border-b border-[#D9D9D9]">
            All Files
          </div>

          <div className="upload-file pt-4">
            <p className="text-[20px] text-[#4F4F4F] font-bold">
              All Uploaded Files
            </p>

            <div className="all-up-file flex pt-4">
              <div className="box w-[50%]  p-2">
                <div className=" p-3 flex justify-between items-center border rounded">
                  <div className="logo_File flex align-center gap-5">
                    <div className="img text-[#6A5ACD] bg-[#F6F8FB] rounded p-3">
                      <FaImage />
                    </div>
                    <div className="f-name">
                      <p className="text-[#030229] text-[14px] font-semibold	">
                        Right Hand Xray.JPG
                      </p>
                      <span className="inline-block	text-[13px] text-[#A7A7A7] font-normal">
                        5.09 MB
                      </span>
                    </div>
                  </div>
                  <div className="icon text-lg flex items-center justify-center text-[#A7A7A7] hover:text-[#0EABEB] bg-[#F6F8FB] rounded p-1 w-8 h-8 duration-300 cursor-pointer">
                    <FaEye />
                  </div>
                </div>
              </div>

              <div className="box w-[50%]  p-2">
                <div className=" p-3 flex justify-between items-center border rounded">
                  <div className="logo_File flex align-center gap-5">
                    <div className="img text-[#6A5ACD] bg-[#F6F8FB] rounded p-3">
                      <FaImage />
                    </div>
                    <div className="f-name">
                      <p className="text-[#030229] text-[14px] font-semibold	">
                        Right Hand Xray.JPG
                      </p>
                      <span className="inline-block	text-[13px] text-[#A7A7A7] font-normal">
                        5.09 MB
                      </span>
                    </div>
                  </div>
                  <div className="icon text-lg flex items-center justify-center text-[#A7A7A7] hover:text-[#0EABEB] bg-[#F6F8FB] rounded p-1 w-8 h-8 duration-300 cursor-pointer">
                    <FaEye />
                  </div>
                </div>
              </div>

              <div className="box w-[50%]  p-2">
                <div className=" p-3 flex justify-between items-center border rounded">
                  <div className="logo_File flex align-center gap-5">
                    <div className="img text-[#6A5ACD] bg-[#F6F8FB] rounded p-3">
                      <FaImage />
                    </div>
                    <div className="f-name">
                      <p className="text-[#030229] text-[14px] font-semibold	">
                        Right Hand Xray.JPG
                      </p>
                      <span className="inline-block	text-[13px] text-[#A7A7A7] font-normal">
                        5.09 MB
                      </span>
                    </div>
                  </div>
                  <div className="icon text-lg flex items-center justify-center text-[#A7A7A7] hover:text-[#0EABEB] bg-[#F6F8FB] rounded p-1 w-8 h-8 duration-300 cursor-pointer">
                    <FaEye />
                  </div>
                </div>
              </div>

              <div className="box w-[50%]  p-2">
                <div className=" p-3 flex justify-between items-center border rounded">
                  <div className="logo_File flex align-center gap-5">
                    <div className="img text-[#6A5ACD] bg-[#F6F8FB] rounded p-3">
                      <FaImage />
                    </div>
                    <div className="f-name">
                      <p className="text-[#030229] text-[14px] font-semibold	">
                        Right Hand Xray.JPG
                      </p>
                      <span className="inline-block	text-[13px] text-[#A7A7A7] font-normal">
                        5.09 MB
                      </span>
                    </div>
                  </div>
                  <div className="icon text-lg flex items-center justify-center text-[#A7A7A7] hover:text-[#0EABEB] bg-[#F6F8FB] rounded p-1 w-8 h-8 duration-300 cursor-pointer">
                    <FaEye />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="prescription pt-3">
            <p className="text-[20px] text-[#4F4F4F] font-bold pb-3">
              Prescription
            </p>

            <div className="pre-bill bg-gray-100 rounded-lg p-4">
              <div className="head flex justify-between align-center ">
                <div className="logo">
                  <img src="/image/bill-logo.png" alt="" />
                </div>
                <div className="name">
                  <p className="text-[24px] text-[#0EABEB] font-bold	">
                    Dr. Bharat Patel
                  </p>
                  <span className="text-[#9191a2]">
                    Obstetrics and Gynecology
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <div className="details text-sm">
                  <div className="flex align-center justify-between pb-2">
                    <p className=" text-[#141414] text-[16px] font-semibold">
                      Patient Name:{" "}
                      <span className="text-[#818194] text-[14px]">
                        Albatrao Bhajirao
                      </span>
                    </p>
                    <p className=" text-[#141414] text-[16px] font-semibold">
                      Prescription Date:{" "}
                      <span className="text-[#818194] text-[14px]">
                        2 Jan, 2022
                      </span>
                    </p>
                  </div>
                  <div className="flex align-center justify-between pb-2">
                    <p className=" text-[#141414] text-[16px] font-semibold">
                      Gender:{" "}
                      <span className="text-[#818194] text-[14px]">Male</span>
                    </p>
                    <p className=" text-[#141414] text-[16px] font-semibold">
                      Age:{" "}
                      <span className="text-[#818194] text-[14px]">
                        36 Years
                      </span>
                    </p>
                  </div>
                  <p className="add text-[#141414] text-[16px] font-semibold">
                    Address:{" "}
                    <span className="text-[#818194] text-[14px]">
                      B-105 Virat Bungalows Punagam Motavaracha Jamnagar.
                    </span>
                  </p>
                </div>
              </div>

              <div className="viewFullPrescription-btn">
                <button onClick={() => handalclick()}>
                  View Full Prescription
                </button>
              </div>
            </div>
          </div>

          <div className="additional-note pt-4">
            <p className="text-[#4F4F4F] text-[20px] font-bold">Description</p>

            <div className="addData">
              <p className="text-[16px] text-[#4F4F4F] font-bormal pt-3 pb-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vitae
                aspernatur laudantium voluptas delectus doloribus odio nemo
                rerum fugiat exercitationem natus.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFiles;
