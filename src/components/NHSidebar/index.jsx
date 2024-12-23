import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Layout, Menu } from "antd";
import { useAside } from "@/hook";
import styles from "./NHSidebar.module.css";
import { NHButton } from "..";
import Icons from "../../constants/Icons";

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
      className={clsx(styles.sider, className)}
    >
      <div className={styles.logo}>
        <Link className="d-inline-block h2 font-secondary" to="">
          <span className={styles.logoPart}>Dash</span>
          Stack
        </Link>
      </div>
      <Menu
        mode="inline"
        className={clsx(styles.menu, "border-0")}
        defaultSelectedKeys={[currentPage]}
        selectedKeys={[currentPage]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
      <div className={styles.SidebarBottom}>
        <NHButton
          block
          className={clsx(styles.SidebarBottomBtn, "justify-content-start")}
          icon={Icons.Logout}
          variant={"text"}
          danger
          onClick={handleLogout}
        >
          Logout
        </NHButton>
      </div>
    </Sider>
  );
};
