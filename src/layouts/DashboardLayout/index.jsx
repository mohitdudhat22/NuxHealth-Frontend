import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { useSearch } from "@/context";
import { GlobalSearch } from "@/pages";
import { NHHeader, NHSidebar } from "@/components";
import styles from "./DashboardLayout.module.css";

const { Content } = Layout;

export const DashboardLayout = ({ items }) => {
  const [collapsed, setCollapsed] = useState();
  const { searchValue } = useSearch();

  return (
    <Layout className={styles.main}>
      <NHSidebar
        collapsed={collapsed}
        items={items}
        className={clsx(
          collapsed ? "translate-x-0" : "-translate-x-full",
          "xl:!relative !fixed left-0 xl: top-0 xl: h-full xl:translate-x-0"
        )}
      />
      <Layout>
        <NHHeader
          collapsed={collapsed}
          collapseHandle={() => setCollapsed(!collapsed)}
        />
        <Content className={styles.content}>
          {searchValue?.length > 0 ? <GlobalSearch /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};
