import { useEffect, useState } from 'react'
import { createContext } from 'react'

export const VariableContext = createContext({
	petCreateQuery: {},
	setPetCreateQuery: () => {},
})

export const useAPIContext = () => {
	const [petCreateQuery, setPetCreateQuery] = useState({
		shelter: 8,
		name: '',
		Breed: '',
		gender: '',
		age: '',
		size: '',
		color: '',
		contact: '123456',
		location: '',
		medical_history: '',
		special_needs: '',
		behaviour_description: '',
	})

	return {
		petCreateQuery,
		setPetCreateQuery,
	}
}

export const VariableContextProvider = createContext({})