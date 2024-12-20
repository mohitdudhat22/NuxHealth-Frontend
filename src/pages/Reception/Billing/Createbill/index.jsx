import React, { useState } from 'react';
import { HMCard } from '@/components';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, InputBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Createbill = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientname: '',
    phonenumber: '',
    gender: '',
    age: '',
    doctorname: '',
    diseasename: '',
    description: '',
    paymenttype: '',
    billdate: '',
    billtime: '',
    discount: '',
    tax: '',
    amount: '',
    totalamount: '',
    address: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming ReceptionistCreateBill is an async function that handles the API call
      // const response = await ReceptionistCreateBill(formData);
      // if (response.status === 200) {
      //   navigate('/reception/billing'); // Redirect on success
      // }
    } catch (error) {
      console.error('Error creating bill:', error); // Handle error gracefully
    }
  };

  return (
    <HMCard title={"Create Bill"}>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-4 gap-4'>
          <TextField
            name="patientname"
            value={formData.patientname}
            onChange={handleChange}
            label="Patient Name"
            variant="outlined"
          />
          <TextField
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handleChange}
            label="Phone Number"
            variant="outlined"
            type="number"
          />
          <TextField
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
            variant="outlined"
          />
          <TextField
            name="age"
            value={formData.age}
            onChange={handleChange}
            label="Age"
            variant="outlined"
            type="number"
          />
          <TextField
            name="doctorname"
            value={formData.doctorname}
            onChange={handleChange}
            label="Doctor Name"
            variant="outlined"
          />
          <TextField
            name="diseasename"
            value={formData.diseasename}
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
              value={formData.paymenttype}
              className="w-full"
              label="Payment Type"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="billdate"
            value={formData.billdate}
            onChange={handleChange}
            label="Bill Date"
            variant="outlined"
          />
          <TextField
            name="billtime"
            value={formData.billtime}
            onChange={handleChange}
            label="Bill Time"
            variant="outlined"
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
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            label="Amount"
            variant="outlined"
            type="number"
          />
          <TextField
            name="totalamount"
            value={formData.totalamount}
            onChange={handleChange}
            label="Total Amount"
            variant="outlined"
          />
          <TextField
            name="address"
            value={formData.address}
            onChange={handleChange}
            label="Address"
            variant="outlined"
          />
        </div>
        <div className='mt-4'>
          <Button type="submit" variant="contained" color="primary">
            Create Bill
          </Button>
        </div>
      </form>
    </HMCard>
  );
};
