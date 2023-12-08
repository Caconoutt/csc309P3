import { Card, Button, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './style.css'
const CardLayout = ({ petList }) => {
  // console.log(petList)
  const navigate = useNavigate()
  const editPage = (id) => {
    navigate(`/PetCreate`, {
      state: {
        pet_id: id,
      },
    })
  }
  return (
    <>
      <Row className='search-container' style={{ padding: '10px' }}>
        {petList.length > 0 ? (
          petList.map((pet) => (
            <Col key={pet.id} lg={3} md={4} sm={6} xs={12} style={{ marginBottom: '10px' }}>
              <Card>
                <Card.Img variant='top' src={pet.image} />
                <Card.Body>
                  <Card.Text>Name: {pet.name}</Card.Text>
                  <Card.Text>Breed: {pet.Breed}</Card.Text>
                  <Card.Text>Age: {pet.age}</Card.Text>
                  <Card.Text>Status: {pet.status}</Card.Text>
                  <Card.Text>Location: {pet.location}</Card.Text>
                  <Button className='viewBtn' onClick={() => editPage(pet.id)}>
                    Edit
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className='noData'>Sorry, no pet yet</div>
        )}
      </Row>
    </>
  );
}  

export default CardLayout