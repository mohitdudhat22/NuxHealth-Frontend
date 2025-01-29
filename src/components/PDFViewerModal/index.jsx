import { useState } from "react";
import { Button } from "antd";
import Icons from "@/constants/Icons";

export const PDFViewerModal = ({ isOpen, onClose, pdfUrl, fileName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{fileName}</h2>
          <Button
            type="text"
            icon={<Icons.Close className="h-5 w-5" />}
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          />
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-auto p-4">
          <iframe
            src={pdfUrl}
            title={fileName}
            className="w-full h-full min-h-[500px]"
            frameBorder="0"
          />
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-4 border-t">
          <Button
            type="primary"
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};