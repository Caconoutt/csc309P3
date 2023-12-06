import Lists from './Lists'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Lists/index'
function ShelterMag() {
	const [petList, setPetList] = useState([])
	let navigate = useNavigate()
	const getList = () => {
		fetch(`/pet/shelter/petlist/`, {
			method: 'get',
			headers: {
				Authorization: 'Bearer ' + JSON.parse(window.localStorage.getItem('token')),
			},
			mode: 'cors',
		})
			.then((response) => response.json())
			.then((json) => {
				setPetList(json)
			})
	}
	useEffect(() => {
		getList()
	}, [])

	const AvailableList = petList.filter((ele) => ele.status === 'Available')
	const PendingList = petList.filter((ele) => ele.status === 'Pending')
	const AdoptedList = petList.filter((ele) => ele.status === 'Adopted')
	const WithdrawList = petList.filter((ele) => ele.status === 'Withdrawed')
	const newList = [
		{
			name: 'Available',
			value: AvailableList,
		},
		{
			name: 'Pending',
			value: PendingList,
		},
		{
			name: 'Adopted',
			value: AdoptedList,
		},
		{
			name: 'Withdrawed',
			value: WithdrawList,
		},
	]
	return (
		<>
			<div className='main'>
				<h2 className='title'>Available for application:</h2>
				<Button variant='primary' className='create-btn' onClick={() => navigate('/PetCreate')}>
					Create More Pets
				</Button>
				<Lists petList={newList} getList={getList} />
			</div>
		</>
	)
}

export default ShelterMag