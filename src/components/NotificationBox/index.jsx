import { useState } from "react";
import { Badge, Button, Popover, List } from "antd";
import { NotificationOutlined, CloseOutlined } from "@ant-design/icons";

const NotificationBox = () => {
  const [open, setOpen] = useState(false);

  // Static data matching the image
  const notifications = [
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

  return (
    <div>
      <Badge count={notifications.length}>
        <Button 
          type="text" 
          icon={<NotificationOutlined />} 
          onClick={() => setOpen(true)}
        />
      </Badge>

      <Popover
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
        trigger="click"
        content={
          <div className="w-[400px] max-h-[600px] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-semibold">Notification</h2>
              <Button 
                type="text" 
                icon={<CloseOutlined />} 
                onClick={() => setOpen(false)}
                className="text-red-500"
              />
            </div>

            <List
              dataSource={notifications}
              renderItem={(item) => (
                <List.Item className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b">
                  <div className="flex gap-3">
                    {getNotificationIcon(item.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-medium">{item.title}</h3>
                        <span className="text-xs text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.description.split(item.highlightText).map((part, index, array) => (
                          <>
                            {part}
                            {index < array.length - 1 && (
                              <span className="text-blue-500">{item.highlightText}</span>
                            )}
                          </>
                        ))}
                      </p>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        }
      >
        <div></div>
      </Popover>
    </div>
  );
};

export default NotificationBox;