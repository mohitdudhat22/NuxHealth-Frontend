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
    const {
        formData,
        handleChange,
        handleSubmit,
        setFormData,
        errors,
        isLoading,
        isDisabled,
    } = useRegister();

    return (
        <>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-xl mt-xl">
                <div className="grid flex-col grid-cols-2 d-grid gap-y-2 gap-x-5">
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
                        label="Email Address"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                    />
                    <NHInput
                        label="Phone Number"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                        required
                    />
                    <div className="flex col-span-2 gap-5">
                        <NHInput
                            label="Age"
                            name="age"
                            placeholder="Enter Age"
                            value={formData.age}
                            onChange={handleChange}
                            error={errors.age}
                            required
                        />
                        <NHInput
                            label="Height (cm)"
                            name="height"
                            placeholder="Enter Height"
                            value={formData.height}
                            onChange={handleChange}
                            error={errors.height}
                            required
                        />
                        <NHInput
                            label="Weight (kg)"
                            name="weight"
                            placeholder="Enter Weight"
                            value={formData.weight}
                            onChange={handleChange}
                            error={errors.weight}
                            required
                        />
                    </div>
                    <div className="flex col-span-2 gap-5">
                        <NHSelect
                            parentClassName="w-1/3"
                            label="Gender"
                            name="gender"
                            options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Other" },
                            ]}
                            placeholder="Select Gender"
                            value={formData.gender}
                            onChange={(value) => setFormData({ ...formData, gender: value })}
                            error={errors.gender}
                            required
                        />
                        <NHSelect
                            parentClassName="w-1/3"
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
                            onChange={(value) => setFormData({ ...formData, bloodGroup: value })}
                            error={errors.bloodGroup}
                            required
                        />
                        <NHDatePicker
                            parentClassName="w-1/3"
                            label="Date of Birth"
                            name="dob"
                            placeholder="Select Date of Birth"
                            value={formData.dob}
                            onChange={(date) => setFormData({ ...formData, dob: date })}
                            error={errors.dob}
                            required
                        />
                    </div>
                    <div className="flex col-span-2 gap-5">
                        <NHInput
                            label="Country"
                            name="country"
                            placeholder="Enter Country"
                            value={formData.country}
                            onChange={handleChange}
                            error={errors.country}
                            required
                        />
                        <NHInput
                            label="State"
                            name="state"
                            placeholder="Enter State"
                            value={formData.state}
                            onChange={handleChange}
                            error={errors.state}
                            required
                        />
                        <NHInput
                            label="City"
                            name="city"
                            placeholder="Enter City"
                            value={formData.city}
                            onChange={handleChange}
                            error={errors.city}
                            required
                        />
                    </div>
                    <NHInput
                        parentClassName="col-span-2"
                        label="Address"
                        name="address"
                        placeholder="Enter Address"
                        value={formData.address}
                        onChange={handleChange}
                        error={errors.address}
                        required
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
                    I agree to all the <span className="text-[#5678E9]">T & C</span> and <Link to="/privacy-policies"><span className="text-[#5678E9]">Privacy Policies</span></Link>.
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
                    Already have an account? <Link to="/login" className="text-[#5678E9]">Login</Link>
                </h6>
            </form>
        </>
    );
};

