import { useState, useEffect } from "react";
import { ChatMessageBar, ChatSidebar } from "@/components";
import ChatStartImage from "../../assets/images/cover/chat-starting-image.png";
import socket, {
  registerUser,
  joinChat,
  sendMessage as sendSocketMessage,
  receiveMessage,
} from "../../services/socketService";
import { getDoctorContact, getOldMessages } from "@/axiosApi/ApiHelper";
import { useDecodeToken } from "@/hook";

export const ChatLayoutForDoctor = () => {
  const patientId = "677047f308067157dc712f80"; // Patient's user ID
  const [contact, setContact] = useState([]);
  const{ token }= useDecodeToken();
  const userId = token?.userData?._id 
  useEffect(() => {
    const fetchContact = async () => {
      const response = await getDoctorContact();
      console.log(response.data);
      setContact(response.data);
    };
    fetchContact();
  }, []);
  const initialUsers = [
    {
      _id: patientId,
      name: "Dr. John Doe",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
      lastMessage: "How are you feeling today?",
      lastMessageTime: "10:30 AM",
      unreadCount: 0,
    },
    {
      _id: userId,
      name: "Dr. Jane Smith",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "offline",
      lastMessage: "Your test results are ready.",
      lastMessageTime: "Yesterday",
      unreadCount: 1,
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [chats, setChats] = useState(
    initialUsers.map((user) => ({
      _id: user._id,
      participants: [{ _id: user._id, name: user.name, avatar: user.avatar }],
      messages: [],
    }))
  );
  const [selectedUserId, setSelectedUserId] = useState(patientId);
  const [currentChat, setCurrentChat] = useState(null);

  useEffect(() => {
    registerUser(userId);
    joinChat("room1");

    receiveMessage((data) => {
      const { from, message, timestamp, fileDetails, type } = data;

      // Update chats with the new message
      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.participants.some((p) => p._id === from)
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now().toString(),
                    content: message,
                    fileDetails,
                    sender: "patient",
                    timestamp,
                    type,
                  },
                ],
              }
            : chat
        )
      );

      // Update users list for the last message
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === from
            ? {
                ...user,
                lastMessage: message || (fileDetails ? "File sent" : ""),
                lastMessageTime: "Just now",
                unreadCount: user.unreadCount + 1,
              }
            : user
        )
      );
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      const fetchMessages = async () => {
        try {
          const response = await getOldMessages(userId, selectedUserId);
          const oldMessages = response.data?.map((msg) => ({
            id: msg._id,
            content: msg.message,
            sender: msg.from,
            receiver: msg.to,
            timestamp: msg.timestamp,
            type: msg.type,
            fileDetails: msg.fileDetails,
          }));

          setChats((prevChats) =>
            prevChats.map((chat) =>
              chat.participants.some((p) => p._id === selectedUserId)
                ? { ...chat, messages: oldMessages }
                : chat
            )
          );
        } catch (error) {
          console.error("Failed to fetch old messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedUserId]);

  useEffect(() => {
    const chat = chats.find((c) =>
      c.participants.some((p) => p._id === selectedUserId)
    );
    setCurrentChat(chat || null);
  }, [selectedUserId, chats]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleSendMessage = (message) => {
    if (!selectedUserId || !currentChat) return;

    const newMessage = {
      id: Date.now().toString(),
      ...message,
      sender: userId,
      receiver: selectedUserId,
      timestamp: new Date().toISOString(),
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === currentChat._id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    sendSocketMessage({
      to: selectedUserId,
      from: userId,
      message: message.content || message.fileDetails.url,
      roomId: "room1",
      fileDetails: message.fileDetails,
      type: message.type,
    });

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === selectedUserId
          ? {
              ...user,
              lastMessage: message.content || "File sent",
              lastMessageTime: "Just now",
            }
          : user
      )
    );
  };

  return (
    <div className="grid grid-cols-[334px,1fr] h-full max-h-[calc(100vh-var(--header-height))]">
      <ChatSidebar
        users={users}
        onSelectUser={handleSelectUser}
        activeUserId={selectedUserId}
      />
      {currentChat ? (
        <ChatMessageBar
          selectedUser={currentChat.participants[0]}
          messages={currentChat.messages}
          onSendMessage={handleSendMessage}
          userId={userId}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <img src={ChatStartImage} alt="chatstaring" className="w-1/2 h-1/2" />
          <p className="text-[#A7A7A7] font-medium text-[26px] mt-10">
            No chat with someone
          </p>
        </div>
      )}
    </div>
  );
};
