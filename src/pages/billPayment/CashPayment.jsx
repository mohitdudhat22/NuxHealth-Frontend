import PropTypes from "prop-types";
export default function CashPayment({ setIsPayment, billData }) {
  return (
    <>
      <div className="cashpayment-section flex items-center justify-center">
        <div className="row">
          <div className="popup bg-white p-5 mx-auto w-[35rem] rounded-lg">
            <div className="title pb-2 text-2xl font-bold text-gray-900 border-b border-gray-200 mb-5">
              <h2>Cash Payment</h2>
            </div>
            <div className="input-box relative py-4 mb-4 w-full">
              <div className="label absolute top-1 left-4 text-gray-900 text-lg font-medium bg-white px-1">
                Enter Amount
              </div>
              <input
                type="text"
                placeholder="₹000000"
                className="w-full p-5 border border-gray-300 rounded-lg text-gray-500 text-base font-normal"
              />
            </div>
            <div className="btns flex justify-between">
              <button
                onClick={() => setIsPayment(false)}
                className="cancel w-[45%] border border-gray-300 rounded-lg py-2 text-gray-800 text-lg font-semibold mr-2"
              >
                Cancel
              </button>
              <button className="pay w-[45%] bg-gray-100 rounded-lg py-2 text-gray-700 text-lg font-semibold ml-2 focus:bg-[#0EABEB] focus:text-white">
                Pay
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Add PropTypes validation
CashPayment.propTypes = {
  setIsPayment: PropTypes.func.isRequired,
  billData: PropTypes.object,
};
