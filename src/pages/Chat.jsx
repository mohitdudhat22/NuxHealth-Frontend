import { useState, useEffect } from "react";


const Chat = () => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState("User 1");
  const [error, setError] = useState("");

  useEffect(() => {
    socket.on("chatMessage", (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      setError("Message cannot be empty.");
    } else {
      socket.emit("chatMessage", { username: user, msg: message });
      setMessage("");
      setError("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-blue-600">Chat App</h2>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setUser("User 1")}
          className={`py-2 px-4 rounded ${user === "User 1" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          User 1
        </button>
        <button
          onClick={() => setUser("User 2")}
          className={`py-2 px-4 rounded ${user === "User 2" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
        >
          User 2
        </button>
      </div>

      <div className="w-full max-w-lg border border-gray-300 bg-white shadow-lg rounded-lg p-4">
        <div className="h-64 overflow-y-auto border-b border-gray-200 mb-4 p-2">
          {chat.length === 0 ? (
            <p className="text-center text-gray-400">No messages yet...</p>
          ) : (
            chat.map((chatItem, idx) => (
              <div
                key={idx}
                className={`mb-2 ${chatItem.username === user ? "text-right" : ""}`}
              >
                <span
                  className={`font-bold ${chatItem.username === "User 1" ? "text-blue-600" : "text-green-600"}`}
                >
                  {chatItem.username}:
                </span>
                <span className="ml-2 text-gray-700">{chatItem.msg}</span>
              </div>
            ))
          )}
        </div>

        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
            className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            disabled={message.trim() === ""}
          >
            Send
          </button>
        </form>
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default Chat;
