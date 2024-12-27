import { Link } from "react-router-dom";
import {
  NHButton,
  NHInput,
  NHPasswordInput,
  NHCheckbox,
  SelectHospitalModal,
  NHSelect,
  NHCard,
} from "@/components";
import { useRegister } from "@/hook/";

export const Register = () => {
  const {
    hospitalNames,
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
    <NHCard>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className="gap-xl mt-xl flex flex-col">
        <div className="grid grid-cols-2 d-grid flex-col gap-y-2 gap-x-5">
          <NHInput
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            required
          />
          <NHInput
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
            required
          />
          <NHInput
            label="Email"
            name="email"
            placeholder="Enter Your Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            required
          />
          <NHInput
            label="Phone Number"
            name="phone"
            placeholder="91+"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />
          <NHInput
            label="Country"
            name="country"
            placeholder="Enter Country"
            value={formData.address.country}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, country: e.target.value },
              }))
            }
            error={errors.country}
            required
          />
          <NHInput
            label="State"
            name="state"
            placeholder="Enter State"
            value={formData.address.state}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, state: e.target.value },
              }))
            }
            error={errors.state}
            required
          />
          <NHInput
            label="City"
            name="city"
            placeholder="Enter City"
            value={formData.address.city}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                address: { ...prev.address, city: e.target.value },
              }))
            }
            error={errors.city}
            required
          />
          <NHInput
            label="Zip Code"
            name="zipCode"
            placeholder="Enter Zip Code"
            value={formData.address.zipCode}
            onChange={handleZipCodeChange}
            error={errors.zipCode}
            required
          />
          <NHSelect
            showSearch
            label="Select Hospital*"
            name="hospitalId"
            placeholder="Select Hospital"
            parentClassName="col-span-2"
            options={hospitalNames}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            value={formData.hospitalId}
            required
            onChange={(value) =>
              setFormData((prev) => ({ ...prev, hospitalId: value }))
            }
            error={errors.hospitalId}
            dropdownRender={(menu) => (
              <>
                {menu}
                <NHButton
                  onClick={() => setIsModalOpen(true)}
                  block
                  variant="primary"
                  className="mt-2"
                >
                  Create New Hospital
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
            required
          />
          <NHPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            parentClassName="col-span-2"
            required
          />
        </div>

        <NHCheckbox
          name="termsAccepted"
          checked={formData.termsAccepted}
          onChange={handleChange}
        >
          I agree to all the Terms and{" "}
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

        <h6 className="text-center fw-normal">
          Already have an account? <Link to="/login">Login</Link>
        </h6>
      </form>
      
      <SelectHospitalModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
    </NHCard>
  );
};