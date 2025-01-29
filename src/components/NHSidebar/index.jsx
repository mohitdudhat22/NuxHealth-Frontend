import { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { FullLogo, ShortLogo } from "@/assets/images";
import { useAside } from "@/hook";
import { AppointmentCard, NHButton } from "..";
import Icons from "@/constants/Icons";
import Cookies from "js-cookie";
import styles from "./NHSidebar.module.css";
import { useAppNavigation } from "@/utils/useAppNavigation";

const { Sider } = Layout;

export const NHSidebar = ({ collapsed, className, items }) => {
  const { currentPage } = useAside();
  const [openKeys, setOpenKeys] = useState([]);
  const { goToLogin } = useAppNavigation();

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const handleLogout = () => {
    Cookies.remove(import.meta.env.VITE_TOKEN_NAME);
    goToLogin();
  };

  return (
    <Sider
      trigger={null}
      width={"var(--sidebar-width)"}
      className={clsx(styles.sider, className, "z-10")}
    >
      <div
        className={clsx(
          !collapsed && "py-md px-[3rem]",
          "flex items-center justify-center leading-normal flex-[0_0_auto] h-[var(--header-height)]"
        )}
      >
        <Link className="d-inline-block h2 font-secondary" to="">
          <img src={FullLogo} alt="logo" />
        </Link>
      </div>
      <Menu
        mode="inline"
        className={clsx(
          styles.menu,
          "border-0 h-screen overflow-auto flex flex-col"
        )}
        defaultSelectedKeys={[currentPage]}
        selectedKeys={[currentPage]}
        defaultOpenKeys={[currentPage]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
      <div>
        {location.pathname.startsWith("/patient") ? <AppointmentCard /> : null}
        <NHButton
          block
          className={clsx("justify-content-start rounded-none")}
          icon={Icons?.Logout}
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
