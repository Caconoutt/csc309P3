import React, { useEffect, useState }  from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ApplicationItem = ({ application, userType }) => {
    const [petData, setPetData] = useState(null); // State to store pet data
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    const navigate = useNavigate();
    useEffect(() => {
        const fetchPetData = async () => {
            try {
            const response = await fetch(`http://127.0.0.1:8000/${userType}/pets/${application.pet}/`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            setPetData(data);
            } catch (error) {
            console.error('Error fetching pet data:', error);
            // Handle error appropriately
            }
        };
    
        if (application && application.pet && userType) {
            fetchPetData();
        }
    }, [application, userType, token]); // Dependency array
  


  return (
    <li>
      <div>
      <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false"
              aria-controls="collapseFive">
              Pet #{application.pet}: {petData.name}
            </button>
          </h2>
          <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body item-body">
              <div className="pet-info">
                <div className="item-info flex">
                  <div className="label">Breed: </div>
                  <div className="info">{petData.Breed}</div>
                </div>
                <div className="item-info flex">
                  <div className="label">Age: </div>
                  <div className="info">{petData.age}</div>
                </div>
                <div className="item-info flex">
                  <div className="label">Location: </div>
                  <div className="info">{petData.location}</div>
                </div>
              </div>
              <div className="btn-wrap">
              <button className="btn create-btn btn-sm" onClick={() => navigate(`/ApplicationDetail/${application.id}`)}>View Application</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ApplicationItem;
