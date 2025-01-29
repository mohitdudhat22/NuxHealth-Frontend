import React from "react";
import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";
import Icons from "@/constants/Icons";

// Convert URL segments into a readable format
const formatTitle = (segment) => {
  return segment
    .replace(/-/g, " ") // Replace dashes with spaces
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
};

export const NHBreadCrumb = () => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  // Filter out the "admin" segment from the path
  const filteredSnippets = pathSnippets.filter(
    (snippet) => snippet !== "admin"
  );

  // Disable the middle breadcrumb if there are exactly three segments (Home > Security > Protocols)
  const shouldDisableMiddleBreadcrumb = filteredSnippets.length === 3;

  // Generate breadcrumb items dynamically
  const breadcrumbData = [
    {
      title: Icons.Home,
      href: "/",
    },
    ...filteredSnippets.map((snippet, index) => {
      const url = `/${filteredSnippets.slice(0, index + 1).join("/")}`;
      return {
        title: formatTitle(snippet),
        href: index === filteredSnippets.length - 1 ? undefined : url,
        disabled: index === 1 && shouldDisableMiddleBreadcrumb,
      };
    }),
  ];

  return (
    <Breadcrumb
      separator="/"
      items={breadcrumbData?.map((item, index) => ({
        key: index,
        title: item.disabled ? (
          <span className="d-flex">{item?.title}</span>
        ) : item.href ? (
          <Link to={item?.href}>{item?.title}</Link>
        ) : (
          item?.title
        ),
      }))}
    />
  );
};
