
import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Activity, Home, BookOpen } from 'react-feather'

function Header({ location: { pathname } }) {
  return (
    <header>
      <span className='logo'> الإسكان </span>
      <Link to='/' className={pathname === '/' ? 'active' : ''}>
        <span>إحصائيات </span>
        <Activity />
      </Link>
      <Link to='/residence' className={pathname === '/residence' ? 'active' : ''}>
        <span>السكن</span>
        <Home />
      </Link>
      <Link to='/reports' className={pathname === '/reports' ? 'active' : ''}>
        <span>        التقارير</span>
        <BookOpen />
      </Link>
    </header>
  )
}


export default withRouter(Header)