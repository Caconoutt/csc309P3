import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { useUserData } from '../../contexts/AuthContext';

import './style.css';

const EditBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [owner, setOwner] = useState('');
    const [filter, setFilter] = useState('')
    const [sort_time, setSort] = useState('')
    const {token} = useUserData();
    // const { id } = useParams(); 
    const {id} = useLocation().state;
    // const [id, setId] = useLocation().state;
    // Fetch the blog data when the component mounts
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
          const url = `http://localhost:8000/account/noti/?filter=${filter}&order_by=${sort_time}`;
          try {
            const resp = await fetch(url, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
            });
            if (resp.ok) {
              const result = await resp.json();
              if (result.results.length > 0) {
                const ownerId = result.results[0].owner;
                setOwner(ownerId);
                } else {
                  console.log('Error fetching user data');
                }
            } else {
              console.log('Error fetching notifications');
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();


        const fetchBlogData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/account/shelter/blog/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const blogData = await response.json();
                setTitle(blogData.title);
                setContent(blogData.content);
                setCreatedAt(blogData.created_at);
                // setId(blogData.owner);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlogData();
    }, [id, token]);

    // Function to handle blog update
    const updateBlog = async () => {
        const data = { 'title': title, 'content': content, 'owner': owner};
        try {
            const resp = await fetch(`http://localhost:8000/account/shelter/blog/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });

            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            navigate('/ListBlog');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    const deleteBlog = async () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this blog?');
        if (!isConfirmed) {
            return; // Stop the deletion process if not confirmed
        }
        try {
            const resp = await fetch(`http://localhost:8000/account/shelter/blog/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
    
            if (!resp.ok) {
                throw new Error(`HTTP error! status: ${resp.status}`);
            }
            navigate('/ListBlog');
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };
    
    

    return (
        <div className="page d-flex align-items-center py-4">
            <main className="form-signin w-100 m-auto mainContent">
                <h1 className="h3 mb-3 fw-bold text-center">Edit Blog</h1>
                <div id="showOne">
                    <div className="row">
                        <label className="col-md-3"><span className="blogElement">Title</span></label> 
                        <div className="col-md-5"/>
                        <div className="col-md-3">
                            Created on: {new Date(createdAt).toLocaleString()}
                        </div>
                    </div>

                    <div className="form-floating">
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" id="titleBlog" placeholder="Please enter the title." />
                    </div>

                    <div id="space"></div>

                    <label><span className="blogElement">Content</span></label> 
                    <div className="form-floating">
                        <input value={content} onChange={e => setContent(e.target.value)} type="text" className="form-control" id="contentBlog" placeholder="Please enter the content."/>
                    </div>
                </div>
                <button onClick={updateBlog} id="update_blog" className="btn btnStyle w-100 py-2">Update</button>
                <button onClick={deleteBlog} id="delete_blog" className="btn btnStyle w-100 py-2">Delete</button>
            </main>
        </div>
    );
}

export default EditBlog;
