import { NHButton } from '@/components';
import { AddRecordModal } from '@/components/NHModalComponents/ModalTemplate/AddRecordModal';
import { AppointmentBookingModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentBookingModal';
import { AppointmentCancelSuccessfullyModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentCancelSuccessfullyModal';
import { AppointmentDeleteSlotModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentDeleteSlotModal';
import { AppointmentEditDeleteModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentEditDeleteModal';
import { AppointmentEditSlotModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentEditSlotModal';
import { AppointmentModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentModal';
import { AppointmentNotAvailableModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentNotAvailableModal';
import { CancelOnlineAppointmentModal } from '@/components/NHModalComponents/ModalTemplate/CancelOnlineAppointmentModal';
import { CancelOnsiteAppointmentModal } from '@/components/NHModalComponents/ModalTemplate/CancelOnsiteAppointmentModal';
import { CustomDateModal } from '@/components/NHModalComponents/ModalTemplate/CustomDateModal';
import { ImageModal } from '@/components/NHModalComponents/ModalTemplate/ImageModal';
import { JoinCallModal } from '@/components/NHModalComponents/ModalTemplate/JoinCallModal';
import { PaymentMethodModal } from '@/components/NHModalComponents/ModalTemplate/PaymentMethodModal';
import { PaymentMethodProcessModal } from '@/components/NHModalComponents/ModalTemplate/PaymentMethodProcessModal';
import { ReminderJoinModal } from '@/components/NHModalComponents/ModalTemplate/ReminderJoinModal';
import { ReminderModal } from '@/components/NHModalComponents/ModalTemplate/ReminderModal';
import { RescheduleAppointmentModal } from '@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal';
import { SelectPaymentTypeModal } from '@/components/NHModalComponents/ModalTemplate/SelectPaymentTypeModal';
import React, { useState } from 'react'

export const AllModalTemplate = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [appoEditDelete, setAppoEditDelete] = useState(false)
    const [appoEditSlot, setAppoEditSlot] = useState(false)
    const [appoDeleteSlot, setAppoDeleteSlot] = useState(false)
    const [customDate, setCustomDate] = useState(false)
    const [cancelOnlineAppo, setCancelOnlineAppo] = useState(false)
    const [appoCancelSuccessfully, setAppoCancelSuccessfully] = useState(false)
    const [cancelOnsiteAppo, setCancelOnsiteAppo] = useState(false)
    const [rescheduleAppo, setRescheduleAppo] = useState(false)
    const [addRecord, setAddRecord] = useState(false)
    const [reminder, setReminder] = useState(false)
    const [reminderJoin, setReminderJoin] = useState(false)
    const [joinCall, setJoinCall] = useState(false)
    const [appointment, setAppointment] = useState(false)
    const [image, setImage] = useState(false)
    const [appoBooking, setAppoBooking] = useState(false)
    const [selectPaymentType, setSelectPaymentType] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState(false)
    const [paymentMethodProcess, setPaymentMethodProcess] = useState(false)

    const AppointmentNotAvailable = () => {
        console.log("selectPayment:-");
        setIsModalOpen(true)
    }

    const AppointmentEditDelete = () => {
        console.log("Appointment Edit Delete Modal :- ");
        setAppoEditDelete(true)
    }

    const AppointmentEditSlot = () => {
        console.log("Appointment Edit slot :- ");
        setAppoEditSlot(true)
    }

    const AppointmentDeleteSlot = () => {
        console.log("Appointment Delete Slot :- ");
        setAppoDeleteSlot(true)
    }

    const CustomDate = () => {
        console.log("custom date :-");
        setCustomDate(true)
    }

    const CancelOnlineAppoinment = () => {
        console.log("Cancel Online Appointment :-");
        setCancelOnlineAppo(true)
    }

    const AppointmentCancelSuccessfully = () => {
        console.log("Appointment Cancel Successfully :- ");
        setAppoCancelSuccessfully(true)
    }

    const CancelOnsiteAppoinment = () => {
        console.log("Cancel Onsite Appoinment :- ");
        setCancelOnsiteAppo(true)
    }

    const RescheduleAppointment = () => {
        console.log("Reschedule Appointment :- ");
        setRescheduleAppo(true)
    }

    const AddRecord = () => {
        console.log("Add Record :- ");
        setAddRecord(true)
    }

    const Reminder = () => {
        console.log("Reminder :-");
        setReminder(true)
    }

    const ReminderJoin = () => {
        console.log("Reminder join :-");
        setReminderJoin(true)
    }

    const JoinCall = () => {
        console.log("Join Call :-");
        setJoinCall(true)
    }

    const Appointment = () => {
        console.log("Appointment :-");
        setAppointment(true)
    }

    const ImageBox = () => {
        console.log("ImageBox :-");
        setImage(true)
    }

    const AppointmentBooking = () => {
        console.log("Appointment Booking :-");
        setAppoBooking(true)
    }

    const selectPayType = () => {
        console.log("payMethod Proccess :-");
        setSelectPaymentType(true)
    }


    const payMethod = () => {
        console.log("payMethod :-");
        setPaymentMethod(true)
    }

    const payMethodProccess = () => {
        console.log("payMethod Proccess :-");
        setPaymentMethodProcess(true)
    }


    return (
        <>

            {/* All modal check button  */}

            <div className="pt-10">
                <h2 className='pb-10'>All modal check Button</h2>

                <ul className='flex flex-wrap gap-6 '>
                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => AppointmentNotAvailable()}
                        >
                            Appointment not available
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => AppointmentEditDelete()}
                        >
                            Appointment edit / delete modal
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => AppointmentEditSlot()}
                        >
                            Appointment edit slot
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => AppointmentDeleteSlot()}
                        >
                            Appointment delete slot
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => CustomDate()}
                        >
                            Custom date
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => CancelOnlineAppoinment()}
                        >
                            Cancel online appointment
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => AppointmentCancelSuccessfully()}
                        >
                            Appointment Cancel Successfully
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => CancelOnsiteAppoinment()}
                        >
                            Cancel Onsite Appointment
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => RescheduleAppointment()}
                        >
                            Reschedule Appointment
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => AddRecord()}
                        >
                            Add Record
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => Reminder()}
                        >
                            Reminder
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => ReminderJoin()}
                        >
                            Reminder Join
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => JoinCall()}
                        >
                            Join Call
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => Appointment()}
                        >
                            Appointment
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => ImageBox()}
                        >
                            Image
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => AppointmentBooking()}
                        >
                            Appointment Booking
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => selectPayType()}
                        >
                            Select Payment Type
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => payMethod()}
                        >
                            payment Method
                        </NHButton>
                    </li>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => payMethodProccess()}
                        >
                            Payment Method Process
                        </NHButton>
                    </li>

                </ul>
            </div>



            {/* Appointment not available modal  */}

            <AppointmentNotAvailableModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            />

            {/* Appointment edit / delete modal  */}

            <AppointmentEditDeleteModal
                open={appoEditDelete}
                handleClose={() => setAppoEditDelete(false)}
            />

            {/* Appointment edit slot modal  */}

            <AppointmentEditSlotModal
                open={appoEditSlot}
                handleClose={() => setAppoEditSlot(false)}
            />

            {/* Appointment Delete slot modal  */}

            <AppointmentDeleteSlotModal
                open={appoDeleteSlot}
                handleClose={() => setAppoDeleteSlot(false)}
            />

            {/* custom date modal  */}

            <CustomDateModal
                open={customDate}
                handleClose={() => setCustomDate(false)}
            />

            {/* Cancel Online Appointment Modal */}

            <CancelOnlineAppointmentModal
                open={cancelOnlineAppo}
                handleClose={() => setCancelOnlineAppo(false)}
            />

            {/* Appointment Cancel Successfully Modal */}

            <AppointmentCancelSuccessfullyModal
                open={appoCancelSuccessfully}
                handleClose={() => setAppoCancelSuccessfully(false)}
            />

            {/* cancel onsite appointment modal  */}

            <CancelOnsiteAppointmentModal
                open={cancelOnsiteAppo}
                handleClose={() => setCancelOnsiteAppo(false)}
            />

            {/* reschedule appointment  */}

            <RescheduleAppointmentModal
                open={rescheduleAppo}
                handleClose={() => setRescheduleAppo(false)}
            />

            {/* add record modal  */}

            <AddRecordModal
                open={addRecord}
                handleClose={() => setAddRecord(false)}
            />

            {/* reminder modal  */}

            <ReminderModal
                open={reminder}
                handleClose={() => setReminder(false)}
            />

            {/* reminder join modal  */}

            <ReminderJoinModal
                open={reminderJoin}
                handleClose={() => setReminderJoin(false)}
            />

            {/* join call modal  */}

            <JoinCallModal
                open={joinCall}
                handleClose={() => setJoinCall(false)}
            />

            {/* scheduled appointment modal  */}

            <AppointmentModal
                open={appointment}
                handleClose={() => setAppointment(false)}
            />

            {/* image modal  */}

            <ImageModal
                open={image}
                handleClose={() => setImage(false)}
            />

            {/* appointment booking modal  */}

            <AppointmentBookingModal
                open={appoBooking}
                handleClose={() => setAppoBooking(false)}
            />

            {/* payment method modal  */}

            <PaymentMethodModal
                open={paymentMethod}
                handleClose={() => setPaymentMethod(false)}
            />

            {/* payment method Processmodal  */}

            <PaymentMethodProcessModal
                open={paymentMethodProcess}
                handleClose={() => setPaymentMethodProcess(false)}
            />

            <SelectPaymentTypeModal
                open={selectPaymentType}
                handleClose={() => setSelectPaymentType(false)}
            />





        </>
    )
}
