import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import clsx from "clsx";
import { useDecodeToken } from "@/hook";
import Icons from "@/constants/Icons";
import { NHButton, NHBreadCrumb, NHDropDownImg } from "@/components/";
import NotificationBox from "../NotificationBox";

const { Header } = Layout;

export const NHHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useDecodeToken();
  const [notificationVisible, setNotificationVisible] = useState(false);
  const dropdownItems = [
    {
      key: "1",
      label: "Profile",
    },
  ];

  const handleMenuClick = () => {
    navigate("profile");
  };

  const BreadCrumb =
    location.pathname === "/admin" ||
    location.pathname === "/patient" ||
    location.pathname === "/doctor" ||
    location.pathname === "/reception";

  const firstName = token?.userData?.fullName?.split(" ")[0];
  const isDoctor = location.pathname.startsWith("/doctor");

  return (
    <Header
      className={clsx(
        "flex items-center leading-normal justify-between h-[var(--header-height)] relative py-md px-[calc(var(--space-xl)*2)]"
      )}
    >
      <div className="flex items-center justify-content-center gap-xl">
        {BreadCrumb ? (
          <div className="flex flex-col items-start">
            <h3 className="font-bold capitalize">
              Good Morning! {isDoctor && "Dr."}{firstName}
            </h3>
            <p className="mt-1 h6 text-silver font-semibold">
              Hope you have a good day
            </p>
          </div>
        ) : (
          <NHBreadCrumb separator=">" admin />
        )}
      </div>
      <div className={clsx("flex items-center justify-content-center gap-xl")}>
        <NHButton
          icon={Icons.NotificationBall}
          onClick={() => setNotificationVisible(!notificationVisible)}
        />
        <NotificationBox
          visible={notificationVisible}
          onClose={() => setNotificationVisible(false)}
        />
        <NHDropDownImg
          items={dropdownItems}
          name={token?.userData?.fullName}
          image={token?.userData?.profilePicture}
          position={token?.userData?.role}
          imageAlt={"fakeImg"}
          onClick={() => handleMenuClick()}
          arrow
        />
      </div>
    </Header>
  );
};
