import { useState } from "react";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types"; // Import PropTypes

const CashPaymentModal = ({ open, handleClose, handlePayment }) => {
  const [amount, setAmount] = useState("");
  const [isPayEnabled, setIsPayEnabled] = useState(false);
  const [error, setError] = useState("");

  // Validate payment amount and enable/disable Pay button
  const handleAmountChange = (e) => {
    const enteredAmount = e.target.value;
    setAmount(enteredAmount);
    setIsPayEnabled(enteredAmount > 0);

    if (enteredAmount === "") {
      setIsPayEnabled(false);
      setError("");
    } else if (!/^\d+(\.\d{1,2})?$/.test(enteredAmount)) {
      // Check for valid decimal or integer
      setError("Please enter a valid amount");
      setIsPayEnabled(false);
    } else if (parseFloat(enteredAmount) <= 0) {
      setError("Amount must be greater than zero");
      setIsPayEnabled(false);
    } else {
      setError("");
      setIsPayEnabled(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPayEnabled) {
      handlePayment(amount);
      handleClose(); // Close the modal after payment
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="p-6 bg-white rounded-md shadow-lg w-80 mx-auto my-20">
        <Typography variant="h6" className="mb-4">
          Cash Payment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter Amount"
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="₹ 00000"
            fullWidth
            required
            error={!!error} // Display error if validation fails
            helperText={error} // Show error message below the input field
          />
          <div className="flex justify-between items-center mt-4">
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isPayEnabled}
            >
              Pay
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

// PropTypes validation
CashPaymentModal.propTypes = {
  open: PropTypes.bool.isRequired, // Validate open as a required boolean
  handleClose: PropTypes.func.isRequired, // Validate handleClose as a required function
  handlePayment: PropTypes.func.isRequired, // Validate handlePayment as a required function
};

export default CashPaymentModal;
