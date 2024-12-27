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

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const updateNestedFormData = (field, nestedField, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: { ...prev[field], [nestedField]: value },
        }));
    };

    return (
        <>
            <h2>Registration</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-xl mt-xl">
                <div className="grid flex-col grid-cols-2 d-grid gap-y-2 gap-x-5">
                    {[
                        { label: "First Name", name: "firstName", placeholder: "Enter First Name" },
                        { label: "Last Name", name: "lastName", placeholder: "Enter Last Name" },
                        { label: "Email Address", name: "email", placeholder: "Enter Email Address" },
                        { label: "Phone Number", name: "phone", placeholder: "Enter Phone Number" },
                    ].map(({ label, name, placeholder }) => (
                        <NHInput
                            key={name}
                            label={label}
                            name={name}
                            placeholder={placeholder}
                            value={formData[name]}
                            onChange={handleChange}
                            error={errors[name]}
                            required
                        />
                    ))}

                    <div className="flex col-span-2 gap-5">
                        {[
                            { label: "Age", name: "age", placeholder: "Enter Age" },
                            { label: "Height (cm)", name: "height", placeholder: "Enter Height" },
                            { label: "Weight (kg)", name: "weight", placeholder: "Enter Weight" },
                        ].map(({ label, name, placeholder }) => (
                            <NHInput
                                key={name}
                                label={label}
                                name={name}
                                placeholder={placeholder}
                                value={formData[name]}
                                onChange={handleChange}
                                error={errors[name]}
                                required
                            />
                        ))}
                    </div>

                    <div className="flex col-span-2 gap-5">
                        {[
                            {
                                component: NHSelect,
                                label: "Gender",
                                name: "gender",
                                options: [
                                    { value: "male", label: "Male" },
                                    { value: "female", label: "Female" },
                                    { value: "other", label: "Other" },
                                ],
                                placeholder: "Select Gender",
                            },
                            {
                                component: NHSelect,
                                label: "Blood Group",
                                name: "bloodGroup",
                                options: [
                                    { value: "A+", label: "A+" },
                                    { value: "A-", label: "A-" },
                                    { value: "B+", label: "B+" },
                                    { value: "B-", label: "B-" },
                                    { value: "O+", label: "O+" },
                                    { value: "O-", label: "O-" },
                                    { value: "AB+", label: "AB+" },
                                    { value: "AB-", label: "AB-" },
                                ],
                                placeholder: "Select Blood Group",
                            },
                            {
                                component: NHDatePicker,
                                label: "Date of Birth",
                                name: "dob",
                                placeholder: "Select Date of Birth",
                            },
                        ].map(({ component: Component = NHInput, ...props }) => (
                            <Component
                                key={props.name}
                                {...props}
                                value={formData[props.name]}
                                onChange={(value) => updateFormData(props.name, value)}
                                error={errors[props.name]}
                                required
                            />
                        ))}
                    </div>

                    <div className="flex col-span-2 gap-5">
                        {[
                            { label: "Country", name: "country", placeholder: "Enter Country" },
                            { label: "State", name: "state", placeholder: "Enter State" },
                            { label: "City", name: "city", placeholder: "Enter City" },
                        ].map(({ label, name, placeholder }) => (
                            <NHInput
                                key={name}
                                label={label}
                                name={name}
                                placeholder={placeholder}
                                value={formData[name]}
                                onChange={handleChange}
                                error={errors[name]}
                                required
                            />
                        ))}
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

                    {[
                        { label: "Password", name: "password", placeholder: "Enter Password" },
                        {
                            label: "Confirm Password",
                            name: "confirmPassword",
                            placeholder: "Confirm Password",
                        },
                    ].map(({ label, name, placeholder }) => (
                        <NHPasswordInput
                            key={name}
                            label={label}
                            name={name}
                            placeholder={placeholder}
                            value={formData[name]}
                            onChange={handleChange}
                            error={errors[name]}
                            parentClassName="col-span-2"
                            required
                        />
                    ))}
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