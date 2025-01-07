import { useState, useEffect } from "react";
import { Badge, Button, Popover, List, Empty } from "antd";
import { NotificationOutlined, CloseOutlined } from "@ant-design/icons";
import NoNotificationFound from "../../assets/images/cover/no-notification-found.png";
import socket from "@/services/socketService";
import { GetUserNotifications, MarkNotificationAsRead } from "@/axiosApi/ApiHelper";

// Static data matching the image
const staticNotifications = [
  {
    id: 1,
    title: "Change Invoice Theme",
    description: "Lincoln Philips Change Invoice Theme.",
    time: "5 min ago",
    type: "message",
    highlightText: "Invoice Theme"
  },
  {
    id: 2,
    title: "Dr.Bharat",
    description: "Created Bill by dr.bharat.",
    time: "5 min ago",
    type: "message",
    highlightText: "Bill"
  },
  {
    id: 3,
    title: "Payment Received.",
    description: "24,668 is the payment done of Miracle Center.",
    time: "1:52PM",
    type: "success",
    highlightText: "payment done"
  },
  {
    id: 4,
    title: "Payment Cancelled.",
    description: "24,668 is the payment Cancelled of Miracle Center.",
    time: "1:52PM",
    type: "error",
    highlightText: "payment Cancelled"
  },
  {
    id: 5,
    title: "Lincoln Philips",
    description: "Dr.Bharat Patel has been appointed to work with Successfully In Hospital.",
    time: "1:34PM",
    type: "user",
    highlightText: "appointed to work with Successfully In Hospital"
  },
  {
    id: 6,
    title: "Lincoln Philips",
    description: "Doctor Removed Rakesh Patel.",
    time: "9:00AM",
    type: "user",
    highlightText: "Removed"
  }
];

const getNotificationIcon = (type) => {
  switch (type) {
    case "message":
      return (
        <div className="w-8 h-8 rounded-full bg-[#E5F1FF] flex items-center justify-center">
          <span className="text-[#3B82F6] text-lg">💬</span>
        </div>
      );
    case "success":
      return (
        <div className="w-8 h-8 rounded-full bg-[#E6FAF0] flex items-center justify-center">
          <span className="text-[#22C55E] text-lg">✓</span>
        </div>
      );
    case "error":
      return (
        <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center">
          <span className="text-[#EF4444] text-lg">✕</span>
        </div>
      );
    case "user":
      return (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600 text-lg">👤</span>
        </div>
      );
    default:
      return null;
  }
};

const NotificationBox = ({ visible, onClose }) => {
  // const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  // const { user: userData } = useAuth();
  const userData = { id: "set here user id" }
  useEffect(() => {
    const loadNotifications = async () => {
      if (!userData?.id) return;

      setLoading(true);
      try {
        const response = await GetUserNotifications(userData.id);
        setNotifications(response.data);
        const unreadCount = response.data.filter((n) => !n.isRead).length;
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error("Error loading notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, []);

  useEffect(() => {
    if (!userData?.id) return;

    socket.emit("userOnline", userData.id);

    socket.on("notification", (notification) => {
      setNotifications((prev) => [
        {
          ...notification,
          isRead: false,
          timestamp: new Date(),
        },
        ...prev,
      ]);
      setUnreadCount((prev) => prev + 1);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // const markAllAsRead = async () => {
  //   try {
  //     await apiService.MarkAllNotificationsAsRead(userData.id);
  //     setNotifications((prev) =>
  //       prev.map((notification) => ({ ...notification, isRead: true })),
  //     );
  //     setUnreadCount(0);
  //   } catch (error) {
  //     console.error("Error marking all as read:", error);
  //   }
  // };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await MarkNotificationAsRead(notification._id);
        setNotifications((prev) =>
          prev.map((n) =>
            n._id === notification._id ? { ...n, isRead: true } : n,
          ),
        );
        setUnreadCount((prev) => prev - 1);
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    try {
      const date = new Date(timestamp);
      const now = new Date();

      if (isNaN(date.getTime())) return "";

      const diff = Math.max(0, now - date);

      if (diff < 60000) {
        return "Just now";
      }

      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes}m ago`;
      }

      if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours}h ago`;
      }

      return date.toLocaleDateString();
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "";
    }
  };

  return (
    <div>
      <Popover
        open={visible}
        className="notification-box"
        onOpenChange={onClose}
        overlayClassName="lg:!top-[62px] lg:!left-[1420px]"
        trigger="click"
        content={
          <div className="w-[400px] max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">Notification</h2>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={onClose}
                className="text-gray-500"
              />
            </div>

            {notifications.length > 0 ? (
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
                          <h3 className="text-base font-medium text-[#030229]">{item.title}</h3>
                          <span className="text-sm text-[#A7A7A7]">{formatTimestamp(item.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.description.split(item.highlightText).map((part, index, array) => (
                            <>
                              {part}
                              {index < array.length - 1 && (
                                <span className="text-blue-500 font-medium">{item.highlightText}</span>
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
                  <span className="text-[#4F4F4F] font-medium text-lg">No notification yet!</span>
                }
                className="p-4"
              />
            )}
          </div>
        }
      >
        <div></div>
      </Popover>
    </div>
  );
};

export default NotificationBox;