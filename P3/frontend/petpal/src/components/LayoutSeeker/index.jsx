import { useEffect, useState } from "react";
import { useUserData } from "../../contexts/AuthContext";
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

const LayoutSeeker = () =>{
  const {token} = useUserData();
  const [image, setImage] = useState(null);
  const [filter, setFilter] = useState('')
  const [sort_time, setSort] = useState('')

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
                setImage(userResult.image_url);
              } else {
                console.log('Error fetching user data');
              }
            }
          } else {
            console.log('Error fetching notifications');
          }
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchData();
    }, [image]);



    return <>
    <header className="p-3 mb-3 border-bottom">
    <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

    <Link to="/HomeSeeker" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <img id="logo1" src={logo1} />
        <img id="logo" src={logo} />
    </Link>

    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><Link to="/HomeSeeker" className="nav-link px-2 headerText">Home</Link></li>
      <li><Link to="/ListApplication" class="nav-link px-2 headerText">My Applications</Link></li>
      <li><Link to="/ShelterList"  class="nav-link px-2 headerText">Shelter List</Link></li>
    </ul>


    <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
          <img src={noti_new} alt="mdo" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/NotiList">All notification</Dropdown.Item>
          </Dropdown.Menu>
    </Dropdown>
  
    <div style={{width:20 + 'px'}}></div>

    <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
          <img src={image === null ? login : image} alt="mdo" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="/SeekerProfile">Profile</Dropdown.Item>
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

export default LayoutSeeker