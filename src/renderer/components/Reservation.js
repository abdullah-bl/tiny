

import React, { useState, useEffect } from 'react'
import Split from './Split'
import { db } from '../utils'
import ActionBar from './ActionBar'
import { Printer } from 'react-feather'


const Reservation = ({ match: { params: { _id } } }) => {
  const [data, setData] = useState({})
  const [room, setRoom] = useState({})

  useEffect(() => {
    getData()
    return () => setData({})
  }, [_id])

  async function getData() {
    let data = await db.Reservation.findOne({ _id })
    let room = await db.Residence.findOne({ _id: data.roomId })
    setData(data)
    setRoom(room)
    console.log(data, room)
  }

  return (
    <Split>
      <div className='content'>
        <div className='row'>
          <div className='col-12'>

          </div>
        </div>
      </div>
      <ActionBar back>
        <a className={data.paid ? '' : 'disabled'}>
          <span> طباعة الوصل </span>
          <Printer />
        </a>
        <a onClick={() => print()}>
          <span> طباعة التفاصيل </span>
          <Printer />
        </a>
      </ActionBar>
    </Split>
  )
}

export default Reservation