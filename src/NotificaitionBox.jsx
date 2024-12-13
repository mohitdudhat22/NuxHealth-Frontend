import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useGlobal } from "./hooks/useGlobal";
import { useAuth } from "./hooks/useAuth";
import apiService from "./services/api";
import { MdOutlineBookmarkAdded } from "react-icons/md";
import { IoCloseCircle } from "react-icons/io5";
import {
  Badge,
  IconButton,
  Popover,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  NotificationsOutlined,
  CheckCircleOutline,
  ErrorOutline,
  InfoOutlined,
} from "@mui/icons-material";
import { toast } from "react-hot-toast";

const NotificationBox = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { notifications, setNotifications } = useGlobal();
  const { user: userData } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNotifications = async () => {
      if (!userData?.id) return;

      setLoading(true);
      try {
        const response = await apiService.GetUserNotifications(userData.id);
        setNotifications(response.data);
        const unreadCount = response.data.filter((n) => !n.isRead).length;
        setUnreadCount(unreadCount);
      } catch (error) {
        console.error("Error loading notifications:", error);
        toast.error("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };

    loadNotifications();
  }, [userData]);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL);

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
  }, [userData]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAllAsRead = async () => {
    try {
      await apiService.MarkAllNotificationsAsRead(userData.id);
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, isRead: true })),
      );
      setUnreadCount(0);
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to mark notifications as read");
    }
  };

  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      try {
        await apiService.MarkNotificationAsRead(notification._id);
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

  const getNotificationIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "success":
        return <CheckCircleOutline className="text-green-500" />;
      case "error":
        return <ErrorOutline className="text-red-500" />;
      case "warning":
        return <InfoOutlined className="text-yellow-500" />;
      default:
        return <InfoOutlined className="text-[#0EABEB]" />;
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

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton onClick={handleClick} color="inherit">
        <Badge badgeContent={unreadCount} color="error">
          <NotificationsOutlined />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          className: "w-100 h-[500px]",
        }}
      >
        <Box className="p-2">
          <div className="flex justify-between items-center mb-2 px-2">
            <h2 className="font-bold text-[#030229] text-[20px]">
              Notifications
            </h2>
            <div className="flex items-center">
              {notifications?.length > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-blue-500 hover:bg-blue-50 text-lg"
                >
                  <MdOutlineBookmarkAdded />
                </button>
              )}
              <button className="ms-2 text-lg text-red-500">
                <IoCloseCircle onClick={handleClose} />
              </button>
            </div>
          </div>
          <Divider />

          <List className="p-0">
            {loading ? (
              <ListItem>
                <CircularProgress size={20} className="mx-auto" />
              </ListItem>
            ) : notifications?.length > 0 ? (
              notifications?.map((notification) => (
                <ListItem
                  key={notification._id}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex space-x-1 border-b py-2 w-full">
                    <div className="w-10 h-10 bg-[#c3eafa] rounded-full flex justify-center items-center me-2">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1">
                      <div className="font-medium text-xs">
                        {notification.message}
                      </div>
                      <div className="flex justify-between items-center text-gray-500 text-xs pt-1">
                        <span className="text-[#5678E9]">
                          {notification.type}
                        </span>
                        <span className="text-gray-500 ml-auto">
                          {formatTimestamp(notification.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      className="text-center py-4"
                    >
                      No notifications yet
                    </Typography>
                  }
                />
              </ListItem>
            )}
          </List>
        </Box>
      </Popover>
    </div>
  );
};

export default NotificationBox;
