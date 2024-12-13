import React from "react";
import { useNavigate } from "react-router-dom";
import "./ErrorPage.css";
import { useAuth } from "../hooks/useAuth";

export const ErrorPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Helper function for navigation based on role
  const navigateBasedOnRole = (role) => {
    switch (role) {
      case "admin":
        window.location.href = "/";
        break;
      case "doctor":
        window.location.href = "/doctor";
        break;
      case "patient":
        window.location.href = "/patient";
        break;
      default:
        window.location.href = "/login";
    }
  };

  // Manual redirection on button click
  const handleGoHome = () => {
    if (user) {
      navigateBasedOnRole(user.role);
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="page_404">
      <div className="">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg"></div>
              <div className="contant_box_404">
                <h3 className="h2">Looks like you're lost</h3>
                <p>The page you are looking for is not available!</p>
                <button className="link_404" onClick={handleGoHome}>
                  Go to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
