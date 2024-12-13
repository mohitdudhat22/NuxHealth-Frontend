import { CgProfile } from "react-icons/cg";
import { FaLock } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";

export default function AsideProfile() {
  const { userData } = useGlobal();
  return (
    <div className="left new-xxl:w-[23%] new-xl:w-[25%] new-lg:w-[28%] border-r-[3px] border-gray-200 px-5 py-4">
      <div className="img-box text-center">
        <div className="img">
          <img
            src={userData?.avatar || "../img/profile.png"}
            alt="Profile"
            className="rounded-full new-xxl:w-[214px] new-xxl:h-[214px] new-xl:w-[190px] new-xl:h-[190px] new-lg:w-[170px] new-lg:h-[170px]"
          />
        </div>
        <p className="new-xxl:text-[24px] new-xl:text-[22px] new-lg:text-[20px] text-[#030229] font-semibold py-2">
          {userData
            ? `${userData?.firstName} ${userData?.lastName}`
            : "Lincoln Philips"}
        </p>
      </div>

      <div className="menu mt-6">
        <p className="new:xxl:text-[20px] new:xl:text-[18px] new:lg:text-[18px] font-semibold text-[#030229] py-2">Menu</p>
        <ul>
          <li className="mb-3">
            <NavLink
              to=""
              className="flex items-center bg-gray-100 px-4 py-3 rounded-lg hover:bg-blue-100 hover:bg-blue-100 "
            >
              <CgProfile className="text-gray-700 hover:text-blue-500 text-[20px]" />
              <span className="ml-4 text-base new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] text-[#4F4F4F] hover:text-sky-500 font-medium">
                Profile
              </span>
            </NavLink>
          </li>

          <li className="mb-3">
            <NavLink
              to="changePassword"
              className="flex items-center bg-gray-100 px-4 py-3 rounded-lg hover:bg-blue-100"
            >
              <FaLock className="text-gray-700 hover:text-blue-500 new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px]" />
              <span className="ml-4 text-gray-700 hover:text-blue-500 new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] font-medium">
                Change Password
              </span>
            </NavLink>
          </li>

          <li className="mb-3">
            <NavLink
              to="termsCondition"
              className="flex items-center bg-gray-100 px-4 py-3 rounded-lg hover:bg-blue-100"
            >
              <FaStickyNote className="text-gray-700 hover:text-blue-500 new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px]" />
              <span className="ml-4 text-gray-700 hover:text-blue-500 new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] font-medium">
                Terms & Condition
              </span>
            </NavLink>
          </li>

          <li>
            <NavLink
              to="privacyPolicy"
              className="flex items-center bg-gray-100 px-4 py-3 rounded-lg hover:bg-blue-100"
            >
              <SiSpringsecurity className="text-gray-700 hover:text-blue-500 new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px]" />
              <span className="ml-4 text-gray-700 hover:text-blue-500 new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] font-medium">
                Privacy Policy
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
