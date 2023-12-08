// import React from 'react';
// import { Link, useParams } from 'react-router-dom';

// const ApplicationDetail = () => {
//     var { id } = useParams();
//     const token = localStorage.getItem('token');
//     const appResponse = fetch(`http://127.0.0.1:8000/applications/${id}/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer`+ token,
//         },
//       });

//     const appData = appResponse.json();
//     const petID = appData.pet;
//     const userTypeRes = fetch(`http://127.0.0.1:8000/account/usertype/`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer`+ token,
//         }
//         })
//     const userType = userTypeRes.json().user_type;
    
//     const petResponse = fetch(`http://127.0.0.1:8000/${userType}/pets/${petID}/`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer`+ token,
//         },
//       });
//     const petData = petResponse.json();
    

//     const handleChange = async (event) => {
//         const newStatus = event.target.value;
//         try {
//           const response = await fetch(`http://127.0.0.1:8000/application/${appData.id}/status/`, {
//             method: 'PATCH',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer`+ token,
//             },
//             body: JSON.stringify({ status: newStatus })
//           });
    
//           if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//           }
//           window.location.reload();
//         } catch (error) {
//           console.error('Error updating status:', error);
//         }
//       };
    
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ApplicationDetail = () => {
  const { id } = useParams();
  const token = localStorage.getItem('token');

  const [appData, setAppData] = useState(null);
  const [userType, setUserType] = useState(null);
  const [petData, setPetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch application data
        const appResponse = await fetch(`http://127.0.0.1:8000/applications/${id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!userTypeRes.ok) throw new Error('Error fetching user type');
        const userTypeJson = await userTypeRes.json();
        setUserType(userTypeJson.user_type);

        // Fetch pet data
        if (appJson && userTypeJson.user_type) {
          const petResponse = await fetch(`http://127.0.0.1:8000/${userTypeJson.user_type}/pets/${appJson.pet}/`, {
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
  }, [id, token]);


      let options;
      let isDisabled = false;
    
      if (userType === 'seeker') {
        options = ['Pending', 'Accepted', 'Withdrawn'];
        isDisabled = appData.status !== 'Pending' && appData.status !== 'Accepted';
      } else if (userType === 'shelter') {
        options = ['Pending', 'Accepted', 'Denied'];
        isDisabled = appData.status !== 'Pending';
      }
    

        

  return (
    <div className="page d-flex align-items-center py-4">
      <main className="form-adoption w-auto m-auto mainContent">
        <form style={{ width: '75vw', color: 'antiquewhite' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 className="h3 mb-3 fw-normal">Application Details</h1>
          </div>

          <div style={{ textAlign: 'center' }}>
            <img src={petData.image} alt={petData.petName} />
          </div>

          {/* Pet Info */}
          <h1 className="h4 mb-1 fw-normal">Pet Information</h1>
          <div className="row">
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="petID"
                value={petID}
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
                value={petData.breed}
                disabled
              />
              <label htmlFor="petBreed">Pet Breed</label>
            </div>
          </div>
          {/* Seeker Info */}
          <h1 className="h4 mb-1 fw-normal">Your Information</h1>
          <div className="row">
            <div className="col-sm-3">
              <input type="text" className="form-control" value={appData.applicant_name} disabled />
              <label htmlFor="seekerName">Name</label>
            </div>
            <div className="col-sm-3">
              <input type="tel" className="form-control" value={appData.phone} disabled />
              <label htmlFor="seekerPhone">Phone Number</label>
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={appData.email} disabled />
              <label htmlFor="seekerEmail">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <input type="text" className="form-control" value={appData.address} disabled />
              <label htmlFor="seekerAddress">Address</label>
            </div>
            <div className="col-sm-2">
              <input type="text" className="form-control" value={appData.postal_code} disabled />
              <label htmlFor="seekerPC">Postal Code</label>
            </div>
            <div className="col-sm-4">
              <input type="text" className="form-control" value={appData.city} disabled />
              <label htmlFor="seekerCity">City</label>
            </div>
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              value={appData.household_info}
              disabled
            />
            <label htmlFor="seekerHouseholdInfo">Household Info</label>
          </div>
          <div className="col-sm-3">
            <select className="form-control" value={appData.pet_history.length > 0 ? 'y' : 'n'} disabled>
              <option value="n">No</option>
              <option value="y">Yes</option>
            </select>
            <label htmlFor="seekerPrevPetExp">Have you had a pet?</label>
          </div>
          {appData.pet_history.length > 0 && (
            <div className="col-12">
              <textarea
                className="form-control"
                value={appData.pet_history}
                disabled
              />
              <label htmlFor="seekerPrevPetExpText">Previous Experience with Pets</label>
            </div>
          )}
        </form>
        <select value={appData.status} onChange={handleChange} disabled={isDisabled}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <Link className="btn btnStyle w-100 mt-3 py-2" to="/ListApplication">Back to Application List</Link>
      </main>
    </div>
  );
};
export default ApplicationDetail;
