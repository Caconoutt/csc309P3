import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { APIContext } from "../../contexts/AuthContext";
import "../../pages/Home/style.css"
import '../Layout/style.css';
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import login from "../../assets/images/login.png"
import noti_new from "../../assets/images/noti_new.png"
import Dropdown from 'react-bootstrap/Dropdown';
import Logout from "../Logout";
import noti from "../../assets/images/noti.png"
import { useState, useEffect } from 'react';
import { useUserData } from '../../contexts/AuthContext';

const LayoutShelter = () =>{

  const [unreadNotifications, setUnreadNotifications] = useState(false);
  const [filter, setFilter] = useState('unreaded')
  const [sort_time, setSort] = useState('')
  const {token} = useUserData();

  useEffect(()=>{
    const url = `http://localhost:8000/account/noti/?filter=${filter}&order_by=${sort_time}`
    const fetchNoti = async()=>{
        try{
            const resp = await fetch(url,{
                method:'GET',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (resp.ok){
                const result = await resp.json();
                // check if there is unread notification
                // if there is, set unreadNotifications to true
                // else, set unreadNotifications to false
                if (result.results.length > 0){
                  setUnreadNotifications(true);
                }
                else{
                  setUnreadNotifications(false);
                }
            }
            else{
                console.log('error happend')
            }
        }
        catch(error){console.error(error)}
    };
    fetchNoti();
},[filter,sort_time]);

    return <>
    <header className="p-3 mb-3 border-bottom">
    <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

    <Link to="/HomeShelter" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <img id="logo1" src={logo1} />
        <img id="logo" src={logo} />
    </Link>

    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><Link to="/HomeShelter" className="nav-link px-2 headerText">Home</Link></li>
      <li><Link to="/ShelterAllPet" class="nav-link px-2 headerText">My Pets</Link></li>
      <li><Link to="/ListApplication" class="nav-link px-2 headerText">Application</Link></li>
      <li></li>
      <li>
        <Dropdown>
            <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
            <span className="headerText">Blog</span>
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/CreateBlog">Create New Blog</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/ListBlog">View Blog List</Dropdown.Item>
            </Dropdown.Menu>
      </Dropdown>

      </li>
    </ul>

    <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
          <img src={unreadNotifications ? noti_new : noti}
          alt="mdo" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div id="newAddedNoti">
            <Dropdown.Item href="#/action-1">dummy new noti</Dropdown.Item>
            </div>
            <Dropdown.Divider />
            <Dropdown.Item href="/NotiList">All notification</Dropdown.Item>
          </Dropdown.Menu>
    </Dropdown>
  
    <div style={{width:20 + 'px'}}></div>
    
    <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
          <img src={login} alt="mdo" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/ShelterProfile">Profile</Dropdown.Item>
            <Dropdown.Divider />
            <Logout />
          </Dropdown.Menu>
    </Dropdown>

    </div>
    </div>
    </header>

    <main>
        <Outlet />
    </main>
  
</>;
}

export default LayoutShelter