import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { verifyOtp } from "@/axiosApi/ApiHelper";
import toast from "react-hot-toast";

export const useVerifyOtp = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const isFormValid = otp.trim() !== "";


    const handleInputChange = (e) => {
        setOtp(e);
    };

    const handleSubmit = async () => {
        if (!isFormValid) {
            toast.error("Please enter a valid otp number.");
            return;
        }

        try {
            setLoading(true);

            // const response = await verifyOtp({ otp: otp });

            if (response && response.message) {
                toast.success(response?.message || "OTP Verify successfully!");
                navigate("/reset-password");
            } else {
                toast.error(response?.message || "Failed to Verify OTP.");
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleInputChange, handleSubmit, otp, isFormValid };
};
