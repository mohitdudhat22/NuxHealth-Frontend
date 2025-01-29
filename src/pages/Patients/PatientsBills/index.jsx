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
import Icons from "@/constants/Icons";
import { usePatientPaidBills } from "@/hook/Patients/PatientBills";
import { usePatientUnpaidBills } from "@/hook/Patients/PatientBills/Unpaid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const PatientBills = () => {
  const { data: paidData } = usePatientPaidBills();
  const { data: unpaidData } = usePatientUnpaidBills();
  const [selectPaymentType, setSelectPaymentType] = useState(false);
  const [cardOption, setCardOption] = useState(false);
  const [payType, setPayType] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const razorPay = async (data) => {
    console.log("Razorpay", data);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }api/payment/create-order-direct-pay`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
        }
      );
      const order = await response.json();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.totalAmount * 100,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          const verifyResponse = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}api/payment/verify-payment`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                ...data,
              }),
            }
          );

          const data = await verifyResponse.json();
          if (data.verified) {
            toast.success("Payment successful!");
            await handleBooking();
            toast.success("Appointment successfully booked!");
          } else {
            toast.error("Payment verification failed!");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed!");
    }
  };

  const tabItems = [
    {
      key: "Unpaid Bills",
      label: "Unpaid Bills",
      children: (
        <>
          <NHCard title="Unpaid Bills">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    headerContent={
                      <NHButton
                        isView
                        onClick={() =>
                          navigate(`/patient/bills/bill-view`, {
                            state: { billData: data },
                          })
                        }
                      ></NHButton>
                    }
                    footerContent={
                      <NHButton
                        size={"small"}
                        className={"w-full"}
                        onClick={() => razorPay(data)}
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    headerContent={
                      <NHButton
                        isView
                        onClick={() => navigate(`/patient/bills/bill-view`)}
                      ></NHButton>
                    }
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
