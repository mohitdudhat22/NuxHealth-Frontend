import { useState, useEffect } from "react";
import { useGlobal } from "./hooks/useGlobal";
import apiService from "./services/api";

const SendNotificationForm = () => {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { fcmToken, createNewFCM } = useGlobal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await apiService.GetNotifications({
        deviceToken: fcmToken,
        title,
        body,
      });
      const data = await response.json();

      if (data.success) {
        setMessage("Notification sent successfully!");
        // Generate a new FCM token
        await createNewFCM();
        refereshFCMToken();
        setBody("");
        setTitle("");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage("Error sending notification: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Send Push Notification</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">FCM Token</label>
          <input
            type="text"
            value={fcmToken || ""} // Make sure to handle undefined case
            readOnly // Set input to read-only
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Notification"}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Open console (F12) and get the FCM token from the console log.
        <span className="font-bold text-red-500">
          console.log('FCM Token:', token)
        </span>
      </p>
    </div>
  );
};

export default SendNotificationForm;
