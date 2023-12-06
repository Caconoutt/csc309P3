import React from 'react';
import { Link } from 'react-router-dom';

const IntroApplication = () => {
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

          <Link to="/createApplication" className="btn btnStyle w-75 py-2">Fill Out Application</Link>
          <Link to="/conversation" className="btn btnStyle w-75 py-2">Chat with Shelter</Link>
        </div>
      </main>
    </div>
  );
};

export default IntroApplication;
