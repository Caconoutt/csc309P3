import Lists from './Lists'
import { Button, Alert } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserData } from "../../contexts/AuthContext"
import './Lists/index'
function ShelterMag() {
	const [petList, setPetList] = useState([])
	const {token} = useUserData()
	const [errorMessage, setErrMsg] = useState('')
	console.log(token)
	let navigate = useNavigate()
	const getList = () => {
		fetch(`http://localhost:8000/pet/shelter/petlist/`, {
			method: 'get',
			headers: {
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


export default ShelterMag