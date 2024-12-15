import { MdCancel } from "react-icons/md";
import PropTypes from "prop-types";

const PatientDetails=({ patient, closeModal }) =>{
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-3 rounded-lg shadow-lg new-xxl:w-[20%] new-xl:w-[25%] new-lg:w-[25%]">
        <div className="patientdetails-section">
          <div className="row">
            <div className="details bg-white rounded-lg p-5">
              <div className="top flex justify-between items-center border-b border-gray-300 pb-2">
                <h3 className="new-xxl:text-2xl new-xl:text-lg new-lg:text-md font-bold text-gray-900">
                  Patient Details
                </h3>
                <div
                  className="icon text-red-500 new-xxl:text-3xl new-xl:text-lg new-lg:text-md cursor-pointer"
                  onClick={closeModal}
                >
                  <MdCancel />
                </div>
              </div>
              <div className="data mt-4">
                <ul>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Patient Name
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">{`${patient?.firstName} ${patient?.lastName}`}</p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Email
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.email}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Phone Number
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.phone}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Age
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.age}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Gender
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.gender}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Blood Group
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.bloodGroup}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Height (cm)
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.height}
                    </p>
                  </li>
                  <li className="flex justify-between">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Weight (kg)
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {patient?.weight}
                    </p>
                  </li>
                  <li className="flex justify-between py-2">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                      Date of Birth
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                      {new Date(patient?.dob).toLocaleDateString()}
                    </p>
                  </li>
                  <li className="">
                    <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600 pb-2">
                      Address
                    </h3>
                    <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">{`${patient?.address}, ${patient?.city}, ${patient?.state}, ${patient?.country}`}</p>
                  </li>
                  <template v-if="patient.appointment">
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Appointment Type
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {patient?.appointment?.type}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Appointment Date
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {new Date(
                          patient?.appointment?.date
                        ).toLocaleDateString()}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Appointment Time
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {new Date(
                          patient?.appointment?.appointmentTime
                        ).toLocaleTimeString()}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Doctor Name
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {patient?.appointment.doctorId?.name}
                      </p>
                    </li>
                    <li className="flex justify-between py-2">
                      <h3 className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-semibold text-gray-600">
                        Patient Issue
                      </h3>
                      <p className="new-xxl:text-lg new-xl:text-md new-lg:text-md font-medium text-gray-900">
                        {patient?.appointment?.patient_issue}
                      </p>
                    </li>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


PatientDetails.propTypes = {
  patient: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    gender: PropTypes.string.isRequired,
    bloodGroup: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    weight: PropTypes.number.isRequired,
    dob: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    appointment: PropTypes.shape({
      type: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      appointmentTime: PropTypes.string.isRequired,
      patient_issue: PropTypes.string.isRequired,
      doctorId: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  }).isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default PatientDetails