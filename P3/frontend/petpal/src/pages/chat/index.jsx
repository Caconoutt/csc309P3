import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const token = localStorage.getItem('auth-token');
    const { application_id } = useParams();

    // Function to fetch user profile
    const fetchUserProfile = async (userId, userType) => {
        const profileUrl = userType === 'seeker'
            ? `http://127.0.0.1:8000/account/seeker/profile/${userId}/`
            : `http://127.0.0.1:8000/account/shelter/profile/${userId}/`;

        try {
            const response = await fetch(profileUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching user profile');
            }
            const profileData = await response.json();
            return profileData.username; // Assuming username is part of the response
        } catch (error) {
            console.error('Fetch error:', error);
            return 'Unknown'; // Default username if fetch fails
        }
    };

    // Function to fetch chat messages
    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/comment/${application_id}/message/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Error fetching messages');
            }
            const data = await response.json();
            if (Array.isArray(data.results)) { // Assuming the response is an array of messages
                // Fetch usernames for each message
                const messagesWithUsernames = await Promise.all((data.results).map(async (msg) => {
                    const userType = msg.content_type === 'seeker_profile' ? 'seeker' : 'shelter'; // Adjust this line based on your API response
                    const username = await fetchUserProfile(msg.object_id, userType);
                    return { ...msg, username };
                }));
                setMessages(messagesWithUsernames);
            } else {
                console.error('Expected an array, but received:', data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };

    // Function to send a new message
    const sendMessage = async () => {
        if (!newMessage.trim()) return; // Prevent sending empty messages
        try {
            const response = await fetch(`http://127.0.0.1:8000/comment/${application_id}/message/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ detail: newMessage })
            });

            if (!response.ok) {
                throw new Error('Error sending message');
            }
            setNewMessage("");
            fetchMessages(); // Refresh messages after sending
        } catch (error) {
            console.error('Send error:', error);
        }
    };

    // Fetch messages when component mounts
    useEffect(() => {
        fetchMessages();
    }, [application_id, token]);

    return (
        <div className="chat-container">
            <div className="chat-messages">
                {Array.isArray(messages) && messages.map((msg, index) => (
                    <div key={index} className="message">
                        <p><strong>{msg.username}:</strong> {msg.detail}</p>
                        <small>{new Date(msg.created_at).toLocaleString()}</small>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <textarea 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
