import { FaCalendarAlt } from "react-icons/fa";

export const AppointmentCard = () => {
  return (
    <>
      <div className="aside-img mx-auto w-4/5 bg-[#f4f4f4] text-center relative p-4 mb-4 rounded-lg">
        <img
          src="/img/header-img.png"
          alt="Hospital"
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-1/2"
        />
        <div className="text mt-12">
          <h3 className="text-[#141414] text-lg font-semibold">
            Hospital appointment
          </h3>
          <p className="text-[#4f4f4f] text-sm py-2">
            You have to fill up the form to be admitted to the hospital.
          </p>
          <div className="btn flex justify-center">
            <button className="flex items-center bg-[#0eabeb] text-white px-4 py-2 rounded-lg">
              <FaCalendarAlt className="mr-2" />
              <span>Appointment</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
