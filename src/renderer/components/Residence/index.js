
import React from 'react'
import { Link } from 'react-router-dom'

import Header from '../Header'


const Residence = () => {
  return (
    <>
      <Header />
      <main>
        <h1>Residence</h1>
        <Link to='residence/addOne'>Add</Link>
        <Link to='residence/settings'>settings</Link>
      </main>
    </>
  )
}

export default Residence