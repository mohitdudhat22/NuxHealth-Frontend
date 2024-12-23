import clsx from "clsx";
import { NHButton, NHPasswordInput } from "@/components";
import { useResetPassword } from "@/hook/Auth/ResetPassword";
import styles from "../Auth.module.css";

export const ResetPassword = () => {
  const {
    loading,
    handleInputChange,
    handleSubmit,
    newPassword,
    confirmPassword,
    isFormValid,
  } = useResetPassword();

  return (
    <>
      <h2>Reset Password</h2>
      <form
        className={clsx(styles.FromWrapper, "flex flex-column")}
        onSubmit={handleSubmit}
      >
        <div className={clsx(styles.InputWrapper, "flex flex-column")}>
          <NHPasswordInput
            name="newPassword"
            label="New Password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={handleInputChange}
            required
          />
          <NHPasswordInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <NHButton
          type="submit"
          variant="primary"
          block
          disabled={loading || !isFormValid}
        >
          Reset Password
        </NHButton>
      </form>
    </>
  );
};
