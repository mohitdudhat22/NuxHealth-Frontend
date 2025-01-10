import { useState, useEffect, useRef } from "react";
import { Avatar, Modal } from "antd";
import { NHButton, NHInput } from "@/components";
import Icons from "@/constants/icons";
import { PDFViewerModal } from "@/components/PDFViewerModal";

export const MessageBar = ({ selectedUser, messages, onSendMessage, userId }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const chatContainerRef = useRef(null);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }
  };

  const handlePdfClick = (fileUrl, fileName) => {
    setSelectedPdf({ url: fileUrl, name: fileName });
  };

  const handleImagePreview = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim() && !imagePreview) return;

    onSendMessage({
      type: imagePreview ? "image" : "text",
      content: imagePreview || inputMessage,
    });
    setInputMessage("");
    setImagePreview(null);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith("image")) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = () => {
          const base64String = reader.result.split(",")[1];
          onSendMessage({
            type: "file",
            content: reader.result,
            fileDetails: {
              name: file.name,
              size: file.size,
              type: file.type,
              base64: base64String,
            },
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((groups, message) => {
      const date = formatDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-full flex flex-col h-full">
      {/* User Header */}
      <div className="flex bg-white items-center gap-xl p-xl sticky top-0 z-10">
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
  
      {/* Chat Messages - Scrollable */}
      <div
        ref={chatContainerRef}
        className="p-4 my-xl ml-md overflow-auto flex-1"
      >
        <div>
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              <div className="flex justify-center mb-4">
                <span className="flex items-center justify-center mx-auto bg-[#718EBF1A] py-md px-2xl rounded-[var(--space-md)]">
                  {date}
                </span>
              </div>
              <div>
                {groupedMessages[date].map((message) => {
                  if (!message) return null;
  
                  const isCurrentUser = message.sender === userId;
  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${
                        isCurrentUser ? "justify-end" : "justify-start"
                      } items-end gap-2 mb-3`}
                    >
                      {!isCurrentUser && (
                        <Avatar
                          size={24}
                          src={selectedUser.avatar}
                          alt={`${selectedUser.name} avatar`}
                          className="rounded-full"
                        />
                      )}
                      <div
                        className={`max-w-[70%] ${
                          isCurrentUser
                            ? "bg-blue-500 text-white rounded-l-lg rounded-tr-lg"
                            : "bg-gray-100 text-gray-800 rounded-r-lg rounded-tl-lg"
                        } p-3`}
                      >
                        {message.type === "text" && <p>{message.content}</p>}
                        {message.type === "image" && (
                          <img
                            src={message.content}
                            alt="Chat image"
                            className="rounded-lg max-w-full h-[300px] cursor-pointer"
                            onClick={() => handleImagePreview(message.content)}
                          />
                        )}
                        {message.type === "file" &&
                          message.fileDetails?.type === "application/pdf" && (
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
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
  
      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="ml-md flex items-center gap-md p-4 border-t sticky bottom-0 bg-white z-10"
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
        {imagePreview && (
          <div className="flex items-center gap-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-12 w-12 rounded-lg"
            />
            <NHButton
              variant="ghost"
              onClick={() => setImagePreview(null)}
              className="text-red-500"
            >
              {Icons.Cancel}
            </NHButton>
          </div>
        )}
        <NHInput
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
  
      {/* Image Preview Modal */}
      <Modal
        visible={!!selectedImage}
        footer={null}
        onCancel={() => setSelectedImage(null)}
      >
        <img
          src={selectedImage}
          alt="Preview"
          className="w-full h-auto rounded-lg"
        />
      </Modal>
    </div>
  );
  
};
