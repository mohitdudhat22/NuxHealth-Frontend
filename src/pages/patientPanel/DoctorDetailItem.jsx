import PropTypes from "prop-types";

const DoctorDetailItem = ({ title, value }) => (
  <div>
    <h6 className="text-gray-500 font-medium">{title}</h6>
    <p className="text-black font-medium">{value}</p>
  </div>
);

DoctorDetailItem.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default DoctorDetailItem;
