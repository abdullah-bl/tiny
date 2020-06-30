


import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import Table from './table'
import { db, islamicDate } from '../utils'

const RoomRentals = ({ history: { push }, roomId }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
    return () => setData([])
  }, [])

  async function getData() {
    let data = await db.Reservation.find({ roomId }).sort({ createdAt: -1 })
    console.log('data', data)
    setData(data)
  }
  const rows = [
    '#',
    'الرقم العسكري',
    'الاسم',
    'الرتبة',
    'الوحدة',
    'تاريخ الخروج',
  ]
  return (
    <div className='row'>
      <div className='col-12'>
        <h4>تاريخ الساكن</h4>
      </div>
      <div className='col-12'>
        <Table rows={rows}>
          {data.map((d, index) =>
            <tr key={d._id} onClick={() => push(`/reservation/${d._id}`)}>
              <td>{index + 1}</td>
              <td>{d.id}</td>
              <td>{d.name}</td>
              <td>{d.rank}</td>
              <td>{d.unit}</td>
              <td>{d.checkOut ? islamicDate(d.checkOut) : '-'}</td>
            </tr>
          )}
        </Table>
      </div>
    </div>
  )
}

export default withRouter(RoomRentals)