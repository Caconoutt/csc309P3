import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Toast from 'react-bootstrap/Toast'
import Table from './Table'
import { useUserData } from '../../contexts/AuthContext'
import './Table/style.css'
function PetDetails() {
	const [show, setShow] = useState(false)
	const [pet, setPet] = useState({})
	const { token } = useUserData()
	const [errorMessage, setErrMsg] = useState('')
    const {identity, pet_id} = useLocation().state;

	const navigate = useNavigate()

	const handleClick = () => {
		const status = pet.status
		if (status === 'Available') {
			navigate('/IntroApplication', {
				state: {
					petid: `${pet.id}`,
					petname: `${pet.name}`,
					petbreed: `${pet.Breed}`,
					petimg: `${pet.image}`,
				},
			})
		} else {
            setShow(true)
		}
	}
	const backTransfer = () =>{
		navigate('/ShelterAllPet')
	}
	



	useEffect(() => {
		if (identity === 'Seeker') {
			fetch(`http://localhost:8000/pet/seeker/pets/${pet_id}/`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + token,
				},
			})
				.then((response) => response.json())
				.then((json) => {
					console.log(json)
					setPet(json)
				})
		} else {
			fetch(`http://localhost:8000/pet/shelter/pets/${pet_id}/`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: 'Bearer ' + token,
				},
			})
			.then((response) => {
				if (response.status !== 200){
					setErrMsg(response.statusText)
				}
				return response.json()
			})
				
				.then((json) => {
					console.log(json)
					setPet(json)
				})
		}
	}, [pet_id])
	if(identity === 'Shelter'){
		return (
			<><div className='row row-wrap '>
				<h1 className='title'>pet detail</h1>
				<div className='outercard'>
				<div className='item-pet-card2'>
					<div className='cardformat'>
						<img src={pet.image} className='rounded img1' />
						<Table pet={pet} />
						
					</div>
					<div className='card-body'>
						<button role='button' className='button  adopt-btn' onClick={backTransfer}>
							Back To Listing
						</button>
					</div>
					</div>
					</div>
				</div>
				</>	)
	}
	return (
		<><div className='row row-wrap '>
			<h1 className='title'>pet detail</h1>
			<div className='outercard'>
			<div className='item-pet-card2'>
				<div className='cardformat'>
					<img src={pet.image} className='rounded img1' />
					<Table pet={pet} />
					<div className='list-group-item flex'>
					<Link to={'/ShelterDetail/'+ pet.shelter} className='checkinfo' style = {{color:'black'}}>
							check its shelter
						</Link>
					</div>
					<div className='card-body'>
						<button role='button' className='button  adopt-btn' onClick={handleClick}>
							Adopt Me Now
						</button>
					</div>
				</div>
			</div>
			</div>
			<Toast className='myToast' onClose={() => setShow(false)} show={show} delay={3000}>
				<Toast.Header>
					<strong className='me-auto'>attention</strong>
					{/* <small>11 mins ago</small> */}
				</Toast.Header>
				<Toast.Body>This pet can't be adopted for now. Please try another one.</Toast.Body>
			</Toast>
		</div>
		{errorMessage ? (
				<Alert className = 'alert' variant='danger'>
					{errorMessage}
				</Alert>
			) : (
				<></>
			)}
		</>
		
	)
}

export default PetDetails
