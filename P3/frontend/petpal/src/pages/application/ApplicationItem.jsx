import React from 'react';
import { useNavigate } from 'react-router-dom';

const ApplicationItem = ({ application, userType }) => {
  const { 
    id, 
    status, 
    seekerName,
    seekerPhone,
    seekerEmail,
    seekerAddress,
    seekerPC,
    seekerCity,
    seekerHouseholdInfo,
    seekerPrevPetExp,
    seekerPrevPetExpText,
    petID
  } = application;
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/application/${id}/status/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        console.log('Status updated successfully!');
        // Optionally, refresh the item or the list to show updated status
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const renderStatusOptions = () => {
    switch(userType) {
      case 'shelter':
        return (
          <>
            <option value="accepted">Accepted</option>
            <option value="denied">Denied</option>
          </>
        );
      case 'seeker':
        return (
          <option value="withdrawn">Withdrawn</option>
        );
      default:
        return null;
    }
  };

  return (
    <li>
      <div>
        <h3>Application for Pet ID: {petID}</h3>
        <p>Seeker Name: {seekerName}</p>
        <p>Phone: {seekerPhone}</p>
        <p>Email: {seekerEmail}</p>
        <p>Address: {seekerAddress}, {seekerCity}, {seekerPC}</p>
        <p>Household Info: {seekerHouseholdInfo}</p>
        <p>Previous Pet Experience: {seekerPrevPetExp === 'y' ? 'Yes' : 'No'}</p>
        {seekerPrevPetExp === 'y' && <p>Details: {seekerPrevPetExpText}</p>}
        <p>Status: {status}</p>
        
        {status === 'pending' && (
          <select onChange={(e) => handleStatusChange(e.target.value)} defaultValue={status}>
            {renderStatusOptions()}
          </select>
        )}
        <button onClick={() => navigate(`/applications/${id}`)}>View Application</button>
      </div>
    </li>
  );
};

export default ApplicationItem;
