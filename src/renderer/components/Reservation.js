

import React, { useState, useEffect } from 'react'
import { db, islamicDate, CountNights, NightsText } from '../utils'
import ActionBar from './ActionBar'
import { Printer, LogOut } from 'react-feather'
import { connect } from 'unistore/react'

const Reservation = ({ roomRate, suiteRate, match: { params: { _id } } }) => {
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
    console.log('data', data)
  }

  const calculate = nights => {
    let rate = data.type === 'جناح' ? suiteRate : roomRate
    return ` ${Number(nights) * Number(rate)} ريال `
  }

  return (
    <>
      <main>
        <div className='row'>
          <div className='col-12' style={{ textAlign: 'center' }}>
            <h2> {room.hotel} {room.type}  ( {room.roomNo} ) </h2>
          </div>
          <div className='col-12'>
            <h3> بيانات الساكن </h3>
          </div>
          <div className='col-12'>
            <span>الرقم العسكري : {data.id} </span>
          </div>
          <div className='col-12'>
            <span>الرتبة : {data.rank} </span>
          </div>
          <div className='col-12'>
            <span>الاسم : {data.name} </span>
          </div>
          <div className='col-12'>
            <span>الوحدة : {data.unit} </span>
          </div>
          <div className='col-12'>
            <span>تاريخ الدخول : {islamicDate(data.checkIn)} </span>
          </div>
          <div className='col-12'>
            <span>مدة الاقامة : {NightsText(CountNights(data.nights, data.checkIn, data.checkOut))}</span>
          </div>
          <div className='col-12'>
            <span>تاريخ الخروج : {data.checkOut ? islamicDate(data.checkOut) : 'لم يتم الخروج'} </span>
          </div>
          <div className='col-12'>
            <span>المبلغ الاجمالي : {calculate(CountNights(data.nights, data.checkIn, data.checkOut))} </span>
          </div>
          <div className='col-12'>
            <span> هل تم السداد ؟ : {data.paid ? 'نعم' : 'لا'} </span>
          </div>
        </div>
      </main>
      <ActionBar back>
        {!data.checkOut &&
          <a>
            <span> تسجيل الخروج</span>
            <LogOut />
          </a>
        }
        {/* <a className={data.paid ? '' : 'disabled'}>
          <span> طباعة الوصل </span>
          <Printer />
        </a> */}
        <a onClick={() => print()}>
          <span> طباعة </span>
          <Printer />
        </a>
      </ActionBar>
    </>
  )
}

export default connect('roomRate', 'suiteRate', {})(Reservation)