import { useState } from "react";

const ReceptionProfileChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = () => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    // Validation checks
    if (!currentPassword) {
      setErrorMessage("Current password is required.");
      return;
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!newPassword) {
      setErrorMessage("New password is required.");
      return;
    } else if (!passwordRegex.test(newPassword)) {
      setErrorMessage(
        "New password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
      );
      return;
    } else if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }
  };
  return (
    <div className="doctor-ProfileChangePassword-section ">
      <div className="right w-[77%]">
        <div className="content p-8 bg-white rounded-2xl shadow-xl">
          <div className="head">
            <div className="title">
              <p className="new-xxl:text-[34px] new-xl:text-[30px] new-lg:text-[28px] font-semibold text-[#030229]">
                Change Password
              </p>
            </div>
            <div className="description pt-4">
              <p className="text-[16px] font-normal text-[#4F4F4F]">
                To change your password, please fill in the fields below. Your
                password must contain at least 8 characters, it must also
                include at least one uppercase letter, one lowercase letter, one
                number, and one special character.
              </p>
            </div>
          </div>
          <div className="form-box pt-[30px]">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="change-input-box relative">
                <label className="absolute top-[-14px] left-4 bg-white px-1 new-xxl:text-[16px] new-xl:text-[15px] new-lg:text-[15px] text-[#030229] font-medium">
                  Current Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="change-input-box relative">
                <label className="absolute top-[-14px] left-4 bg-white px-1 new-xxl:text-[16px] new-xl:text-[15px] new-lg:text-[15px] text-[#030229] font-medium">
                  New Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="change-input-box relative">
                <label className="absolute top-[-14px] left-4 bg-white px-1 new-xxl:text-[16px] new-xl:text-[15px] new-lg:text-[15px] text-[#030229] font-medium">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {errorMessage && (
                <div className="error-message">
                  <p className="text-red-500">{errorMessage}</p>
                </div>
              )}

              <div className="change-input-box">
                <button
                  type="submit"
                  className="w-full bg-[#0EABEB] text-white rounded-lg px-4 py-3 text-lg font-semibold"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceptionProfileChangePassword