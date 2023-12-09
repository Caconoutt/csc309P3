import { Navigate, useNavigate } from "react-router-dom";
import "./style.css"

const HomeSeeker = () => {

  const navigate = useNavigate();
    return <>
      <div className="searchBar">
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                <div type="search" className="form-control" placeholder="Search..." aria-label="Search" onClick={() => navigate("/PetSearch")} >
                Search...</div>
            </form>
        </div>
    </>;
}

export default HomeSeeker