import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './style.css'
const CardLayout = ({ petList }) => {
    console.log(petList)
  const navigate = useNavigate()
  const editPage = (id) => {
    navigate(`/PetCreate`, {
      state: {
        pet_id:id,
      },
    })
  }
  return (
    <>
     {petList.map((pet) => (
    <Card className='item-card'>
        <Card.Img variant='top' src={pet.image} />
        <Card.Body>
          <Card.Text>Name:{pet.name}</Card.Text>
          <Card.Text>Breed: {pet.Breed}</Card.Text>
          <Card.Text>Age: {pet.age}</Card.Text>
		  <Card.Text>Status: {pet.status}</Card.Text>
		  <Card.Text>Location: {pet.location}</Card.Text>
          <Button className='viewBtn' onClick={() => editPage(pet.id)}>
            Edit
          </Button>
        </Card.Body>
      </Card>
))}
    </>
  )
}


export default CardLayout