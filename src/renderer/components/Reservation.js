

import React, { useState, useEffect } from 'react'
import { db, islamicDate, CountNights, NightsText, Alert } from '../utils'
import ActionBar from './ActionBar'
import { Printer, LogOut, Trash } from 'react-feather'
import { connect } from 'unistore/react'
import RenderDate from './renderDate'
import Table from './table'

const Reservation = ({ barnRate, roomRate, suiteRate, history, match: { params: { _id } } }) => {
  const [data, setData] = useState({})
  const [room, setRoom] = useState({})
  const totalNights = data.nights > 0 ? data.nights : CountNights(data.checkIn, data.checkOut)
  useEffect(() => {
    getData()
    return () => setData({})
  }, [_id])

  async function getData() {
    let data = await db.Reservation.findOne({ _id })
    let room = await db.Residence.findOne({ _id: data.roomId })
    setData(data)
    setRoom(room)
  }

  const calculate = () => {
    let rate = room.type === 'جناح' ? suiteRate : room.type === 'غرفة' ? roomRate : barnRate
    return totalNights === 0 ? `-` : ` ${Math.round(Number(totalNights) * Number(rate))} ريال `
  }

  const checkOut = async () => {
    const rate = room.type === 'جناح' ? suiteRate : room.type === 'غرفة' ? roomRate : barnRate
    let total = Number(totalNights) * Number(rate)
    try {
      let conf = await Alert({ type: 'info', message: 'هل تريد تسجيل الخروج', buttons: ['نعم', 'لا'] })
      if (conf === 0) {
        await db.Reservation.update({ _id: data._id }, { $set: { total, paid: true, checkOut: new Date() } })
        await db.Residence.update({ _id: room._id }, { $set: { status: 'نظافة', isRented: false } })
        await db.History.insert({ roomId: room._id, type: 'نظافة', done: false, note: 'الغرفة بحاجة للنظافة' })
        getData()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  const canRemove = () => CountNights(data.checkIn, data.checkOut) === 0

  const remove = async () => {
    let c = confirm('هل تريد حذف البيانات ؟')
    if (c)
      try {
        await db.Reservation.remove({ _id: data._id })
        await db.Residence.update({ _id: room._id }, { $set: { status: 'نظافة', isRented: false } })
        await db.History.insert({ roomId: room._id, type: 'نظافة', done: false, note: 'الغرفة بحاجة للنظافة' })
        history.goBack()
      } catch (error) {
        console.log('error', error)
      }
  }

  return (
    <>
      <main>
        <div className='row'>
          <div className='col-12' style={{ textAlign: 'center', margin: '1em 0' }}>
            <h2> {room.hotel} {room.type} رقم ( {room.roomNo} ) </h2>
          </div>
          <div className='col-12'>
            <h3> بيانات الساكن </h3>
          </div>
          <div className='col-12'>
            <h4>الرقم العسكري : <span>{data.id}</span></h4>
            <h4>الرتبة : <span>{data.rank}</span></h4>
            <h4>الاسم : <span>{data.name}</span></h4>
            <h4>الوحدة : <span>{data.unit}</span></h4>
          </div>
          <div className='col-12'>
            <h3> بيانات الحجز </h3>
          </div>
          <div className='col-12'>
            <h4>تاريخ الدخول : <RenderDate date={data.checkIn} /> </h4>
            <h4>تاريخ الخروج : {data.checkOut ? <RenderDate date={data.checkOut} /> : 'لم يتم الخروج'}</h4>
            <h4>المدة : {NightsText(totalNights)}</h4>
            <h4>المبلغ : {calculate()}</h4>
          </div>
          <div className='col-12'>
            {data.paid ?
              <span>تم سداد جميع المستحقات</span> :
              <span style={{ color: 'var(--red)' }}>
                لم يتم السداد
              </span>}
          </div>
          <div className='col-12'>
            <small>يتم حساب عدد الايام باستخدام التاريخ الميلادي!</small>
          </div>
        </div>
      </main>
      <ActionBar back>
        {!data.checkOut &&
          <a onClick={checkOut} className={data.paid ? 'disabled' : ''}>
            <span> تسجيل الخروج</span>
            <LogOut />
          </a>
        }
        <a onClick={() => print()}>
          <span> طباعة </span>
          <Printer />
        </a>
        {canRemove() &&
          <a onClick={remove} className={data.paid ? 'disabled' : ''} style={{ color: 'var(--red)' }}>
            <span> حذف البيانات</span>
            <Trash />
          </a>
        }
      </ActionBar>
    </>
  )
}

export default connect('roomRate, barnRate, suiteRate', {})(Reservation)