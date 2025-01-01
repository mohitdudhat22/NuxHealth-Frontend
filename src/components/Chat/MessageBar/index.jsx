import { user } from "@/assets/images";
import { NHButton, NHTextArea } from "@/components";
import Icons from "@/constants/icons";
import { Avatar } from "antd";
import { useState } from "react";

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
    onSendMessage(inputMessage);
    setInputMessage("");
  };

  return (
    <>
      <div className="w-full flex flex-col h-full">
        {/* Header */}
        <div className="flex bg-white items-center gap-xl p-xl border-b">
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
        <div className="flex-1 p-4 my-xl ml-md overflow-auto">
          <div className="space-y-4">
            {/* Date Separator */}
            <div className="flex justify-center">
              <span className="flex items-center justify-center mx-auto bg-[#718EBF1A] py-md px-2xl rounded-[var(--space-md)]">
                Today
              </span>
            </div>

            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } items-end gap-2`}
              >
                {message.sender === "doctor" && (
                  <Avatar
                    size={24}
                    src={selectedUser.avatar}
                    alt={`${selectedUser.name} avatar`}
                    className="rounded-full"
                  />
                )}
                <div
                  className={`max-w-[70%] ${
                    message.sender === "user"
                      ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                      : "bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg"
                  } p-3`}
                >
                  {message.type === "text" && <p>{message.content}</p>}
                  {message.type === "image" && (
                    <img
                      src={message.imageUrl}
                      alt="Chat image"
                      className="rounded-lg max-w-full h-auto"
                    />
                  )}
                  {message.type === "file" &&
                    message.fileDetails?.type === "pdf" && (
                      <NHButton
                        variant="ghost"
                        className="flex items-center gap-2 w-full hover:bg-opacity-10"
                        onClick={() =>
                          handlePdfClick(
                            message.fileDetails.url,
                            message.fileDetails.name
                          )
                        }
                      >
                        <Icons.FileText className="h-5 w-5" />
                        <span>{message.fileDetails.name}</span>
                      </NHButton>
                    )}
                  <p className="text-xs mt-1 opacity-70">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Area */}
        <form
          onSubmit={handleSendMessage}
          className="ml-md flex items-center gap-md p-4 border-t"
        >
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
