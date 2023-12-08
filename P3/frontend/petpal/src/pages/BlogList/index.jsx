import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserData } from '../../contexts/AuthContext';
import './style.css';

const BlogList = () => {
    const [blogs, setBlogs] = useState();
    const [filter, setFilter] = useState('')
    const [sort_time, setSort] = useState('')
    const [current_user, setUser] = useState('');
    const { token } = useUserData(); 
    const navigate = useNavigate();
    const { shelter_id } = useParams();
    const [userType, setUserType] = useState('');
    console.log(shelter_id);
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
                const user_id = result.results[0].owner;
                setUser(user_id);
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
    }, []);

    useEffect(() => {
        const fetchData = async () => {
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

                setUserType(userTypeJson.user_type)
            
                let blogUrl = '';
                if (userTypeJson.user_type === 'shelter') {
                    blogUrl = `http://localhost:8000/account/shelter/blog/list/`;
                } else if (userTypeJson.user_type === 'seeker') {
                    blogUrl = `http://localhost:8000/account/shelter/${shelter_id}/blog/list/`;
                }
                const response = await fetch(blogUrl, {
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
                setBlogs(blogData);
                
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchData();
    }, [shelter_id, token]);


    return (
        <div className="blog-list">
             {blogs && 
            blogs.map(blog => (
                <div key={blog.id} className="blog-card">
                    <h3>{blog.title}</h3>
                    {/* <p>Author: {blog.owner.username}</p> */}
                    <p>Created at: {new Date(blog.created_at).toLocaleString()}</p>

                    <div className="buttons">
                        <button className="details-button" onClick={() => navigate('/ViewBlog', {state:{id: blog.id, shelter_id: shelter_id}})}>Details</button>
                       {userType === 'shelter' && current_user === blog.owner && (
                            <button className="edit-button" onClick={() => navigate('/EditBlog', {state:{id: blog.id}})}>Edit</button>
                        )}
                    </div>
                </div>
            ))} 
        </div>
    );
}

export default BlogList;
