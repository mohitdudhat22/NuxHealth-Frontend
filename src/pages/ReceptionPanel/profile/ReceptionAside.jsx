import React from "react";
import { CgProfile } from "react-icons/cg";
import { FaLock } from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";
import { SiSpringsecurity } from "react-icons/si";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../../hooks/useGlobal";


export const ReceptionAside = () => {
    const { userData } = useGlobal();
    return (
        <div className="left new-xxl:w-[23%] new-xl:w-[25%] new-lg:w-[27%] p-5 w-1/4 border-r-[3px] border-[#D9D9D94D]">
            <div className="img-box text-center">
                <div className="img">
                    <img
                        src={userData?.avatar || "../img/dr-profile.png"}
                        className="rounded-full new-xll:mx-auto new-xxl:w-[214px] new-xxl:h-[214px] new-xl:w-[190px] new-xl:h-[190px] new-lg:w-[170px] new-lg:h-[170px] "
                    />
                </div>
                <p className="new-xxl:text-[24px] new-xl:text-[22px] new-lg:text-[20px] text-[#030229] font-semibold py-2">
                    {userData ? `Dr. ${userData?.name}` : ""}
                </p>
            </div>
            <div className="menu">
                <p className="new:xxl:text-[20px] new:xl:text-[18px] new:lg:text-[18px] font-semibold text-[#030229] py-2">Menu</p>
                <ul>
                    <li className="mb-2">
                        <NavLink
                            to={"/reception/profile"}
                            className="flex items-center bg-[#F6F8FB] p-4 rounded-[10px] hover:text-sky-500 hover:fill-sky-500"
                        >
                            <CgProfile />
                            <span className="ml-4 text-base new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] text-[#4F4F4F] hover:text-sky-500">
                                Profile
                            </span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to={"/reception/profile/changePassword"}
                            className="flex items-center bg-[#F6F8FB] p-4 rounded-[10px] hover:text-sky-500 hover:fill-sky-500"
                        >
                            <FaLock />
                            <span className="ml-4 text-base new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] text-[#4F4F4F] hover:text-sky-500">
                                Change Password
                            </span>
                        </NavLink>
                    </li>
                    <li className="mb-2">
                        <NavLink
                            to={"/reception/profile/termsCondition"}
                            className="flex items-center bg-[#F6F8FB] p-4 rounded-[10px] hover:text-sky-500 hover:fill-sky-500"
                        >
                            <FaStickyNote />
                            <span className="ml-4 text-base new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] text-[#4F4F4F] hover:text-sky-500">
                                Terms & Condition
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={"/reception/profile/privacyPolicy"}
                            className="flex items-center bg-[#F6F8FB] p-4 rounded-[10px] hover:text-sky-500 hover:fill-sky-500"
                        >
                            <SiSpringsecurity />
                            <span className="ml-4 text-base new-xxl:text-[18px] new-xl:text-[16px] new-lg:text-[16px] text-[#4F4F4F] hover:text-sky-500">
                                Privacy Policy
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
