// AdoptionForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AdoptionForm = () => {
  const [showPrevPetExpInput, setShowPrevPetExpInput] = useState(false);
  const [formData, setFormData] = useState({
    seekerName: '',
    seekerPhone: '',
    seekerEmail: '',
    seekerAddress: '',
    seekerPC: '',
    seekerCity: '',
    seekerHouseholdInfo: '',
    seekerPrevPetExp: '',
    seekerPrevPetExpText: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const { state } = useLocation();
  const petData = state.petData;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    navigate('/ReviewApplication', { state: {formData: formData, petData: petData} });
  };

  useEffect(() => {
    const handleChange = (event) => {
      const seekerPrevPetExpInput = document.getElementById('seekerPrevPetExpInput');
      if (seekerPrevPetExpInput) {
        seekerPrevPetExpInput.style.display = event.target.value === 'y' ? 'block' : 'none';
      }
    };

    const seekerPrevPetExpElement = document.getElementById('seekerPrevPetExp');
    if (seekerPrevPetExpElement) {
      seekerPrevPetExpElement.addEventListener('change', handleChange);
    }

    return () => {
      if (seekerPrevPetExpElement) {
        seekerPrevPetExpElement.removeEventListener('change', handleChange);
      }
    };
  }, []);



  return (
    <div className="page d-flex align-items-center py-4">
      <main className="form-adoption w-auto m-auto mainContent">
        <form style={{ width: '75vw', color: 'antiquewhite' }} onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center' }}>
            <img src={petData.petImg} alt={petData.petName} />
            <h1 className="h3 mb-3 fw-normal">Please take me home!</h1>
          </div>

          {/* Pet Info */}
          <h1 className="h4 mb-1 fw-normal">Pet Information</h1>
          <div className="row">
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="petID"
                value={petData.petID}
                disabled
              />
              <label htmlFor="petID">Pet ID</label>
            </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="petName"
                value={petData.petName}
                disabled
              />
              <label htmlFor="petName">Pet Name</label>
            </div>
            <div className="col-sm-4">
              <input
                type="text"
                className="form-control"
                id="petBreed"
                value={petData.petBreed}
                disabled
              />
              <label htmlFor="petBreed">Pet Breed</label>
            </div>
          </div>

          {/* Seeker Info */}
          <h1 className="h4 mb-1 fw-normal">Your Information</h1>
          <div className="row">
                <div className="col-sm-3">
                    <input type="text" className="form-control" id="seekerName" onChange={handleInputChange}/>
                    <label for="seekerName">Name</label>
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" id="seekerPhone" onChange={handleInputChange}/>
                    <label for="seekerPhone">Phone Number</label>
                </div>
                <div className="col-sm-6">
                    <input type="text" className="form-control" id="seekerEmail" onChange={handleInputChange}/>
                    <label for="seekerEmail">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <input type="text" className="form-control" id="seekerAddress" onChange={handleInputChange}/>
                    <label for="seekerAddress">Address</label>
                </div>
                <div className="col-sm-2">
                    <input type="text" className="form-control" id="seekerPC" onChange={handleInputChange}/>
                    <label for="seekerPC">Postal Code</label>
                </div>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="seekerCity" onChange={handleInputChange}/>
                    <label for="seekerCity">City</label>
                </div>
            </div>
            <div className="col-12">
                <textarea
                className="form-control"
                id="seekerHouseholdInfo"
                placeholder="Please describe where do you live(i.e. condo, house, etc.), how many people in the household, do they agree on the adoption, other pets in the household"
                onChange={handleInputChange}
                />
                <label htmlFor="seekerHouseholdInfo">Household Info</label>
            </div>
            <div className="col-sm-3">
                <select className="form-control" id="seekerPrevPetExp" onChange={handleInputChange} required>
                    <option value="">Please Select</option>
                    <option value="n">No</option>
                    <option value="y">Yes</option>
                </select>
                <label htmlFor="seekerPrevPetExp">Have you had a pet?</label>
            </div>
            <div className="col-12" id="seekerPrevPetExpInput" style={{ display: 'none' }}>
            <textarea
            className="form-control"
            id="seekerPrevPetExpText"
            placeholder="Breed, age, Is the pet currently living with you?"
            onChange={handleInputChange}
            />
            <label htmlFor="seekerPrevPetExpText">Previous Experience with Pets</label>
            </div>
            {showPrevPetExpInput && (
                <div className="col-12" id="seekerPrevPetExpInput">
                <textarea
                    className="form-control"
                    id="seekerPrevPetExpText"
                    placeholder="Breed, age, Is the pet currently living with you?"
                    value={formData.seekerPrevPetExpText}
                    onChange={handleInputChange}
                />
                <label htmlFor="seekerPrevPetExpText">Previous Experience with Pets</label>
                </div>
          )}

          <button className="btn btnStyle w-100 py-2" type='submit'>
            Review Application
          </button>
        </form>
      </main>
    </div>
  );
};

export default AdoptionForm;
