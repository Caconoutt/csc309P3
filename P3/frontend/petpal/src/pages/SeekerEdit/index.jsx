

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

      const handleEdit = async (event) => {
        event.preventDefault();
      
        const new_url = `http://localhost:8000/account/seeker/profile/${firstItemId}/`;
        console.log(location_u);
      
        const updatedData = {
            username: username_u,
            nickname: nickname_u,
            contact: contact_u,
            location: location_u,
            preference: preference_u,
          // Include other fields that need to be updated
        };
      
        try {
          const response = await fetch(new_url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          });
      
          if (response.ok) {
            // Redirect to SeekerProfile upon successful update
            navigate('/SeekerProfile');
          } else {
            console.log('Error updating profile');
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
                    <input type="file" class="img-input" id="imageUpload" />
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