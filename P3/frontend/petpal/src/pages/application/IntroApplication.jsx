import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const IntroApplication = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [petData, setPetData] = useState({
        petID: state?.petid,
        petBreed: state?.petbreed,
        petName: state?.petname,
        petImg: state?.petimg,
    });
    useEffect(() => {
        if (state) {
            setPetData({
                id: state.petid,
                Breed: state.petbreed,
                name: state.petname,
                image: state.petimg,
            });
        }
    }, [state]);

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
                  </div>
            </main>
        </div>
    );
};

export default IntroApplication;
