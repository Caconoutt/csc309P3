import { Form, Alert } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import './Cards/index'
import CardLayout from './Cards'
import { useUserData } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
function ListAllPets() {
    //this function is to show all the pets under a shelter
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
			// .then((response) => response.json())
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
    return <>
	<CardLayout petList={petList}></CardLayout>
	{errorMessage ? (
				<Alert className = 'alert' variant='danger'>
					{errorMessage}
				</Alert>
			) : (
				<></>
			)}
	</>
}
export default ListAllPets