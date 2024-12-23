import { Layout } from "antd";
import clsx from "clsx";
import { SwiperSlide } from "swiper/react";
import { Outlet } from "react-router-dom";
import { NHSwiperSlider } from "@/components";
import styles from "./Authentication.module.css";

export const AuthLayouts = () => {
  return (
    <Layout className={clsx("grid bg-white h-screen grid-cols-2")}>
      <div className={clsx(styles.AuthenticationRight, "flex flex-column")}>
        <div
          className={clsx(
            styles.AuthenticationContent,
            "w-full m-auto bg-white"
          )}
        >
          <Outlet />
        </div>
      </div>
      <div className={clsx(styles.AuthenticationLeft, "relative")}>
        <h1 className="font-secondary">
          <span className={styles.logoPart}>Dash</span>
          Stack
        </h1>
        <div className={styles.slide}>
          <NHSwiperSlider
            slidesPerView={1}
            loop={true}
            pagination={{
              clickable: true,
            }}
          >
            {/* {AuthSliderData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="ratio ratio-1x1">
                  <img src={slide.image} className={styles.slideImg} />
                </div>
                <h3 className="text-center">{slide.title}</h3>
              </SwiperSlide>
            ))} */}
          </NHSwiperSlider>
        </div>
      </div>

    </Layout>
  );
};
