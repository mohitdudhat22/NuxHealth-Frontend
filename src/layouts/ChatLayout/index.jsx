import { useState, useEffect } from "react";
import { ChatMessageBar, ChatSidebar } from "@/components";
import ChatStartImage from "../../assets/images/cover/chat-starting-image.png";

export const ChatLayout = () => {
  const initialUsers = [
    {
      _id: "1",
      name: "Dr. John Doe",
      avatar: "/placeholder.svg?height=48&width=48",
      status: "online",
      lastMessage: "How are you feeling today?",
      lastMessageTime: "10:30 AM",
      unreadCount: 0,
    },
    {
      _id: "2",
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
      _id: "1",
      participants: [initialUsers[0]],
      messages: [
        {
          id: "1",
          content: "Hello! How can I help you today?",
          sender: "doctor",
          timestamp: "2024-01-02T10:00:00Z",
          type: "text",
        },
        {
          id: "2",
          content: "I've been having a headache for the past few days.",
          sender: "user",
          timestamp: "2024-01-02T10:05:00Z",
          type: "text",
        },
      ],
    },
    {
      _id: "2",
      participants: [initialUsers[1]],
      messages: [
        {
          id: "1",
          content:
            "Your blood test results are ready. Would you like to schedule a follow-up appointment?",
          sender: "doctor",
          timestamp: "2024-01-01T14:00:00Z",
          type: "text",
        },
      ],
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [chats, setChats] = useState(initialChats);
  const [selectedUserId, setSelectedUserId] = useState();
  const [currentChat, setCurrentChat] = useState();

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

  const handleSelectUser = (userId) => {
    setSelectedUserId(userId);
  };

  const handleSendMessage = (content) => {
    if (!selectedUserId || !currentChat) return;

    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: "text",
    };

    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat._id === currentChat._id
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    // Update last message in users list
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === selectedUserId
          ? { ...user, lastMessage: content, lastMessageTime: "Just now" }
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
         <p className="text-[#A7A7A7] font-medium text-[26px] mt-10">No chat with someone</p>
        </div>
      )}
    </div>
  );
};
