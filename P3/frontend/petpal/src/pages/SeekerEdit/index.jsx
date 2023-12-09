

import './style.css';
import React from 'react';
import { Link, redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import Done from "../../assets/images/Done.png";
import { useEffect } from 'react';
import { useState } from 'react';
import { useUserData } from '../../contexts/AuthContext';

const SeekerEdit = () => {

    //initial variables
    
    const navigate = useNavigate();
    const { state } = useLocation();
    const user = state.user;
    const [firstItemId, setFirstItemId] = useState(null);
    const {token} = useUserData();
    const [filter, setFilter] = useState('')
    const [sort_time, setSort] = useState('')
    
    const {username,nickname,contact,location,preference,image_url} = user;

    const [username_u, setUsername_u] = useState(username);
    const [nickname_u, setNickname_u] = useState(nickname);
    const [contact_u, setContact_u] = useState(contact);
    const [location_u, setLocation_u] = useState(location);
    const [preference_u, setPreference_u] = useState(preference);
    const [image_url_u, setImage_url_u] = useState(image_url);
    const [selectedImage, setSelectedImage] = useState(null);


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
              setFirstItemId(result.results[0].owner);
            } else {
              console.log('Error fetching notifications');
            }
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchData();
      }, []);

      const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setSelectedImage(e.target.files[0]);
        }
    };

      const handleEdit = async (event) => {
        event.preventDefault();
        if (location_u === null) {
          alert("You must select a location");
          return;
        }
        if (preference_u === null) {
          alert("You must select a preference");
          return;
        }

        const new_url = `http://localhost:8000/account/seeker/profile/${firstItemId}/`;
      
        const formData = new FormData();
        formData.append('username', username_u);
        formData.append('nickname', nickname_u);
        formData.append('contact', contact_u);
        formData.append('location', location_u);
        formData.append('preference', preference_u);
        if (selectedImage) {
          formData.append('image_url', selectedImage);
        }
        try {
          const response = await fetch(new_url, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
            body: formData,
          });
      
          if (response.ok) {
            // Redirect to SeekerProfile upon successful update
            navigate('/SeekerProfile');
          } else {
            const errorResponse = await response.json();
            console.log('Error updating profile', errorResponse);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };      

    return <>
     <div class="container" id="wrap">
        <div class = "edit-button-container">
            <button  class="btn-image" onClick={handleEdit}>
                <img src={Done} alt="Button Image" class="btn-image" />
            </button>
        </div>
        
        <div class="img-container">
            <div class = "portrait">
                <div class="custom-upload">
                    <input type="file" class="img-input" id="imageUpload" onChange={handleImageChange}/>
                    <label class="custom-file-label" for="imageUpload">Choose Image</label>
                </div>
            </div>
        </div>
        
        <div class="info-container">

            <div class="custom-row">
              <div class="custom-col text-sm-center text-md-end">
                <p class="seeker-title">Nickname:</p>
              </div>
              <div class="custom-col input-left">
                    <input type="text" class="form-control edit-form" id="form-input" placeholder="Enter text" 
                    value={nickname_u} onChange={(e) => setNickname_u(e.target.value)}/>
                </div>
            </div>

            <div class="custom-row">
              <div class="custom-col text-sm-center text-md-end">
                <p class="seeker-title">Name:</p>
              </div>
              <div class="custom-col input-left">
              <input type="text" class="form-control edit-form" id="form-input" placeholder="Enter text" 
                        value={username_u} 
                        onChange={(e) => setUsername_u(e.target.value)}
                        />
                </div>
            </div>

            <div class="custom-row">
              <div class="custom-col text-sm-center text-md-end">
                <p class="seeker-title">Contact:</p>
              </div>
              <div class="custom-col input-left">
              <input type="text" class="form-control edit-form" id="form-input" placeholder="Enter Number" 
                        value={contact_u}
                        onChange={(e) => setContact_u(e.target.value)}/>
                </div>
            </div>

            <div class="custom-row">
                <div  class="custom-col text-sm-center text-md-end">
                    <p class="seeker-title">Location:</p>
                </div>
                <div class="custom-col input-left">
                    <select id="choice" class="form-select edit-form" 
                    value={location_u}  
                    onChange={(e) => setLocation_u(e.target.value)}>
                        <option selected disabled value=" ">Choose...</option>
                        <option>Ontario</option>
                        <option>British Columbia</option>
                        <option>Quebec</option>
                        <option>Alberta</option>
                        <option>Nova Scotia</option>
                        <option>New Brunswick</option>
                        <option>Newfoundland and Labrador</option>
                        <option>Saskatchewan</option></select>
                </div>
            </div>

            <div class="custom-row">
                <div  class="custom-col text-sm-center text-md-end">
                    <p class="seeker-title ">Preference:</p>
                </div>
                <div class="custom-col input-left">
                    <select id="choice" class="form-select edit-form"
                    value={preference_u} 
                    onChange={(e) => setPreference_u(e.target.value)}>
                        <option selected disabled value=" ">Choose...</option>
                        <option>Cat</option>
                        <option>Dog</option>
                        <option>Both</option>
                    </select>
                </div>
            </div>
        </div> 
    </div>
    </>
 
}

export default SeekerEdit;