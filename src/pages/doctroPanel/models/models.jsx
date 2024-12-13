import React from "react";
import { IoClose } from "react-icons/io5";
import { MdWatchLater } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { LuCalendarX2 } from "react-icons/lu";

{
  /* not Available model */
}
<div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
  <div className="p-6 space-y-4">
    <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
      Not Available
    </h2>
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
          clipRule="evenodd"
        />
      </svg>
      <span>Monday,18 June,2022 09:00 AM - 10:00 AM</span>
    </div>
    <div style={{ position: "relative", padding: "15px 0px 0px" }}>
      <div
        style={{
          position: "absolute",
          top: "4px",
          left: "14px",
          backgroundColor: "white",
          color: "#030229",
        }}
      >
        Add Note
      </div>
      <input
        type="text"
        name="name"
        placeholder="Write a Note                                                                                          "
        className="w-full"
        style={{
          padding: "20px 14px",
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
        }}
      />
    </div>
    <div className="flex justify-between space-x-3">
      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
        Cancel
      </button>
      <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md w-[47%]">
        Disable
      </button>
    </div>
  </div>
</div>;

{
  /* not Available edit delete model */
}
<div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="p-4">
    <div className="flex justify-between items-center mb-4 border-b pb-2">
      <h2 className="text-[24px] font-bold text-[#030229]">Not Available</h2>
      <button className="text-white h-5 w-5 rounded-full bg-red-500 flex justify-center items-center">
        <IoClose />
      </button>
    </div>
    <div className="mb-4">
      <div className="flex items-center font-normal text-base text-[#030229]">
        <MdWatchLater className="mr-2 h-5 w-5 text-[#4F4F4F]" />
        Monday,18 June,2022 09:00 AM - 10:00 AM
      </div>
    </div>

    <div className="font-normal text-base text-[#030229] mb-6">
      <p>
        <MdOutlineSpeakerNotes className="mr-2 h-5 w-5 inline text-[#4F4F4F]" />
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
      </p>
    </div>

    <div className="flex space-x-2">
      <button className="flex-1 bg-[#39973D] text-white font-semibold py-2 px-4 rounded transition duration-300">
        Edit
      </button>
      <button className="flex-1 bg-[#E11D29] text-white font-semibold py-2 px-4 rounded transition duration-300">
        Delete
      </button>
    </div>
  </div>
</div>;

