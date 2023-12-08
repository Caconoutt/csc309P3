import React, { useState, useEffect } from 'react';
import ApplicationItem from './ApplicationItem';
import Accordion from 'react-bootstrap/Accordion';
import './style.css';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('creation_time');

  const token = localStorage.getItem('auth-token');
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    fetchUserType(token).then(fetchedUserType => {
      setUserType(fetchedUserType);
    });
  
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/pet/applications/?status=${filter}&ordering=${sort}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (Array.isArray(data.results)) {
          setApplications(data.results);
        } else {
          console.error('Expected an array, but received:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [filter, sort]);

  let options;
  async function fetchUserType(token) {
    try {
      const userTypeRes = await fetch(`http://127.0.0.1:8000/account/usertype/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
  
      if (!userTypeRes.ok) {
        throw new Error(`HTTP error! status: ${userTypeRes.status}`);
      }
  
      const userTypeData = await userTypeRes.json();
      return userTypeData.user_type;
    } catch (error) {
      console.error('Error fetching user type:', error);
      // Handle the error appropriately
      return null;
    }
  }
  
  options = ['Pending', 'Accepted', 'Denied', 'Withdrawn'];

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <h1 className="h1 mb-1 fw-bold text-center">Applications</h1>
      <div className="row justify-content-center mt-3 mb-3">
        <div className="col-sm-3 text-right mr-3">
          <label>Filter by Status:</label>
          <select onChange={handleFilterChange}>
            <option value="">All</option>
            {options && options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="col-sm-3 text-left">
          <label>Sort by:</label>
          <select onChange={handleSortChange}>
            <option value="creation_time">Creation Time</option>
            <option value="last_modified_time">Last Update Time</option>
          </select>
        </div>
      </div>
      <Accordion defaultActiveKey="0" className="custom-accordion">
        {applications.map(app => (
          <ApplicationItem key={app.id} application={app} userType={userType} />
        ))}
      </Accordion>
    </div>
  );
};

export default ApplicationList;
