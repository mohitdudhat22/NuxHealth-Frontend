import { NHInput } from "@/components/FormComponents";
import Icons from "@/constants/icons";
import { Avatar, List } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

export const Sidebar = () => {
  const [activeChat, setActiveChat] = useState(() => {
    return localStorage.getItem("activeChat") || "";
  });
  const [searchQuery, setSearchQuery] = useState("");

  const initialChats = [
    {
      id: "1",
      name: "Dr. Daisy Benjamin",
      message: "Hello, Esther",
      timestamp: "01:27",
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      name: "Dr. Daisy Benjamin",
      message: "Hi...",
      timestamp: "10:27",
      avatar: "/placeholder.svg",
    },
    {
      id: "3",
      name: "Dr. Daisy Benjamin",
      message: "Hello, Esther",
      timestamp: "01:27",
      avatar: "/placeholder.svg",
    },
    {
      id: "4",
      name: "Dr. Daisy Benjamin",
      message: "Hello, Esther",
      timestamp: "12:27",
      avatar: "/placeholder.svg",
    },
    {
      id: "5",
      name: "Dr. Daisy Benjamin",
      message: "Hi...",
      timestamp: "01:27",
      avatar: "/placeholder.svg",
    },
  ];

  const [filteredChats, setFilteredChats] = useState(initialChats);

  // Update localStorage when active chat changes
  useEffect(() => {
    localStorage.setItem("activeChat", activeChat);
  }, [activeChat]);

  // Filter chats based on search query
  useEffect(() => {
    const filtered = initialChats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchQuery]);

  const handleChatClick = (chatId) => {
    setActiveChat(chatId);
  };
  return (
    <div className="bg-white p-xl rounded-3xl">
      <div className="flex flex-col gap-md mb-12">
        <h5 className="font-semibold">Chat</h5>
        <NHInput
          prefix={Icons.SearchIcon}
          placeholder={"Search"}
          onChange={(e) => onSearch(e?.target?.value)}
        />
      </div>
      <div className="h-[calc(100vh-18.3rem-var(--header-height)-2rem)] overflow-auto">
        <List
          className="chat-list"
          dataSource={filteredChats}
          renderItem={(chat) => (
            <List.Item
              key={chat.id}
              onClick={() => handleChatClick(chat.id)}
              className={clsx(
                "h5 font-semibold",
                activeChat === chat.id ? "active" : ""
              )}
            >
              <List.Item.Meta
                avatar={<Avatar src={chat.avatar} size={48} />}
                title={
                  <div className="flex justify-between gap-xl">
                    <span className="">{chat.name}</span>
                    <span className="">{chat.timestamp}</span>
                  </div>
                }
                description={<span className="">{chat.message}</span>}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
