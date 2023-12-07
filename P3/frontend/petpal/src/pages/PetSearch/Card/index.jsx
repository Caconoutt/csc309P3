import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const Cards = ({ itemLst }) => {
  const navigate = useNavigate()
  const viewPage = (id) => {
    navigate(`/PetDetail`, {
      state: {
        pet_id:id,
		identity: "Seeker",
      },
    })
  }
  return (
    <>
      <Card className='item-card'>
        <Card.Img variant='top' src={itemLst.image} />
        <Card.Body>
          <Card.Text>Name:{itemLst.name}</Card.Text>
          <Card.Text>Breed: {itemLst.Breed}</Card.Text>
          <Card.Text>Age: {itemLst.age}</Card.Text>
          <Button className='viewBtn' onClick={() => viewPage(itemLst.id)}>
            View
          </Button>
        </Card.Body>
      </Card>
    </>
  )
}

export default Cards
