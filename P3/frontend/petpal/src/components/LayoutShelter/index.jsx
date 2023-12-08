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

const LayoutShelter = () =>{
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
    </ul>

    <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
          <img src={noti_new} alt="mdo" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div id="newAddedNoti">
            <Dropdown.Item href="#/action-1">dummy new noti</Dropdown.Item>
            </div>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-2">All notification</Dropdown.Item>
          </Dropdown.Menu>
    </Dropdown>
  
    <div style={{width:20 + 'px'}}></div>
    
    <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
          <img src={login} alt="mdo" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
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