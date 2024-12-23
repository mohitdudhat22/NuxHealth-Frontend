import { NHButton, NHInput, NHPasswordInput, NHCheckbox } from "@/components";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useLogin } from "@/hook/Auth/Login";
import styles from "../Auth.module.css";

export const Login = () => {
  const {
    setEmail,
    isLoading,
    setPassword,
    rememberMe,
    setRememberMe,
    email,
    password,
    handleSubmit,
    location,
  } = useLogin();

  return (
    <>
      <h2>Login</h2>
      <form
        className={clsx(styles.FromWrapper, "d-flex flex-column")}
        onSubmit={handleSubmit}
      >
        <div className={clsx(styles.InputWrapper, "d-flex flex-column")}>
          <NHInput
            label={"Email or Phone"}
            type={"email"}
            placeholder={"Enter Your Phone Number Or Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <NHPasswordInput
            label={"Password"}
            placeholder={"Enter Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="d-flex justify-content-between">
            <NHCheckbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)} // Update state on change
            >
              Remember me
            </NHCheckbox>
            <Link to="/forgot-password">Forgot Password ?</Link>
          </div>
        </div>
        <NHButton type="submit" variant={"primary"} block loading={isLoading}>
          Sign In
        </NHButton>
        {location.pathname === "/admin/login" && (
          <h6 className="text-center fw-normal">
            Don't have an account?{" "}
            <Link to={"/admin/register"}>Registration</Link>
          </h6>
        )}
      </form>
    </>
  );
};
