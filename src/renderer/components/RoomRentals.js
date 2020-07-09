


import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { db, islamicDate } from '../utils'

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
        <h3> الساكنين ( {data.length} ) </h3>
      </div>
      <div className='col-12'>
        {data.map((d, index) =>
          <div className='row' key={d._id} onClick={() => push(`/reservation/${d._id}`)}>
            <div className='col-12'>
              <span>تسلسل  : {index + 1} </span>
            </div>
            <div className='col-auto'>
              <span>الرقم العسكري : {d.id} </span>
            </div>
            <div className='col-auto'>
              <span>الرتبة : {d.rank} </span>
            </div>
            <div className='col-auto'>
              <span>الاسم : {d.name} </span>
            </div>
            <div className='col-auto'>
              <span>الوحدة : {d.unit} </span>
            </div>
            <div className='col-12'>
              <span>الدخول : {islamicDate(d.checkIn)} </span>
            </div>
            <div className='col-12'>
              <span>الخروج : {d.checkOut ? islamicDate(d.checkOut) : 'لم يتم الخروج'} </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(RoomRentals)