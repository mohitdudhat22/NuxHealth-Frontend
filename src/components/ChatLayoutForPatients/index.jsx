import { useState, useEffect } from "react";
import { ChatMessageBar, ChatSidebar } from "@/components";
import ChatStartImage from "../../assets/images/cover/chat-starting-image.png";
import socket, {
  registerUser,
  joinChat,
  sendMessage as sendSocketMessage,
  receiveMessage,

} from "../../services/socketService";
import { getOldMessages } from "@/axiosApi/ApiHelper";

export const ChatLayoutForPatient = () => {
  const initialUsers = [
    {
      _id: "677047f308067157dc712f80",
      name: "Dr. John Doe",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
      lastMessage: "How are you feeling today?",
      lastMessageTime: "10:30 AM",
      unreadCount: 0,
    },
    {
      _id: "6770443dceabc6c708235256",
      name: "Dr. Jane Smith",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "offline",
      lastMessage: "Your test results are ready.",
      lastMessageTime: "Yesterday",
      unreadCount: 1,
    },
  ];


  const [users, setUsers] = useState(initialUsers);
  const [chats, setChats] = useState();
  const [selectedUserId, setSelectedUserId] = useState('6770443dceabc6c708235256');
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const userId = "677047f308067157dc712f80";
    registerUser(userId);
    joinChat("room1"); 

    receiveMessage((data) => {
      const { from, message, timestamp } = data;
      setChats((prevChats) =>
        prevChats?.map((chat) =>
          chat.participants.some((p) => p._id === from)
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  {
                    id: Date.now().toString(),
                    content: message,
                    sender: "user",
                    timestamp,
                    type: "text",
                  },
                ],
              }
            : chat
        )
      );

      setUsers((prevUsers) =>
        prevUsers?.map((user) =>
          user._id === from
            ? {
                ...user,
                lastMessage: message,
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
          const response = await getOldMessages("677047f308067157dc712f80", selectedUserId);
          const oldMessages = response.data?.map((msg) => ({
            id: msg._id,
            content: msg.message,
            sender: msg.from === "6770443dceabc6c708235256" ? "doctor" : "user",
            timestamp: msg.timestamp,
            type: "text",
          }));

          setChats((prevChats) =>
            prevChats?.map((chat) =>
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
    if (selectedUserId) {
      const chat = chats?.find((c) =>
        c.participants.some((p) => p._id === selectedUserId)
      );
      setCurrentChat(chat || null);
    } else {
      setCurrentChat(null);
    }
  }, [selectedUserId, chats]);

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleSendMessage = (message) => {
    if (!selectedUserId || !currentChat) return;
  
    const newMessage = {
      id: Date.now().toString(),
      ...message,
      sender: "doctor",
      timestamp: new Date().toISOString(),
    };
  
    setChats((prevChats) =>
      prevChats?.map((chat) =>
        chat._id === currentChat._id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  
    sendSocketMessage({
      to: selectedUserId,
      from: userId,
      message: message.content || message.fileDetails, 
      roomId: "room1", 
    });
  
    setUsers((prevUsers) =>
      prevUsers?.map((user) =>
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
      {/* Sidebar */}
      <ChatSidebar
        users={users}
        onSelectUser={handleSelectUser}
        activeUserId={selectedUserId}
        initialChats={initialUsers}
      />
      {/* Main Chat Area */}
      {currentChat ? (
        <ChatMessageBar
          selectedUser={currentChat.participants[0]}
          messages={currentChat.messages}
          onSendMessage={handleSendMessage}
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