import { useState, useEffect } from "react";
import { Avatar } from "antd";
import { NHButton, NHTextArea } from "@/components";
import Icons from "@/constants/icons";
import { PDFViewerModal } from "@/components/PDFViewerModal";

export const MessageBar = ({ selectedUser, messages, onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const handlePdfClick = (fileUrl, fileName) => {
    setSelectedPdf({ url: fileUrl, name: fileName });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    onSendMessage({
      type: "text",
      content: inputMessage,
    });
    setInputMessage("");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      const fileType = file.type.startsWith("image") ? "image" : "file";

      console.log("File uploaded:", fileUrl);
      // Send the file via socket
      onSendMessage({
        type: fileType,
        fileDetails: {
          type: file.type,
          url: fileUrl,
          name: file.name,
        },
      });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col h-full">
        {/* Header */}
        <div className="flex bg-white items-center gap-xl p-xl">
          <Avatar
            size={48}
            src={selectedUser?.avatar}
            alt={`${selectedUser?.name} avatar`}
            className="rounded-full"
          />
          <div>
            <h5 className="font-medium">{selectedUser.name}</h5>
            <p className="font-medium text-silver h5">
              {selectedUser.status === "online" ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="p-4 my-xl ml-md overflow-auto">
          <div className="">
            {/* Date Separator */}
            <div className="flex justify-center">
              <span className="flex items-center justify-center mx-auto bg-[#718EBF1A] py-md px-2xl rounded-[var(--space-md)]">
                Today
              </span>
            </div>

            {/* Messages */}
            <div className="h-[calc(100vh - 26rem - var(--header-height))]">
              {messages?.map((message) => {
                if (!message) return null; // Skip invalid messages
                const { id, sender, type, fileDetails, content, timestamp } =
                  message;
                return (
                  <div
                    key={id}
                    className={`flex ${
                      sender === "user" ? "justify-end" : "justify-start"
                    } items-end gap-2`}
                  >
                    {sender === "doctor" && (
                      <Avatar
                        size={24}
                        src={selectedUser.avatar}
                        alt={`${selectedUser.name} avatar`}
                        className="rounded-full"
                      />
                    )}
                    <div
                      className={`max-w-[70%] ${
                        sender === "user"
                          ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                          : "bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg"
                      } p-3`}
                    >
                      {type === "text" && <p>{content}</p>}
                      {type === "image" && fileDetails?.url && (
                        <img
                          src={fileDetails.url}
                          alt="Chat image"
                          className="rounded-lg max-w-full h-[300px]"
                        />
                      )}
                      {type === "file" && type === "application/pdf" && (
                        <NHButton
                          variant="ghost"
                          className="flex items-center gap-2 w-full hover:bg-opacity-10"
                          onClick={() =>
                            handlePdfClick(fileDetails.url, fileDetails.name)
                          }
                        >
                          <Icons.FileText className="h-5 w-5" />
                          <span>{fileDetails.name}</span>
                        </NHButton>
                      )}
                      <p className="text-xs mt-1 opacity-70">
                        {formatTime(timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Area */}
        <form
          onSubmit={handleSendMessage}
          className="ml-md flex items-center gap-md p-4 border-t"
        >
          <button
            type="button"
            className="bg-transparent relative overflow-hidden me-3"
          >
            {Icons.Upload}
            <input
              type="file"
              onChange={handleFileUpload}
              className="absolute top-0 right-0 min-w-full min-h-full text-[100px] text-right opacity-0 outline-none cursor-pointer block"
            />
          </button>
          <NHTextArea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type a message..."
            parentClassName="w-full"
            className="!resize-none"
          />
          <NHButton icon={Icons.Send} variant="primary" type="submit" />
        </form>

        {/* PDF Viewer Modal */}
        {selectedPdf && (
          <PDFViewerModal
            isOpen={!!selectedPdf}
            onClose={() => setSelectedPdf(null)}
            pdfUrl={selectedPdf.url}
            fileName={selectedPdf.name}
          />
        )}
      </div>
    </>
  );
};
