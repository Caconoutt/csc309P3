import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { APIContext } from "../../contexts/APIContext";
import "../../pages/Home/style.css"
import '../Layout/style.css';
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import login from "../../assets/images/login.png"
import noti_new from "../../assets/images/noti_new.png"

const LayoutShelter = () =>{
    return <>
    <header className="p-3 mb-3 border-bottom">
    <div className="container">
    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

    <a href="index.html" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
        <img id="logo1" src={logo1} />
        <img id="logo" src={logo} />
    </a>

    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
      <li><a href="index.html" className="nav-link px-2 headerText">Home</a></li>
      <li><a href="shelter_petlist.html" class="nav-link px-2 headerText">My Pets</a></li>
    </ul>

    <div className="dropdown text-end">
          <a href="#" className="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={noti_new} alt="mdo" width="32" height="32" class="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="#">Your application was succeeded!</a></li>
            <li><a className="dropdown-item" href="#">New Shelter DM: Hi!</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="noti_msg.html">All notification</a></li>
          </ul>
        </div>
  
    <div style={{width:20 + 'px'}}></div>
    
    <div className="dropdown text-end">
      <a href="#" class="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
        <img src={login} alt="mdo" width="32" height="32" className="rounded-circle" />
      </a>
      <ul className="dropdown-menu text-small">
      <li><a className="dropdown-item" href="seeker_info.html">Profile</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="seekerLogin.html">Logout</a></li>
      </ul>
    </div>
    </div>
    </div>
    </header>

    <main>
        <Outlet />
    </main>
  
</>;
}

export default LayoutShelter