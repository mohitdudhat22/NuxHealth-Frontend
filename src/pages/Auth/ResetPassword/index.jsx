import { NHButton, NHPasswordInput } from "@/components";
import { useResetPassword } from "@/hook/Auth/ResetPassword";

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
        className="gap-5 mt-5 flex flex-col"
        onSubmit={handleSubmit}
      >
        <div className="gap-2 flex flex-col">
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
