import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useUserData } from '../../contexts/AuthContext';
import './style.css';

const ApplicationDetail = () => {
  const { application_id } = useParams();

  const {token} = useUserData();
  const [appData, setAppData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch application data
        const appResponse = await fetch(`http://127.0.0.1:8000/pet/applications/${application_id}/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!appResponse.ok) throw new Error('Error fetching application data');
        const appJson = await appResponse.json();
        setAppData(appJson);
        // Fetch user type
        const userTypeRes = await fetch(`http://127.0.0.1:8000/account/usertype/`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!userTypeRes.ok) throw new Error('Error fetching user type');
        const userTypeJson = await userTypeRes.json();
        setUserType(userTypeJson.user_type);

        console.log(appJson[0].pet);
        console.log(userTypeJson.user_type);
        // Fetch pet data
        if (appJson && userTypeJson.user_type) {
          const petResponse = await fetch(`http://127.0.0.1:8000/pet/${userTypeJson.user_type}/pets/${appJson[0].pet}/`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!petResponse.ok) throw new Error('Error fetching pet data');
          const petJson = await petResponse.json();
          setPetData(petJson);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [application_id, token]);


      let options;
      let isDisabled = false;
      if (userType === 'seeker') {
        options = ['Pending', 'Accepted', 'Withdrawn'];
        isDisabled = appData[0].status !== 'Pending' && appData[0].status !== 'Accepted';
      } else if (userType === 'shelter') {
        options = ['Pending', 'Accepted', 'Denied'];
        isDisabled = appData[0].status !== 'Pending';
      }
      
      const handleChange = async (event) => {
        const newStatus = event.target.value;
        try {
          const response = await fetch(`http://127.0.0.1:8000/pet/application/${appData[0].id}/status/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ status: newStatus })
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          window.location.reload();
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };

        if (!appData || !petData) {
          return <p>Loading...</p>; 
        }
        const {applicant_name, phone, email, address, postal_code, city, household_info, pet_history, pet_history_text, status } = appData[0];
        const { name, Breed, image } = petData;

  return (
    <div className="page d-flex align-items-center py-4">
      <main className="form-adoption w-auto m-auto mainContent">
        <form style={{ width: '75vw', color: 'antiquewhite' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 className="h3 mb-3 fw-normal">Application Details</h1>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img id="pet-img" src={petData.image} alt={petData.petName} />
          </div>

          {/* Pet Info */}
          <h1 className="h4 mb-1 fw-normal">Pet Information</h1>
          <div className="row">
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="petID"
                value={petData.id}
                disabled
              />
              <label htmlFor="petID">Pet ID</label>
            </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="petName"
                value={petData.name}
                disabled
              />
              <label htmlFor="petName">Pet Name</label>
            </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="petBreed"
                value={petData.Breed}
                disabled
              />
              <label htmlFor="petBreed">Pet Breed</label>
            </div>
          </div>
          {/* Seeker Info */}
          {appData && (
            <>
            <h1 className="h4 mb-1 fw-normal">Your Information</h1>
          <div className="row">
            <div className="col-sm-3">
              <input type="text" className="form-control" value={applicant_name} disabled />
              <label htmlFor="seekerName">Name</label>
            </div>
            <div className="col-sm-3">
              <input type="tel" className="form-control" value={phone} disabled />
              <label htmlFor="seekerPhone">Phone Number</label>
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={email} disabled />
              <label htmlFor="seekerEmail">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <input type="text" className="form-control" value={address} disabled />
              <label htmlFor="seekerAddress">Address</label>
            </div>
            <div className="col-sm-2">
              <input type="text" className="form-control" value={postal_code} disabled />
              <label htmlFor="seekerPC">Postal Code</label>
            </div>
            <div className="col-sm-4">
              <input type="text" className="form-control" value={city} disabled />
              <label htmlFor="seekerCity">City</label>
            </div>
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              value={household_info}
              disabled
            />
            <label htmlFor="seekerHouseholdInfo">Household Info</label>
          </div>
          <div className="col-sm-3">
            <select className="form-control" value={pet_history ? 'y' : 'n'} disabled>
              <option value="n">No</option>
              <option value="y">Yes</option>
            </select>
            <label htmlFor="seekerPrevPetExp">Have you had a pet?</label>
          </div>
          {pet_history && (
            <div className="col-12">
              <textarea
                className="form-control"
                value={pet_history_text}
                disabled
              />
              <label htmlFor="seekerPrevPetExpText">Previous Experience with Pets</label>
            </div>
          )}
            </>
          )}
        </form>
        <select value={status} onChange={handleChange} disabled={isDisabled}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <br/>
        <label htmlFor="status">Status</label>
        <Link className="btn btnStyle w-100 mt-3 py-2" to={`/chat/${appData[0].id}`}>Chat</Link>
        <Link className="btn btnStyle w-100 mt-3 py-2" to="/ListApplication">Back to Application List</Link>
      </main>
    </div>
  );
};
export default ApplicationDetail;
