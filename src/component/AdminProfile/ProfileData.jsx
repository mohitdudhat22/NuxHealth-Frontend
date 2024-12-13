import { FaEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";

export default function ProfileData() {
  const { user } = useAuth();
  const { getAdminProfile, userData } = useGlobal();

  useEffect(() => {
    getAdminProfile(user.id);
  }, [user.id]);

  return (
    <div className="content">
      <div className="head flex items-center justify-between">
        <div className="title">
          <p className="new-xxl:text-[34px] new-xl:text-[30px] new-lg:text-[28px] font-semibold text-[#030229]">Profile </p>
        </div>
        <div className="edit">
          <NavLink to="/edit">
            <button className="flex items-center bg-[#0eabeb] px-4 py-3 rounded-lg new-xxl:text-[20px] text-white new-xl:text-[18px] text-white new-lg:text-[18px]">
              <FaEdit className="text-white" />
              <span className="text-white new-xxl:text-[20px] text-white new-xl:text-[18px] text-white new-lg:text-[18px] font-semibold pl-2">
                Edit Profile
              </span>
            </button>
          </NavLink>
        </div>
      </div>
      <div className="form-box pt-[35px]">
        <form className="flex flex-wrap gap-5">
          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              First Name <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="Enter First Name"
              value={userData?.firstName}
              className="w-full px-4 py-3 border border-gray-300 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Last Name <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="Enter Last Name"
              value={userData?.lastName}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Email Address <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="Email Address"
              value={userData?.email}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Phone Number* <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="Phone Number"
              value={userData?.phone}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Hospital Name <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="Hospital Name"
              value={userData?.hospital?.name}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Gender <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="Gender"
              value={userData?.gender}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              City <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="City"
              value={userData?.city}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              State <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="State"
              value={userData?.state}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>

          <div className="input-box relative w-[30%]">
            <div className="label absolute top-[-0.75rem] left-4 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-medium">
              Country <span className="text-red-500">*</span>
            </div>
            <input
              disabled
              type="text"
              placeholder="Country"
              value={userData?.country}
              className="w-full px-4 py-3 bg-white new-xxl:text-[16px] new-xl:text:[15px] new-lg:text:[15px] font-normal border border-gray-300 rounded-lg focus:border-[#718ebf] placeholder-gray-400"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
