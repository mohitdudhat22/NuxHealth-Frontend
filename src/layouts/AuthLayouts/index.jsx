import { Layout } from "antd";
import clsx from "clsx";
import { Outlet } from "react-router-dom";
import styles from "./Authentication.module.css";
import { motion } from "framer-motion";
import { FullLogo, logoBanner, vector, vector1, vector2, vector3 } from "@/assets/images";

export const AuthLayouts = () => {
  return (
    <Layout className={clsx("grid bg-white h-screen grid-cols-2")}>
      <div className={clsx(styles.AuthenticationRight, "flex flex-col")}>
        <div
          className={clsx(
            styles.AuthenticationContent,
            "w-full m-auto bg-white"
          )}
        >
          <Outlet />
        </div>
      </div>
      <div className="w-full bg-pearl relatives h-full">
        <motion.div
          className="bg-gray-100 relative flex justify-center items-center overflow-hidden h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Vectors */}
          <motion.img
            src={vector1}
            alt="Vector Top Left"
            className="absolute top-0 left-0 w-50 h-60"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src={vector2}
            alt="Vector Bottom Right"
            className="absolute bottom-0 right-0 w-50 h-60"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src={vector}
            alt="Vector Bottom Right"
            className="absolute top-0 right-0 w-40 h-30"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Banner Content */}
          <div className="text-center relative">
            <motion.img
              src={vector3}
              alt="Vector Bottom Right"
              className="absolute top-0 right-0 w-40 h-30"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.img
              src={FullLogo}
              alt="Logo"
              className="mb-4 mx-auto w-60 h-30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            />
            <motion.img
              src={logoBanner}
              alt="Banner"
              className="w-full max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
            <h2
              className="text-4xl font-bold mt-4"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              Hospital
            </h2>
            <p
              className="text-gray-600 mt-2 font-semibold"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              You Can stay your Hospital and Contact
              <br /> With Your Facility.
            </p>
          </div>
        </motion.div>
      </div>
    </Layout >
  );
};
