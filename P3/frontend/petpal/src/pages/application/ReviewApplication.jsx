import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
// import {useUserData} from '../../contexts/AuthContext';

const ReviewApplication = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const formData = state && state.formData ? state.formData : null;

  if (!formData) {
    return <p>No data available</p>;
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const petId = '123'; // Replace with the actual petId
    // const { token } = useUserData();
    try {
      // Send a POST request to the server
      const response = await fetch(`http://127.0.0.1:8000/seeker/pet/${petId}/application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        //   'bearer': token,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Application submitted successfully!');
        // Navigate to the review page or any other page as needed
        navigate('/ViewApplicaiton', { state: { formData } });
      } else {
        console.error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };


  return (
    <div className="page d-flex align-items-center py-4">
      <main className="form-adoption w-auto m-auto mainContent">
        <form style={{ width: '75vw', color: 'antiquewhite' }} onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center' }}>
            <h1 className="h3 mb-3 fw-normal">Review Application</h1>
          </div>

        {/* TODO PET INFO NEEDED */}
          {/* Seeker Info */}
          <h1 className="h4 mb-1 fw-normal">Your Information</h1>
          <div className="row">
            <div className="col-sm-3">
              <input type="text" className="form-control" value={formData.seekerName} disabled />
              <label htmlFor="seekerName">Name</label>
            </div>
            <div className="col-sm-3">
              <input type="tel" className="form-control" value={formData.seekerPhone} disabled />
              <label htmlFor="seekerPhone">Phone Number</label>
            </div>
            <div className="col-sm-6">
              <input type="text" className="form-control" value={formData.seekerEmail} disabled />
              <label htmlFor="seekerEmail">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <input type="text" className="form-control" value={formData.seekerAddress} disabled />
              <label htmlFor="seekerAddress">Address</label>
            </div>
            <div className="col-sm-2">
              <input type="text" className="form-control" value={formData.seekerPC} disabled />
              <label htmlFor="seekerPC">Postal Code</label>
            </div>
            <div className="col-sm-4">
              <input type="text" className="form-control" value={formData.seekerCity} disabled />
              <label htmlFor="seekerCity">City</label>
            </div>
          </div>
          <div className="col-12">
            <textarea
              className="form-control"
              value={formData.seekerHouseholdInfo}
              disabled
            />
            <label htmlFor="seekerHouseholdInfo">Household Info</label>
          </div>
          <div className="col-sm-3">
            <select className="form-control" value={formData.seekerPrevPetExp} disabled>
              <option value="n">No</option>
              <option value="y">Yes</option>
            </select>
            <label htmlFor="seekerPrevPetExp">Have you had a pet?</label>
          </div>
          {formData.seekerPrevPetExp === 'y' && (
            <div className="col-12">
              <textarea
                className="form-control"
                value={formData.seekerPrevPetExpText}
                disabled
              />
              <label htmlFor="seekerPrevPetExpText">Previous Experience with Pets</label>
            </div>
          )}
            <button className="btn btnStyle w-100 py-2" type="submit">Submit</button>
        </form>
        <Link className="btn btnStyle w-100 mt-3 py-2" to="/conversation">Want to Chat with the Shelter?</Link>
      </main>
    </div>
  );
};

export default ReviewApplication;
