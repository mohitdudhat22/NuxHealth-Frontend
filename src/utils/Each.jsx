import PropTypes from "prop-types";

const Each = ({ of, render }) => {
  return (
    <>
      {of.map((item, index) => (
        <div key={item.id || index}>{render(item, index)}</div>
      ))}
    </>
  );
};

Each.propTypes = {
  of: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};

export default Each;
