import React, { useEffect, useState } from "react";

import apiService from "../../services/api.js";
import { IoIosArrowBack } from "react-icons/io";
import { TbBuildingHospital } from "react-icons/tb";
import { IoLinkSharp } from "react-icons/io5";
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import toast from "react-hot-toast";
import { CiMapPin } from "react-icons/ci";

const Onsite = ({ selectedDoctor, setOpenModel }) => {
  const [doctor, setDoctor] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await apiService.GetDoctorById(selectedDoctor._id);
        setDoctor(response.data.data);
      } catch (error) {
        setError(
          "Error fetching doctor details: " +
            (error.response ? error.response.data.message : error.message),
        );
        toast.error("Error fetching doctor details");
      } finally {
      }
    };
    fetchDoctorDetails();
  }, []);

  const handleBack = () => {
    setOpenModel(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-2/6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-5/6 m-3">
        <div className="p-4">
          <div className="flex flex-col space-y-6">
            {/* Header Section */}
            <div className="flex items-center border-b border-gray-200 pb-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full text-xl border border-gray-200 cursor-pointer"
                onClick={() => handleBack()}
              >
                <IoIosArrowBack />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 ml-4">
                Doctor Management
              </h3>
            </div>

            {/* Doctor Box */}
            <div className="bg-blue-900 rounded-lg p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={doctor.avatar}
                  className="w-20 h-20 rounded-full"
                  alt="Doctor Avatar"
                />
                <div>
                  <h4 className="text-lg font-extrabold">Dr. {doctor.name}</h4>
                  <p className="flex items-center text-base font-medium mt-2 bg-[#718EBF] px-4 py-2 rounded-full space-x-2">
                    <CiMapPin />
                    <span>{doctor.gender}</span>
                  </p>
                </div>
              </div>
              <button className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold border border-white">
                Onsite
              </button>
            </div>

            {/* Details Table 1 */}
            <div className="bg-[#F6F8FB] rounded-lg px-4">
              <table className="w-full table-fixed text-left">
                <tbody>
                  <tr>
                    <td className="py-1 w-2/4">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Doctor Qualification
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.qualification}
                      </p>
                    </td>
                    <td className="py-1 w-2/4">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Years Of Experience
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.experience}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Specialty Type
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.speciality}
                      </p>
                    </td>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Working Time
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.workingTime}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Patient Check Up Time
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.patientCheckupTime}
                      </p>
                    </td>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Break Time
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.breakTime}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Description
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.description}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="py-2">
                      <h4 className="py-2 text-gray-500 font-semibold">
                        Signature
                      </h4>

                      <img
                        src={doctor.signatureUpload}
                        alt="Doctor Signature"
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Details Table 2 */}
            <div className="bg-[#F6F8FB] rounded-lg p-4 mt-6">
              <table className="w-full table-fixed text-left">
                <tbody>
                  <tr>
                    <td className="py-1 w-2/4">
                      <h3 className="text-gray-500 text-lg font-normal">Age</h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.age}
                      </p>
                    </td>
                    <td className="py-1 w-2/4">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Email
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.email}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Phone
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.phone}
                      </p>
                    </td>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Online Consultation Rate
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.onlineConsultationRate}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Country
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.country}
                      </p>
                    </td>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        State
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.state}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        Zip Code
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.zipCode}
                      </p>
                    </td>
                    <td className="py-2">
                      <h3 className="text-gray-500 text-lg font-normal">
                        City
                      </h3>
                      <p className="text-gray-800 text-lg font-medium">
                        {doctor.city}
                      </p>
                    </td>
                  </tr>
                  <tr colSpan="3" className="py-2">
                    <td>
                      <h4 className="py-2 text-gray-500 font-semibold">
                        Address
                      </h4>
                      <p colSpan="3" className="py-2 font-semibold">
                        {doctor.address}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Working Details */}
            <div className="bg-gray-100 rounded-lg p-4 mt-6">
              <div className="flex justify-between border-b border-white pb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  Working On Online
                </h3>
                <p className="font-semibold text-[#718EBF]">
                  {doctor.workingOn}
                </p>
              </div>
              <ul className="space-y-4 mt-4">
                <li className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white text-blue-500 rounded-md flex items-center justify-center text-2xl">
                    <TbBuildingHospital />
                  </div>
                  <div>
                    <h2 className="text-gray-500 font-medium">Hospital Name</h2>
                    <p className="font-semibold">{doctor.hospitalName}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white text-blue-500 rounded-md flex items-center justify-center text-2xl">
                    <IoLinkSharp />
                  </div>
                  <div>
                    <h2 className="text-gray-500 font-medium">
                      Hospital Website Link
                    </h2>
                    <p className="font-semibold">{doctor.worksiteLink}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white text-blue-500 rounded-md flex items-center justify-center text-2xl">
                    <BiSolidPhoneCall />
                  </div>
                  <div>
                    <h2 className="text-gray-500 font-medium">
                      Emergency Contact Number
                    </h2>
                    <p className="font-semibold">{doctor.emergencyContactNo}</p>
                  </div>
                </li>
                <li className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white text-blue-500 rounded-md flex items-center justify-center text-2xl">
                    <IoLocation />
                  </div>
                  <div>
                    <h2 className="text-gray-500 font-medium">
                      Hospital Address
                    </h2>
                    <p className="font-semibold">
                      {doctor.hospitalId?.address}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onsite;
