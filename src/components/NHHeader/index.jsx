import { Divider, Layout } from "antd";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { NHButton, NHInput, NHBreadCrumb, NHDropDownImg } from "@/components/";
import Icons from "@/constants/Icons";
// import UseDecodeToken from "@/hook/UseDecodeToken";
import styles from "./NHHeader.module.css";

const { Header } = Layout;

export const NHHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dropdownItems = [
    {
      key: "1",
      label: "Profile",
    },
  ];

  const handleMenuClick = (key) => {
    if (key === "1") {
      navigate("/admin/profile");
    }
  };
  return (
    <Header
      className={clsx(
        styles.header,
        "flex items-center justify-between"
      )}
    >
      <div className="flex items-center justify-content-center gap-xl">
        {location.pathname == "/admin" || location.pathname == "/resident" ? (
          <NHInput placeholder={"Search"} prefix={Icons.Search} />
        ) : (
          <NHBreadCrumb separator=">" admin />
        )}
      </div>
      <div
        className={clsx(
          styles.HeaderRight,
          "flex items-center justify-content-center gap-xl"
        )}
      >
        <NHButton
          icon={Icons.NotificationBall}
          onClick={() => navigate("/notifications")}
          className={styles.NotificationBallBtn}
        />
        <NHDropDownImg
          items={dropdownItems}
          // name={token?.fullName}
          image={"https://i.pravatar.cc/300"}
          // position={token?.role}
          imageAlt={"fakeImg"}
          onClick={() => handleMenuClick("1")}
          arrow
        />
      </div>
    </Header>
  );
};
