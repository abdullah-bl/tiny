

import React from 'react'
import Header from '../Header'
import { Link } from 'react-router-dom'

const Reservation = () => {
  return (
    <>
      <Header />
      <h1>Reservation</h1>
      <Link to='reservation/add'>Add</Link>
    </>
  )
}

export default Reservation