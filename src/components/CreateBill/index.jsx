'use client'

import { useState } from 'react'
import { NHButton, NHInput, NHSelect } from "@/components"

const CreateBill = () => {
    const [formData, setFormData] = useState({
        patientName: '',
        phoneNumber: '',
        gender: '',
        age: '',
        doctorName: '',
        diseaseName: '',
        description: '',
        paymentType: '',
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
        claimedAmount: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    const handleChange = (e) => {
        if (typeof e === 'object' && e !== null && 'target' in e) {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        } else {
            const { name, value } = e;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    return (
        <div className="p-4 max-w-[1200px] mx-auto">
            <h2 className="text-xl font-semibold mb-6">Create Bill</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* First Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <NHInput
                        label="Patient Name"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        placeholder="Silver Medical Center"
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
                        onChange={(e) => handleChange({ name: 'gender', value: e.value })}
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
                        value={formData.paymentType}
                        onChange={(e) => handleChange({ name: 'paymentType', value: e.value })}
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

                {/* Insurance Details Section - Only show if payment type is insurance */}
                {formData.paymentType === 'insurance' && (
                    <>
                        <h3 className="text-lg font-medium mt-6 mb-4">Insurance Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                    </>
                )}

                <div className="flex justify-end mt-6">
                    <NHButton type="submit" variant="primary">
                        Send
                    </NHButton>
                </div>
            </form>
        </div>
    )
}

export default CreateBill

