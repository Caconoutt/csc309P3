import { Link, useNavigate } from 'react-router-dom'
import './style.css'

function Table({ pet }) {
	// let navigate = useNavigate();
	return (
		<ul className='list-group list-group-flush'>
			<li className='list-group-item flex'>
				<div className='label'>Name:</div>
				<div className='info'>{pet.name}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Age:</div>
				<div className='info'>{pet.age}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Breed:</div>
				<div className='info'>{pet.Breed}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Gender:</div>
				<div className='info'>{pet.gender}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Color:</div>
				<div className='info'>{pet.color}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Location:</div>
				<div className='info'>{pet.location}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Special Needs:</div>
				<div className='info'>{pet.special_needs}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Behaviour description:</div>
				<div className='info'>{pet.behaviour_description}</div>
			</li>
			<li className='list-group-item flex'>
				<div className='label'>Medical History:</div>
				<div className='info'>{pet.medical_history}</div>
			</li>
		</ul>
	)
}

export default Table