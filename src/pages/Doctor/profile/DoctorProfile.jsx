import { DoctorAside } from "./DoctorAside";
import DoctorProfileData from "./DoctorProfileData";
import { Route, Routes } from "react-router-dom";
import DoctorProfileChangePassord from "./DoctorProfileChangePassord";
import DoctorProfileTermsCondition from "./DoctorProfileTermsCondition";
import DoctorProfilePrivacyPolicy from "./DoctorProfilePrivacyPolicy";

export default function DoctorProfile() {
  return (
    <div>
      <div className="doctor-profile-section">
        <div className="row">
          <div className="main bg-[#e5e7eb]">
            <div className="top h-[296px] bg-gradient-to-r from-[#4c49ed] to-[#020067]"></div>
            <div className="profile-setting new-xxl:w-[80%] new-xl:w-[85%] new-lg:w-[90%] m-auto new-xxl:mt-[-12%] new-xl:mt-[-18%] new-lg:mt-[-20%]">
              <div className="head pb-[15px]">
                <p className="new-xxl:text-[44px] new-xl:text-[40px] new-lg:text-[36px] font-bold text-white">
                  Profile Setting 
                </p>
              </div>
              <div className="content flex bg-white rounded-[15px] p-[20px] shadow-2xl ">
                <DoctorAside />

                <div className="right new-xxl:w-[77%] new-xl:w-[75%] new-lg:w-[73%] ps-[20px]">
                  <Routes>
                    <Route path="" element={<DoctorProfileData />} />
                    <Route
                      path="changePassword"
                      element={<DoctorProfileChangePassord />}
                    />
                    <Route
                      path="termsCondition"
                      element={<DoctorProfileTermsCondition />}
                    />
                    <Route
                      path="privacyPolicy"
                      element={<DoctorProfilePrivacyPolicy />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
