import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ApplicationItem = ({ application, userType }) => {
    const [petData, setPetData] = useState(null);
    const token = localStorage.getItem('auth-token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/pet/${userType}/pets/${application.pet}/`, {
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
            }
        };

        if (application && application.pet && userType) {
            fetchPetData();
        }
    }, [application, userType, token]);

    const handleViewApplication = () => {
        navigate(`/ApplicationDetail/${application.id}`);
    };

    if (!petData) {
        return null;
    }

    const { name, Breed, age, location } = petData || {};

    return (
        <Accordion.Item eventKey={application.id}>
            <Accordion.Header>Pet #{application.pet}: {name}</Accordion.Header>
            <Accordion.Body>
              <div className='row'>
                <div className='col-md-2'/>
                <div className='pet-info col-md-3'>
                      <div className='item-info flex'>
                          <div className='label'>Breed: </div>
                          <div className='info'>{Breed}</div>
                      </div>
                      <div className='item-info flex'>
                          <div className='label'>Age: </div>
                          <div className='info'>{age}</div>
                      </div>
                      <div className='item-info flex'>
                          <div className='label'>Location: </div>
                          <div className='info'>{location}</div>
                      </div>
                  </div>
                  <div className='btn-wrap col-md-4 mt-4'>
                      <button className='btn create-btn btn-sm view-application-btn' onClick={handleViewApplication}>View Application</button>
                  </div>
                  <div className='col-md-2'/>
              </div>
                
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default ApplicationItem;
