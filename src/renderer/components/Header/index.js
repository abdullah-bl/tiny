
import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'

const NAV_BAR = [
  { id: 'إحصائيات', path: '/' },
  { id: 'إدارة الحجز', path: '/reservation' },
  { id: 'إدارة السكن', path: '/residence' },
]


function Header({ location: { pathname } }) {
  return (
    <header>
      {NAV_BAR.map(nav => <Link to={nav.path} key={nav.id} className={pathname === nav.path ? 'active' : ''}>
        {nav.id}
      </Link>)}
    </header>
  )
}


export default withRouter(Header)