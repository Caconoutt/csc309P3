import "./style.css"
import Seeker from "../../assets/images/seeker.jpeg"
import Edit from "../../assets/images/edit.png"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useUserData } from "../../contexts/AuthContext"
import { Button } from "react-bootstrap";

const SeekerProfile = () => {
    const navigate = useNavigate();
    const {token} = useUserData();
    console.log("this is " + token);

    // get the notification list for the user to get the id
    const [filter, setFilter] = useState('')
    const [sort_time, setSort] = useState('')
    const [firstItemId, setFirstItemId] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [username, setUsername] = useState(null);
    const [contact, setContact] = useState(null);
    const [location, setLocation] = useState(null);
    const [preference, setPreference] = useState(null);
    const [email, setEmail] = useState(null);
    const [user, setUser] = useState(null);
    const [isloading, setIsloading] = useState(true);  

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
                setFirstItemId(ownerId);
                const newUrl = `http://localhost:8000/account/seeker/profile/${ownerId}/`;
                const userResp = await fetch(newUrl, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                });
                if (userResp.ok) {
                  const userResult = await userResp.json();
                  setUser(userResult);
                  setNickname(userResult.nickname);
                  setUsername(userResult.username);
                  setContact(userResult.contact);
                  setLocation(userResult.location);
                  setPreference(userResult.preference);
                  setEmail(userResult.email);
                  setIsloading(false);
                } else {
                    setIsloading(false);
                  console.log('Error fetching user data');
                }
              }
            } else {
                setIsloading(false);
              console.log('Error fetching notifications');
            }
          } catch (error) {
            setIsloading(false);
            console.error(error);
          }
        };
      
        fetchData();
      }, []);

    const goEdit = () => {  
        navigate(`/SeekerEdit`, { state: {user:user}});

    };
    

    // template below
    return(
    <>
    {isloading ? (
                <p>Loading...</p>
            ) : (
    <div class="container" id="wrap">
        <div>
            <Button  class="btn-image" onClick={goEdit}>
                <img src={Edit} alt="Button Image" class="btn-image" />
            </Button>
        </div>

        <div class="img-container">
            <div class = "portrait">
                <img src={Seeker} class="img-fluid profile-img" /> 
            </div>
        </div>
        
        <div class="info-container">
              <div class="row">
                <div class="col-md-6 col-sm-12 category">
                    <p class="title">Nickname:</p>
                </div>
                <div class="col-md-6 col-sm-12 text-md-left">
                    <p>{nickname}</p>
                </div>
              </div>
            <div class="row" >
                <div class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Email:</p>
                </div>
                <div class="col-md-6 col-sm-12 text-md-left">
                    <p>{email}</p>
                </div>
            </div>

            <div class="row">
                <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Name:</p>
                </div>
                <div class="col-md-6 col-sm-12 text-md-left">
                    <p>{username}</p>
                </div>
            </div>

            <div class="row">
                <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Contact:</p>
                </div>
                <div class="col-md-6 col-sm-12 text-md-left">
                    <p>{contact}</p>
                </div>
            </div>

            <div class="row">
                <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Location:</p>
                </div>
                <div class="col-md-6 col-sm-12 text-md-left">
                    <p>{location}</p>
                </div>
            </div>
            <div class="row">
                <div  class="col-md-6 col-sm-12 text-center text-md-end category">
                    <p class="title">Preference:</p>
                </div>
                <div class="col-md-6 col-sm-12 text-md-left">
                    <p>{preference}</p>
                </div>
            </div>

            
        </div> 
    </div>
      )}
      </>
  );
}

export default SeekerProfile;