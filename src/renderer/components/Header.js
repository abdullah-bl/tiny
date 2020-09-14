import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Activity, Home, Settings, BookOpen, Bookmark } from 'react-feather'

function Header({ location: { pathname } }) {
	return (
		<header>
			<span className='logo'> الإسكان </span>
			<Link to='/' className={pathname === '/' ? 'active' : ''}>
				<span>إحصائيات عامة</span>
				<Activity />
			</Link>
			<Link
				to='/residence'
				className={pathname === '/residence' ? 'active' : ''}
			>
				<span>السكن</span>
				<Home />
			</Link>
			<Link
				to='/reservations'
				className={pathname === '/reservations' ? 'active' : ''}
			>
				<span>الحجوزات</span>
				<Bookmark />
			</Link>
			<Link to='/reports' className={pathname === '/reports' ? 'active' : ''}>
				<span> التقارير</span>
				<BookOpen />
			</Link>
			<Link to='/settings' className={pathname === '/settings' ? 'active' : ''}>
				<span> الإعدادات</span>
				<Settings />
			</Link>
		</header>
	)
}

export default withRouter(Header)
