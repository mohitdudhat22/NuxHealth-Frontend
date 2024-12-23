import clsx from "clsx";
import Icons from "@/constants/Icons";
import { NHButton, NHInputOtp } from "@/components";
import styles from "../Auth.module.css";
import { useVerifyOtp } from "@/hook/Auth/VerifyOTP";

export const OTP = () => {
  const { loading, handleInputChange, handleSubmit, otp } = useVerifyOtp();

  return (
    <div className={clsx(styles.FromWrapper, "flex flex-column")}>
      <div className={clsx(styles.contentWrapper, "flex flex-column")}>
        <h2>Enter OTP</h2>
        <p>Please enter the 6 digit code that was sent to your phone number.</p>
      </div>
      <form>
        <NHInputOtp
          block
          placeholder="00000"
          value={otp}
          onChange={handleInputChange}
        />
        <div className="flex justify-between mt-4">
          <h6>
            {Icons.Timer} <span>00:30 sec</span>
          </h6>
          <p>Resend OTP</p>
        </div>
      </form>
      <div className={clsx(styles.contentWrapper, "flex flex-column")}>
        <NHButton
          block
          variant="primary"
          onClick={handleSubmit}
          // disabled={!isFormValid || loading}
          loading={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </NHButton>
      </div>
    </div>
  );
};
