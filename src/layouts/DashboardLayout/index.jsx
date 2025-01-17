import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { NHHeader, NHSidebar } from "@/components";
import clsx from "clsx";
import { useSearch } from "@/context";
import { GlobalSearch } from "@/pages";
import styles from "./DashboardLayout.module.css";

const { Content } = Layout;

export const DashboardLayout = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const { searchValue } = useSearch();

  return (
    <Layout className={styles.main}>
      <NHSidebar
        collapsed={collapsed}
        items={items}
        className={clsx(show ? styles.Sidebar : "")}
      />
      <Layout>
        <NHHeader
          collapsed={collapsed}
          collapseHandle={() => setCollapsed(!collapsed)}
          // mobileShow={() => setShow(!show)}
          show={show}
        />
        <Content className={styles.content}>
          {searchValue?.length > 0 ? <GlobalSearch /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};
