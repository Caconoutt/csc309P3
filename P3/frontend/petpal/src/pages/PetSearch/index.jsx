import { Alert, Form } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import './index.css'
import Cards from './Card'
import { useUserData } from '../../contexts/AuthContext'
import { filterList, sortList, radioList, params } from './options'
const pageSize = 2
const Search = () => {
	const { token } = useUserData()
	const [errorMessage, setErrMsg] = useState('')
	const options = {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token,
		},
	}
	const [filterStatus, setFilterStatus] = useState('Filter')
	const [totalPages, setTotalPages] = useState(1)
	const [pageQuery, setPageQuery] = useState({ page: 1 })
	const [htmlList, setHtmlList] = useState([
		{
			radioVal: 'Filter',
			list: filterList,
		},
		{
			radioVal: 'Sort',
			list: sortList,
		},
	])
	const [cardList, setCardList] = useState([])
	// change between filter or sort
	const handleRadioChange = (value) => {
		setFilterStatus(value)
	}


	const handleCheckboxChange = (e, radioVal, name, value) => {
		if (e.target.checked) {
			params[radioVal][name].push(value)
		} else {
			params[radioVal][name].splice(params[radioVal][name].indexOf(value), 1)
		}
		console.log(params, 'params[radioVal]')
		setPageQuery({page:1})
		getPetList({ ...pageQuery, ...params })
	}


	function getPetList(params) {
		console.log(params, 'getlist======')
		const query = {
			page: params.page,
			...params.Filter,
			...params.Sort,
			...params.Shelter,
		}
		fetch(
			`http://localhost:8000/pet/list/?page=${query.page}&page_size=${pageSize}&location=${
				query.Location || []
			}&age=${query.Age || []}
			&size=${query.Size || []}
			&color=${query.Color || []}
			&status=${query.Status || []}
			&sort=${query.Sort || []}
			&shelter=${query.Shelter || []}`,
			options
		)
			//.then((res) => res.json())
			.then((res) => {
				if (res.status !== 200){
					setErrMsg(res.statusText)
				}
				return res.json()
			})
			.then((data) => {
				const totalPage = Math.ceil(data.count / pageSize)
				setTotalPages(totalPage)
				setCardList(data.results)
			})
	}
	
	function getShelterList() {
		fetch(`http://localhost:8000/account/shelter/list/`, options)
			.then((res) => res.json())
			.then((data) => {
				const shelterLists = data.map((item, index) => {
					return {
						name: item.username,
						value: item.username,
					}
				})
				setHtmlList([
					...htmlList,
					{
						radioVal: 'Shelter',
						list: [
							{
								name: 'Shelter',
								value: shelterLists,
							},
						],
					},
				])
			})
	}

	useEffect(() => {
		getPetList({ ...pageQuery, ...params })
	}, [pageQuery])
	useEffect(() => {
		getShelterList()
	}, [])
	return (
		<><div className='search-container'>
			<Form className='search-wrap'>
				{/* <Form.Control className='search-input' type='text' placeholder='Search' /> */}
				<div className='advance-search mt-3'>Search and Filter:</div>
				<div className='flex'>
					{['radio'].map((type) => (
						<div key={`inline-${type}`} className='mb-2'>
							{radioList.map((item) => (
								<Form.Check
									key={item}
									checked={filterStatus === item}
									value={item}
									onChange={() => handleRadioChange(item)}
									inline
									label={item}
									name='group'
									type={type}
									id={`inline-${type}-1`}
								/>
							))}
						</div>
					))}
				</div>
				{htmlList.map((itemHtml) => (
					<div
						className='filter-wrap'
						key={itemHtml.radioVal}
						style={{ display: filterStatus === itemHtml.radioVal ? 'block' : 'none' }}
					>
						{itemHtml.radioVal === 'Sort'
							? 'You would like to sort by'
							: 'You would like to filter by'}
						{itemHtml.list.map((item) => (
							<div key={item.name} className='location mt-2 filter-border'>
								{item.name}
								<div className='mb-2' key={item.name}>
									{item.value.map((ops, index) => (
										<Form.Check
											key={index}
											className='mb-2'
											label={ops.name}
											name='group'
											type='checkbox'
											value={ops.value}
											id={ops.value}
											onChange={(e) =>
												handleCheckboxChange(e, itemHtml.radioVal, item.name, ops.value)
											}
										/>
									))}
								</div>
							</div>
						))}
					</div>
				))}
			</Form>
			<div className='right'>
				<div className='card-wrap'>
					{cardList.map((item) => (
						<Cards itemLst={item} key={item.id} />
					))}
				</div>

				<p className='page-wrap'>
					{pageQuery.page < totalPages ? (
						<button onClick={() => setPageQuery({ ...pageQuery, page: pageQuery.page + 1 })}>
							Next
						</button>
					) : (
						<></>
					)}
					{pageQuery.page > 1 ? (
						<button onClick={() => setPageQuery({ ...pageQuery, page: pageQuery.page - 1 })}>
							Previous
						</button>
					) : (
						<></>
					)}
				</p>
				<p className='page-wrap page-wrap2'>
					Page {pageQuery.page} out of {totalPages}.
				</p>
			</div>
		</div>
		{errorMessage ? (
				<Alert className = 'alert' variant='danger'>
					{errorMessage}
				</Alert>
			) : (
				<></>
			)}
		</>
		
	)
}

export default Search