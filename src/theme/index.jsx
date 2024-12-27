import React from "react";
import { ConfigProvider } from "antd";

const ThemeConfig = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        hashed: false,
        token: {
          fontFamily: "var(--font-primary)",
          colorPrimary: "rgba(14, 171, 235)",
          colorInfo: "#f09619",
          colorSuccess: "#39973d",
          colorWarning: "#ffc313",
          colorError: "#e74c3c",
          fontSize: "var(--text-xl)",
        },
        components: {
          Layout: {
            bodyBg: "#f0f5fb",
            headerBg: "var(--clr-white)",
            siderBg: "var(--clr-white)",
          },
          Menu: {
            itemBg: "var(--clr-white)",
            itemColor: "var(--clr-gray-blue)",
            itemHoverColor: "var(--clr-gray-blue)",
            itemSelectedColor: "var(--clr-primary)",
            iconMarginInlineEnd: "var(--space-lg)",
            iconSize: "var(--space-2xl)",
            itemHeight: 50,
            fontSize: "var(--text-sm)",
            margin: "var(--space-md)",
            padding: "var(--space-lg)",
            motionEaseOut: "linear",
            motionEaseOutCirc: "linear",
            motionEaseOutQuint: "linear",
            motionDurationSlow: "1",
          },
          Button: {
            defaultBg: "",
            defaultBorderColor: "var(--clr-primary)",
            defaultColor: "var(--clr-primary)",
            defaultHoverBg: "var(--clr-primary)",
            defaultHoverBorderColor: "var(--clr-primary)",
            defaultHoverColor: "var(--clr-white)",
            defaultActiveBorderColor: "rgba(var(--clr-primary-rgb),0.75)",
            defaultActiveColor: "rgba(var(--clr-primary-rgb),0.6392156862745098)",
            borderRadius: 10,
            fontWeight: 600,
            fontSize: 18,
            lineWidth: 1.5,
            controlHeight: 50,
            paddingInline: 14,
            paddingBlock: 14,
            onlyIconSize: 24,
            contentFontSize: 18,
            controlHeightSM: 40,
            borderRadiusSM: 10,
            colorError: "var(--clr-danger)",
            linkHoverBg: "rgb(246,248,251)",
            colorLink: "var(--clr-primary)",
            colorLinkActive: "rgb(254,81,46)",
            colorLinkHover: "rgb(254,81,46)",
            borderColorDisabled: "rgb(211,211,211)",
            colorBgContainerDisabled: "rgb(246,248,251)",
            colorTextDisabled: "rgb(167,167,167)",
            colorPrimary: "var(--clr-primary)",
            colorPrimaryHover: "rgba(var(--clr-primary-rgb),0.75)",
            colorPrimaryActive: "rgba(var(--clr-primary-rgb),0.6392156862745098)",
          },
          Input: {
            colorBorder: "rgb(211,211,211)",
            colorErrorText: "var(--clr-primary)",
            activeBorderColor: "rgb(86,120,233)",
            hoverBorderColor: "rgb(86,120,233)",
            colorBgContainer: "rgb(255,255,255)",
            colorError: "var(--clr-primary)",
            colorIcon: "rgb(32,34,36)",
            colorText: "rgb(32,34,36)",
            borderRadius: 10,
            paddingBlock: 12,
            inputFontSize: 14,
            paddingInline: 14,
            controlHeight: 42,
            lineHeight: 1.5,
          },
          Select: {
            colorBorder: "rgb(211,211,211)",
            colorErrorText: "var(--clr-primary)",
            activeBorderColor: "rgb(86,120,233)",
            hoverBorderColor: "rgb(86,120,233)",
            colorBgContainer: "rgb(255,255,255)",
            colorError: "var(--clr-primary)",
            optionSelectedColor: "var(--clr-primary)",
            optionSelectedBg: "var(--clr-pearl)",
            colorIcon: "var(--clr-gray)",
            colorText: "var(--clr-gray)",
            borderRadius: 10,
            fontSize: 14,
            controlHeight: 47,
            singleItemHeightLG: 40,
            optionPadding: "5px 5px",
            optionHeight: 0,
            optionFontSize: 14,
          },
          Card: {
            headerBg: "rgb(86,120,233)",
            colorBgContainer: "transparent",
            colorBorderSecondary: "rgba(86,120,233,0.30196078431372547)",
            colorTextHeading: "rgba(255,255,255,0.88)",
            headerFontSize: 16,
            headerHeight: 54,
            fontSize: 14,
            padding: 15,
            borderRadiusLG: 10,
            fontWeightStrong: 400,
          },
          Divider: {
            margin: 0,
            colorSplit: "rgb(244,244,244)",
          },
          Badge: {
            dotSize: 28,
            indicatorHeight: 28,
            statusSize: 5,
            fontSize: 14,
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeConfig;
