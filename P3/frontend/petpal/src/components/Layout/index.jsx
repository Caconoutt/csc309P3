import { useContext } from "react";
import { Outlet, Link, useLocation } from "react-router-dom"
import { APIContext } from "../../contexts/APIContext";
import "../../pages/Home/style.css"
import './style.css';
import logo from "../../assets/images/logo.png"
import logo1 from "../../assets/images/logo1.png"
import login from "../../assets/images/login.png"
import Dropdown from 'react-bootstrap/Dropdown';

const Layout = () => {
    return <>
        <header className="p-3 mb-3 border-bottom">
        <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
    
        <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
            <img id="logo1" src={logo1} />
            <img id="logo" src={logo} />
        </Link>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 headerText">Home</Link></li>
        </ul>
      
        <div style={{width:20 + 'px'}}></div>

        <Dropdown>
          <Dropdown.Toggle style={{backgroundColor:"#B55D4C", borderColor:"#B55D4C"}}>
          <img src={login} alt="mdo" width="32" height="32" className="rounded-circle" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item><Link to="/LoginSeeker">Seeker Login</Link></Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item><Link to="/LoginShelter">Shelter Login</Link></Dropdown.Item>
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

export default Layout;