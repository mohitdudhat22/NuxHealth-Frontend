import { NHButton, NHInput, NHPasswordInput, NHCheckbox } from "@/components";
import { Link } from "react-router-dom";
import { useLogin } from "@/hook";

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
      <h2>Login </h2>
      <form className="gap-5 mt-5 flex flex-col" onSubmit={handleSubmit}>
        <div className="gap-2 flex flex-col">
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
          <div className="flex justify-between">
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
          <Link to="/reception/appointment" className="text-[#5678E9]">
            Login
          </Link>
        </NHButton>

        <h6 className="text-center  fw-normal">
          Don't have an account?{" "}
          <Link
            to={"/reception/patient-registration"}
            className="text-[#5678E9]"
          >
            Registration
          </Link>
        </h6>

        <h6 className="text-center fw-normal">
          Don't have an account Admin?{" "}
          <Link
            to={"/reception/patient-registration"}
            className="text-[#5678E9]"
          >
            Registration
          </Link>
        </h6>
      </form>
    </>
  );
};
