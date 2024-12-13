import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FieldArray, Formik, Form } from "formik";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/Delete";
import "./doctorPanel.css";
import { usePatient } from "../../hooks/usePatient";
import { useGlobal } from "../../hooks/useGlobal";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const CreatePrescriptionForm = () => {
  const { getPatientById, patientDetails } = usePatient();
  const { createPrescription, prescription, getAppointmentById, userData } =
    useGlobal();
  const [prescriptionData, setPrescriptionData] = useState([]);
  const navigate = useNavigate();
  const [appointmentData, setAppointmentData] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        const appointment = await getAppointmentById(id);
        setAppointmentData(appointment);
      } catch (error) {
        console.error("Error fetching appointment data:", error);
      }
    };
    fetchAppointmentData();
  }, [id, getAppointmentById]);

  const doseOptions = ["1-1-1", "1-1-0", "1-0-1", "1-0-0", "0-1-1", "0-0-1"];
  const whenToTakeOptions = ["Before Food", "After Food", "With Food"];

  // Initial values now use patientDetails from context
  const initialValues = {
    patientName: appointmentData?.patientId
      ? `${appointmentData.patientId.firstName || ""} ${
          appointmentData.patientId.lastName || ""
        }`
      : "",
    age: appointmentData?.patientId?.age || "",
    gender: appointmentData?.patientId?.gender || "",
    medicines: [
      {
        medicineName: "",
        strength: "",
        dose: "",
        duration: "",
        whenToTake: "",
      },
    ],
    additionalNote: "",
  };

  // Validation schema remains the same
  const validationSchema = Yup.object().shape({
    patientName: Yup.string().required("Required"),
    age: Yup.number()
      .required("Required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    gender: Yup.string().required("Required"),
    medicines: Yup.array().of(
      Yup.object().shape({
        medicineName: Yup.string().required("Required"),
        strength: Yup.string().required("Required"),
        dose: Yup.string().required("Required"),
        duration: Yup.string().required("Required"),
        whenToTake: Yup.string().required("Required"),
      }),
    ),
    additionalNote: Yup.string(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (!appointmentData?.patientId?._id || !id) {
        toast.error("Required appointment data is missing");
        return;
      }

      const prescriptionPayload = {
        patientId: appointmentData.patientId._id,
        medicines: values.medicines.map((medicine) => ({
          medicineName: medicine.medicineName,
          strength: medicine.strength,
          dose: medicine.dose,
          duration: medicine.duration,
          whenToTake: medicine.whenToTake,
        })),
        additionalNote: values.additionalNote,
        appointmentId: id,
        date: new Date().toISOString(),
      };

      const response = await createPrescription(prescriptionPayload, id);

      if (response) {
        toast.success("Prescription created successfully!");
        navigate("/doctor/managePrescriptionTools");
      } else {
        toast.error("Failed to create prescription");
      }
    } catch (error) {
      console.error("Prescription creation error:", error);
      toast.error(
        error.response?.data?.message || "Failed to create prescription",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Update form values when patientDetails changes
  useEffect(() => {
    if (patientDetails) {
      setPrescriptionData({
        ...prescriptionData,
        patientName: patientDetails.name,
        age: patientDetails.age,
        gender: patientDetails.gender,
      });
    }
  }, [patientDetails]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        handleSubmit,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex justify-between p-8 bg-[#F6F8FB] p-3 h-[92%]"
        >
          {/* Left Side - Form */}
          <div className="new-xxl:w-[59%] new-xl:w-[59%] new-lg:w-[55%] bg-white p-4 rounded-lg overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Create Prescription</h2>
            <div className="flex justify-between mb-6">
              <div className="input-box w-[45%] relative">
                <div className=" text-[#030229] absolute top-[-0.65rem] left-4 bg-white z-10">
                  Patient Name
                </div>
                <input
                  type="text"
                  name="patientName"
                  value={values.patientName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border p-3  rounded-md w-full bg-transparent ${
                    errors.patientName && touched.patientName
                      ? "border-red-500"
                      : ""
                  }`}
                  disabled
                />
                {errors.patientName && touched.patientName && (
                  <p className="text-red-500 text-sm">{errors.patientName}</p>
                )}
              </div>
              <div className="input-box w-1/4 relative">
                <div className="text-[#030229] absolute top-[-0.65rem] left-4 bg-white z-10">
                  Age
                </div>
                <input
                  name="age"
                  type="number"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border p-3 rounded-md w-full bg-transparent ${
                    errors.age && touched.age ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.age && touched.age && (
                  <p className="text-red-500 text-sm">{errors.age}</p>
                )}
              </div>
              <div className="input-box w-1/4 relative">
                <div className="text-[#030229] absolute top-[-0.65rem] left-4 bg-white z-10">
                  Gender
                </div>
                <input
                  name="gender"
                  value={values.gender}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`border p-3 rounded-md w-full bg-transparent ${
                    errors.gender && touched.gender ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.gender && touched.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Medicines Table */}
            <h2 className="text-xl font-bold mb-4">Drug Prescription</h2>
            <FieldArray name="medicines">
              {({ push, remove }) => (
                <>
                  <table className="w-full mb-4">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="p-2 rounded-tl-lg">Medicine Name</th>
                        <th className="p-2">Strength</th>
                        <th className="p-2">Dose</th>
                        <th className="p-2">Duration</th>
                        <th className="p-2">When to Take</th>
                        <th className="p-2 rounded-tr-lg  ">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values?.medicines?.map((medicine, index) => (
                        <tr key={index}>
                          <td className="p-2">
                            <TextField
                              label="Medicine Name"
                              name={`medicines[${index}].medicineName`}
                              value={medicine?.medicineName || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                          </td>
                          <td className="p-2">
                            <TextField
                              label="Strength"
                              name={`medicines[${index}].strength`}
                              value={medicine?.strength || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                          </td>
                          <td className="p-2">
                            <FormControl fullWidth>
                              <InputLabel id={`dose-label-${index}`}>
                                Dose
                              </InputLabel>
                              <Select
                                labelId={`dose-label-${index}`}
                                name={`medicines[${index}].dose`}
                                value={medicine?.dose || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="Dose"
                              >
                                {doseOptions.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td className="p-2">
                            <TextField
                              label="Duration"
                              name={`medicines[${index}].duration`}
                              value={medicine?.duration || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              fullWidth
                            />
                          </td>
                          <td className="p-2">
                            <FormControl fullWidth>
                              <InputLabel id={`whenToTake-label-${index}`}>
                                When to Take
                              </InputLabel>
                              <Select
                                labelId={`whenToTake-label-${index}`}
                                name={`medicines[${index}].whenToTake`}
                                value={medicine?.whenToTake || ""}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="When to Take"
                              >
                                {whenToTakeOptions.map((option) => (
                                  <MenuItem key={option} value={option}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </td>
                          <td className="p-2">
                            <IconButton
                              onClick={() => remove(index)}
                              className="text-red-600"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="add-medicine">
                    <Button
                      variant="contained"
                      onClick={() =>
                        push({
                          medicineName: "",
                          strength: "",
                          dose: "",
                          duration: "",
                          whenToTake: "",
                        })
                      }
                      className="mt-4"
                    >
                      Add Medicine
                    </Button>
                  </div>
                </>
              )}
            </FieldArray>

            {/* Additional Notes */}
            <div className="addition-note border relative rounded-lg  mt-10">
              <label className="block text-[#030229] absolute top-[-20px] left-4 bg-white z-10 text-lg">
                Additional Note <span className="text-red-500">*</span>
              </label>
              <input
                label="Additional Note"
                name="additionalNote"
                value={values.additionalNote}
                onChange={handleChange}
                onBlur={handleBlur}
                className="rounded w-full p-2"
                multiline
                rows={4}
              />
            </div>
            <div className="save-btn mt-10">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mt-6"
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Right Side - Prescription Preview */}
          <div className="Prescription-bill new-xxl:w-[39%] new-xl:w-[39%]  new-lg:w-[43%] bg-white p-4 rounded-lg overflow-auto">
            <div className="p-4 rounded-lg bg-[#F6F8FB]">
              <div className="head flex justify-between align-center">
                <div className="logo new-xxl:w-full new-xl:w-[70%] new-lg:w-[60%]">
                  <img src="/image/bill-logo.png" alt="" />
                </div>
                <div className="name">
                  <p>Dr. {userData.name}</p>
                  <span>{userData.qualification?.toUpperCase()}</span>
                </div>
              </div>
              <div className="dr-details">
                <div className="flex justify-between align-center">
                  <p className="text-[#141414] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px] font-semibold">
                    Hospital Name:{" "}
                    <span className="text-[#818194] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      {userData.hospitalName}
                    </span>
                  </p>
                  <p className="text-[#141414] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px] font-semibold">
                    Prescription Date:{" "}
                    <span className="text-[#818194] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      {new Date().toLocaleDateString()}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between align-center">
                  <p className="text-[#141414] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px] font-semibold">
                    Patient Name:{" "}
                    <span className="text-[#818194] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      {values.patientName}
                    </span>
                  </p>
                  <p className="text-[#141414] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px] font-semibold">
                    Age:{" "}
                    <span className="text-[#818194] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      {values.age}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[#141414] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px] font-semibold">
                    Gender:{" "}
                    <span className="text-[#818194] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      {values.gender}
                    </span>
                  </p>
                  <p className="add text-[#141414] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px] font-semibold">
                    Address:{" "}
                    <span className="text-[#818194] new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      {userData.hospitalId?.address}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <table className="w-full rounded-lg mt-4">
                <thead className="bg-[#F6F8FB]">
                  <tr>
                    <th className="border-b-[1px] p-2 rounded-tl-lg new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      Medicine Name
                    </th>
                    <th className="border-b-[1px] p-2 new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">Strength</th>
                    <th className="border-b-[1px] p-2 new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">Dose</th>
                    <th className="border-b-[1px] p-2 new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">Duration</th>
                    <th className="border-b-[1px] p-2 rounded-tr-lg new-xxl:text-[16px] new-xl:text-[13px] new-lg:text-[12px]">
                      When to Take
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {values?.medicines?.map((medicine, index) => (
                    <tr key={index}>
                      <td className="border-b-[1px] p-2">
                        {medicine?.medicineName}
                      </td>
                      <td className="border-b-[1px] text-center p-2">
                        {medicine?.strength}
                      </td>
                      <td className="border-b-[1px] text-center p-2">
                        {medicine?.dose}
                      </td>
                      <td className="border-b-[1px] text-center p-2">
                        {medicine?.duration}
                      </td>
                      <td className="border-b-[1px] text-center p-2">
                        {medicine?.whenToTake}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="note">
                <h3 className="mt-4 font-bold">Additional Note:</h3>
                <p>{values.additionalNote}</p>
              </div>
              <div className="condition flex justify-between align-center">
                <div className="sign border-b">
                  <span className="text-[14px] text-[#A7A7A7]">
                    Doctor Signature
                  </span>
                </div>
                <div className="btn">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePrescriptionForm;
