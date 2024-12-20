import { createContext, useEffect, useState } from "react";
import apiService from "../services/api";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import { requestFCMToken } from "../utils/firebaseUtils";
import { getMessaging, onMessage } from "@firebase/messaging";
import {socket} from "../config/socket";
export const GlobalContext = createContext();
import { useQuery } from "@tanstack/react-query";
export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || "",
  );

  const [allHospitals, setAllHospitals] = useState([]);
  const [userData, setUserData] = useState({});
  const [bill, setBill] = useState({});
  const [allBills, setAllBills] = useState([]);
  const [allBillsById, setAllBillsById] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [allAppointmentsById, setAllAppointmentsById] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("All");
  const [fcmToken, setFcmToken] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [prescription, setPrescription] = useState({});
  const [patientPrescription, setPatientPrescription] = useState([]);
  const [cardData, setCardData] = useState({});
  const [allPrescriptions, setAllPrescriptions] = useState([]);

  useEffect(() => {
    const messaging = getMessaging();
    initializeFCM();
    const unsubscribe = onMessage(messaging, (payload) => {
      const { title, body } = payload.notification;
      if (Notification.permission === "granted") {
        new Notification(title, {
          body: body,
        });
      } else {
        console.warn("Notifications permission not granted");
      }
      toast.success(title);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    socket.emit("userOnline", user.id);
    socket.on("notification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const initializeFCM = async () => {
    try {
      const token = await requestFCMToken();
      setFcmToken(token);
      setFCMTODB(token);
    } catch (error) {
      console.error("Error fetching FCM token:", error);
    }
  };
  const setFCMTODB = async (token) => {
    if (user.role === "doctor") {
      await apiService.UpdateDoctorToken({ token: token });
    } else if (user.role === "patient") {
      await apiService.UpdatePatientToken({ token: token });
    }
  };

  const onClickNotification = async (fcmToken, title, body) => {
    try {
      const response = await apiService.GetNotifications({
        deviceToken: fcmToken,
        title,
        body,
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Notification sent successfully!");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  const createNewFCM = async () => {
    try {
      const newToken = await requestFCMToken();
      setFcmToken(newToken);
    } catch (error) {
      console.error("Error generating new FCM token:", error);
    }
  };

  const getNotifications = async (data) => {
    try {
      await apiService.GetNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Error fetching notifications");
      throw error;
    }
  };
  const getAllHospitals = async () => {
    try {
      const response = await apiService.GetAllHospitals();
      setAllHospitals(response.data.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      toast.error("Error fetching hospitals");
      throw error;
    }
  };

  const createHospital = async (userData) => {
    try {
      await apiService.CreateHospital(userData);
      toast.success("Hospital created successfully");
    } catch (error) {
      console.error("Error creating hospital:", error);
      toast.error("Error creating hospital");
      throw error;
    }
  };

  const getAdminProfile = async (id) => {
    try {
      const response = await apiService.GetAdminProfile(id);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      toast.error("Error fetching admin profile");
      throw error;
    }
  };

  const editAdminProfile = async (id, userData) => {
    try {
      const response = await apiService.EditAdminProfile(id, userData);
      setUserData(response.data.data);
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your profile has been edited.`,
        type: "profile",
      });
      toast.success("Admin profile edited successfully");
    } catch (error) {
      console.error("Error editing admin profile:", error);
      toast.error("Error editing admin profile");
      throw error;
    }
  };

  const getPatientProfile = async (id) => {
    try {
      const response = await apiService.GetPatientProfile(id);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching patient profile:", error);
      toast.error("Error fetching patient profile");
      throw error;
    }
  };

  const editPatientProfile = async (id, userData) => {
    try {
      const response = await apiService.EditPatientProfile(id, userData);
      setUserData(response.data.data);
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your patient profile has been edited.`,
        type: "bill",
      });
      toast.success("Patient Edited Successful");
    } catch (error) {
      console.error("Error editing patient profile:", error);
      toast.error("Error editing patient profile");
      throw error;
    }
  };

  const getDoctorProfile = async (id) => {
    try {
      const response = await apiService.GetDoctorById(id);
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
      toast.error("Error fetching doctor profile");
      throw error;
    }
  };

  const editDoctorProfile = async (id, userData) => {
    try {
      const response = await apiService.EditDoctor(id, userData);
      setUserData(response.data.data);
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your doctor profile has been edited.`,
        type: "profile",
      });
      toast.success("Doctor Edited Successful");
    } catch (error) {
      console.error("Error editing doctor profile:", error);
      toast.error("Error editing doctor profile");
      throw error;
    }
  };

  const createBill = async (userData) => {
    try {
      const response = await apiService.CreateBill(userData);
      setBill(response.data.data);
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your bill has been created.`,
        type: "bill",
      });
      toast.success("Bill created successfully");
    } catch (error) {
      console.error("Error creating bill:", error);
      toast.error("Error creating bill");
      throw error;
    }
  };

  const updateBill = async (userData, id) => {
    try {
      const response = await apiService.EditBill(id, userData);
      setBill(response.data.data);
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your bill has been updated.`,
        type: "bill",
      });
      toast.success("bill updated successfully");
    } catch (error) {
      console.error("Error updating bill:", error);
      toast.error("Error updating bill");
      throw error;
    }
  };

  const getBills = async () => {
    try {
      const response = await apiService.GetBills();
      setAllBills(response.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
      toast.error("Error fetching bills");
      throw error;
    }
  };

  const getAllBillsById = async () => {
    try {
      const response = await apiService.GetBillsById();
      setAllBillsById(response.data.data);
    } catch (error) {
      console.error("Error fetching bills:", error);
      toast.error("Error fetching bills");
      throw error;
    }
  };

  const getBillById = async (id) => {
    try {
      const response = await apiService.GetBillById(id);
      setBill(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching bill by ID:", error);
      toast.error("Error fetching bill by ID");
      throw error;
    }
  };

  const deleteBill = async (id) => {
    try {
      await apiService.DeleteBill(id);
      toast.success("Bill deleted successfully");
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your bill has been deleted.`,
        type: "bill",
      });
    } catch (error) {
      console.error("Error deleting bill:", error);
      toast.error("Error deleting bill");
      throw error;
    }
  };

  const getAllAppointments = async () => {
    try {
      const response = await apiService.GetAllAppointments();
      setAllAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments");
      throw error;
    }
  };
  const getAllTodayAppointments = async (id) => {
    try {
      const response = await apiService.GetAllTodayAppointments(id);
      setAllAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Error fetching appointments");
      throw error;
    }
  };

  const getAppointmentById = async (id) => {
    try {
      const response = await apiService.GetAppointmentById(id);
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
      toast.error("Error fetching appointment by ID");
      throw error;
    }
  };

  const getAllAppointmentById = async (patientId) => {
    try {
      const response = await apiService.GetALLAppointmentById(patientId);
      setAllAppointmentsById(response.data);
    } catch (error) {
      console.error("Error fetching appointment by ID:", error);
      toast.error("Error fetching appointment by ID");
      throw error;
    }
  };

  const editAppointment = async (id, userData) => {
    try {
      await apiService.EditAppointment(id, userData);
      toast.success("Appointment edited successfully");
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your appointment has been edited.`,
        type: "appointment",
      });
    } catch (error) {
      console.error("Error editing appointment:", error);
      toast.error("Error editing appointment");
      throw error;
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      await apiService.CancelAppointment(appointmentId);
      toast.success("Appointment canceled successfully");
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your appointment has been canceled.`,
        type: "appointment",
      });
      if (user.role === "patient") {
        getAppointmetnsForPatient(user.id);
      } else if (user.role === "doctor") {
        getAppointmetnsForDoctor(user.id);
      }
    } catch (error) {
      console.error("Error canceled appointment:", error);
      toast.error("Error canceled appointment");
      throw error;
    }
  };

  const getChatHistory = async (doctorId, patientId) => {
    try {
      const response = await apiService.GetChatHistory(doctorId, patientId);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      toast.error("Error fetching chat history");
      throw error;
    }
  };

  const getDoctorContacts = async (patientId) => {
    try {
      const response = await apiService.GetDoctorContacts(patientId);
      return response.data;
    } catch (error) {
      console.error("Error fetching doctor contacts:", error);
      toast.error("Error fetching doctor contacts");
      throw error;
    }
  };

  const getPatientContacts = async (doctorId) => {
    try {
      const response = await apiService.GetPatientContacts(doctorId);
      return response.data;
    } catch (error) {
      console.error("Error fetching patient contacts:", error);
      toast.error("Error fetching patient contacts");
      throw error;
    }
  };
  const createAppointment = async (patientId, userData, selectedDoctor) => {
    try {
      await apiService.createAppointment(patientId, userData);
      onClickNotification(
        selectedDoctor.deviceToken,
        "New Appointment",
        "You have a new appointment",
      );
      onClickNotification(
        fcmToken,
        "New Appointment",
        "Your appointment has been booked successfully.",
      );
      socket.emit("sendNotification", {
        userId: patientId || user.id,
        message: `Your appointment has been booked.`,
        type: "bill",
      });
      if (user.role === "patient") {
        getAppointmetnsForPatient(user.id);
      } else if (user.role === "doctor") {
        getAppointmetnsForDoctor(user.id);
      }
      toast.success("Appointment created successfully");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const updateAppointment = async (id, userData) => {
    try {
      await apiService.EditAppointment(id, userData);
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your appointment has been edited.`,
        type: "appointment",
      });
      toast.success("Appointment edited successfully");
      if (user.role === "patient") {
        getAppointmetnsForPatient(user.id);
      } else if (user.role === "doctor") {
        getAppointmetnsForDoctor(user.id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error editing appointment");
      throw error;
    }
  };
  const deleteAppointment = async (id) => {
    try {
      await apiService.DeleteAppointment(id);
      toast.success("Appointment deleted successfully");
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your appointment has been deleted.`,
        type: "appointment",
      });
      if (user.role === "patient") {
        getAppointmetnsForPatient(user.id);
      } else if (user.role === "doctor") {
        getAppointmetnsForDoctor(user.id);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting appointment");
      throw error;
    }
  };
  const getAllPrescriptions = async () => {
    try {
      const response = await apiService.GetAllPrescriptions();
      setAllPrescriptions(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching prescriptions");
      throw error;
    }
  };
  const getAppointmetnsForDoctor = async (doctorId) => {
    try {
      const response = await apiService.GetAppointsForDoctor(doctorId);
      setAllAppointments(response.data.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching appointments");
      throw error;
    }
  };
  const getAppointmetnsForPatient = async (patientId) => {
    try {
      const response = await apiService.GetAppointsForPatient(patientId);
      setAllAppointments(response.data.data);
      return response.data.data;
    } catch (error) {
      console.error(error);
      toast.error("Error fetching appointments");
      throw error;
    }
  };

  const createPrescription = async (prescriptionData, id) => {
    try {
      const response = await apiService.CreatePrescription(
        prescriptionData,
        id,
      );
      setPrescription(response.data.data);
      socket.emit("sendNotification", {
        userId: user.id,
        message: `Your prescription has been created.`,
        type: "prescription",
      });
      toast.success("Prescription created successfully");
    } catch (error) {
      console.error("Error creating prescription:", error);
      toast.error("Error creating prescription");
      throw error;
    }
  };

  const findPatientPrescriptions = async (patientId) => {
    try {
      const response = await apiService.GetPrescriptionById(patientId);
      setPatientPrescription(response.data);
    } catch (error) {
      console.error("Error creating prescription:", error);
      throw error;
    }
  };

  const appointmentDone = function (id) {
    try {
      const response = apiService.AppointmentDone(id);
      toast.success("Appointment done successfully");
      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Error appointment done");
      throw error;
    }
  };
  const fetchReportingAndAnalytics = async () => {
    try {
      const response = await apiService.GetReporingAndAnalytics();
      const data = response.data;
      setCardData(data);
    } catch (error) {
      console.error("Error fetching reporting and analytics:", error);
      toast.error("Error fetching reporting and analytics");
    }
  };
  return (
    <GlobalContext.Provider
      value={{
        cardData,
        setCardData,
        fetchReportingAndAnalytics,
        appointmentDone,
        getAllPrescriptions,
        allPrescriptions,
        createPrescription,
        prescription,
        setPrescription,
        patientPrescription,
        findPatientPrescriptions,

        // Hospital
        allHospitals,
        updateAppointment,
        getAppointmetnsForDoctor,
        deleteAppointment,
        createAppointment,

        setAllHospitals,
        getAllHospitals,
        createHospital,

        // User Data
        userData,
        setUserData,

        // Admin
        getAdminProfile,
        editAdminProfile,

        // Patient
        getPatientProfile,
        editPatientProfile,

        // Doctor
        getDoctorProfile,
        editDoctorProfile,

        // Bill
        bill,
        setBill,
        allBills,
        allBillsById,
        getBills,
        getAllBillsById,
        getBillById,
        createBill,
        updateBill,
        deleteBill,

        // Appointment
        allAppointments,
        allAppointmentsById,
        getAllAppointmentById,
        setAllAppointments,
        getAllAppointments,
        getAppointmentById,
        editAppointment,
        getAllTodayAppointments,
        cancelAppointment,
        getAppointmetnsForPatient,

        // Chat
        getChatHistory,
        getDoctorContacts,
        getPatientContacts,
        searchTerm,
        setSearchTerm,
        selectedOption,
        setSelectedOption,

        // FCM
        fcmToken,
        createNewFCM,
        getNotifications,
        onClickNotification,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