{
  /* edit slot */
}
<div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-lg font-bold mb-4 text-[#030229] border-b pb-3">
    Edit Slot
  </h2>

  <div style={{ position: "relative", padding: "15px 0px 0px" }}>
    <div
      style={{
        position: "absolute",
        top: "4px",
        left: "14px",
        backgroundColor: "white",
        color: "#030229",
        class: "block mb-2 text-sm font-medium text-zinc-700",
      }}
    >
      Select Time
    </div>
    <div className="">
      <select className="block w-full p-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring focus:ring-primary">
        <option>11:00 AM - 12:00 PM</option>
        <option>12:00 PM - 1:00 PM</option>
        <option>1:00 PM - 2:00 PM</option>
        <option>11:00 AM - 12:00 PM</option>
        <option>12:00 PM - 1:00 PM</option>
        <option>1:00 PM - 2:00 PM</option>
        <option>11:00 AM - 12:00 PM</option>
        <option>12:00 PM - 1:00 PM</option>
        <option>1:00 PM - 2:00 PM</option>
        <option>11:00 AM - 12:00 PM</option>
        <option>12:00 PM - 1:00 PM</option>
        <option>1:00 PM - 2:00 PM</option>
      </select>
    </div>
  </div>
  <div
    style={{ position: "relative", padding: "15px 0px 0px" }}
    className="mt-4 mb-3"
  >
    <div
      style={{
        position: "absolute",
        top: "4px",
        left: "14px",
        backgroundColor: "white",
        color: "#030229",
      }}
    >
      Add Note
    </div>
    <input
      type="text"
      name="name"
      placeholder="Write a Note                                                                                          "
      className="w-full text-[#141414]"
      style={{
        padding: "20px 14px",
        border: "1px solid #d9d9d9",
        borderRadius: "10px",
      }}
    />
  </div>
  <div className="flex justify-between space-x-3">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
      Cancel
    </button>
    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md w-[47%]">
      Save
    </button>
  </div>
</div>;

{
  /* delete slot */
}
<div className="bg-card rounded-lg shadow-lg p-3 max-w-xs mx-auto w-full border-t-[6px] border-red-600">
  <div className="flex items-center justify-center mb-4">
    <div className="bg-red-500 rounded-full p-3 text-white text-lg">
      <RiDeleteBin6Fill />
    </div>
  </div>
  <h2 className="text-[24px] text-[#030229] font-bold text-center">
    Delete Time Slot ?
  </h2>
  <p className="text-[#4F4F4F] text-sm font-normal text-center mb-6">
    This slot is to be deleted ?
  </p>
  <div className="flex justify-between space-x-3">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
      No
    </button>
    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md w-[47%]">
      yes
    </button>
  </div>
</div>;

{
  /* cancel online Appointment */
}
<div className="bg-card rounded-lg shadow-lg px-6 py-3 max-w-sm mx-auto w-full border-t-[6px] border-red-600">
  <div className="flex items-center justify-center mb-4">
    <div className="bg-red-500 rounded-full p-3 text-white text-lg">
      <LuCalendarX2 />
    </div>
  </div>
  <h2 className="text-[24px] text-[#030229] font-bold text-center">
    Cancel Online Appointment ?
  </h2>
  <p className="text-[#4F4F4F] text-sm font-normal text-center mb-6 mt-3">
    If you cancel appointment you have to return payment.
  </p>
  <div className="flex justify-between space-x-3">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
      No
    </button>
    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md w-[47%]">
      Payment Return
    </button>
  </div>
</div>;

{
  /* custom date */
}
<div className="bg-card rounded-lg max-w-md shadow-lg p-6">
  <div className="flex justify-between items-center mb-4 border-b pb-3">
    <h2 className="text-lg font-bold mb-4 text-[#030229]">Custom Date</h2>
    <button className="text-white h-5 w-5 rounded-full bg-red-500 flex justify-center items-center">
      <IoClose />
    </button>
  </div>
  <div className="grid grid-cols-2 gap-4 mb-4">
    <div
      style={{ position: "relative", padding: "15px 0px 0px" }}
      className="mt-4 mb-3"
    >
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "14px",
          backgroundColor: "white",
          color: "#030229",
          fontSize: "16px",
        }}
        for="from-date"
      >
        From Date
      </div>
      <input
        id="from-date"
        type="date"
        placeholder="Select Date                                                                                          "
        className="mt-1 block w-full border border-border rounded-md p-2 focus:ring-2 focus:ring-ring"
      />
    </div>
    <div
      style={{ position: "relative", padding: "15px 0px 0px" }}
      className="mt-4 mb-3"
    >
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "14px",
          backgroundColor: "white",
          color: "#030229",
          fontSize: "16px",
        }}
        for="to-date"
      >
        To Date
      </div>
      <input
        id="t0-date"
        type="date"
        placeholder="Select Date                                                                                          "
        className="mt-1 block w-full border border-border rounded-md p-2 focus:ring-2 focus:ring-ring"
      />
    </div>
  </div>
  <div className="flex justify-between space-x-3">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
      Reset
    </button>
    <button className="px-4 py-2 text-sm font-medium text-[#4F4F4F] bg-[#F6F8FB] hover:bg-[#0EABEB] hover:text-white rounded-md px-4 py-2 transition duration-300rounded-md w-[47%]">
      Apply
    </button>
  </div>
</div>;

{
  /* payment method */
}
<div className="max-w-sm mx-auto p-6 rounded-lg shadow-md bg-[#f4f4f4]">
  <h2 className="text-lg font-bold mb-4 text-[#030229] border-b pb-2">
    Payment Method
  </h2>
  <div className="flex items-center justify-between mb-4 bg-white p-2 rounded-md">
    <label for="mastercard" className="flex items-center">
      <img src="/img/master.png" className="bg-[#F4F4F4] rounded-md p-2 me-2" />
      <p className="text-[#141414] text-lg font-bold ">Master Card</p>
    </label>
    <input type="radio" id="mastercard" name="payment" className="mr-2" />
  </div>
  <div className="flex items-center justify-between mb-4 bg-white p-2 rounded-md">
    <label for="visacard" className="flex items-center">
      <img src="/img/visa.png" className="bg-[#F4F4F4] rounded-md p-2 me-2" />
      <p className="text-[#A7A7A7] text-lg font-bold">Visa Card</p>
    </label>
    <input type="radio" id="visacard" name="payment" className="mr-2" />
  </div>
  <div className="flex justify-between space-x-3">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
      No
    </button>
    <button className="px-4 py-2 text-sm font-medium text-white bg-[#0EABEB] rounded-md w-[47%]">
      Payment Return
    </button>
  </div>
</div>;

