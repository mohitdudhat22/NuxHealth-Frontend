import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import clsx from "clsx";
import { useDecodeToken } from "@/hook";
import Icons from "@/constants/Icons";
import {
  NHButton,
  NHBreadCrumb,
  NHDropDownImg,
  NHInput,
  NHSelect,
} from "@/components/";
import NotificationBox from "../NotificationBox";
import { useHeader } from "@/hook/Global";
import { headerDropdownItems } from "@/constants/data";
import { useUserData } from "@/context";

const { Header } = Layout;

export const NHHeader = () => {
  const {
    notificationVisible,
    setNotificationVisible,
    defaultOption,
    options,
    handleSearch,
    handleRoleChange,
    BreadCrumb,
    firstName,
    isDoctor,
    searchValue,
    isPatient,
  } = useHeader();

  const navigate = useNavigate();
  const { token } = useDecodeToken();
  const { userData } = useUserData();

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
              Good Morning! {isDoctor && "Dr."}
              {firstName}
            </h3>
            <p className="mt-1 font-semibold h6 text-silver">
              Hope you have a good day
            </p>
          </div>
        ) : (
          <NHBreadCrumb />
        )}
      </div>
      <div className={clsx("flex items-center justify-content-center gap-xl")}>
        <NHInput
          prefix={Icons?.SearchIcon}
          placeholder="Quick Search"
          value={searchValue}
          onChange={handleSearch}
          addonAfter={
            <NHSelect
              defaultValue={defaultOption}
              options={options}
              disabled={isPatient && true}
              onChange={handleRoleChange}
              style={{
                width: "auto",
              }}
            >
              {/* {options?.map((option) => (
                <Option key={option.key} value={option.key}>
                  {option.value}
                </Option>
              ))} */}
            </NHSelect>
          }
        />
        <div>
          {/* <NHButton
            icon={Icons?.NotificationBall}
            onClick={() => setNotificationVisible(!notificationVisible)}
          /> */}
          <NotificationBox
            visible={notificationVisible}
            onClose={() => setNotificationVisible(false)}
          />
        </div>
        <NHDropDownImg
          items={headerDropdownItems}
          name={userData?.userData?.fullName}
          image={userData?.userData?.profilePicture}
          position={userData?.userData?.role}
          imageAlt={"fakeImg"}
          onClick={() => navigate("profile")}
          arrow
        />
      </div>
    </Header>
  );
};
