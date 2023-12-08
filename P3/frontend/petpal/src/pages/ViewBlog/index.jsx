import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useUserData } from '../../contexts/AuthContext';

import './style.css';

const ViewBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [owner, setOwner] = useState('');
    const [userType, setUserType] = useState(null);
    const {token} = useUserData();

    const {id, shelter_id} = useLocation().state;
    // Fetch the blog data when the component mounts
    useEffect(() => {
        const fetchUserType = async () => {
            try {
                const userTypeRes = await fetch(`http://localhost:8000/account/usertype/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!userTypeRes.ok) throw new Error('Error fetching user type');
                const userTypeJson = await userTypeRes.json();
                setUserType(userTypeJson.user_type);
            } catch (error) {
                console.error('Error fetching user type:', error);
            }
        };
        fetchUserType();
    }, [token]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                let blogUrl = '';
                if (userType === 'shelter') {
                    blogUrl = `http://localhost:8000/account/shelter/blog/${id}/`;
                } else if (userType === 'seeker') {
                    blogUrl = `http://localhost:8000/account/shelter/${shelter_id}/blog/${id}/`;
                }
    
                const response = await fetch(blogUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const blogData = await response.json();
                setTitle(blogData.title);
                setContent(blogData.content);
                setCreatedAt(blogData.created_at);
                setOwner(blogData.owner);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };
    
        if (userType) {
            fetchData();
        }
    }, [id, token, userType, shelter_id]);
    


    return (
        <div className="page d-flex align-items-center py-4">
            <main className="form-signin w-100 m-auto mainContent">
                <h1 className="h3 mb-3 fw-bold text-center">{title}</h1>
                <div id="showOne">
                    <div className="row">
                        <label className="col-md-3"><span className="blogElement">Author: {owner}</span></label> 
                        <div className="col-md-5"/>
                        <div className="col-md-3">
                            Created on: {new Date(createdAt).toLocaleString()}
                        </div>
                    </div>

                    <div id="space"></div>

                    <div>{content}</div>
                </div>
                <button id="backToBlogList" className="btn btnStyle w-100 py-2" type="submit"><Link to="/ListBlog" style={{ textDecoration: 'none', color: 'inherit' }}>Back to Blog List</Link></button>
            </main>
        </div>
    );
}

export default ViewBlog;
