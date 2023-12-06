import { Link, useNavigate } from "react-router-dom";
import './style.css'

function Table({pet}){
    let navigate = useNavigate();
    return (<div className="row row-wrap ">
      <h1 className="title">pet detail</h1>
      <div className="col-sm-12 mb-3 mb-sm-0 item-pet-card">
        <div className="card">
          <img src={pet.imageUrl} className="rounded img1"/>

          <ul className="list-group list-group-flush">
            <li className="list-group-item flex">
              <div className="label">
                Name:
              </div>
              <div className="info">{pet.name}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Age:
              </div>
              <div className="info">{pet.age}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Breed:
              </div>
              <div className="info">{pet.breed}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Gender:
              </div>
              <div className="info">{pet.gender}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Color:
              </div>
              <div className="info">{pet.color}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Location:
              </div>
              <div className="info">{pet.location}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Special Needs:
              </div>
              <div className="info">{pet.specialNeeds}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Behaviour description:
              </div>
              <div className="info">{pet.behav_descrp}</div>
            </li>
            <li className="list-group-item flex">
              <div className="label">
                Medical History:
              </div>
              <div className="info">{pet.medicalHistory}</div>
            </li>
            <li className="list-group-item flex">
            <Link to='/Shelter' className="info">check its shelter</Link>
            </li>
          </ul>
          <div className="card-body">
            
            <button role="button" className="button  adopt-btn" onClick={() => navigate("/application")}>Adopt Me Now</button>
          </div>
          </div>
        </div>
      </div>);
}

export default Table;