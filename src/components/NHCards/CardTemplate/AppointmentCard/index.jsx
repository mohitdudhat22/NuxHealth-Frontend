import { firstAidKit } from "@/assets/images";
import { NHButton } from "@/components";

export const AppointmentCard = () => {
  return (
    <>
      <div className="aside-img mx-auto w-4/5 bg-[#f4f4f4] text-center relative p-4 mb-4 rounded-lg">
        <img
          src={firstAidKit}
          alt="Hospital"
          className="absolute -top-2/4 left-1/2 transform -translate-x-1/2 w-1/2"
        />
        <div className="text mt-12">
          <h4 className="text-[#141414] font-semibold">
            Hospital appointment
          </h4>
          <p className="text-[#4f4f4f] py-2">
            You have to fill up the form to be admitted to the hospital.
          </p>
          <div className="btn flex justify-center">
            <NHButton block size='small' variant="primary" className='mt-4'>
              Appointment
            </NHButton>
          </div>
        </div>
      </div>
    </>
  );
};