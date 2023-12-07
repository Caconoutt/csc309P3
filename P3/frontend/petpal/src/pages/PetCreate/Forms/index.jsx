import { Button, Form, Col, Row } from 'react-bootstrap'
import './style.css'
import { useRef, useContext, useEffect } from 'react'
import { VariableContextProvider } from '../../../contexts/VariableContext'

function Forms({ handleSubmit }) {
	const { query, petCreateQuery } = useContext(VariableContextProvider)

	const fd = new FormData()
	const imgInput = useRef('')
	const inputFileChange = (event, keys) => {
		petCreateQuery({
			[keys]: event.target.files[0],
		})
	}
	const onSubmit = (event) => {
		event.preventDefault()
		event.stopPropagation()
		for (let key in query) {
			if (query.hasOwnProperty(key)) {
				fd.append(key, query[key])
			}
		}
		handleSubmit(fd)
	}
	const handleChange = (event, keys) => {
		petCreateQuery({
			[keys]: event.target.value,
		})
	}

	useEffect(() => {}, [])

	return (
		<div>
			<Form className='createFormsWrap' onSubmit={onSubmit}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label className='formLabel'>Name</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder=''
						value={query.name}
						onChange={(event) => handleChange(event, 'name')}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label className='formLabel'>Breed</Form.Label>
					<Form.Control
						required
						type='text'
						placeholder=''
						value={query.Breed}
						onChange={(event) => handleChange(event, 'Breed')}
					/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label className='formLabel'>Gender</Form.Label>
					<Form.Select
						placeholder='Choose'
						value={query.gender}
						onChange={(event) => handleChange(event, 'gender')}
					>
						<option>Choose</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</Form.Select>
				</Form.Group>
				<Row className='mb-3'>
					<Form.Group as={Col} md='4' controlId='validationCustom01'>
						<Form.Label className='formLabel'>Age</Form.Label>
						<Form.Control
							required
							type='text'
							placeholder='Age'
							value={query.age}
							onChange={(event) => handleChange(event, 'age')}
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group as={Col} md='4' controlId='validationCustom02'>
						<Form.Label className='formLabel'>Size</Form.Label>
						<Form.Select
							required
							placeholder='Choose'
							value={query.size}
							onChange={(event) => handleChange(event, 'size')}
						>
							<option>Choose</option>
							<option value='small'>Small</option>
							<option value='medium'>Medium</option>
							<option value='large'>Large</option>
						</Form.Select>
					</Form.Group>
					<Form.Group as={Col} md='4' controlId='validationCustomUsername'>
						<Form.Label className='formLabel'>Color</Form.Label>
						<Form.Select
							required
							placeholder='Choose'
							value={query.color}
							onChange={(event) => handleChange(event, 'color')}
						>
							<option>Choose</option>
							<option value='White/light'>White/light</option>
							<option value='Black/dark'>Black/dark</option>
							<option value='Colorless/transparent'>Colorless/transparent</option>
							<option value='Bicolor'>Bicolor</option>
							<option value='Multi-color'>Multi-color</option>
						</Form.Select>
					</Form.Group>
				</Row>
				<Form.Group className='mb-3'>
					<Form.Label className='formLabel'>Location</Form.Label>
					<Form.Select
						required
						placeholder='Choose...'
						value={query.location}
						onChange={(event) => handleChange(event, 'location')}
					>
						<option>Choose</option>
						<option value='Ontario'>Ontario</option>
						<option value='British Columbia'>British Columbia</option>
						<option value='Quebec'>Quebec</option>
						<option value='Alberta'>Alberta</option>
						<option value='Nova Scotia'>Nova Scotia</option>
						<option value='New Brunswick'>New Brunswick</option>
						<option value='Newfoundland and Labrador'>Newfoundland and Labrador</option>
						<option value='Saskatchewan'>Saskatchewan</option>
					</Form.Select>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
					<Form.Label className='formLabel'>Medical History</Form.Label>
					<Form.Control
						required
						value={query.medical_history}
						onChange={(event) => handleChange(event, 'medical_history')}
						as='textarea'
						rows={3}
						placeholder='If no prior medical history, simply write None'
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
					<Form.Label className='formLabel'>Special Needs/Requirements</Form.Label>
					<Form.Control
						as='textarea'
						rows={3}
						value={query.special_needs}
						onChange={(event) => handleChange(event, 'special_needs')}
						placeholder='If no special needs required, please simply write None'
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
					<Form.Label className='formLabel'>Behavior Descriptions</Form.Label>
					<Form.Control
						value={query.behaviour_description}
						onChange={(event) => handleChange(event, 'behaviour_description')}
						as='textarea'
						rows={3}
						placeholder='Please describe its daily behaviours in details'
					/>
				</Form.Group>

				<Form.Group className='position-relative mb-3'>
					<Form.Label className='formLabel'>Upload pet image</Form.Label>
					<Form.Control
						className='form-control'
						id='formFile'
						type='file'
						required
						name='image'
						ref={imgInput}
						onChange={(e) => inputFileChange(e, 'image')}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicCheckbox'>
					<Form.Check
						className='formLabel'
						type='checkbox'
						required
						label='I agree to share in formation with PetPal'
					/>
				</Form.Group>

				<Button variant='link' type='submit' className='submit-wrap'>
					submit:
					<div className='submit-btn'></div>
				</Button>
			</Form>
		</div>
	)
}

export default Forms