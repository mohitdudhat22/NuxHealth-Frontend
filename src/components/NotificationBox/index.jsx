import React, { useState, useEffect, useCallback } from "react";
import { Button, Popover, List, Empty, Badge } from "antd";
import { CloseOutlined, BellOutlined } from "@ant-design/icons";
import NoNotificationFound from "../../assets/images/cover/no-notification-found.png";
import socket from "@/services/socketService";
import {
  GetUserNotifications,
  MarkNotificationAsRead,
} from "@/axiosApi/ApiHelper";
import { NHButton, NHCard } from "..";
import { useDecodeToken } from "@/hook";

const NotificationBox = () => {
  const [visible, setVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useDecodeToken();
  const userData = { id: token?.userData?._id };

  const loadNotifications = useCallback(async () => {
    if (!userData?.id) return;
    setLoading(true);
    try {
      const response = await GetUserNotifications(userData.id);
      setNotifications(response.notifications);
      setUnreadCount(response.notifications.filter((n) => !n.isRead).length);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [userData?.id]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  useEffect(() => {
    if (!userData?.id) return;
    console.log(userData.id);

    //aa even per socket regeter thashe socket.id -> userId
    socket.emit("register-user", userData.id);

    const handleNewNotification = (notification) => {
      console.log("Received new notification:", notification);
      alert("got new message");
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    // new notification aa userId-> socket ne mokalshu 
    socket.on("new-notification", handleNewNotification);

    return () => {
      socket.off("new-notification", handleNewNotification);
      socket.disconnect();
    };
  }, [userData?.id]);

  const handleNotificationClick = async (notification) => {
    if (notification.isRead) return;
    try {
      await MarkNotificationAsRead(notification._id);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notification._id ? { ...n, isRead: true } : n
        )
      );
      setUnreadCount((prev) => prev - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    if (isNaN(diff)) return "";
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  const notificationContent = (
    <NHCard
      title="Notifications"
      rootClass="p-0 w-96"
      headerContent={
        <NHButton
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setVisible(false)}
          size="small"
          className="text-gray-500"
        />
      }
    >
      {notifications?.length > 0 ? (
        <List
          loading={loading}
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item
              className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-b ${
                !item.isRead ? "bg-gray-100" : ""
              }`}
              onClick={() => handleNotificationClick(item)}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100">
                  <span className="text-xl text-blue-600">🔔</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium text-gray-900">
                      {item.type === "Appointment" ? item.message : item.title}
                    </h3>
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.message || item.description}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <Empty
          image={NoNotificationFound}
          imageStyle={{ height: 120 }}
          description={
            <span className="text-gray-600 font-medium text-lg">
              No notifications yet!
            </span>
          }
          className="py-8"
        />
      )}
    </NHCard>
  );

  return (
    <Popover
      open={visible}
      onOpenChange={setVisible}
      trigger="click"
      content={notificationContent}
      placement="bottomRight"
      overlayClassName="notification-popover"
    >
      <Badge count={unreadCount} size="small">
        <Button className="relative" onClick={() => setVisible(!visible)}>
          <BellOutlined style={{ fontSize: 20 }} />
        </Button>
      </Badge>
    </Popover>
  );
};

export default NotificationBox;
