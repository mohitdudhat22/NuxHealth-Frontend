import { Route, Routes } from "react-router-dom";
import AsideProfile from "../../component/AdminProfile/AsideProfile";
import ProfileData from "../../component/AdminProfile/ProfileData";
import ProfileChangePassword from "../../component/AdminProfile/ProfileChangePassword";
import ProfileTermsCondition from "../../component/AdminProfile/ProfileTermsCondition";
import ProfilePrivacyPolicy from "../../component/AdminProfile/ProfilePrivacyPolicy";

const Profile =() => {
  return (
    <div className="profile-section">
      <div className="row">
        <div className="main">
          <div className="h-[296px] bg-gradient-to-r from-[#4c49ed] to-[#020067]"></div>
          <div className="new-xxl:w-[80%] new-xl:w-[85%] new-lg:w-[90%] m-auto new-xxl:mt-[-15%] new-xl:mt-[-20%] new-lg:mt-[-21%]">
            <div className="pb-[15px]">
              <p className="new-xxl:text-[44px] new-xl:text-[40px] new-lg:text-[36px] font-bold text-white">
                Profile Setting
                {" "}
              </p>
            </div>
            <div className="bg-white rounded-lg p-5 shadow flex">
              <AsideProfile />

              <div className="new-xxl:w-[77%] new-xl:w-[75%] new-lg:w-[72%] ps-5">
                <Routes>
                  <Route path="/" element={<ProfileData />} />
                  <Route
                    path="changePassword"
                    element={<ProfileChangePassword />}
                  />
                  <Route
                    path="termsCondition"
                    element={<ProfileTermsCondition />}
                  />
                  <Route
                    path="privacyPolicy"
                    element={<ProfilePrivacyPolicy />}
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile