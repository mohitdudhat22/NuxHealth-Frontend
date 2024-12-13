export const PatientFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  countryCode: "",
  age: "",
  height: "",
  weight: "",
  gender: "",
  bloodGroup: "",
  dob: "",
  country: "",
  state: "",
  city: "",
  address: "",
  role: "patient",
};

export const genders = ["male", "female", "other"];
export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const PatientRegistrationFormFields = [
  { label: "First Name", name: "firstName", type: "text" },
  { label: "Last Name", name: "lastName", type: "text" },
  { label: "Email Address", name: "email", type: "email" },
  { label: "Phone Number", name: "phone", type: "tel" },
  // { label: "Age", name: "age", type: "number" },
  // { label: "Height(cm)", name: "height", type: "number" },
  // { label: "Weight(kg)", name: "weight", type: "number" },
  // { label: "Date of Birth", name: "dob", type: "date" },
];
