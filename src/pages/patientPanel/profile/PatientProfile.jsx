import { Route, Routes } from "react-router-dom";
import ProfileSetting from "./ProfileSetting";

export default function PatientProfile() {
  return (
    <div>
      <div className="doctor-profile-section">
        <div className="row">
          <div className="main">
            <div className="top"></div>
            <div className="profile-setting">
              <div className="head"></div>
              <div className="content">
                <div className="w-full">
                  <Routes>
                    <Route path="profileEdit" element={<ProfileSetting />} />
                    {/* <Route path="termsCondition" element={<DoctorProfileTermsCondition />} /> */}
                    {/* <Route path="privacyPolicy" element={<DoctorProfilePrivacyPolicy />} /> */}
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
