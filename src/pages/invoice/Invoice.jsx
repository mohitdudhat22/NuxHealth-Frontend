import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./invoice.css";
import { useGlobal } from "../../hooks/useGlobal";
import { useAuth } from "../../hooks/useAuth";
import PatientDetailsForm from "../PatientDetailsForm";
import HospitalDetailsForm from "../HospitalDetailsForm";
import AddFieldModal from "../../component/AddFieldsModal";

const Invoice = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createBill, updateBill, bill, getAdminProfile } = useGlobal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [patientData, setPatientData] = useState({
    name: "",
    diseaseName: "",
    doctorName: "",
    description: "",
    discount: "",
    tax: "",
    amount: "",
    totalAmount: "",
    paymentType: "",
    age: "",
    gender: "",
    address: "",
  });
  const [formData, setFormData] = useState({
    hospitalName: "",
    hospitalId: "",
    otherText: "",
    email: "",
    billDate: new Date().toISOString().slice(0, 10),
    billTime: "",
    billNumber: "",
    phoneNumber: "",
    hospitalAddress: "",
    logo: null,
    patientName: "",
  });
  const [hospitalDynamicFields, setHospitalDynamicFields] = useState([]);
  const [patientDynamicFields, setPatientDynamicFields] = useState([]);

  const openModal = (section) => {
    setCurrentSection(section);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSection(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminProfile(user.id);
        setFormData((prevData) => ({
          ...prevData,
          email: data?.email || "",
          hospitalName: data?.hospital?.name || "",
          hospitalId: data?.hospital?._id || "",
          phoneNumber: data?.hospital?.phoneNumber || "",
        }));
      } catch (error) {
        console.error("Error fetching admin profile:", error);
      }
    };
    fetchData();
  }, [user.id, getAdminProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    hospitalDynamicFields.forEach((field, index) => {
      data.append(`dynamicField_${index}`, JSON.stringify(field));
    });

    try {
      if (bill.id) {
        await updateBill(data, bill.id);
      } else {
        await createBill(data);
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, logo: e.target.files[0] }));
  };

  const handleDynamicFieldChange = (section, fieldName, value) => {
    if (section === "hospital") {
      setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
    } else if (section === "patient") {
      setPatientData((prevData) => ({ ...prevData, [fieldName]: value }));
    }
  };

  const handleNewField = (field) => {
    const fieldName = field.name;

    if (currentSection === "hospital") {
      if (!hospitalDynamicFields.some((f) => f.name === fieldName)) {
        setHospitalDynamicFields((prevFields) => [...prevFields, field]);
        setFormData((prevData) => ({ ...prevData, [fieldName]: "" }));
      }
    } else if (currentSection === "patient") {
      if (!patientDynamicFields.some((f) => f.name === fieldName)) {
        setPatientDynamicFields((prevFields) => [...prevFields, field]);
        setPatientData((prevData) => ({ ...prevData, [fieldName]: "" }));
      }
    }

    closeModal();
  };

  const removeDynamicField = (section, index) => {
    if (section === "hospital") {
      const fieldToRemove = hospitalDynamicFields[index];
      setHospitalDynamicFields((prevFields) =>
        prevFields.filter((_, i) => i !== index),
      );
      setFormData((prevData) => {
        const newData = { ...prevData };
        delete newData[fieldToRemove.name];
        return newData;
      });
    } else if (section === "patient") {
      const fieldToRemove = patientDynamicFields[index];
      setPatientDynamicFields((prevFields) =>
        prevFields.filter((_, i) => i !== index),
      );
      setPatientData((prevData) => {
        const newData = { ...prevData };
        delete newData[fieldToRemove.name];
        return newData;
      });
    }
  };

  return (
    <div>
      <div className="invoice-create-bill-section p-5">
        <div className="row">
          <div className="main p-[15px] bg-[white] rounded-[15px]">
            <div className="title">
              <p>Create Bill</p>
            </div>

            <HospitalDetailsForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              hospitalDynamicFields={hospitalDynamicFields}
              handleDynamicFieldChange={handleDynamicFieldChange}
              removeDynamicField={removeDynamicField}
              openModal={() => openModal("hospital")}
            />

            <PatientDetailsForm
              openModal={() => openModal("patient")}
              patientData={patientData}
              setPatientData={setPatientData}
              dynamicFields={patientDynamicFields}
              onDynamicFieldChange={(name, value) =>
                handleDynamicFieldChange("patient", name, value)
              }
              onRemoveDynamicField={(index) =>
                removeDynamicField("patient", index)
              }
            />

            <div className="save-btn flex">
              <button onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
      <AddFieldModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onAddField={(field) => handleNewField(field)}
      />
    </div>
  );
};

export default Invoice;
