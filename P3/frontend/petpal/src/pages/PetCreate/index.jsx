import Forms from './Forms'
import { Button, Form, Col, InputGroup, Row } from 'react-bootstrap'
import './Forms/style.css'
import { useEffect } from 'react'
import { useVariableState} from '../../hooks'
import { VariableContextProvider } from '../../contexts/VariableContext'
import { useUserData } from '../../contexts/AuthContext'
import { useParams } from 'react-router-dom'
const {token} = useUserData();
const options = {
	method: 'GET',
	headers: {
		Authorization: 'Bearer ' + token,
	},
	// mode: 'cors',
}

function PetCreate() {
	// const itemId = getUrlQuery(window.location.href, 'id')
    const {pet_id} = useParams();
	const { query, petCreateQuery } = useVariableState()
	const handleSubmit = (val) => {
		if (pet_id) {
			fetch(`http://localhost:8000/pet/shelter/pets/${pet_id}/`, { ...options, method: 'PATCH', body: val })
				.then((res) => res.json())
				.then((data) => {
					// console.log(data, '=========================')
					petCreateQuery(data)
				})
			
		} else {
			fetch(`http://localhost:8000/pet/shelter/petlist/`, { ...options, method: 'POST', body: val })
				.then((res) => res.json())
				.then((data) => {
					petCreateQuery()
				})
		}
	}

	useEffect(() => {
		function getItemById(id) {
			if (id) {
				fetch(`http://localhost:8000/pet/shelter/pets/${id}/`, options)
					.then((res) => res.json())
					.then((data) => {
						petCreateQuery(data)
					})
			}
		}
		getItemById(pet_id)
	}, [pet_id])

	return (
		<div>
			<h1 className='pet-create-info'>Pet information</h1>
			<VariableContextProvider.Provider value={{ query, petCreateQuery }}>
				<Forms handleSubmit={handleSubmit}></Forms>
			</VariableContextProvider.Provider>
		</div>
	)
}

export default PetCreate