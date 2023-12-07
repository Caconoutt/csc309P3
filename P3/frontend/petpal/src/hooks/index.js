import { useState, useEffect } from 'react'

const defaultState = {
	// shelter: ,
	name: '',
	Breed: '',
	gender: '',
	age: '',
	size: '',
	color: '',
	contact: '',
	location: '',
	medical_history: '',
	special_needs: '',
	behaviour_description: '',
	image: null,
}

export const useVariableState = () => {
	const [query, setQuery] = useState(defaultState)
	const petCreateQuery = (payload) => {
		if (payload) {
			setQuery({
				...query,
				...payload,
			})
		} else {
			setQuery(defaultState)
		}
	}

	return {
		query,
		petCreateQuery,
	}
}

export const getUrlQuery = (url, name) => {
	const newUrl = new URL(url)
	return newUrl.searchParams.get(name)
}