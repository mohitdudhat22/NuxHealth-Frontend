import React, { useEffect, useState } from 'react';
import socket, { registerUser, joinChat, sendMessage, receiveMessage, updateOnlineUsers, checkOnlineStatus } from '../../services/socketService';
import { Input, Button, List, Typography, Card, Avatar } from 'antd';
import { getOldMessages } from '@/axiosApi/ApiHelper';
import 'tailwindcss/tailwind.css';

const { TextArea } = Input;
const { Title } = Typography;

export const ChattempComponentforDoctor = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});
  const [isPatientOnline, setIsPatientOnline] = useState(false);

  const fetchOldMessages = async () => {
    const doctorId = '6770443dceabc6c708235256'; // Replace with actual doctor ID
    const patientId = '677047f308067157dc712f80'; // Replace with actual patient ID
    const response = await getOldMessages(doctorId, patientId);
    setMessages(response.data);
  };

  const handleMessageReceive = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  useEffect(() => {
    const userId = '6770443dceabc6c708235256'; // Replace with actual doctor ID
    registerUser(userId);
    joinChat('room1'); // Replace with actual room ID

    receiveMessage(handleMessageReceive);

    updateOnlineUsers((users) => {
      setOnlineUsers(users);
    });

    checkOnlineStatus(userId);

    // Fetch old messages
    fetchOldMessages();

    return () => {
      // Clean up the event listener
      socket.off('receive-message', handleMessageReceive);
      socket.off('check-online');
    };
  }, []);

  const handleSendMessage = () => {
    const messageData = {
      to: '677047f308067157dc712f80', // Replace with actual patient ID
      from: '6770443dceabc6c708235256', // Replace with actual doctor ID
      message,
      roomId: 'room1', // Replace with actual room ID
    };
    sendMessage(messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Doctor Chat" className="w-full max-w-2xl h-4/5 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 bg-white border border-gray-200 rounded mb-4">
          <List
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item className={`flex items-center mb-4 ${msg.from === '6770443dceabc6c708235256' ? 'justify-end' : 'justify-start'}`}>
                <Avatar className="mr-2">{msg.from === '6770443dceabc6c708235256' ? 'D' : 'P'}</Avatar>
                <Typography.Text className="bg-blue-100 p-2 rounded">{msg.message}</Typography.Text>
              </List.Item>
            )}
          />
        </div>
        <div className="flex items-center">
          <TextArea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 mr-2"
          />
          <Button type="primary" onClick={handleSendMessage}>
            Send
          </Button>
        </div>
        <Title level={4} className="mt-4">Online Users</Title>
        <List
          bordered
          dataSource={Object.values(onlineUsers)}
          renderItem={(user) => (
            <List.Item>
              <Typography.Text>{user.userId}</Typography.Text>
            </List.Item>
          )}
        />
        <Title level={4} className="mt-4">Patient Status: {isPatientOnline ? 'Online' : 'Offline'}</Title>
      </Card>
    </div>
  );
};

export default ChattempComponentforDoctor;