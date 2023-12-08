import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import Toast from 'react-bootstrap/Toast'
import Table from './Table'
import { useUserData } from '../../contexts/AuthContext'
import './Table/style.css'
function PetDetails() {
	const [show, setShow] = useState(false)
	const [pet, setPet] = useState({})
	const { token } = useUserData()
    const {identity, pet_id} = useLocation().state;

	const navigate = useNavigate()

	const handleClick = () => {
		const status = pet.status
		if (status === 'Available') {
			navigate('/application', {
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
				.then((response) => response.json())
				.then((json) => {
					console.log(json)
					setPet(json)
				})
		}
	}, [pet_id])

	return (
		<div className='row row-wrap '>
			<h1 className='title'>pet detail</h1>
			<div className='col-sm-12 mb-3 mb-sm-0 item-pet-card'>
				<div className='card'>
					<img src={pet.image} className='rounded img1' />
					<Table pet={pet} />
					<div className='list-group-item flex'>
						<Link to='/Shelter' className='info'>
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

			<Toast className='myToast' onClose={() => setShow(false)} show={show} delay={3000}>
				<Toast.Header>
					<strong className='me-auto'>attention</strong>
					{/* <small>11 mins ago</small> */}
				</Toast.Header>
				<Toast.Body>This pet can't be adopted for now. Please try another one.</Toast.Body>
			</Toast>
		</div>
	)
}

export default PetDetails
