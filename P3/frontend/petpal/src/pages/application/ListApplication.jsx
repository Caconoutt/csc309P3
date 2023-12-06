import React, { useState, useEffect } from 'react';
import ApplicationItem from './ApplicationItem';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('creation_time');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/applications/?status=${filter}&ordering=${sort}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchData();
  }, [filter, sort]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <h1>Applications</h1>
      <div>
        <label>Filter by Status:</label>
        <select onChange={handleFilterChange}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          {/* Add more statuses as needed */}
        </select>

        <label>Sort by:</label>
        <select onChange={handleSortChange}>
          <option value="creation_time">Creation Time</option>
          <option value="last_update_time">Last Update Time</option>
        </select>
      </div>

      <ul>
        {applications.map(app => (
          <ApplicationItem key={app.id} application={app} />
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
