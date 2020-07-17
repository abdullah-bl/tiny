


import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { db, islamicDate } from '../utils'
import Table from './table'

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

  return data.length > 0 && (
    <div className='row' style={{ marginBottom: '2em' }}>
      <div className='col-12'>
        <h4> الساكنين ( {data.length} ) </h4>
      </div>
      <div className='col-12'>
        <Table rows={['ت', 'الرقم العسكري', 'الرتبة', 'الاسم', 'تاريخ الخروج']}>
          {data.map((d, index) =>
            <tr key={d._id} onClick={() => push(`/reservation/${d._id}`)}>
              <td>{index + 1}</td>
              <td>{d.id}</td>
              <td>{d.rank}</td>
              <td>{d.name}</td>
              <td>{d.checkOut ? islamicDate(d.checkOut) : ''}</td>

            </tr>
          )}
        </Table>
      </div>
    </div>
  )
}

export default withRouter(RoomRentals)