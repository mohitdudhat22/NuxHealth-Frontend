import { useState, useEffect } from "react";
import { ChatMessageBar, ChatSidebar } from "@/components";
import ChatStartImage from "../../assets/images/cover/chat-starting-image.png";
import socket, {
  registerUser,
  joinChat,
  sendMessage as sendSocketMessage,
  receiveMessage,
  updateOnlineUsers,
  checkOnlineStatus,
} from "../../services/socketService";
import { getOldMessages } from "@/axiosApi/ApiHelper";

export const ChatLayoutForDoctor = () => {
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

  const initialChats = [
    {
      _id: "677047f308067157dc712f80",
      participants: [initialUsers[0]],
      messages: [],
    },
    {
      _id: "6770443dceabc6c708235256",
      participants: [initialUsers[1]],
      messages: [],
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [chats, setChats] = useState(initialChats);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  // Register user and set up socket listeners
  useEffect(() => {
    const userId = "6770443dceabc6c708235256"; // Replace with the actual doctor ID
    registerUser(userId);
    joinChat("room1"); // Replace with the actual room ID

    // Listen for incoming messages
    receiveMessage((data) => {
      const { from, message, timestamp } = data;
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
                    sender: "user",
                    timestamp,
                    type: "text",
                  },
                ],
              }
            : chat
        )
      );

      // Update the last message in the users list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
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

    // Listen for online user updates
    updateOnlineUsers((data) => {
      const { onlineUsers } = data;
      setOnlineUsers(onlineUsers);

      // Update user status in the users list
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          status: onlineUsers[user._id] ? "online" : "offline",
        }))
      );
    });

    // Check online status
    checkOnlineStatus(userId);

    // Cleanup socket listeners
    return () => {
      socket.off("receive-message");
      socket.off("update-online-users");
    };
  }, []);

  // Fetch old messages when a user is selected
  useEffect(() => {
    if (selectedUserId) {
      const fetchMessages = async () => {
        try {
          const response = await getOldMessages("6770443dceabc6c708235256", selectedUserId);
          const oldMessages = response.data.map((msg) => ({
            id: msg._id,
            content: msg.message,
            sender: msg.from === "6770443dceabc6c708235256" ? "doctor" : "user",
            timestamp: msg.timestamp,
            type: "text",
          }));

          // Update the chats state with the old messages
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

  // Update current chat when a user is selected
  useEffect(() => {
    if (selectedUserId) {
      const chat = chats.find((c) =>
        c.participants.some((p) => p._id === selectedUserId)
      );
      setCurrentChat(chat || null);
    } else {
      setCurrentChat(null);
    }
  }, [selectedUserId, chats]);

  // Handle user selection
  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  // Handle sending a message
  const handleSendMessage = (message) => {
    if (!selectedUserId || !currentChat) return;
  
    const newMessage = {
      id: Date.now().toString(),
      ...message,
      sender: "doctor",
      timestamp: new Date().toISOString(),
    };
  
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === currentChat._id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );
  
    // Send message via socket
    sendSocketMessage({
      to: selectedUserId,
      from: "6770443dceabc6c708235256",
      message: message.content || message.fileDetails,
      roomId: "room1",
    });
  
    // Update last message in users list
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