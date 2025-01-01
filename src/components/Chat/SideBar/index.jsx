import React, { useEffect, useState } from "react";
import { user } from "@/assets/images";
import { NHInput } from "@/components/FormComponents";
import Icons from "@/constants/icons";
import { Avatar, List } from "antd";
import clsx from "clsx";

export const Sidebar = ({
  users,
  onSelectUser,
  activeUserId,
  initialChats,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState(initialChats);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchQuery, users]);

  const onSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="bg-white p-6 rounded-l-3xl flex flex-col h-full">
      <div className="flex flex-col gap-4 mb-8">
        <h5 className="font-semibold text-xl">Chat</h5>
        <NHInput
          prefix={Icons.SearchIcon}
          placeholder="Search"
          onChange={onSearch}
        />
      </div>
      <div className="overflow-auto flex-grow h-[calc(100vh-18.3rem-var(--header-height)-2rem)] overflow-auto">
        <List
          className="chat-list gap-xl flex flex-col"
          dataSource={filteredChats}
          renderItem={(chat) => (
            <List.Item
              key={chat._id}
              onClick={() => onSelectUser(chat._id)}
              className={clsx(
                "cursor-pointer !border-none transition-colors duration-200 hover:bg-[#5678E91A] rounded-lg !p-md mb-1",
                activeUserId === chat._id ? "bg-[#5678E91A]" : ""
              )}
            >
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={chat.avatar || user}
                    size={48}
                    className={clsx(
                      "relative",
                      chat.status === "online" && "online-indicator"
                    )}
                  />
                }
                title={
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{chat.name}</span>
                    <span className="text-xs text-gray-500">
                      {chat.lastMessageTime}
                    </span>
                  </div>
                }
                description={
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 truncate w-3/4">
                      {chat.lastMessage}
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};
