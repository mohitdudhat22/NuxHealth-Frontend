import { NHButton } from '@/components';
import { AddRecordModal } from '@/components/NHModalComponents/ModalTemplate/AddRecordModal';
import { AppointmentCancelSuccessfullyModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentCancelSuccessfullyModal';
import { AppointmentDeleteSlotModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentDeleteSlotModal';
import { AppointmentEditDeleteModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentEditDeleteModal';
import { AppointmentEditSlotModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentEditSlotModal';
import { AppointmentModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentModal';
import { AppointmentNotAvailableModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentNotAvailableModal';
import { CancelOnlineAppointmentModal } from '@/components/NHModalComponents/ModalTemplate/CancelOnlineAppointmentModal';
import { CancelOnsiteAppointmentModal } from '@/components/NHModalComponents/ModalTemplate/CancelOnsiteAppointmentModal';
import { CustomDateModal } from '@/components/NHModalComponents/ModalTemplate/CustomDateModal';
import { JoinCallModal } from '@/components/NHModalComponents/ModalTemplate/JoinCallModal';
import { ReminderJoinModal } from '@/components/NHModalComponents/ModalTemplate/ReminderJoinModal';
import { ReminderModal } from '@/components/NHModalComponents/ModalTemplate/ReminderModal';
import { RescheduleAppointmentModal } from '@/components/NHModalComponents/ModalTemplate/ResheduleAppointmentModal';
import React, { useState } from 'react'

export const AllModalTemplate = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const selectPayment = () => {
        console.log("selectPayment:-");
        setIsModalOpen(true)
    }

    return (
        <>

            {/* All modal check button  */}

            <div className="pt-10">
                <h2 className='pb-10'>All modal check Button</h2>

                <ul className='flex gap-x-6 '>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => selectPayment()}
                        >
                            Appointment not available
                        </NHButton>
                    </li>
                </ul>
            </div>


            {/* Appointment not available modal  */}

            {/* <AppointmentNotAvailableModal
                open={isModalOpen}
                handleClose={()=> setIsModalOpen(false)}
            /> */}

            {/* Appointment edit / delete modal  */}

            {/* <AppointmentEditDeleteModal
                open={isModalOpen}
                handleClose={()=> setIsModalOpen(false)}
            /> */}

            {/* Appointment edit slot modal  */}

            {/* <AppointmentEditSlotModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* Appointment Delete slot modal  */}

            {/* <AppointmentDeleteSlotModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* custom date modal  */}

            {/* <CustomDateModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* Cancel Online Appointment Modal */}

            {/* <CancelOnlineAppointmentModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* Appointment Cancel Successfully Modal */}

            {/* <AppointmentCancelSuccessfullyModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* cancel onsite appointment modal  */}

            {/* <CancelOnsiteAppointmentModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* reschedule appointment  */}

            {/* <RescheduleAppointmentModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* add record modal  */}

            {/* <AddRecordModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* reminder modal  */}

            {/* <ReminderModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* reminder join modal  */}

            {/* <ReminderJoinModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* join call modal  */}

            {/* <JoinCallModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* scheduled appointment modal  */}

            {/* <AppointmentModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}









            {/* <SelectPaymentTypeModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* <PaymentMethodModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}

            {/* <PaymentMethodProcessModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}


        </>
    )
}
