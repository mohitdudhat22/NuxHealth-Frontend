import { NHButton } from '@/components'
import { PatientView } from '@/components/NHCards/CardTemplate/PatientView'
import { AppointmentModal } from '@/components/NHModalComponents/ModalTemplate/AppointmentModal'
import { PaymentMethodModal } from '@/components/NHModalComponents/ModalTemplate/PaymentMethodModal'
import { PaymentMethodProcessModal } from '@/components/NHModalComponents/ModalTemplate/PaymentMethodProcessModal'
import { SelectPaymentTypeModal } from '@/components/NHModalComponents/ModalTemplate/SelectPaymentTypeModal'
import React, { useState } from 'react'

export const AllBillModel = () => {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const selectPayment = () => {
        console.log("selectPayment:-");
        setIsModalOpen(true)
    }

    return (
        <>

            {/* patient view component */}

            {/* <PatientView /> */}

            {/* tepm modal check button  */}

            {/* <div className="pt-10">
                <h2>temp modal check Button</h2>

                <ul className='flex gap-x-6 '>

                    <li>
                        <NHButton
                            variant="primary"
                            type="submit"
                            onClick={() => selectPayment()}
                        >
                            Payment Btn
                        </NHButton>
                    </li>
                </ul>
            </div> */}


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

            {/* <AppointmentModal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
            /> */}




        </>
    )
}
