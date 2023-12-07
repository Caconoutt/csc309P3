import { Card, Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
import { useEffect } from 'react'
// import '../index.css'
const Cards = ({ itemLst }) => {
	useEffect(() => {})
	return (
		<>
			<Card className='item-card'>
				<Card.Img variant='top' src='holder.js/100px180' />
				<Card.Body>
					<Card.Text>Name:{itemLst.name}</Card.Text>
					<Card.Text>Breed: {itemLst.Breed}</Card.Text>
					<Card.Text>Age: {itemLst.age}岁</Card.Text>
					<Button className='viewBtn'>View</Button>
				</Card.Body>
			</Card>
		</>
	)
}

export default Cards
