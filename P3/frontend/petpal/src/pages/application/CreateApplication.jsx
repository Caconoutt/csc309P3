import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const CreateApplication = () => {
  const [formData, setFormData] = useState({
    applicant_name: '',
    phone: '',
    email: '',
    address: '',
    postal_code: '',
    city: '',
    household_info: '',
    pet_history: '',
    pet_history_text: ' ',
    status: 'Pending',
  });

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === 'pet_history') {
      setFormData((prevData) => ({
        ...prevData,
        pet_history: value === 'y', 
      }));
    }
  
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
            <img src={petData.image} alt={petData.name} />
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
                value={petData.id}
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
                value={petData.Breed}
                disabled
              />
              <label htmlFor="petBreed">Pet Breed</label>
            </div>
          </div>

          {/* Seeker Info */}
          <h1 className="h4 mb-1 fw-normal">Your Information</h1>
          <div className="row">
                <div className="col-sm-3">
                    <input type="text" className="form-control" id="applicant_name" onChange={handleInputChange}/>
                    <label for="applicant_name">Name</label>
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" id="phone" onChange={handleInputChange}/>
                    <label for="phone">Phone Number</label>
                </div>
                <div className="col-sm-6">
                    <input type="text" className="form-control" id="email" onChange={handleInputChange}/>
                    <label for="email">Email</label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <input type="text" className="form-control" id="address" onChange={handleInputChange}/>
                    <label for="address">Address</label>
                </div>
                <div className="col-sm-2">
                    <input type="text" className="form-control" id="postal_code" onChange={handleInputChange}/>
                    <label for="postal_code">Postal Code</label>
                </div>
                <div className="col-sm-4">
                    <input type="text" className="form-control" id="city" onChange={handleInputChange}/>
                    <label for="city">City</label>
                </div>
            </div>
            <div className="col-12">
                <textarea
                className="form-control"
                id="household_info"
                placeholder="Please describe where do you live(i.e. condo, house, etc.), how many people in the household, do they agree on the adoption, other pets in the household"
                onChange={handleInputChange}
                />
                <label htmlFor="household_info">Household Info</label>
            </div>
            <div className="col-sm-3">
                <select className="form-control" id="pet_history" onChange={handleInputChange} required>
                    <option value="">Please Select</option>
                    <option value="n">No</option>
                    <option value="y">Yes</option>
                </select>
                <label htmlFor="pet_history">Have you had a pet?</label>
            </div>
            <div className="col-12" id="seekerPrevPetExpInput" style={{ display: 'none' }}>
              <textarea
              className="form-control"
              id="pet_history_text"
              placeholder="Breed, age, Is the pet currently living with you?"
              onChange={handleInputChange}
              />
              <label htmlFor="pet_history_text">Previous Experience with Pets</label>
            </div>
            {formData.pet_history && (
                <div className="col-12" id="seekerPrevPetExpInput">
                <textarea
                    className="form-control"
                    id="pet_history_text"
                    placeholder="Breed, age, Is the pet currently living with you?"
                    onChange={handleInputChange}
                />
                <label htmlFor="pet_history_text">Previous Experience with Pets</label>
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

export default CreateApplication;
