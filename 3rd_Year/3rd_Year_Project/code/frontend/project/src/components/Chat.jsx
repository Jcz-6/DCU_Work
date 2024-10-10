import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../chat.css'

function Chat() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    // store messages to the specified room
    const storedMessages = JSON.parse(localStorage.getItem(`messages_${id}`));
    if (storedMessages) {
      setMessagesList(storedMessages);
    }

    // get the current logged in user
    const loadUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/profile/user`);
        if (!res.data.error) {
          setUsername(res.data.username);
          console.log(res.data)
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
      }
    };

    loadUser();

    // connect to websocket server sending over the room id
    const newSocket = new WebSocket("ws://172.20.10.3:8080");
    newSocket.onopen = () => {
      newSocket.send(JSON.stringify({ room: id }));
    };

    // method to send messages to list for storing messages in local storage
    newSocket.onmessage = (event) => {
      const newMessage = event.data;
      setMessagesList((prevMessages) => {
        const updatedMessages = [...prevMessages, newMessage];
        localStorage.setItem(`messages_${id}`, JSON.stringify(updatedMessages));
        return updatedMessages;
      });
    };
  
    setSocket(newSocket);
  
    return () => {
      newSocket.close();
    };
  }, [id]);

  const handleSend = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(username + ": " + message);
      setMessage('');
    }
  };

  const handleDelete = (index) => {
    const newMessagesList = [...messagesList];
    newMessagesList.splice(index, 1);
    setMessagesList(newMessagesList);
    localStorage.setItem(`messages_${id}`, JSON.stringify(newMessagesList));
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Chat room of enquiry</h3>
      </div>
      <div className="logged-in-user">
        <p>Logged in as: {username}</p>
      </div>
      <div className="message-container">
        <ul className="message-list">
          {messagesList.map((msg, index) => (
            <li className="message-item" key={index}>
              <span>{msg}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="message-input-container">
        <input
          type="text"
          className="message-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <br/>
        <button className="send-button" onClick={handleSend}>
          Send Message
        </button>
      </div>
    </div>
  );
}

export default Chat;
