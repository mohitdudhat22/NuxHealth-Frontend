import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Layout, Menu } from "antd";
import { useAside } from "@/hook";
import styles from "./NHSidebar.module.css";
import { NHButton } from "..";
import Icons from "../../constants/Icons";
import { FullLogo } from "@/assets/images";

const { Sider } = Layout;

export const NHSidebar = ({ collapsed, className, items }) => {
  const navigation = useNavigate();
  const { currentPage } = useAside();
  const [openKeys, setOpenKeys] = useState([]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigation("/login");
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
        className={clsx(styles.menu, "border-0 h-screen overflow-auto")}
        defaultSelectedKeys={[currentPage]}
        selectedKeys={[currentPage]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
      <div className={""}>
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
