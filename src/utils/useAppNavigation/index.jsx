import { useNavigate } from "react-router-dom";

export const useAppNavigation = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate("/");
  const goBack = () => navigate(-1);
  const goToLogin = () => navigate("/login");
  const goToProfile = () => navigate("profile");
  return { goToHome, goBack, goToLogin, goToProfile };
};
