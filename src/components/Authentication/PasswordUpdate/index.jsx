import clsx from "clsx";
import { NHButton } from "@/components";
import styles from "./PasswordUpdateSuccess.module.css";

export const PasswordUpdateSuccess = () => {
  return (
    <div className={styles.card}>
      <div className={clsx("text-center", styles.cardHeading)}>
        <h1>Password Update Successfully</h1>
        <p className="clr-gray">Your password has been update successfully</p>
      </div>
      <NHButton variant={"primary"} block>
        Back to Login
      </NHButton>
    </div>
  );
};
