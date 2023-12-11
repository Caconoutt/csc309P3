import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUserData } from '../../contexts/AuthContext';
import './style.css';

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [otherUserType, setOtherUserType] = useState(null);
    const [currentUserType, setCurrentUserType] = useState(null); 
    const [newMessage, setNewMessage] = useState("");
    const { application_id } = useParams();
    const { token } = useUserData();

    // Function to fetch user profile
    const fetchUserProfile = async (userId, userType, currentUserType) => {
        var profileUrl;
        if (currentUserType === 'seeker') {
            profileUrl = userType === 'seeker'
            ? `http://127.0.0.1:8000/account/seeker/profile/${userId}/`
            : `http://127.0.0.1:8000/account/seeker/${userId}/`;
        } else if (currentUserType === 'shelter') {
            profileUrl = userType === 'seeker'
            ? `http://127.0.0.1:8000/account/shelter/seeker/profile/${userId}/`
            : `http://127.0.0.1:8000/account/shelter/profile/${userId}/`;
        }

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
            if (Array.isArray(data.results)) {
                const messagesWithUsernames = await Promise.all(data.results.map(async (msg) => {
                        const username1 = await fetchUserProfile(msg.sender, currentUserType, currentUserType);
                        if (username1 !== 'Unknown') {
                            return { ...msg, username: username1 };
                        } else {
                            const username2 = await fetchUserProfile(msg.sender, otherUserType, currentUserType);
                            return { ...msg, username: username2 };
                    }
                
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
            await fetchMessages(); // Refresh messages after sending
        } catch (error) {
            console.error('Send error:', error);
        }
    };

    // Fetch user type and messages when component mounts
    useEffect(() => {
        fetchUserType(token).then(fetchedUserType => {
            setCurrentUserType(fetchedUserType);
            setOtherUserType(fetchedUserType === 'seeker' ? 'shelter' : 'seeker');
    });
    }, [token]); // Only re-run the effect if token changes

    // Fetch messages when userType is set
    useEffect(() => {
    if (currentUserType && otherUserType) {
        fetchMessages();
    }
    }, [currentUserType, otherUserType, application_id, token]); // Re-run the effect if userType or application_id changes



    return (
        <div className="chat-container">
            <div className="chat-messages">
                {Array.isArray(messages) && messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.isCurrentUser ? 'current-user' : ''}`}>
                        <div className="message-header">
                            <strong className="message-username">{msg.username}</strong>
                            <small className="message-timestamp">{new Date(msg.created_at).toLocaleString()}</small>
                        </div>
                        <p className="message-detail">{msg.detail}</p>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <textarea 
                    className="chat-textarea"
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="chat-send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>

    );
};

export default ChatPage;

async function fetchUserType(token) {
    try {
        const userTypeRes = await fetch(`http://127.0.0.1:8000/account/usertype/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
        
        if (!userTypeRes.ok) {
            throw new Error(`HTTP error! status: ${userTypeRes.status}`);
        }
        const userTypeData = await userTypeRes.json();
        return userTypeData.user_type;
    } catch (error) {
        console.error('Error fetching user type:', error);
        return null;
    }
}

