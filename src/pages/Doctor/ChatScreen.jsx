import { useEffect, useState, useRef } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  Send,
  AttachFile,
  Image,
  VideoCall,
  Description,
  Close,
  Delete,
} from "@mui/icons-material";
import {socket} from "../../config/socket.js";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useDoctor } from "../../hooks/useDoctor";
import { usePatient } from "../../hooks/usePatient";
import { useGlobal } from "../../hooks/useGlobal";
import ArrowBack from "@mui/icons-material/ArrowBack";

const ChatScreen = () => {
  // States
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [doctorId] = useState(user.id);
  const [patientContacts, setPatientContacts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [previewModal, setPreviewModal] = useState({
    open: false,
    content: null,
    type: null,
    fileName: null,
  });

  // Refs
  const msgContainerRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // Custom hooks
  const { getAllDoctors } = useDoctor();
  const { getAllPatients } = usePatient();
  const {
    getChatHistory,
    getPatientContacts,
    getAppointmetnsForDoctor,
    allAppointments,
  } = useGlobal();

  // Add these new states for mobile view
  const [isMobileView, setIsMobileView] = useState(false);
  const [currentView, setCurrentView] = useState('contacts'); // 'contacts' or 'chat'
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Add this effect to handle mobile view
  useEffect(() => {
    setIsMobileView(isMobile);
  }, [isMobile]);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      await getAppointmetnsForDoctor(user.id);
    };
    fetchAppointments();
  }, []);
  const handleAttachClick = (event) => {
    setAnchorEl(event.currentTarget); // This opens the menu at the clicked element's position
  };
  // Process appointments into contacts
  useEffect(() => {
    if (allAppointments?.length > 0) {
      const uniquePatients = Array.from(
        new Set(allAppointments.map((apt) => apt.patientId._id)),
      ).map((patientId) => {
        const appointment = allAppointments.find(
          (apt) => apt.patientId._id === patientId,
        );
        return {
          _id: appointment.patientId._id,
          firstName: appointment.patientId.firstName,
          lastName: appointment.patientId.lastName,
          profile: appointment.patientId.avatar,
          lastAppointment: new Date(
            appointment.appointmentTime,
          ).toLocaleDateString(),
          email: appointment.patientId.email,
        };
      });
      setPatientContacts(uniquePatients);
      if (!selectedChat && uniquePatients.length > 0) {
        setSelectedChat(uniquePatients[0]);
      }
    }
  }, [allAppointments]);

  // Socket message listener
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("message");
    };
  }, []);

  // Auto scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Functions
  const handleChatClick = async (chat) => {
    setSelectedChat(chat);
    try {
      const history = await getChatHistory(doctorId, chat._id);
      setMessages(history);
      socket.emit("joinRoom", { doctorId, patientId: chat._id });
      toast.success("Chat started successfully.");
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
      toast.error("Failed to fetch chat history.");
    }
  };

  const scrollToBottom = () => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  };

  // Function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Handle file selection
  const handleFileSelect = async (event, type) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = {
      image: ["image/jpeg", "image/png", "image/gif"],
      file: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    };

    if (!allowedTypes[type].includes(file.type)) {
      toast.error(`Invalid ${type} format`);
      return;
    }

    try {
      // Convert file to base64
      const base64File = await fileToBase64(file);

      setPreviewFile({
        file,
        type,
        base64: base64File,
        preview: type === "image" ? base64File : null,
      });
    } catch (error) {
      console.error("File processing error:", error);
      toast.error("Failed to process file");
    }
  };

  // Send message with or without file
  const sendMessage = async () => {
    if ((!messageInput.trim() && !previewFile) || !selectedChat) return;

    try {
      const messageData = {
        doctorId,
        patientId: selectedChat._id,
        senderId: doctorId,
        receiverId: selectedChat._id,
        timestamp: new Date().toISOString(),
      };

      if (previewFile) {
        messageData.type = previewFile.type;
        messageData.fileUrl = previewFile.base64;
        messageData.fileName = previewFile.file.name;
        messageData.fileSize = `${(
          previewFile.file.size /
          (1024 * 1024)
        ).toFixed(2)} MB`;
        messageData.messageContent = messageInput.trim();
      } else {
        messageData.type = "text";
        messageData.messageContent = messageInput.trim();
      }

      socket.emit("message", messageData);
      setMessageInput("");
      setPreviewFile(null);
      scrollToBottom();
    } catch (error) {
      console.error("Send message error:", error);
      toast.error("Failed to send message");
    }
  };

  // Preview component
  const FilePreview = () => {
    if (!previewFile) return null;

    return (
      <div className="relative p-2 bg-gray-50 rounded-lg mb-2">
        {previewFile.type === "image" && (
          <img
            src={previewFile.preview}
            alt="Preview"
            className="max-h-32 rounded-lg"
          />
        )}
        {previewFile.type === "file" && (
          <div className="flex items-center space-x-2">
            <Description className="text-gray-500" />
            <span className="text-sm">{previewFile.file.name}</span>
          </div>
        )}
        <IconButton
          className="absolute top-1 right-1"
          size="small"
          onClick={() => setPreviewFile(null)}
        >
          <Close />
        </IconButton>
      </div>
    );
  };

  const handlePreviewClick = (content, type, fileName) => {
    setPreviewModal({
      open: true,
      content,
      type,
      fileName,
    });
  };

  const handleDeleteMessage = async (messageId) => {
    try {
      if (!selectedChat) return;

      const room = [doctorId, selectedChat._id].sort().join("-");
      socket.emit("deleteMessage", { messageId, room });
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete message");
      throw error;
    }
  };

  // Socket listener for message deletion
  useEffect(() => {
    socket.on("messageDeleted", ({ messageId }) => {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg._id !== messageId),
      );
    });

    return () => {
      socket.off("messageDeleted");
    };
  }, []);

  const renderMessage = (msg, index) => (
    <div
      key={index}
      className={`mb-2 group ${msg?.senderId === doctorId ? "text-right" : "text-left"}`}
    >
      {/* Message Menu - Only show for sender's messages */}
      {msg.senderId === doctorId && (
        <div className="hidden group-hover:inline-block relative mb-1">
          <IconButton
            size="small"
            className="bg-gray-100 hover:bg-gray-200"
            onClick={() => handleDeleteMessage(msg._id)}
          >
            <Delete fontSize="small" className="text-gray-600" />
          </IconButton>
        </div>
      )}

      <div
        className={`inline-block max-w-md relative ${msg?.senderId === doctorId ? "bg-blue-100" : "bg-gray-100"
          } rounded-lg p-3`}
      >
        {msg.type === "text" && <p className="text-sm">{msg.messageContent}</p>}

        {msg.type === "image" && (
          <div className="relative group">
            <img
              src={msg.fileUrl}
              alt="Shared image"
              className="max-w-xs rounded-lg cursor-pointer hover:opacity-90"
              onClick={() =>
                handlePreviewClick(msg.fileUrl, "image", msg.fileName)
              }
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
              {msg.messageContent && (
                <p className="text-sm mb-1">{msg.messageContent}</p>
              )}
              <p className="text-xs">{msg.fileName}</p>
              <p className="text-xs">{msg.fileSize}</p>
            </div>
          </div>
        )}

        {msg.type === "file" && (
          <div className="flex flex-col space-y-2">
            <div
              className="flex items-center space-x-2 bg-white p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              onClick={() =>
                handlePreviewClick(msg.fileUrl, "file", msg.fileName)
              }
            >
              <Description className="text-gray-500" />
              <div>
                <span className="text-blue-500 hover:underline">
                  {msg.fileName}
                </span>
                <p className="text-xs text-gray-500">{msg.fileSize}</p>
              </div>
            </div>
            {msg.messageContent && (
              <p className="text-sm">{msg.messageContent}</p>
            )}
          </div>
        )}

        <p className="text-xs text-gray-500 mt-1">
          {new Date(msg.timestamp).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );

  const PreviewModal = () => (
    <Dialog
      open={previewModal.open}
      onClose={() =>
        setPreviewModal({ open: false, content: null, type: null })
      }
      maxWidth="lg"
      fullWidth
    >
      <DialogTitle className="flex justify-between items-center">
        {previewModal.fileName}
        <IconButton
          onClick={() =>
            setPreviewModal({ open: false, content: null, type: null })
          }
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {previewModal.type === "image" ? (
          <img
            src={previewModal.content}
            alt="Preview"
            className="w-full h-auto"
          />
        ) : (
          <iframe
            src={previewModal.content}
            title="Document Preview"
            width="100%"
            height="600px"
            className="border-0"
          />
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="flex h-[calc(100vh-80px)] p-4 bg-gray-100">
      {isMobileView ? (
        currentView === 'contacts' ? (
          // Mobile Contacts View
          <div className="w-full bg-white shadow-lg rounded-lg p-4 overflow-auto">
            <div className="title">
              <p className="text-lg font-semibold text-[#202224] pb-5">Chat</p>
            </div>
            <div className="mb-4 bg-[#F6F8FB] rounded-[50px]">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search Patient"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <List>
              {patientContacts.map((contact) => (
                <ListItem
                  button
                  key={contact._id}
                  onClick={() => {
                    handleChatClick(contact);
                    setCurrentView('chat');
                  }}
                  selected={selectedChat?._id === contact._id}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={contact.profile}
                      alt={`${contact.firstName} ${contact.lastName}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${contact.firstName} ${contact.lastName}`}
                    secondary={`Last appointment: ${contact.lastAppointment}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondaryTypographyProps={{ color: "textSecondary" }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          // Mobile Chat View
          <div className="w-full bg-white shadow-lg rounded-lg p-4 flex flex-col">
            <div className="flex items-center mb-4">
              <IconButton onClick={() => setCurrentView('contacts')}>
                <ArrowBack />
              </IconButton>
              <Avatar
                src={selectedChat?.profile}
                alt={`${selectedChat?.firstName} ${selectedChat?.lastName}`}
              />
              <div className="ml-4">
                <h2 className="text-lg font-bold">
                  {`${selectedChat?.firstName} ${selectedChat?.lastName}`}
                </h2>
                <p className="text-sm text-gray-500">{selectedChat?.email}</p>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto bg-[#F6F8FB] mb-4 px-3">
              {messages.map((msg, index) => renderMessage(msg, index))}
              <div ref={msgContainerRef} />
            </div>

            <div className="mt-4">
              <FilePreview />
              <div className="flex border rounded justify-between items-center space-x-2">
                <Tooltip title="Attach file">
                  <IconButton onClick={handleAttachClick}>
                    <AttachFile />
                  </IconButton>
                </Tooltip>
                <input
                  className="flex-1 p-2"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <IconButton onClick={sendMessage} color="primary">
                  <Send />
                </IconButton>
              </div>
            </div>
          </div>
        )
      ) : (
        // Desktop View (existing code)
        <>
          <div className="new-xxl:w-[22%] bg-white shadow-lg rounded-lg p-4 overflow-auto">
            <div className="title">
              <p className="text-[20px] text-[#202224] font-semibold">Chat</p>
            </div>
            <div className="mb-4 mt-5 bg-[#F6F8FB] rounded-[50px]">
              <TextField
                className="border-0"
                fullWidth
                variant="outlined"
                placeholder="Search Patient"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <List>
              {patientContacts.map((contact) => (
                <ListItem
                  button
                  key={contact._id}
                  onClick={() => handleChatClick(contact)}
                  selected={selectedChat?._id === contact._id}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={contact.profile}
                      alt={`${contact.firstName} ${contact.lastName}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${contact.firstName} ${contact.lastName}`}
                    secondary={`Last appointment: ${contact.lastAppointment}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondaryTypographyProps={{ color: "textSecondary" }}
                  />
                </ListItem>
              ))}
            </List>
          </div>
          <div className="flex-1 bg-[#F6F8FB] shadow-lg rounded-lg ml-4 p-4 flex flex-col max-h-full relative">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center mb-4 bg-white p-3 rounded-lg absolute top-0 left-0 w-[100%] z-10">
                  <Avatar
                    src={selectedChat.profile}
                    alt={`${selectedChat.firstName} ${selectedChat.lastName}`}
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-bold">
                      {`${selectedChat.firstName} ${selectedChat.lastName}`}
                    </h2>
                    <p className="text-sm text-gray-500">{selectedChat.email}</p>
                  </div>
                </div>

                {/* Messages Container */}
                <div
                  ref={msgContainerRef}
                  className="flex-1 overflow-y-scroll overflow-x-hidden mb-4"
                >
                  {messages.map((msg, index) => renderMessage(msg, index))}
                </div>

                {/* Input Area */}
                <div className="mt-4">
                  {/* File Preview */}
                  <FilePreview />

                  {/* Message Input Area */}
                  <div className="flex items-center justify-between space-x-2 border">
                    <div className="new-xxl:w-[95%] new-xxl:w-[95%] new-lg:w-[80%]  ">
                      <IconButton onClick={handleAttachClick}>
                        <AttachFile />
                      </IconButton>

                      <input
                        fullWidth
                        variant="outlined"
                        className="bg-[#F6F8FB] w-[80%]"
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                        multiline
                        maxRows={4}
                      />
                    </div>

                    <IconButton onClick={sendMessage} color="primary">
                      <Send />
                    </IconButton>
                  </div>

                  {/* File Selection Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                  >
                    <MenuItem>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            handleFileSelect(e, "image");
                            setAnchorEl(null);
                          }}
                        />
                        <Image className="mr-2" /> Image
                      </label>
                    </MenuItem>
                    <MenuItem>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => {
                            handleFileSelect(e, "file");
                            setAnchorEl(null);
                          }}
                        />
                        <Description className="mr-2" /> Document
                      </label>
                    </MenuItem>
                  </Menu>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Select a patient to start chatting</p>
              </div>
            )}
          </div>
        </>
      )}
      <PreviewModal />
    </div>
  );
};

export default ChatScreen;
