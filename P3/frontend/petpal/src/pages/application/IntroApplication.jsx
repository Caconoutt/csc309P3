import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const IntroApplication = () => {
    const { state } = useLocation();
    const [petData, setPetData] = useState(null);
    const token = localStorage.getItem('auth-token');
    useEffect(() => {
        const fetchPetData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/pet/seeker/pets/1/`, {
                    method: 'GET',
                    headers: {
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
                // Handle the error appropriately
            }
        };
    
    // const aaa = petResponse.json();
    fetchPetData()
    }, []);
    

    // const petData = {petID: aaa.id,
    //     petBreed: aaa.Breed,
    //     petName: aaa.name,
    //     petImg: aaa.image,};
    // const petData = {petID: state.id,
    //                  petBreed: state.Breed,
    //                  petName: state.name,
    //                  petImg: state.image,};
    // const petData = {petID: '123',
    //                  petBreed: 'Dog',
    //                  petName: 'Buddy',
    //                  petImg: 'https://www.petmd.com/sites/default/files/Acute-Dog-Diarrhea-47066074.jpg',};
    const navigate = useNavigate();
    console.log(petData);
    return (
    <div className="page d-flex align-items-center py-4">
        <main className="form-adoption w-auto m-auto mainContent">
        <div className="text-center" style={{ width: '75vw', color: 'antiquewhite' }}>
            <h1 className="h3 mb-3 fw-bolder">Adoption Process</h1>
            <p>Thank you for your interest in adopting a pet from us! We are excited to help you find your new best friend.</p>
            <p>Please read the following information carefully before submitting an application.</p>
            <p className="fw-bold">Fee: $100 per pet</p>
            <p>Fees will be collected only if the application is approved.</p>
            <p>Please fill out the application on the next page, after submitting, the shelter's staff will process your application.</p>
            <p>You will be contacted if the shelter approves your application.</p>

            <button className="btn btnStyle w-75 py-2" onClick={() => navigate('/CreateApplication', { state: {petData} })}>Fill Out Application</button>
            {/* <Link to="/conversation" className="btn btnStyle w-75 py-2">Chat with Shelter</Link> */}
        </div>
        </main>
    </div>
    );
    };

export default IntroApplication;
