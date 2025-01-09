import { Link } from "react-router-dom";
import {
  NHButton,
  NHInput,
  NHPasswordInput,
  NHCheckbox,
  NHSelect,
  NHDatePicker,
} from "@/components";
import { useRegister } from "@/hook/";

export const PatientRegistration = () => {
  const { formData, handleChange, handleSubmit, isLoading, isDisabled } =
    useRegister();

  return (
    <>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-xl mt-xl">
        <div className="grid flex-col grid-cols-2 d-grid gap-y-2 gap-x-5">
          <NHInput
            label="First Name"
            name="firstName"
            placeholder="Enter First Name"
            value={formData?.firstName}
            onChange={handleChange}
            required
          />
          <NHInput
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData?.lastName}
            onChange={handleChange}
            required
          />
          <NHInput
            label="Email Address"
            name="email"
            placeholder="Enter Email Name"
            value={formData?.email}
            onChange={handleChange}
            required
          />
          <NHInput
            label="Phone Number"
            name="phone"
            placeholder="Enter Phone Name"
            value={formData?.phone}
            onChange={handleChange}
            required
          />
          <NHInput
            label={"Age"}
            name="age"
            placeholder={"Enter Age"}
            value={formData?.age}
            onChange={handleChange}
            required
          />
          <NHInput
            label={"Height (cm)"}
            name="height"
            placeholder={"Enter Height"}
            value={formData?.height}
            onChange={handleChange}
            required
          />
          <NHInput
            label={"Weight (kg)"}
            name="weight"
            placeholder={"Enter Weight"}
            value={formData?.weight}
            onChange={handleChange}
            required
          />
          <NHSelect
            label="Gender"
            name="gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            placeholder="Select Gender"
            value={formData.gender}
            onChange={(value) => updateFormData("gender", value)}
            required
          />
          <NHSelect
            label="Blood Group"
            name="bloodGroup"
            options={[
              { value: "A+", label: "A+" },
              { value: "A-", label: "A-" },
              { value: "B+", label: "B+" },
              { value: "B-", label: "B-" },
              { value: "O+", label: "O+" },
              { value: "O-", label: "O-" },
              { value: "AB+", label: "AB+" },
              { value: "AB-", label: "AB-" },
            ]}
            placeholder="Select Blood Group"
            value={formData.bloodGroup}
            onChange={(value) => updateFormData("bloodGroup", value)}
            required
          />
          <NHDatePicker
            label="Date of Birth"
            name="dob"
            placeholder="Select Date of Birth"
            value={formData.dob}
            onChange={(value) => updateFormData("dob", value)}
            required
          />
          <NHInput
            label="Country"
            name="country"
            placeholder="Enter Country"
            value={formData?.country}
            onChange={handleChange}
            required
          />
          <NHInput
            label="State"
            name="state"
            placeholder="Enter State"
            value={formData?.state}
            onChange={handleChange}
            required
          />
          <NHInput
            label="City"
            name="city"
            placeholder="Enter City"
            value={formData?.city}
            onChange={handleChange}
            required
            parentClassName="col-span-2"
          />
          <NHInput
            parentClassName="col-span-2"
            label="Address"
            name="address"
            placeholder="Enter Address"
            value={formData?.address}
            onChange={handleChange}
            required
          />
          <NHPasswordInput
            label="Password"
            name="password"
            placeholder="Enter Password"
            value={formData?.password}
            onChange={handleChange}
            parentClassName="col-span-2"
            required
          />
          <NHPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData?.confirmPassword}
            onChange={handleChange}
            parentClassName="col-span-2"
            required
          />
        </div>

        <NHCheckbox
          name="termsAccepted"
          checked={formData?.termsAccepted}
          onChange={handleChange}
        >
          I agree to all the <span className="text-[#5678E9]">T & C</span> and{" "}
          <Link to="/privacy-policies">
            <span className="text-[#5678E9]">Privacy Policies</span>
          </Link>
          .
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
          Already have an account?{" "}
          <Link to="/login" className="text-[#5678E9]">
            Login
          </Link>
        </h6>
      </form>
    </>
  );
};
