import { FullLogo } from "@/assets/images";
import { NHButton, NHCard, NHModal } from "@/components";
import Icons from "@/constants/Icons";
import React from "react";

export const Record = () => {
  return (
    <div className="w-[60%] m-auto">
      <NHCard title="Patient Record">
        {/* all-apload-files */}
        <div className="all-apload-files pb-5">
          <p className="text-[#4F4F4F] text-[20px] font-bold pb-5">
            All Uploaded Files
          </p>

          <div className="grid grid-cols-2 gap-5">
            <div className="box flex justify-between items-center border border-[#D9D9D9] rounded-xl p-4">
              <div className="left flex items-center">
                <div className="image w-[47px] h-[47px] flex justify-center items-center bg-[#F6F8FB] rounded-xl">
                  {Icons.File}
                </div>
                <div className="content pl-8">
                  <p className="text-[#030229] text-[14px] font-semibold	">
                    Right Hand Xray.JPG
                  </p>
                  <span className="text-[13px] text-[#A7A7A7] font-normal	">
                    5.09 MB
                  </span>
                </div>
              </div>

              <div className="right">
                <NHButton isView />
              </div>
            </div>

            <div className="box flex justify-between items-center border border-[#D9D9D9] rounded-xl p-4">
              <div className="left flex items-center">
                <div className="image w-[47px] h-[47px] flex justify-center items-center bg-[#F6F8FB] rounded-xl">
                  {Icons.File}
                </div>
                <div className="content pl-8">
                  <p className="text-[#030229] text-[14px] font-semibold	">
                    Right Hand Xray.JPG
                  </p>
                  <span className="text-[13px] text-[#A7A7A7] font-normal	">
                    5.09 MB
                  </span>
                </div>
              </div>

              <div className="right">
                <NHButton isView />
              </div>
            </div>

            <div className="box flex justify-between items-center border border-[#D9D9D9] rounded-xl p-4">
              <div className="left flex items-center">
                <div className="image w-[47px] h-[47px] flex justify-center items-center bg-[#F6F8FB] rounded-xl">
                  {Icons.File}
                </div>
                <div className="content pl-8">
                  <p className="text-[#030229] text-[14px] font-semibold	">
                    Right Hand Xray.JPG
                  </p>
                  <span className="text-[13px] text-[#A7A7A7] font-normal	">
                    5.09 MB
                  </span>
                </div>
              </div>

              <div className="right">
                <NHButton isView />
              </div>
            </div>

            <div className="box flex justify-between items-center border border-[#D9D9D9] rounded-xl p-4">
              <div className="left flex items-center">
                <div className="image w-[47px] h-[47px] flex justify-center items-center bg-[#F6F8FB] rounded-xl">
                  {Icons.File}
                </div>
                <div className="content pl-8">
                  <p className="text-[#030229] text-[14px] font-semibold	">
                    Right Hand Xray.JPG
                  </p>
                  <span className="text-[13px] text-[#A7A7A7] font-normal	">
                    5.09 MB
                  </span>
                </div>
              </div>

              <div className="right">
                <NHButton isView />
              </div>
            </div>
          </div>
        </div>

        {/* prescriptions */}
        <div className="prescriptions pb-5">
          <p className="text-[#4F4F4F] text-[20px] font-bold pb-5">
            Prescription
          </p>

          <div className="box border border-[#D9D9D9] rounded-xl p-10">
            <div className="hospital-card bg-[#F6F8FB] rounded-xl p-5">
              {/* head */}
              <div className="head flex justify-between items-center p-10">
                <div className="image w-2/5 h-auto">
                  <img src={FullLogo} className="" alt="Logo" />
                </div>
                <div className="text-3xl font-light text-blue-400">
                  <p className="text-[40px] font-bold">Dr. Bharat Patel</p>
                  <span className="inline text-[20px] text-[#a7a7a7] font-normal">
                    Obstetrics and genecology
                  </span>
                </div>
              </div>

              {/* content  */}

              <div className="contetn p-10">
                <div className=" grid grid-cols-2 gap-2">
                  <div className="box">
                    <p className="text-[#030229] text-[18px] font-semibold">
                      Hospital name :
                      <span class="inline text-[18px] text-[#A7A7A7] font-normal pl-3">
                        Medical Center
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="text-[#030229] text-[18px] font-semibold">
                      Prescription Date :
                      <span class="inline text-[18px] text-[#A7A7A7] font-normal pl-3">
                        2 jan, 2002
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="text-[#030229] text-[18px] font-semibold">
                      Patient name :
                      <span class="inline text-[18px] text-[#A7A7A7] font-normal pl-3">
                        Alabtrao Bhajirao
                      </span>
                    </p>
                  </div>

                  <div className="box">
                    <p className="text-[#030229] text-[18px] font-semibold">
                      Age :
                      <span class="inline text-[18px] text-[#A7A7A7] font-normal pl-3">
                        36 year
                      </span>
                    </p>
                  </div>
                </div>

                <div className="address-box pt-2">
                  <p className="text-[#030229] text-[18px] font-semibold">
                    Address :
                    <span class="inline text-[18px] text-[#A7A7A7] font-normal pl-3">
                      B-105, Virat Bungalows, Punagam, Motavarachha Jamnagar.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* description */}
        <div className="description pb-5">
          <p className="text-[#4F4F4F] text-[20px] font-bold pb-5">
            Description
          </p>

          <div className="details">
            <p className="text-[#4F4F4F] text-[14px] font-normal pb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              mattis turpis nulla, finibus.Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Proin mattis turpis nulla,
              finibus.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Proin mattis turpis nulla, finibus.
            </p>
          </div>
        </div>
      </NHCard>
    </div>
  );
};
