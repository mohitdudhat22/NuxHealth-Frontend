import { Link } from "react-router-dom";
import {
  NHButton,
  NHInput,
  NHPasswordInput,
  NHCheckbox,
  NHSelect,
  NHDatePicker,
  NHNumberInput,
} from "@/components";
import { useRegister } from "@/hook/";
import { Country, State, City } from "country-state-city";

export const PatientRegistration = () => {
  const { formData, handleChange, handleSubmit, isLoading, errors, setFormData } =
    useRegister();

  const countries = Country.getAllCountries().map((country) => ({
    value: country.name, // Use the name as the value
    label: country.name, // Display the name as the label
  }));
  const states = formData.country
    ? State.getStatesOfCountry(
      Country.getAllCountries().find((c) => c.name === formData.country)?.isoCode // Get states using the country name
    ).map((state) => ({
      value: state.name, // Use the state name as the value
      label: state.name, // Display the state name as the label
    }))
    : [];

  const cities = formData.state
    ? City.getCitiesOfState(
      Country.getAllCountries().find((c) => c.name === formData.country)?.isoCode,
      State.getStatesOfCountry(
        Country.getAllCountries().find((c) => c.name === formData.country)?.isoCode
      ).find((s) => s.name === formData.state)?.isoCode
    ).map((city) => ({
      value: city.name,
      label: city.name,
    }))
    : [];

  console.log(Country.getAllCountries().find((c) => c.name === formData.country)?.phonecode);
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
            errorMessage={errors.firstName}
            required
          />
          <NHInput
            label="Last Name"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData?.lastName}
            onChange={handleChange}
            errorMessage={errors.lastName}
            required
          />
          <NHInput
            label="Email Address"
            name="email"
            placeholder="Enter Email Address"
            value={formData?.email}
            onChange={handleChange}
            errorMessage={errors.email}
            required
          />
          <NHInput
            label="Phone Number"
            name="phone"
            placeholder="Enter Phone Number"
            value={formData?.phone}
            onChange={handleChange}
            errorMessage={errors.phone}
            required
          />
          <NHInput
            label="Age"
            name="age"
            type="number"
            placeholder="Enter Age"
            value={formData?.age}
            onChange={handleChange}
            errorMessage={errors.age}
            required
          />
          <NHSelect
            label="Gender"
            name="gender"
            options={[
              { value: "Male", label: "Male" },
              { value: "Female", label: "Female" },
              { value: "Other", label: "Other" },
            ]}
            placeholder="Select Gender"
            value={formData?.gender}
            onChange={(value) =>
              handleChange({
                target: { name: "gender", value },
              })
            }
            errorMessage={errors.gender}
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
            value={formData?.bloodGroup}
            onChange={(value) =>
              handleChange({
                target: { name: "bloodGroup", value },
              })
            }
            errorMessage={errors.bloodGroup}
            required
          />
          <NHDatePicker
            label="Date of Birth"
            name="dob"
            placeholder="Select Date of Birth"
            value={formData?.dob}
            onChange={(value) =>
              handleChange({
                target: { name: "dob", value },
              })
            }
            errorMessage={errors.dob}
            required
          />
          <NHSelect
            showSearch
            label="Country"
            name="country"
            placeholder="Select Country"
            options={countries}
            value={formData?.country}
            onChange={(value) => handleChange({
              target: { name: "country", value },
            })
            }
            errorMessage={errors.country}
            required
          />
          <NHSelect
            showSearch
            label="State"
            name="state"
            options={states}
            placeholder="Select State"
            value={formData?.state}
            onChange={(value) => handleChange({
              target: { name: "state", value },
            })}
            errorMessage={errors.state}
            required
          />
          <NHSelect
            showSearch
            label="City"
            name="city"
            options={cities}
            placeholder="Select City"
            value={formData?.city}
            onChange={(value) => handleChange({
              target: { name: "city", value },
            })}
            errorMessage={errors.city}
            required
          />
          <NHInput
            label="Address"
            name="address"
            placeholder="Enter Address"
            value={formData?.address}
            onChange={handleChange}
            errorMessage={errors.address}
            parentClassName="col-span-2"
            required
          />
          <NHInput
            label="ZipCode"
            name="zipCode"
            type="number"
            placeholder="Enter zipCode"
            value={formData?.zipCode}
            onChange={handleChange}
            errorMessage={errors.zipCode}
            parentClassName="col-span-2"
            required
          />
          <NHInput
            label="Height"
            name="height"
            type="number"
            placeholder="Enter height"
            value={formData?.height}
            onChange={handleChange}
            errorMessage={errors.height}
            parentClassName="col-span-2"
            required
          />
          <NHInput
            label="Weight"
            name="weight"
            type="number"
            placeholder="Enter weight"
            value={formData?.weight}
            onChange={handleChange}
            errorMessage={errors.weight}
            parentClassName="col-span-2"
            required
          />
          <NHPasswordInput
            label="Password"
            name="password"
            placeholder="Enter Password"
            value={formData?.password}
            onChange={handleChange}
            errorMessage={errors.password}
            parentClassName="col-span-2"
            required
          />
          <NHPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData?.confirmPassword}
            onChange={handleChange}
            errorMessage={errors.confirmPassword}
            parentClassName="col-span-2"
            required
          />
        </div>

        <NHCheckbox
          name="termsAccepted"
          checked={formData?.termsAccepted}
          onChange={handleChange}
          errorMessage={errors.termsAccepted}
        >
          I agree to all the <span className="text-[#5678E9]">T & C</span> and{" "}
          <Link to="/privacy-policies">
            <span className="text-[#5678E9]">Privacy Policies</span>
          </Link>
          .
        </NHCheckbox>

        <NHButton variant="primary" block type="submit" loading={isLoading}>
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
