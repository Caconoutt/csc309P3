import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserData } from '../../contexts/AuthContext';
import './style.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const { token, user_id } = useUserData(); 
    const navigate = useNavigate();
    const { shelterID } = useParams();
    const [userType, setUserType] = useState('');
    console.log(token)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTypeRes = await fetch(`http://127.0.0.1:8000/account/usertype/`, {
                    method: 'GET',
                    headers: {
                    'Authorization': `Bearer ${token}`,
                    },
                });
                if (!userTypeRes.ok) throw new Error('Error fetching user type');
                const userTypeJson = await userTypeRes.json();

                setUserType(userTypeJson.user_type)
            
                let blogUrl = '';
                if (userTypeJson.user_type === 'shelter') {
                    blogUrl = `http://localhost:8000/shelter/blog/list/`;
                } else if (userTypeJson.user_type === 'seeker') {
                    blogUrl = `http://localhost:8000/shelter/${shelterID}/blog/list/`;
                }

                const response = await fetch(blogUrl, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blogData = await response.json();
                setBlogs(blogData);
                console.log(blogs)
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchData();
    }, [shelterID, token]);



    return (
        <div className="blog-list">
            {blogs.map(blog => (
                <div key={blog.id} className="blog-card">
                    <h3>{blog.title}</h3>
                    <p>Author: {blog.owner.name}</p>
                    <p>Created at: {new Date(blog.created_at).toLocaleString()}</p>

                    <div className="buttons">
                        <button className="details-button" onClick={() => navigate(`/ViewBlog/${blog.id}`)}>Details</button>
                        {userType === 'shelter' && user_id === blog.owner.id && (
                            <button className="edit-button" onClick={() => navigate(`/EditBlog/${blog.id}`)}>Edit</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BlogList;
