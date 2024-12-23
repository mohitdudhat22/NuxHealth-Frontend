import { Link } from "react-router-dom";
import {
  NHButton,
  NHInput,
  NHPasswordInput,
  NHCheckbox,
  // SelectSocietyModal,
  NHSelect,
} from "@/components";
import { useRegister } from "@/hook/Auth/Register";

export const Register = () => {
  const {
    societyNames,
    formData,
    handleChange,
    handleZipCodeChange,
    handleSubmit,
    setFormData,
    isModalOpen,
    setIsModalOpen,
    errors,
    isLoading,
    isDisabled,
  } = useRegister();

  return (
    <>
      <h2>Registration</h2>
      <form
        onSubmit={handleSubmit}
        className="gap-5 mt-5 d-flex flex-column"
      >
        <div className="grid grid-cols-2 d-grid flex-column gap-y-2 gap-x-5">
          <NHInput
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            require
          />
          <NHInput
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            require
          />
          <NHInput
            label="Email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            require
          />
          <NHInput
            label="Phone Number"
            name="phoneNumber"
            placeholder="91+"
            value={formData.phoneNumber}
            onChange={handleChange}
            error={errors.phoneNumber}
            require
          />
          <NHInput
            label="Country"
            name="country"
            placeholder="Enter Country"
            value={formData.country}
            onChange={handleChange}
            error={errors.country}
            require
          />
          <NHInput
            label="State"
            name="state"
            placeholder="Enter State"
            value={formData.state}
            onChange={handleChange}
            error={errors.state}
            require
          />
          <NHInput
            label="City"
            name="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
            require
          />
          <NHInput
            label="Zip Code"
            name="zipCode"
            placeholder="Enter Zip Code"
            value={formData.zipCode}
            onChange={handleZipCodeChange}
            error={errors.zipCode}
            require
          />
          <NHSelect
            showSearch
            label="Select Society"
            name="selectSociety"
            placeholder="Select Society"
            parentClassName="col-span-2"
            options={societyNames}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            value={formData.selectSociety}
            require
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, selectSociety: value }))
            }
            error={errors.selectSociety}
            dropdownRender={(menu) => (
              <>
                {menu}
                <NHButton
                  onClick={() => setIsModalOpen(true)}
                  block
                  variant="primary"
                  className="mt-2"
                >
                  Create New Society
                </NHButton>
              </>
            )}
          />
          <NHPasswordInput
            label="Password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            parentClassName="col-span-2"
            require
          />
          <NHPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            parentClassName="col-span-2"
            require
          />
        </div>

        <NHCheckbox
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        >
          I agree to all the Terms and {""}
          <Link to="/privacy-policies">Privacy Policies</Link>.
        </NHCheckbox>

        <NHButton
          variant="primary"
          block
          type="submit"
          disabled={isDisabled}
          loading={isLoading}
        >
          Register
        </NHButton>

        {location.pathname === "/admin/register" && (
          <h6 className="text-center fw-normal">
            Already have an account? <Link to="/admin/login">Login</Link>
          </h6>
        )}
      </form>
      {/* <SelectSocietyModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      /> */}
    </>
  );
};
