import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
  useEffect(() => {
    fetch(`/account/token/`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({ username: 'seeker_1', password: 'alyssa347lovetea' }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access, '=====')
        window.localStorage.setItem('token', JSON.stringify(data.access))
        console.log(localStorage.getItem('token'))
      })
  })

  return (
    <>
      <h1>HOME</h1>
      <Link to='/PetCreate'>pet create</Link>
      <Link to='/PetDetail'>pet create</Link>
    </>
  )
}

export default Home