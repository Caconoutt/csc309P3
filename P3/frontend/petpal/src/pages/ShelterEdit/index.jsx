

import './style.css';
import React from 'react';
import { Link, redirect } from "react-router-dom";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Done from "../../assets/images/Done.png";
import Edit from "../../assets/images/edit.png" 
import './style.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { useUserData } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
const ShelterEdit = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const user = state.user;
    const [firstItemId, setFirstItemId] = useState(null);
    const {token} = useUserData();
    const [filter, setFilter] = useState('')
    const [sort_time, setSort] = useState('')
    
    const {username,nickname,contact,location,preference,image_url,mission} = user;

    const [username_u, setUsername_u] = useState(username);
    const [nickname_u, setNickname_u] = useState(nickname);
    const [contact_u, setContact_u] = useState(contact);
    const [location_u, setLocation_u] = useState(location);
    const [preference_u, setPreference_u] = useState(preference);
    const [image_url_u, setImage_url_u] = useState(image_url);
    const [mission_u, setMission_u] = useState(mission);

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
      
        const url = `http://localhost:8000/account/shelter/profile/${firstItemId}/`;
        console.log(location_u);
      
        const updatedData = {
            username: username_u,
            nickname: nickname_u,
            contact: contact_u,
            location: location_u,
            preference: preference_u,
            mission: mission_u,
          // Include other fields that need to be updated
        };
      
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
          });
      
          if (response.ok) {
            // Redirect to SeekerProfile upon successful update
            navigate('/ShelterProfile');
          } else {
            console.log('Error updating profile');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };      
    
    return <>
        <div class="container" id="wrap">
        <div>
            <Button  class="btn-image" onClick={handleEdit}>
                <img src={Done} alt="Button Image" class="btn-image" />
            </Button>
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
            <div class="row" >
                <div class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Nickname:</p>
                </div>
                <div class="col-md-6 input-left">
                    <input type="text" class="form-control" id="form-input" placeholder="Enter text" 
                    value={nickname_u} onChange={(e) => setNickname_u(e.target.value)}/>
                </div>
            </div>

            <div class="row">
                <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Name:</p>
                </div>
                <div class="col-md-6">
                        <input type="text" class="form-control" id="form-input" placeholder="Enter text"
                        value={username_u} 
                        onChange={(e) => setUsername_u(e.target.value)}/>
                </div>
            </div>

            <div class="row">
                <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Contact:</p>
                </div>
                <div class="col-md-6">
                        <input type="text" class="form-control" id="form-input" placeholder="Enter Number"
                        value={contact_u}
                        onChange={(e) => setContact_u(e.target.value)}/>
                </div>
            </div>

            <div class="row">
                <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Location:</p>
                </div>
                <div class="col-md-6">
                    <select id="choice" class="form-select" required
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
            <div class="row">
              <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                  <p class="title">Mission Statement:</p>
              </div>
              <div class="col-md-6">
                      <input type="text" class="form-control" id="form-input" placeholder="Enter your mission statement"
                       value={mission_u}  
                       onChange={(e) => setMission_u(e.target.value)}/>
              </div>
          </div>

            <div class="row">
                <div class="col-md-6 col-sm-12 text-center text-md-end category">
                    <Link to="/ShelterManage" class="management">
                      <button class="btn btn-primary btn-submit">Pet Management</button>
                    </Link>
                </div>
            </div>
        </div> 
    </div>
    </>
}

export default ShelterEdit;