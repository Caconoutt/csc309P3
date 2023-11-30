import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { APIContext } from "../../contexts/APIContext";
import "../../pages/Home/style.css"
import './style.css';
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import login from "../../assets/images/login.png"

/* TODO: update the link */
/* TODO: Drop Down link */

const Layout = () => {
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
        </ul>
      
        <div style={{width:20 + 'px'}}></div>
        
        <div className="dropdown text-end">
          <a href="#" class="d-block link-body-emphasis text-decoration-none" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={login} alt="mdo" width="32" height="32" className="rounded-circle" />
          </a>
          <ul className="dropdown-menu text-small">
            <li><a className="dropdown-item" href="seekerLogin.html">Seeker Login</a></li>
            <li><hr className="dropdown-divider"></hr></li>
            <li><a className="dropdown-item" href="shelterLogin.html">Shelter Login</a></li>
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

export default Layout;