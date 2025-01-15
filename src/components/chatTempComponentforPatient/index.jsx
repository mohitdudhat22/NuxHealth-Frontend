import React, { useEffect, useState } from 'react';
import socket, { registerUser, joinChat, sendMessage, receiveMessage, } from '../../services/socketService';
import { Input, Button, List, Typography, Card, Avatar } from 'antd';
import { getOldMessages } from '@/axiosApi/ApiHelper';
import 'tailwindcss/tailwind.css';

const { TextArea } = Input;
const { Title } = Typography;

export const ChatTempComponentforPatient = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState({});
  const doctorId = '6770443dceabc6c708235256'; 
  const patientId = '677047f308067157dc712f80';
  const userId = patientId;
  const handleMessageReceive = (data) => {
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const fetchOldMessages = async () => {
    const response = await getOldMessages(userId, doctorId);
    setMessages(response.data);
  };

  useEffect(() => {
    registerUser(userId);
    joinChat('room1');

    receiveMessage(handleMessageReceive);

    fetchOldMessages();

    return () => {
      socket.off('receive-message', handleMessageReceive);
      socket.off('check-online');
    };
  }, []);

  const handleSendMessage = () => {
    const messageData = {
      to: doctorId,
      from: patientId,
      message,
      roomId: 'room1',
    };
    sendMessage(messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setMessage('');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card title="Patient Chat" className="w-full max-w-2xl h-4/5 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 bg-white border border-gray-200 rounded mb-4">
          <List
            dataSource={messages}
            renderItem={(msg) => (
              <List.Item className={`flex items-center mb-4 ${msg.from === patientId ? 'justify-end' : 'justify-start'}`}>
                <Avatar className="mr-2">{msg.from === patientId ? 'P' : 'D'}</Avatar>
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
          renderItem={(user) => (
            <List.Item>
              <Typography.Text>{user.userId}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};