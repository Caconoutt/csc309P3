import { Button, Form, Col, Row, InputGroup } from 'react-bootstrap'
import './style.css'
import { useRef, useContext, useEffect, useState } from 'react'
import { VariableContextProvider } from '../../../contexts/VariableContext'

const fd = new FormData()

const appendOrReplace = (formData, name, value) => {
  const existingValues = formData.getAll(name)

  if (existingValues.length > 0) {
    formData.set(name, value)
  } else {
    formData.append(name, value)
  }
}

function Forms({ handleSubmit }) {
  
  const { query, petCreateQuery } = useContext(VariableContextProvider)
  const [validated, setValidated] = useState(false)
  const fileInputDataRef = useRef('')
  const fileInputViewRef = useRef('')
  
  const fileInputViewClick = () => {
    fileInputDataRef.current.click()
  }

  const fileInputDataChange = (event, keys) => {
    const selectFile = event.target.files[0]
    appendOrReplace(fd, keys, selectFile)
    const fileName = selectFile.name
    fileInputViewRef.current.value = fileName
    petCreateQuery({
      [keys]: selectFile,
    })

    fileInputDataRef.current.value = null
  }
  const onSubmit = async(event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    const v = await form.checkValidity()

    if (v){
      if (!query.pet_id && !query.image) {
        fileInputViewRef.current.focus()
        return
      }
      handleSubmit(fd)
    }else{
      setValidated(true)
    }
   
  }
  const handleChange = (event, keys) => {
    petCreateQuery({
      [keys]: event.target.value,
    })
    appendOrReplace(fd, keys, event.target.value)
  }

  useEffect(() => {}, [])

  return (
    <div>
      <Form className="createFormsWrap" onSubmit={onSubmit} noValidate validated={validated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="formLabel">Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            value={query.name}
            onChange={(event) => handleChange(event, 'name')}
          />
          <Form.Control.Feedback type='invalid' style={{color:"white"}}>Please provide a username.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="formLabel">Breed</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            value={query.Breed}
            onChange={(event) => handleChange(event, 'Breed')}
          />
          <Form.Control.Feedback type='invalid' style={{color:"white"}}>Please provide Breed.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="formLabel">Contact</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder=""
            value={query.contact}
            onChange={(event) => handleChange(event, 'contact')}
          />
          <Form.Control.Feedback type='invalid' style={{color:"white"}}>Please provide contact.</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className="formLabel">Gender</Form.Label>
          <Form.Select
            required
            placeholder="Choose"
            value={query.gender}
            onChange={(event) => handleChange(event, 'gender')}
          >
            <option disabled value="">Choose</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
          <Form.Control.Feedback type='invalid' style={{color:"white"}}>Please Provide Gender.</Form.Control.Feedback>
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label className="formLabel">Age</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Age"
              value={query.age}
              onChange={(event) => handleChange(event, 'age')}
            />
           
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label className="formLabel">Size</Form.Label>
            <Form.Select
              required
              placeholder="Choose"
              value={query.size}
              onChange={(event) => handleChange(event, 'size')}
            >
              <option disabled value="">Choose</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label className="formLabel">Color</Form.Label>
            <Form.Select
              required
              placeholder="Choose"
              value={query.color}
              onChange={(event) => handleChange(event, 'color')}
            >
              <option disabled value="">Choose</option>
              <option value="White/light">White/light</option>
              <option value="Black/dark">Black/dark</option>
              <option value="Colorless/transparent">
                Colorless/transparent
              </option>
              <option value="Bicolor">Bicolor</option>
              <option value="Multi-color">Multi-color</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label className="formLabel">Location</Form.Label>
          <Form.Select
            required
            placeholder="Choose..."
            value={query.location}
            onChange={(event) => handleChange(event, 'location')}
          >
            <option disabled value="">Choose</option>
            <option value="Ontario">Ontario</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Quebec">Quebec</option>
            <option value="Alberta">Alberta</option>
            <option value="Nova Scotia">Nova Scotia</option>
            <option value="Saskat">
            Saskat
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="formLabel">Medical History</Form.Label>
          <Form.Control
            required
            value={query.medical_history}
            onChange={(event) => handleChange(event, 'medical_history')}
            as="textarea"
            rows={3}
            placeholder="If no prior medical history, simply write None"
          />
          <Form.Control.Feedback type='invalid' style={{color:"white"}}>
						Please provide Medical History.
					</Form.Control.Feedback>

        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="formLabel">
            Special Needs/Requirements
          </Form.Label>
          <Form.Control
          required
            as="textarea"
            rows={3}
            value={query.special_needs}
            onChange={(event) => handleChange(event, 'special_needs')}
            placeholder="If no special needs required, please simply write None"
          />
          <Form.Control.Feedback type='invalid' style={{color:"white"}}>
						Please provide Special Needs.
					</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label className="formLabel">Behavior Descriptions</Form.Label>
          <Form.Control
          required
            value={query.behaviour_description}
            onChange={(event) => handleChange(event, 'behaviour_description')}
            as="textarea"
            rows={3}
            placeholder="Please describe its daily behaviours in details"
          />
          <Form.Control.Feedback type='invalid' style={{color:"white"}}>
						Please provide Behaviour Description.
					</Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group className="position-relative mb-3">
          <Form.Label className="formLabel">Upload pet image</Form.Label>
          <Form.Control
            className="form-control"
            id="formFile"
            type="file"
            required
            name="image"
            ref={imgInput}
            onChange={(e) => inputFileChange(e, 'image')}
          />
        </Form.Group> */}
        <Form.Label htmlFor="basic-url">Upload pet image</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">Select a picture</InputGroup.Text>
          <Form.Control
            autocomplete='off'
            type="text"
            ref={fileInputViewRef}
            id="basic-url"
            name="image"
            aria-describedby="basic-addon3"
            // readOnly
            required
            value={query.image?.name || query.image || ''}
            placeholder="Please select a picture"
            onClick={() => fileInputViewClick()}
            onChange={() => {}}
            style={{ cursor: 'pointer' }}
          />
          <input
            type="file"
            // required
            autocomplete='off'
            hidden
            name="image"
            ref={fileInputDataRef}
            onChange={(e) => fileInputDataChange(e, 'image')}
          />
        </InputGroup>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            className="formLabel"
            type="checkbox"
            required
            label="I agree to share in formation with PetPal"
          />
        </Form.Group>

        <Button variant="link" type="submit" className="submit-wrap">
          submit:
          <div className="submit-btn"></div>
        </Button>
      </Form>
    </div>
  )
}

export default Forms