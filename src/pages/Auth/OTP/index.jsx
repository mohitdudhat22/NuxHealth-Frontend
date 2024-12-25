import Icons from "@/constants/Icons";
import { NHButton, NHInputOtp } from "@/components";
import { useVerifyOtp } from "@/hook/Auth/VerifyOTP";

export const OTP = () => {
  const { loading, handleInputChange, handleSubmit, otp, isFormValid } = useVerifyOtp();

  return (
    <div className="gap-5 mt-5 flex flex-col">
      <div className="gap-2 flex flex-col">
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
        <div className="mt-4 flex justify-content-between">
          <h6>
            {Icons.Timer} <span>00:30 sec</span>
          </h6>
          <p>Resend OTP</p>
        </div>
      </form>
      <div className="gap-2 flex flex-col">
        <NHButton
          block
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          loading={loading}
        >
          {loading ? "Verifying..." : "Verify"}
        </NHButton>
      </div>
    </div>
  );
};
