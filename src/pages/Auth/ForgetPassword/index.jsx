import { NHInput, NHButton } from "@/components";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useForgetPassword } from "@/hook/Auth/ForgetPassword";
import styles from "../Auth.module.css";

export const ForgetPassword = () => {
  const navigate = useNavigate();

  const { loading, handleInputChange, handleSubmit, email, isFormValid } =
    useForgetPassword();

  return (
    <div className={clsx(styles.FromWrapper, "d-flex flex-column")}>
      <div className={clsx(styles.contentWrapper, "d-flex flex-column")}>
        <h2>Forget Password</h2>
        <p>
          Enter your email and we'll send you an OTP to reset your password.
        </p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <NHInput
          require
          label="Email or Phone"
          placeholder="Enter Email or Phone number"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
      </form>
      <div className={clsx(styles.contentWrapper, "d-flex flex-column")}>
        <NHButton
          block
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          loading={loading}
        >
          {loading ? "Sending..." : "Get OTP"}
        </NHButton>
        <NHButton block variant="link" onClick={() => navigate(-1)}>
          Back to Login
        </NHButton>
      </div>
    </div>
  );
};
