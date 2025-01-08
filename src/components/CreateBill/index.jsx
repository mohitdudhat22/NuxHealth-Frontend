import { useEffect, useState } from 'react';
import { NHButton, NHCard, NHInput, NHSelect } from '@/components';
import { AppointmentWithoutBill, getPatientForAdminBill, createBillForAdmin } from '@/axiosApi/ApiHelper';
import axios from 'axios';

// Custom Hook
const useBillForm = () => {
    const [formData, setFormData] = useState({
        selectDoctor: '',
        selectPatient: '',
        selectAppointment: '',
        discount: '',
        tax: '',
        paymentType: null,
        description: [],
        insuranceCompany: '',
        insurancePlan: '',
        claimAmount: '',
        claimedAmount: '',
        notes: '',
        patientName: '',
        doctorName: '',
    });

    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await AppointmentWithoutBill();
                const appointmentsData = response.data;
                setAppointments(appointmentsData);

                const uniqueDoctors = [
                    ...new Map(appointmentsData.map(item => [
                        item.doctorData._id,
                        { value: item.doctorData._id, label: item.doctorData.fullName }
                    ])).values()
                ];
                setDoctors(uniqueDoctors);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    useEffect(() => {
        if (formData.selectDoctor) {
            const filteredPatients = appointments
                .filter(appointment => appointment.doctorData._id === formData.selectDoctor)
                .map(item => ({
                    value: item.patientData._id,
                    label: item.patientData.fullName
                }));

            const uniquePatients = [
                ...new Map(filteredPatients.map(item => [item.value, item])).values()
            ];
            setPatients(uniquePatients);

            setFormData(prev => ({
                ...prev,
                selectPatient: '',
                selectAppointment: ''
            }));
        } else {
            setPatients([]);
        }
    }, [formData.selectDoctor, appointments]);

    useEffect(() => {
        if (formData.selectDoctor && formData.selectPatient) {
            const filtered = appointments.filter(
                appointment =>
                    appointment.doctorData._id === formData.selectDoctor &&
                    appointment.patientData._id === formData.selectPatient
            );

            const formattedAppointments = filtered.map(item => ({
                value: item._id,
                label: `${new Date(item.date).toLocaleDateString()} - ${item.appointmentTime}`
            }));
            setFilteredAppointments(formattedAppointments);
        } else {
            setFilteredAppointments([]);
        }
    }, [formData.selectDoctor, formData.selectPatient, appointments]);

    const handleChange = (e) => {
        if (e.target) {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSelectChange = (value, name) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return {
        formData,
        setFormData,
        doctors,
        patients,
        filteredAppointments,
        handleChange,
        handleSelectChange
    };
};

const CreateBill = () => {
    const {
        formData,
        doctors,
        patients,
        filteredAppointments,
        handleChange,
        handleSelectChange
    } = useBillForm();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            appointmentId: formData.selectAppointment,
            discount: Number(formData.discount),
            tax: Number(formData.tax),
            paymentType: formData.paymentType,
            description: formData.description,
            insuranceDetails: {
                insuranceCompany: formData.insuranceCompany,
                insurancePlan: formData.insurancePlan,
                claimAmount: Number(formData.claimAmount),
                claimedAmount: Number(formData.claimedAmount)
            },
            notes: formData.notes,
            status: true
        };

        try {
            const response = await axios.post('/api/admin/createBill', payload);
            console.log('Bill created successfully:', response.data);
        } catch (error) {
            console.error('Error creating bill:', error);
        }
    };

    return (
        <>
            <div className='mb-9'>
                <NHCard className='p-6 flex justify-between gap-9' title="Select Doctor, Patient, and Appointment">
                    <NHSelect
                        label="Select Doctor"
                        name="selectDoctor"
                        placeholder="Select Doctor"
                        value={formData.selectDoctor}
                        onChange={(value) => handleSelectChange(value, 'selectDoctor')}
                        options={doctors}
                    />
                    <NHSelect
                        label="Select Patient"
                        name="selectPatient"
                        placeholder="Select Patient"
                        value={formData.selectPatient}
                        onChange={(value) => handleSelectChange(value, 'selectPatient')}
                        options={patients}
                    />
                    <NHSelect
                        label="Select Appointment"
                        name="selectAppointment"
                        placeholder="Select Appointment"
                        value={formData.selectAppointment}
                        onChange={(value) => handleSelectChange(value, 'selectAppointment')}
                        options={filteredAppointments}
                    />
                </NHCard>
            </div>

            <NHCard className='p-6' title={"Create Bill"}>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                        <NHInput
                            label="Discount (%)"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                            placeholder="20%"
                        />
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
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                       
                        <NHInput
                            label="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="350 Riverside Avenue"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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

            <div className='mt-9'>
                {formData.paymentType === 'insurance' && (
                    <NHCard title="Insurance Details" className='p-6'>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
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
    );
};

export default CreateBill;
