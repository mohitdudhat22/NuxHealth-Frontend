import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import apiService from "../../services/api";

const DoctorDetails = ({ doctorId }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctorData = async () => {
    try {
      const response = await apiService.GetDoctorById(doctorId);
      setDoctor(response.data.data);
    } catch (err) {
      console.error("Error fetching doctor data:", err);
      toast.error("Error fetching doctor data.");
      setError("Failed to fetch doctor data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorData();
  }, [doctorId]);
  console.log(doctorId, "doctor");
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="py-3">
      <div className="bg-white rounded-lg shadow-md overflow-hidden border">
        <div className="p-3 border-b ">
          <h2 className="text-[#030229] text-lg font-bold">Doctor Details</h2>
        </div>
        <div className="bg-[#2522a6] p-2 flex items-center rounded-md m-3">
          <img
            src={doctor.avatar || "./image/Avatar.png"}
            alt="Doctor's photo"
            className="rounded-full border-2 border-white mr-4 w-[80px] h-[80px]"
          />
          <div className="text-white">
            <h2 className="text-lg font-semibold">
              {doctor.firstName} {doctor.lastName}
            </h2>
            <span className="bg-[#718ebf] flex w-[100px] p-1 rounded-full text-sm mt-2">
              <img src="/image/vuesax.png" alt="Gender icon" />
              <h3 className="ms-2">{doctor.gender}</h3>
            </span>
          </div>
        </div>
        <div className="p-2 bg-[#f6f8fb] m-3 rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-[#A7A7A7] font-normal text-md">
                Qualification
              </h3>
              <p className="text[#141414] font-medium text-sm">
                {doctor.qualification}
              </p>
            </div>
            <div>
              <h3 className="text-[#A7A7A7] font-normal text-md">
                Years Of Experience
              </h3>
              <p className="text[#141414] font-medium text-sm">{`${doctor.experience} Years`}</p>
            </div>
            <div>
              <h3 className="text-[#A7A7A7] font-normal text-md">
                Specialty Type
              </h3>
              <p className="text[#141414] font-medium text-sm">
                {doctor.speciality}
              </p>
            </div>
            <div>
              <h3 className="text-[#A7A7A7] font-normal text-md">
                Working Time
              </h3>
              <p className="text[#141414] font-medium text-sm">6 Hour</p>
            </div>
            <div>
              <h3 className="text-[#A7A7A7] font-normal text-md">Break Time</h3>
              <p className="text[#141414] font-medium text-sm">1 Hour</p>
            </div>
            <div>
              <h3 className="text-[#A7A7A7] font-normal text-md">
                Emergency Contact Number
              </h3>
              <p className="text[#141414] font-medium text-sm">
                {doctor.contactNumber}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-[#A7A7A7] font-normal text-md">Description</h3>
            <p className="text[#141414] font-medium text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

DoctorDetails.propTypes = {
  doctorId: PropTypes.string.isRequired,
};

export default DoctorDetails;
