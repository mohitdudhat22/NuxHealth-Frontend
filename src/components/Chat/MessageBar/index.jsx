import { useState, useEffect } from "react";
import { Avatar } from "antd";
import { NHButton, NHInput } from "@/components";
import Icons from "@/constants/icons";
import { PDFViewerModal } from "@/components/PDFViewerModal";

export const MessageBar = ({ selectedUser, messages, onSendMessage, userId }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [selectedPdf, setSelectedPdf] = useState(null);

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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    onSendMessage({
      type: "text",
      content: inputMessage,
    });
    setInputMessage("");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileType = file.type.startsWith("image") ? "image" : "file";
  
        // Log the file details
        console.log({
          type: fileType,
          fileDetails: {
            type: file.type,
            name: file.name,
            size: file.size,
          },
        });
  
        // Send the file and its details via the socket
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result.split(',')[1];
          onSendMessage({
            type: fileType,
            content: reader.result, // Add this line to set the content for images
            fileDetails: {
              name: file.name,
              size: file.size,
              type: file.type,
              base64: base64String,
            },
            file: file, // Attach the file object
          });
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("File upload failed:", error);
      }
    }
  };

  const isCloudinaryUrl = (url) => {
    return url.includes("res.cloudinary.com");
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

  // Improve right-side and left-side message styling
  const updateMessageStyles = () => {
    const rightSideMessages = document.querySelectorAll('.bg-blue-500');
    const leftSideMessages = document.querySelectorAll('.bg-gray-100');
  
    rightSideMessages.forEach((message) => {
      message.style.backgroundColor = '#4A90E2'; // Softer blue
      message.style.borderRadius = '15px'; // Rounded corners
      message.style.padding = '10px 15px'; // Add better padding
      message.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; // Subtle shadow
    });
  
    leftSideMessages.forEach((message) => {
      message.style.backgroundColor = '#F1F3F5'; // Softer gray
      message.style.borderRadius = '15px'; // Rounded corners
      message.style.padding = '10px 15px'; // Add better padding
      message.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)'; // Subtle shadow
    });
  };

  useEffect(() => {
    updateMessageStyles();
  }, [messages]);

  return (
    <div className="w-full flex flex-col h-full">
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

      <div className="p-4 my-xl ml-md overflow-auto flex-1">
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
                      {message.type === "text" && (
                        <>
                        {isCloudinaryUrl(message.content) ? (
                          <img
                          src={message.content}
                          alt="Chat image"
                          className="rounded-lg max-w-full h-[300px]"
                          />
                        ) : (
                          <p>{message.content}</p>
                        )}
                        </>
                      )}
                      {message.type === "image" && (
                        <img
                        src={message.content}
                        alt="Chat image"
                        className="rounded-lg max-w-full h-[300px]"
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
        <NHInput
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          parentClassName="w-full"
          className="!resize-none"
        />
        <NHButton icon={Icons.Send} variant="primary" type="submit" />
      </form>

      {selectedPdf && (
        <PDFViewerModal
          isOpen={!!selectedPdf}
          onClose={() => setSelectedPdf(null)}
          pdfUrl={selectedPdf.url}
          fileName={selectedPdf.name}
        />
      )}
    </div>
  );
};
