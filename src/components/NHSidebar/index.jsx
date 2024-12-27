import { useState } from "react";
import clsx from "clsx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { FullLogo } from "@/assets/images";
import { useAside } from "@/hook";
import { AppointmentCard, NHButton } from "..";
import Icons from "@/constants/Icons";
import styles from "./NHSidebar.module.css";

const { Sider } = Layout;

export const NHSidebar = ({ collapsed, className, items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPage } = useAside();
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <Sider
      trigger={null}
      width={"var(--sidebar-width)"}
      collapsible
      collapsed={collapsed}
      className={clsx(styles.sider, className, "z-10")}
    >
      <div className="flex items-center justify-center leading-normal py-md px-[3rem] flex-[0_0_auto] h-[var(--header-height)]">
        <Link className="d-inline-block h2 font-secondary" to="">
          <img
            src={FullLogo}
            alt="logo"
            className=""
          />
        </Link>
      </div>
      <Menu
        mode="inline"
        className={clsx(styles.menu, "border-0 h-screen overflow-auto flex flex-col")}
        defaultSelectedKeys={[currentPage]}
        selectedKeys={[currentPage]}
        defaultOpenKeys={[currentPage]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
      <div>
        {/* {location.pathname.startsWith("/admin")
          ? null
          : <AppointmentCard />
        } */}
        <NHButton
          block
          className={clsx("justify-content-start rounded-none")}
          icon={Icons.Logout}
          danger
          variant="primary"
          onClick={handleLogout}
        >
          Logout
        </NHButton>
      </div>
    </Sider>
  );
};