{
  /* payment method master*/
}
<div className="max-w-md mx-auto p-6 bg-[#f4f4f4] rounded-lg shadow-md">
  <h2 className="text-lg font-bold mb-4 text-[#030229] border-b pb-2">
    Payment Method
  </h2>
  <div className="bg-white rounded-lg p-4 mb-3">
    <div className="flex items-center justify-between mb-4 border-b pb-2">
      <label for="mastercard" className="flex items-center">
        <img
          src="/img/master.png"
          className="bg-[#F4F4F4] rounded-md p-2 me-2"
        />
        <p className="text-[#141414] text-lg font-bold ">Master Card</p>
      </label>
      <input
        type="radio"
        id="master-card"
        name="payment-method"
        className="mr-2"
        checked
      />
    </div>
    <div style={{ position: "relative", padding: "15px 0px 0px" }} className="">
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "14px",
          backgroundColor: "white",
          color: "#030229",
          fontSize: "16px",
        }}
        for="card-holder-name"
      >
        Card Holder Name*
      </div>
      <input
        id="card-holder-name"
        type="text"
        placeholder="Enter Name"
        className="mt-1 block w-full border border-border rounded-md p-2 focus:ring-2 focus:ring-ring"
        required
      />
    </div>
    <div
      style={{ position: "relative", padding: "15px 0px 0px" }}
      className="my-2"
    >
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "14px",
          backgroundColor: "white",
          color: "#030229",
          fontSize: "16px",
        }}
        for="card-number"
      >
        Card Number*
      </div>
      <input
        id="card-number"
        type="text"
        placeholder="Enter Number"
        className="mt-1 block w-full border border-border rounded-md p-2 focus:ring-2 focus:ring-ring"
        required
      />
    </div>

    <div className="flex mb-4">
      <div
        style={{ position: "relative", padding: "15px 0px 0px" }}
        className="pr-2 w-1/2"
      >
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "14px",
            backgroundColor: "white",
            color: "#030229",
            fontSize: "16px",
          }}
          for="expiry-date"
        >
          Expiry Date*
        </div>
        <input
          id="expiry-date"
          type="date"
          placeholder="select"
          className="mt-1 block w-full border border-border rounded-md p-2 focus:ring-2 focus:ring-ring"
          required
        />
      </div>
      <div
        style={{ position: "relative", padding: "15px 0px 0px" }}
        className="pl-2 w-1/2"
      >
        <div
          style={{
            position: "absolute",
            top: "6px",
            left: "14px",
            backgroundColor: "white",
            color: "#030229",
            fontSize: "16px",
          }}
          for="cvv"
        >
          CVV*
        </div>
        <input
          id="cvv"
          type="text"
          placeholder="Enter CVV"
          className="mt-1 block w-full border border-border rounded-md p-2 focus:ring-2 focus:ring-ring"
          required
        />
      </div>
    </div>
  </div>
  <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg">
    <label for="visacard" className="flex items-center">
      <img src="/img/visa.png" className="bg-[#F4F4F4] rounded-md p-2 me-2" />
      <p className="text-[#A7A7A7] text-lg font-bold">Visa Card</p>
    </label>
    <input type="radio" id="visacard" name="payment" className="mr-2" />
  </div>
  <div className="flex justify-between space-x-3">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
      Cancel
    </button>
    <button className="px-4 py-2 text-sm font-medium text-white bg-[#0EABEB] rounded-md w-[47%]">
      Pay Now
    </button>
  </div>
</div>;

{
  /* Appointment Cancel */
}
<div className="bg-card rounded-lg shadow-lg px-3 py-3 max-w-sm mx-auto w-full border-t-[6px] border-[#39973D]">
  <div className="flex items-center justify-center mb-4">
    <div className="bg-[#39973D] rounded-full p-3 text-white text-lg">
      <LuCalendarX2 />
    </div>
  </div>
  <h2 className="text-[22px] text-[#030229] font-bold text-center">
    Appointment Cancel Successfully!
  </h2>
  <p className="text-[#4F4F4F] text-sm font-normal text-center mb-6 mt-1">
    The appointment is successfully cancelled.
  </p>
  <div className="">
    <button className="px-4 py-2 text-sm font-medium text-white bg-[#39973D] rounded-md w-full">
      Okay
    </button>
  </div>
</div>;

{
  /* reminder */
}
<div className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md">
  <h2 className="text-lg font-bold mb-4 text-[#030229] border-b pb-2">
    Reminder
  </h2>
  <div
    className="bg-[#fffcf3] text-[#FFC313] font-bold text-sm p-2 mb-4"
    role="alert"
  >
    <p className="flex items-center p-1">
      <span className="font-bold me-1">
        <MdWatchLater />
      </span>{" "}
      You have a meeting with him in 15 minutes
    </p>
  </div>
  <div className="mb-2 flex justify-between">
    <span className="font-medium text-[#4F4F4F]">Patient Name</span>{" "}
    <span className="text-[#030229]">Marcus Phillips</span>
  </div>
  <div className="mb-2 flex justify-between">
    <span className="font-medium text-[#4F4F4F]">Patient Issue</span>{" "}
    <span className="text-[#030229]">Stomach ache</span>
  </div>
  <div className="mb-2 flex justify-between">
    <span className="font-medium text-[#4F4F4F]">Disease Name</span>{" "}
    <span className="text-[#030229]">Viral Infection</span>
  </div>
  <div className="mb-4 flex justify-between">
    <span className="font-medium text-[#4F4F4F]">Appointment Time</span>{" "}
    <span className="text-[#030229]">4:30 PM</span>
  </div>
  <div className="flex justify-between space-x-3">
    <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md w-[47%]">
      Cancel
    </button>
    <button className="px-4 py-2 text-sm font-medium text-white bg-[#0EABEB] rounded-md px-4 py-2 rounded-md w-[47%]">
      Reschedule
    </button>
  </div>
</div>;
