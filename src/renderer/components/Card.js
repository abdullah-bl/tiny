import React from 'react'
import { withRouter } from 'react-router-dom'
import { FileText, AlertCircle, UserCheck } from 'react-feather'

import { db, groupBy, setColor } from '../utils'

const Card = ({ status, _id, type, roomNo, isRented, note, history }) => {
	return (
		<div
			className='card'
			style={{ borderColor: setColor(status) }}
			className='col-auto card'
			style={{ borderColor: setColor(status) }}
			key={_id}
			onClick={() => history.push(`details/${_id}`)}
		>
			<div className='card-type'>{type}</div>
			<div className='number'>{roomNo}</div>
			<div className='card-bar'>
				{isRented && <UserCheck size={18} />}
				<span>{status}</span>
				{note && <FileText size={18} />}
			</div>
		</div>
	)
}

export default withRouter(Card)
