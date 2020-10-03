import React, { useState, useEffect, memo } from 'react'
import { AlertCircle } from 'react-feather'
import { db, groupBy } from '../utils'
import Card from './Card'

const RenderRooms = ({ data }) => {
	return data && data.map((d) => <Card key={d._id} {...d} />)
}

const RenderData = ({ data = [] }) => {
	let docs = Object.entries(groupBy(data, 'type'))
	return (
		docs &&
		docs.map((doc, index) => (
			<div className='row justify-content-md-center' key={index}>
				<div className='col-12'>
					<h4 className='cm'>
						{doc[0]} - ({doc[1].length})
					</h4>
				</div>
				<RenderRooms data={doc[1]} />
			</div>
		))
	)
}

const Group = ({ query, sort, limit = 1000 }) => {
	const [data, setData] = useState([])

	useEffect(() => {
		getData({ query, sortBy: sort, limit })
	}, [query, sort])

	async function getData({ query = {}, sortBy = { roomNo: 1 } }) {
		const data = await db.Residence.find(query).sort(sortBy).limit(limit)
		let docs = Object.entries(groupBy(data, 'hotel'))
		return setData(docs)
	}
	return data.length > 0 ? (
		data.map((doc, index) => (
			<div className='row justify-content-md-center' key={index}>
				<div className='col-12'>
					<h3 className='hd'>
						{doc[0]} - ({doc[1].length})
					</h3>
				</div>
				<RenderData data={doc[1]} />
			</div>
		))
	) : (
		<div className='no-data'>
			<span>لا توجد بيانات</span>
			<AlertCircle />
		</div>
	)
}

export default memo(Group)
