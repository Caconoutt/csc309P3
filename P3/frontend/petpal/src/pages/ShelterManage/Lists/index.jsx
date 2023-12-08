import { Accordion } from 'react-bootstrap'
import './style.css'
import { useUserData } from '../../../contexts/AuthContext'
function List({ petList, getList }) {
    const {token} = useUserData()
	const btnObj = {
		Available: ['Pending', 'Adopted', 'Withdrawed'],
		Pending: ['Available', 'Adopted', 'Withdrawed'],
		Adopted: ['Available', 'Pending', 'Withdrawed'],
		Withdrawed: ['Available', 'Pending', 'Adopted'],
	}
	const defaultActiveKey = petList[0] && petList[0].value[0] ? petList[0].value[0].id : 0
	const changeStatus = (value, id) => {
		fetch(`http://localhost:8000/pet/shelter/pet_update/${id}/`, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: 'Bearer ' + token,
			},
			mode: 'cors',
			body: JSON.stringify({
				status: value,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json.status)
				getList()
			})
	}

	return (
		<>
			{petList.map((item) => (
				<>
					<div className='shelter-classify'>{item.name}</div>
					{item.value.length > 0 ? (
						item.value.map((ele) => (
							<Accordion defaultActiveKey={defaultActiveKey}>
								<Accordion.Item eventKey={ele.id}>
									<Accordion.Header>Pet Info</Accordion.Header>
									<Accordion.Body>
										<div className='accordion-body item-body'>
											<div className='pet-info'>
											<div className='item-info flex'>
													<div className='label'>Name: </div>
													<div className='info'>{ele.name}</div>
												</div>

												<div className='item-info flex'>
													<div className='label'>Breed: </div>
													<div className='info'>{ele.Breed}</div>
												</div>
												

												<div className='item-info flex'>
													<div className='label'>Status: </div>
													<div className='info'>{ele.status}</div>
												</div>

								

												<div className='item-info flex'>
													<div className='label'>Location: </div>
													<div className='info'>{ele.location}</div>
												</div>
											</div>
											<div className='btn-wrap'>
												{btnObj[item.name].map((btn) => (
													<button
														type='button'
														onClick={() => changeStatus(btn, ele.id)}
														className='btn create-btn btn-sm'
													>
														{btn}
													</button>
												))}
											</div>
										</div>
									</Accordion.Body>
								</Accordion.Item>
							</Accordion>
						))
					) : (
						<div className='noData'>Sorry, No pet yet ~</div>
					)}
				</>
			))}
		</>
	)
}

export default List