import { Layout } from "antd";
import clsx from "clsx";
import Icons from "@/constants/Icons";
import {
  NHButton,
  NHBreadCrumb,
  NHDropDownImg,
  NHInput,
  NHSelect,
} from "@/components/";
import NotificationBox from "./NotificationBox";
import { useHeader } from "@/hook/Global";
import { headerDropdownItems } from "@/constants/data";
import { useUserData } from "@/context";
import styles from "./NHHeader.module.css";
import { useAppNavigation } from "@/utils/useAppNavigation";
const { Header } = Layout;
export const NHHeader = ({ collapsed, collapseHandle }) => {
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

  const { userData } = useUserData();
  const { goToProfile } = useAppNavigation();
  return (
    <Header
      className={clsx(
        "flex items-center leading-normal justify-between h-[var(--header-height)] relative py-md px-[calc(var(--space-xl)*2)]"
      )}
    >
      <div className="flex items-center justify-content-center gap-xl">
        <NHButton
          size="small"
          variant={"primary"}
          className={clsx(
            styles.menu,
            {
              [styles.menuOpen]: collapsed,
              "absolute left-[calc(var(--sidebar-width)_+_11px)]": collapsed,
            },
            "xl:hidden"
          )}
          icon={
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 48 48"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <line
                  x1="0"
                  y1="17"
                  x2="48"
                  y2="17"
                  stroke="currentColor"
                  stroke-width="5"
                />
                <line
                  x1="0"
                  y1="31"
                  x2="48"
                  y2="31"
                  stroke="currentColor"
                  stroke-width="5"
                />
              </g>

              <g>
                <line
                  x1="0"
                  y1="24"
                  x2="48"
                  y2="24"
                  stroke="currentColor"
                  stroke-width="5"
                />
                <line
                  x1="0"
                  y1="24"
                  x2="48"
                  y2="24"
                  stroke="currentColor"
                  stroke-width="5"
                />
              </g>
            </svg>
          }
          onClick={collapseHandle}
        />
        <div>
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
          onClick={() => goToProfile()}
          arrow
        />
      </div>
    </Header>
  );
};
