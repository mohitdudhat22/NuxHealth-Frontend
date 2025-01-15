import React, { useState } from 'react';
import { NHModal } from '@/components';

export const SelectPaymentTypeModal = ({
  onCancel,
  children,
  handleClose,
  Title,
  loading = false,
  selectPaymentType,
  paymentData,
  payType,
  setPayType,
  ...rest
}) => {
  const [paymentType, setPaymentType] = useState();

  const handleOk = () => {
    if (paymentType === 'online') {
      setPayType(true);
      console.log('online should open', payType);
    } else {
      setPayType(false);
    }
  };

  return (
    <NHModal
      title="Select Payment Type"
      open={selectPaymentType}
      handleClose={handleClose}
      IsFooter
      handleOk={handleOk}
      disabledButton={false}
      handleContent="Pay Now"
      confirmLoading={loading}
      {...rest}
    >
      <form>
        <div className="">
          <div className="py-3">
            <div className="flex justify-between items-center border border-[#A7A7A7] py-[12px] px-[14px] rounded-2xl">
              <div className="left flex justify-between items-center ">
                <div className="icon">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.4883 7.09766H6.26163C5.95829 7.09766 5.67663 7.10849 5.41663 7.11932C2.84913 7.27099 2.16663 8.21349 2.16663 11.1385V11.7668C2.16663 12.3627 2.65413 12.8502 3.24996 12.8502H19.5C20.0958 12.8502 20.5833 12.3627 20.5833 11.7668V11.1385C20.5833 7.91016 19.76 7.09766 16.4883 7.09766Z"
                      fill="#0EABEB"
                    />
                    <path
                      d="M3.24996 14.4727C2.65413 14.4727 2.16663 14.9602 2.16663 15.556V18.7085C2.16663 21.9368 2.98996 22.7493 6.26163 22.7493H16.4883C19.7058 22.7493 20.5508 21.9693 20.5833 18.8818V15.556C20.5833 14.9602 20.0958 14.4727 19.5 14.4727H3.24996ZM7.53996 20.106H5.68746C5.24329 20.106 4.87496 19.7377 4.87496 19.2935C4.87496 18.8493 5.24329 18.481 5.68746 18.481H7.55079C7.99496 18.481 8.36329 18.8493 8.36329 19.2935C8.36329 19.7377 7.99496 20.106 7.53996 20.106ZM13.5958 20.106H9.86913C9.42496 20.106 9.05663 19.7377 9.05663 19.2935C9.05663 18.8493 9.42496 18.481 9.86913 18.481H13.5958C14.04 18.481 14.4083 18.8493 14.4083 19.2935C14.4083 19.7377 14.0508 20.106 13.5958 20.106Z"
                      fill="#0EABEB"
                    />
                    <path
                      d="M23.8334 14.4393V8.7626C23.8334 5.37177 21.8942 3.89844 18.9692 3.89844H9.29504C8.4717 3.89844 7.73504 4.0176 7.08504 4.26677C6.57587 4.45094 6.12087 4.72177 5.75254 5.07927C5.55754 5.26344 5.7092 5.56677 5.99087 5.56677H17.7667C20.2042 5.56677 22.1759 7.53844 22.1759 9.97594V17.7434C22.1759 18.0143 22.4684 18.1659 22.6634 17.9709C23.4109 17.1801 23.8334 16.0209 23.8334 14.4393Z"
                      fill="#0EABEB"
                    />
                  </svg>
                </div>
                <div className="details pl-3">
                  <p className="text-[#141414] text-[16px] font-medium">Online</p>
                </div>
              </div>
              <div className="right flex">
                <input
                  type="radio"
                  className="h-[18px] w-[18px]"
                  onChange={() => setPaymentType('online')}
                  checked={paymentType === 'online'}
                />
              </div>
            </div>
          </div>

          <div className="py-3">
            <div className="flex justify-between items-center border border-[#A7A7A7] py-[12px] px-[14px] rounded-2xl">
              <div className="left flex justify-between items-center ">
                <div className="icon">
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_10467_113325)">
                      <path
                        d="M22.1924 3.80758C19.737 1.35225 16.4724 0 13 0C9.52758 0 6.263 1.35225 3.80758 3.80758C1.35225 6.263 0 9.52758 0 13C0 16.4724 1.35225 19.737 3.80758 22.1924C6.263 24.6477 9.52758 26 13 26C16.4724 26 19.737 24.6477 22.1924 22.1924C24.6477 19.737 26 16.4724 26 13C26 9.52758 24.6477 6.263 22.1924 3.80758ZM17.5665 8.50875H15.3644C15.7187 8.97278 15.9627 9.51141 16.0779 10.0838H17.5666V11.6072H16.0781C15.7234 13.3721 14.1616 14.7057 12.2938 14.7057H10.4424L15.5025 19.7658L14.4253 20.843L8.4336 14.8514V13.1823H12.2938C13.3157 13.1823 14.1858 12.5227 14.5024 11.6072H8.4335V10.0838H14.5023C14.1856 9.1683 13.3156 8.50875 12.2937 8.50875H8.4335V6.98532H17.5665V8.50875Z"
                        fill="#A7A7A7"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_10467_113325">
                        <rect width="26" height="26" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="details pl-3">
                  <p className="text-[#141414] text-[16px] font-medium">Cash</p>
                </div>
              </div>
              <div className="right flex">
                <input
                  type="radio"
                  className="h-[18px] w-[18px]"
                  onChange={() => setPaymentType('cash')}
                  checked={paymentType === 'cash'}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </NHModal>
  );
};