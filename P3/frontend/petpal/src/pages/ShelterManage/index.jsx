import Lists from './Lists'
import { Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from "../../contexts/AuthContext"
import './Lists/index'
function ShelterMag() {
	const [petList, setPetList] = useState([])
	const {token} = useUserData()
	console.log(token)
	let navigate = useNavigate()
	const getList = () => {
		fetch(`http://localhost:8000/pet/shelter/petlist/`, {
			method: 'get',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		})
			.then((response) => response.json())
			.then((json) => {
				setPetList(json)
			})
	}
	useEffect(() => {
		getList()
	}, [])
	
	const handleClick = () =>{
		navigate('/PetCreate', {state: {pet_id:""}})
	}
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
				<Button variant='primary' className='create-btn' onClick={handleClick}>
					Create More Pets
				</Button>
				<Lists petList={newList} getList={getList} />
			</div>
		</>
	)
}
// function ShelterMag(){
// 	return (
// 		<div>HIIIIII</div>
// 	)
	
// }

export default ShelterMag