import { useState, useEffect } from "react";
import { ChatMessageBar, ChatSidebar } from "@/components";
import ChatStartImage from "../../assets/images/cover/chat-starting-image.png";
import socket, {
  registerUser,
  joinChat,
  sendMessage as sendSocketMessage,
  receiveMessage,
} from "../../services/socketService";
import { getOldMessages, getPatientContact } from "@/axiosApi/ApiHelper";
import { useDecodeToken } from "@/hook";

export const ChatLayoutForPatient = () => {
  const { token } = useDecodeToken();
  const userId = "677047f308067157dc712f80"; // Patient's user ID
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  console.log(isOnline,"<<<<<<<<<<<<<<<<< other person")
  const fetchContact = async () => {
    try {
      const response = await getPatientContact();
      const contacts = response.data.map(contact => ({
        _id: contact._id,
        name: contact.fullName,
        avatar: contact.profilePicture,
        status: "offline",
        lastMessage: "",
        lastMessageTime: "",
        unreadCount: 0,
      }));
      setUsers(contacts);
      console.log("checking online for ", contacts[0]?._id)
      joinChat({from:userId, to:contacts[0]?._id});
      socket.emit("check-online", contacts[0]?._id);
      setSelectedUserId(contacts[0]?._id || null);
      setChats(contacts.map(contact => ({
        _id: contact._id,
        participants: [{ _id: contact._id, name: contact.fullName, avatar: contact.profilePicture }],
        messages: [],
      })));
    } catch (error) {
      console.error("Failed to fetch contact:", error);
    }
  };
  const handleUserStatus = (data) => {
    setIsOnline(data.online);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === selectedUserId
          ? { ...user, status: data.online ? "online" : "offline" }
          : user
      )
    );
  };
  const fetchMessages = async () => {
    try {
      const response = await getOldMessages(userId, selectedUserId);
      console.log(response)
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
  useEffect(() => {
    fetchContact();
    registerUser(userId);
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
                    sender: "doctor",
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
    socket.emit("check-online", selectedUserId);
    socket.on("user-status", handleUserStatus);
    return () => {
      socket.off("receive-message");
      socket.off("user-status", handleUserStatus);
    };
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      socket.emit("check-online", selectedUserId);
      socket.on("user-status", handleUserStatus);
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

  const selectedUser = users.find(user => user._id === selectedUserId);

  return (
    <div className="grid grid-cols-[334px,1fr] h-full max-h-[calc(100vh-var(--header-height))]">
      <ChatSidebar
        users={users}
        onSelectUser={handleSelectUser}
        activeUserId={selectedUserId}
      />
      {currentChat ? (
        <ChatMessageBar
          selectedUser={selectedUser}
          messages={currentChat.messages}
          onSendMessage={handleSendMessage}
          userId={userId}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <img src={ChatStartImage} alt="chat-starting" className="w-1/2 h-1/2" />
          <p className="text-[#A7A7A7] font-medium text-[26px] mt-10">
            No chat with someone
          </p>
        </div>
      )}
    </div>
  );
};
