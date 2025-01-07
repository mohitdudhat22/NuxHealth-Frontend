import { Empty } from "antd";
import React from "react";
import NoDoctorFound from "../../assets/images/cover/no-doctor-found.png";
import NoDetailsFound from "../../assets/images/cover/no-details-found.png";
import NoTodatAppointmentFound from "../../assets/images/cover/no-today-appointmant-found.png";

const CustomEmpty = ({ route }) => {
  const getImage = () => {
    switch (route) {
      case "/admin/doctor-management":
        return NoDoctorFound;
      case "/admin":
        return NoDetailsFound;
      case "/doctor":
        return NoTodatAppointmentFound;
      case "/doctor/patientrecordaccess":
        return NoTodatAppointmentFound;
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-center my-20">
      <img src={getImage()} alt="No Data Found" className="h-full" />
    </div>
  );
};

export default CustomEmpty;
