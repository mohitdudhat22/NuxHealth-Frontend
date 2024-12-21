import React, { useState, useEffect } from 'react';
import { HMCard } from '@/components';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getFormattedDateTime } from '@/providers';
import { GetAllDoctors, ReceptionistCreateBill } from '@/axiosApi/ApiHelper';

export const Createbill = () => {
  const navigate = useNavigate();
  const { date, time } = getFormattedDateTime();

  const [formData, setFormData] = useState({
    billDate: date,
    billTime: time,
    amount: "",
    discount: "",
    tax: "",
    totalAmount: "",
    insuranceCompany: "",
    insurancePlan: "",
    claimAmount: "",
    claimedAmount: "",
    doctorId: "",
    phone: "",
    patientId: "",
    gender: "",
    age: "",
    diseaseName: "",
    address: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [formData.amount, formData.discount, formData.tax]);

  const calculateTotalAmount = () => {
    const amount = parseFloat(formData.amount) || 0;
    const discount = parseFloat(formData.discount) || 0;
    const tax = parseFloat(formData.tax) || 0;

    const discountedAmount = amount - (amount * discount / 100);
    const totalAmount = discountedAmount + (discountedAmount * tax / 100);

    setFormData({
      ...formData,
      totalAmount: totalAmount.toFixed(2)
    });
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await GetAllDoctors();
        console.log(response);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, time } = getFormattedDateTime();
    setFormData({
      ...formData,
      billdate: date,
      billtime: time
    });
    try {
      console.log(formData)
      const response = await ReceptionistCreateBill(formData);
      console.log(response)
      if (response.status === true) {
        navigate('/reception/billing'); // Redirect on success
      }
    } catch (error) {
      console.error('Error creating bill:', error); // Handle error gracefully
    }
  };

  return (
    <HMCard title={"Create Bill"}>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-4 gap-4'>
          <TextField
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            label="Patient Name"
            variant="outlined"
          />
          <TextField
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            label="Phone Number"
            variant="outlined"
            type="number"
          />
          <TextField
            name="age"
            value={formData.age}
            onChange={handleChange}
            label="Age"
            variant="outlined"
          />
          <FormControl>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              name="gender"
              value={formData.gender}
              className="w-full"
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={"online"}>Male</MenuItem>
              <MenuItem value={"cash"}>Female</MenuItem>
              <MenuItem value={"Insurance"}>Other</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="address"
            value={formData.address}
            onChange={handleChange}
            label="Address"
            variant="outlined"
          />
          <FormControl>
            <InputLabel id="doctorId">Doctor Name</InputLabel>
            <Select
              labelId="doctorId"
              name="doctorId"
              value={formData.doctorId}
              className="w-full"
              label="Doctor Name"
              onChange={handleChange}
            >
              <MenuItem value={"online"}>Online</MenuItem>
              <MenuItem value={"cash"}>Cash</MenuItem>
              <MenuItem value={"Insurance"}>Insurance</MenuItem>
              <MenuItem value={"card"}>card</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="diseaseName"
            value={formData.diseaseName}
            onChange={handleChange}
            label="Disease Name"
            variant="outlined"
          />
          <TextField
            name="description"
            value={formData.description}
            onChange={handleChange}
            label="Description"
            variant="outlined"
          />
          <FormControl>
            <InputLabel id="paymenttype">Payment Type</InputLabel>
            <Select
              labelId="paymenttype"
              name="paymenttype"
              value={formData.paymentType}
              className="w-full"
              label="Payment Type"
              onChange={handleChange}
            >
              <MenuItem value={"online"}>Online</MenuItem>
              <MenuItem value={"cash"}>Cash</MenuItem>
              <MenuItem value={"Insurance"}>Insurance</MenuItem>
              <MenuItem value={"card"}>card</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            label="Amount"
            variant="outlined"
            type="number"
          />
          <TextField
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            label="Discount (%)"
            variant="outlined"
            type="number"
          />
          <TextField
            name="tax"
            value={formData.tax}
            onChange={handleChange}
            label="Tax"
            variant="outlined"
            type="number"
          />
          <TextField
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            label="Total Amount"
            variant="outlined"
            type="number"
            disabled
          />
        </div>

        {formData.paymenttype === 'Insurance' && (
          <HMCard title={"Insurance Details"} className="mt-4">
            <div className='grid grid-cols-4 gap-4'>
              <TextField
                name="insuranceCompany"
                value={formData.insuranceCompany}
                onChange={handleChange}
                label="Insurance Company"
                variant="outlined"
                type="text"
              />
              <TextField
                name="insurancePlan"
                value={formData.insurancePlan}
                onChange={handleChange}
                label="Insurance Plan"
                variant="outlined"
                type="text"
              />
              <TextField
                name="claimAmount"
                value={formData.claimAmount}
                onChange={handleChange}
                label="claim Amount"
                variant="outlined"
                type="number"
              />
              <TextField
                name="claimedAmount"
                value={formData.claimedAmount}
                onChange={handleChange}
                label="claimed Amount"
                variant="outlined"
                type="number"
              />
            </div>
          </HMCard>
        )}
        <div className='mt-4'>
          <Button type="submit" variant="contained" color="primary">
            Create Bill
          </Button>
        </div>
      </form>
    </HMCard>
  );
};
