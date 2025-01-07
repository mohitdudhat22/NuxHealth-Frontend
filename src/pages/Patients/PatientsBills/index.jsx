import {
  AppointmentCard,
  BillCard,
  NHButton,
  NHCard,
  NHInput,
  NHTable,
  NHTabs,
  PatientDetailCard,
} from "@/components";
import { PaymentMethodModal } from "@/components/NHModalComponents/ModalTemplate/PaymentMethodModal";
import { PaymentMethodProcessModal } from "@/components/NHModalComponents/ModalTemplate/PaymentMethodProcessModal";
import { SelectPaymentTypeModal } from "@/components/NHModalComponents/ModalTemplate/SelectPaymentTypeModal";
import Icons from "@/constants/icons";
import { usePatientPaidBills } from "@/hook/Patients/PatientBills";
import { usePatientUnpaidBills } from "@/hook/Patients/PatientBills/Unpaid";
import React, { useState } from "react";

export const PatientBills = () => {
  const { data: paidData } = usePatientPaidBills();
  const { data: unpaidData } = usePatientUnpaidBills();
  const [selectPaymentType, setSelectPaymentType] = useState(false);
  const [cardOption, setCardOption] = useState(false);
  const [payType, setPayType] = useState(false);
  const payMethod = () => {
    console.log("payMethod :-");
    setPayType(true);
  };
  const selectPayType = () => {
    console.log("payMethod Proccess :-");
    setSelectPaymentType(true);
  };
  const tabItems = [
    {
      key: "Unpaid Bills",
      label: "Unpaid Bills",
      children: (
        <>
          <NHCard title="Unpaid Bills">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {unpaidData?.map((data, index) => {
                const {
                  billNumber,
                  billId,
                  hospitalName,
                  date,
                  time,
                  totalAmount,
                  status,
                  patientName,
                } = data;
                return (
                  <BillCard
                    key={index}
                    headerBg={true}
                    billNumber={billNumber}
                    billId={billId}
                    hospitalName={hospitalName}
                    date={date}
                    time={time}
                    totalAmount={totalAmount}
                    status={status}
                    patientName={patientName}
                    footerContent={
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        onClick={() => selectPayType()}
                      >
                        Pay Now
                      </NHButton>
                    }
                    className="border border-slate-200"
                  />
                );
              })}
            </div>
          </NHCard>
        </>
      ),
    },
    {
      key: "Paid Bills",
      label: "Paid Bills",
      children: (
        <>
          <NHCard title="Paid Bills">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {paidData?.map((data, index) => {
                const {
                  billNumber,
                  billId,
                  hospitalName,
                  date,
                  time,
                  totalAmount,
                  status,
                  patientName,
                } = data;
                return (
                  <BillCard
                    key={index}
                    headerBg={true}
                    billNumber={billNumber}
                    billId={billId}
                    hospitalName={hospitalName}
                    date={date}
                    time={time}
                    totalAmount={totalAmount}
                    status={status}
                    patientName={patientName}
                    className="border border-slate-200"
                  />
                );
              })}
            </div>
          </NHCard>
        </>
      ),
    },
  ];

  return (
    <>
      <NHCard
        headerContent={
          <NHInput prefix={Icons.SearchIcon} placeholder="Search Patient" />
        }
      >
        <NHTabs items={tabItems} defaultActiveKey="upcoming" />
        <SelectPaymentTypeModal
          open={selectPaymentType}
          handleClose={() => setSelectPaymentType(false)}
          payType={payType}
          setPayType={setPayType}
        />
        <PaymentMethodModal
          open={payType}
          handleClose={() => setPayType(false)}
          cardOption={cardOption}
          setCardOption={setCardOption}
        />
        <PaymentMethodProcessModal
          open={cardOption}
          handleClose={() => setCardOption(false)}
        />
      </NHCard>
    </>
  );
};