import React from "react";

const NotAvailable = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Not Available</h2>
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
        <div className="space-y-2">
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            Add Note
          </label>
          <textarea
            id="note"
            placeholder="Write a Note"
            className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            rows={3}
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Disable
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotAvailable;
