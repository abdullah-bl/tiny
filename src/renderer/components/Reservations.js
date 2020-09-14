import React from 'react'
import ActionBar from './ActionBar'
import { Link } from 'react-router-dom'
import { UserPlus } from 'react-feather'

const Reservations = () => {
	return (
		<>
			<main>
				<div className='row' style={{ marginBottom: '2em' }}>
					<div className='col-12' style={{ textAlign: 'center' }}>
						<h3> الحجوزات السابقة </h3>
					</div>
				</div>
			</main>
			<ActionBar>
				<Link to='/residence'>
					<span> حجز جديد </span>
					<UserPlus />
				</Link>
			</ActionBar>
		</>
	)
}

export default Reservations
