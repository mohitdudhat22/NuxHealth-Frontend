import { useState, useEffect } from "react";
import { Button, Popover, List, Empty } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import NoNotificationFound from "../../assets/images/cover/no-notification-found.png";
import socket from "@/services/socketService";
import {
  GetUserNotifications,
  MarkNotificationAsRead,
} from "@/axiosApi/ApiHelper";
import { NHButton, NHCard } from "..";
import { useDecodeToken } from "@/hook";

const staticNotifications = [
  {
    id: 1,
    title: "Change Invoice Theme",
    description: "Lincoln Philips Change Invoice Theme.",
    time: "5 min ago",
    type: "message",
    highlightText: "Invoice Theme",
  },
  {
    id: 2,
    title: "Dr.Bharat",
    description: "Created Bill by dr.bharat.",
    time: "5 min ago",
    type: "message",
    highlightText: "Bill",
  },
  {
    id: 3,
    title: "Payment Received.",
    description: "24,668 is the payment done of Miracle Center.",
    time: "1:52PM",
    type: "success",
    highlightText: "payment done",
  },
  {
    id: 4,
    title: "Payment Cancelled.",
    description: "24,668 is the payment Cancelled of Miracle Center.",
    time: "1:52PM",
    type: "error",
    highlightText: "payment Cancelled",
  },
  {
    id: 5,
    title: "Lincoln Philips",
    description:
      "Dr.Bharat Patel has been appointed to work with Successfully In Hospital.",
    time: "1:34PM",
    type: "user",
    highlightText: "appointed to work with Successfully In Hospital",
  },
  {
    id: 6,
    title: "Lincoln Philips",
    description: "Doctor Removed Rakesh Patel.",
    time: "9:00AM",
    type: "user",
    highlightText: "Removed",
  },
];

const getNotificationIcon = (type) => {
  const icons = {
    message: { bg: "#E5F1FF", color: "#3B82F6", symbol: "💬" },
    success: { bg: "#E6FAF0", color: "#22C55E", symbol: "✓" },
    error: { bg: "#FEE2E2", color: "#EF4444", symbol: "✕" },
    user: { bg: "gray-200", color: "gray-600", symbol: "👤" },
  };
  const { bg, color, symbol } = icons[type] || {};
  return bg ? (
    <div
      className={`w-8 h-8 rounded-full bg-[${bg}] flex items-center justify-center`}
    >
      <span className={`text-[${color}] text-lg`}>{symbol}</span>
    </div>
  ) : null;
};

const NotificationBox = ({ visible, onClose }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useDecodeToken();
  const userData = { id: token?.userData?._id };

  useEffect(() => {
    const loadNotifications = async () => {
      if (!userData?.id) return;
      setLoading(true);
      try {
        const response = await GetUserNotifications(userData.id);
        console.log(response.notifications,"-------------")
        setNotifications(response.notifications);
        setUnreadCount(response?.notifications?.filter((n) => !n.isRead).length);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, [userData?.id, token]);

  useEffect(() => {
    if (!userData?.id) return;
    socket.emit("userOnline", userData.id);
    socket.on("notification", (notification) => {
      setNotifications((prev) => [
        { ...notification, isRead: false, timestamp: new Date() },
        ...prev,
      ]);
      setUnreadCount((prev) => prev + 1);
    });
    return () => socket.disconnect();
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
  console.log(notifications)
  return (
    <Popover
      open={visible}
      onOpenChange={onClose}
      overlayClassName="lg:!top-[62px] lg:!left-[1420px]"
      trigger="click"
      content={
        <NHCard
          title="Notifications"
          rootClass="p-0"
          headerContent={
            <NHButton
              type="text"
              icon={<CloseOutlined />}
              onClick={onClose}
              size="small"
              className="text-gray-500"
            />
          }
        >
          {notifications?.length > 0 ? (
            <List
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b w-full"
                  onClick={() => handleNotificationClick(item)}
                >
                  <div className="flex items-center gap-3 w-full">
                    {getNotificationIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="text-base font-medium text-[#030229]">
                          {item.title}
                        </h3>
                        <span className="text-sm text-[#A7A7A7]">
                          {formatTimestamp(item.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description
                          .split(item.highlightText)
                          .map((part, index, array) => (
                            <>
                              {part}
                              {index < array.length - 1 && (
                                <span className="text-blue-500 font-medium">
                                  {item.highlightText}
                                </span>
                              )}
                            </>
                          ))}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          ) : (
            <Empty
              image={NoNotificationFound}
              imageStyle={{ height: "100%" }}
              description={
                <span className="text-[#4F4F4F] font-medium text-lg">
                  No notification yet!
                </span>
              }
              className="p-4"
            />
          )}
        </NHCard>
      }
    />
  );
};

export default NotificationBox;
