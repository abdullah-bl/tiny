import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { db } from '../utils'
import RenderDate from './renderDate'

const RoomRentals = ({ history: { push }, roomId }) => {
	const [data, setData] = useState([])
	useEffect(() => {
		getData()
		return () => setData([])
	}, [])

	async function getData() {
		let data = await db.Reservation.find({ roomId }).sort({ createdAt: -1 })
		setData(data)
	}

	return (
		data.length > 0 && (
			<div className='row' style={{ marginBottom: '2em' }}>
				<div className='col-12'>
					<h4> الساكنين ( {data.length} ) </h4>
				</div>
				{data.map((d, index) => (
					<div
						className='col-12'
						key={d._id}
						onClick={() => push(`/reservations/${d._id}`)}
					>
						<div className='row'>
							<div className='col-12 item'>
								<span>ت : {index + 1}</span>
								<span>الرقم العسكري : {d.id}</span>
								<span>الرتبة : {d.rank}</span>
								<span>الاسم : {d.name}</span>
								<span>
									تاريخ الدخول : <RenderDate date={d.checkIn} />{' '}
								</span>
								<span>
									تاريخ الخروج :{' '}
									{data.checkOut ? (
										<RenderDate date={data.checkOut} />
									) : (
										'لم يتم الخروج'
									)}{' '}
								</span>
								<hr />
							</div>
						</div>
					</div>
				))}
			</div>
		)
	)
}

export default withRouter(RoomRentals)
