'use client'

import { useState } from 'react'
import { NHButton, NHCard, NHInput, NHSelect } from "@/components"

const CreateBill = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        phoneNumber: '',
        gender: null,
        age: '',
        doctorName: '',
        diseaseName: '',
        description: '',
        paymentType: null,
        billDate: '',
        billTime: '',
        billNumber: '',
        discount: '',
        tax: '',
        amount: '',
        totalAmount: '',
        address: '',
        insuranceCompany: '',
        insurancePlan: '',
        claimAmount: '',
        claimedAmount: '',
        billStatus: null,
        insuranceType: null
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }
    const handleChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    const handleSelectChange = (value, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
    return (
        <>
            <NHCard className='p-6' title={"Create Bill"}>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    {/* First Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <NHInput
                            label="Patient Name"
                            name="patientName"
                            placeholder="Silver Medical Center"
                            value={formData.patientName}
                            onChange={handleChange}
                        />
                        <NHInput
                            label="Phone Number"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="991302 3830"
                        />
                        <NHSelect
                            label="Gender"
                            name="gender"
                            value={formData.gender}
                            onChange={(value) => handleSelectChange(value, 'gender')}
                            placeholder="Select Gender"
                            options={[
                                { value: 'male', label: 'Male' },
                                { value: 'female', label: 'Female' },
                                { value: 'other', label: 'Other' }
                            ]}
                        />
                        <NHInput
                            label="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="22 Years"
                        />
                    </div>

                    {/* Second Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <NHInput
                            label="Doctor Name"
                            name="doctorName"
                            value={formData.doctorName}
                            onChange={handleChange}
                            placeholder="Dr. Marcus Phillips"
                        />
                        <NHInput
                            label="Disease Name"
                            name="diseaseName"
                            value={formData.diseaseName}
                            onChange={handleChange}
                            placeholder="Meningococcal Disease"
                        />
                        <NHInput
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Lorem ipsum dolor sit amet, consectetur"
                        />
                        <NHSelect
                            label="Payment Type"
                            name="paymentType"
                            placeholder="Select Payment Type"
                            value={formData.paymentType}
                            onChange={(value) => handleSelectChange(value, 'paymentType')}
                            options={[
                                { value: 'insurance', label: 'Insurance' },
                                { value: 'cash', label: 'Cash' },
                                { value: 'card', label: 'Card' }
                            ]}
                        />
                    </div>

                    {/* Third Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <NHInput
                            label="Bill Date"
                            name="billDate"
                            type="date"
                            value={formData.billDate}
                            onChange={handleChange}
                        />
                        <NHInput
                            label="Bill Time"
                            name="billTime"
                            type="time"
                            value={formData.billTime}
                            onChange={handleChange}
                        />
                        <NHInput
                            label="Bill Number"
                            name="billNumber"
                            value={formData.billNumber}
                            onChange={handleChange}
                            placeholder="102"
                        />
                        <NHInput
                            label="Discount (%)"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            placeholder="20%"
                        />
                    </div>

                    {/* Fourth Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <NHInput
                            label="Tax"
                            name="tax"
                            value={formData.tax}
                            onChange={handleChange}
                            placeholder="₹ 250"
                        />
                        <NHInput
                            label="Amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="₹ 2,500"
                        />
                        <NHInput
                            label="Total Amount"
                            name="totalAmount"
                            value={formData.totalAmount}
                            onChange={handleChange}
                            placeholder="₹ 2,500"
                        />
                        <NHInput
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="350 Riverside Avenue"
                        />
                    </div>

                    {/* Add Bill Status after Third Row */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <NHSelect
                            label="Bill Status"
                            name="billStatus"
                            placeholder="Select Bill Status"
                            value={formData.billStatus}
                            onChange={(value) => handleSelectChange(value, 'billStatus')}
                            options={[
                                { value: 'paid', label: 'Paid' },
                                { value: 'unpaid', label: 'Unpaid' }
                            ]}
                        />
                    </div>

                    {formData.paymentType !== 'insurance' && <div className="flex justify-end mt-6">
                        <NHButton type="submit" variant="primary">
                            Send
                        </NHButton>
                    </div>}
                </form>

            </NHCard>
            <div className='mt-9'   >
                {/* Insurance Details Section */}
                {formData.paymentType === 'insurance' && (
                    <NHCard title="Insurance Details" className='p-6'>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <NHSelect
                                label="Insurance Type"
                                name="insuranceType"
                                placeholder="Select Insurance Type"
                                value={formData.insuranceType}
                                onChange={(value) => handleSelectChange(value, 'insuranceType')}
                                options={[
                                    { value: 'cash', label: 'Cash' },
                                    { value: 'cashless', label: 'Cashless' }
                                ]}
                            />
                            <NHInput
                                label="Insurance Company"
                                name="insuranceCompany"
                                value={formData.insuranceCompany}
                                onChange={handleChange}
                                placeholder="Acorn Crafts"
                            />
                            <NHInput
                                label="Insurance Plan"
                                name="insurancePlan"
                                value={formData.insurancePlan}
                                onChange={handleChange}
                                placeholder="Health"
                            />
                            <NHInput
                                label="Claim Amount"
                                name="claimAmount"
                                value={formData.claimAmount}
                                onChange={handleChange}
                                placeholder="₹ 2,050"
                            />
                            <NHInput
                                label="Claimed Amount"
                                name="claimedAmount"
                                value={formData.claimedAmount}
                                onChange={handleChange}
                                placeholder="₹ 2,050"
                            />
                        </div>
                       <div className="flex justify-end mt-6">
                        <NHButton type="submit" variant="primary">
                            Send
                            </NHButton>
                        </div>  
                    </NHCard>
                )}
                
               
            </div>

        </>
    )
}

export default CreateBill

