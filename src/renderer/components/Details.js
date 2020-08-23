
import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'unistore/react'
import { Link } from 'react-router-dom'
import { UserPlus, Trash, Printer, AlertTriangle, Edit } from 'react-feather'
import ActionBar from './ActionBar'
import { RoomSchema, Alert, db, setColor } from '../utils'
import RoomHistory from './RoomHistory'
import RoomRentals from './RoomRentals'
import { Input, Select, TextArea } from './Input'


const Show = ({ hotels, status, barnRate, roomRate, suiteRate, history: { goBack }, match: { params: { _id } } }) => {
  const [data, setData] = useState({})
  useEffect(() => {
    window.scrollTo(0, 0)
    // get Data
    getData()
    // clean up
    return () => { }
  }, [_id])

  async function getData() {
    let data = await db.Residence.findOne({ _id })
    return setData(data)
  }

  async function remove() {
    let c = confirm(`هل أنت متأكد تريد حذف ال${data.type}`)
    if (c) {
      await db.Residence.remove({ _id })
      await db.History.remove({ roomId: _id })
      goBack()
    }
  }

  const rate = data.type === 'جناح' ? suiteRate : data.type === 'غرفة' ? roomRate : barnRate

  return (
    <>
      <main>
        <div className='row' style={{ marginBottom: '1em' }}>
          <div className='col-12' style={{ textAlign: 'center' }}>
            <h3> مبنى {data.hotel} </h3>
            <h4> {data.type} رقم ({data.roomNo}) </h4>
          </div>
          <div className='col-12'>
            <h4> التفاصيل </h4>
          </div>
          <div className='col-12'>
            <span> السعر الليلة : {rate} ريال </span>
          </div>
          <div className='col-12'>
            <span>عدد الاسرة : {data.numberOfBeds}</span>
          </div>
          <div className='col-12'>
            <span>حالة الـ{data.type} : <span style={{ color: setColor(data.status) }}>{data.status}</span> </span>
          </div>
          <div className='col-12'>
            <span>الملاحظات : {data.note ? data.note : 'لا يوجد'}</span>
          </div>
        </div>
        <RoomRentals roomId={_id} />
        <RoomHistory roomId={_id} />
      </main>
      <ActionBar back>
        <Link to={`/edit/${_id}`}>
          <span>   تعديل ال{data.type} </span>
          <Edit />
        </Link>
        <Link to={`/check-in/${_id}`} className={data.isRented ? 'disabled' : ''}>
          <span>تسجيل دخول</span>
          <UserPlus />
        </Link>
        <Link to={`/add-command/${_id}`}>
          <span>طلب صيانة / نظافة</span>
          <AlertTriangle />
        </Link>
        <a onClick={() => print()} >
          <span>طباعة</span>
          <Printer />
        </a>
        <a onClick={remove} className={data.isRented ? 'disabled' : ''} style={{ color: 'var(--red)' }}>
          <span>   حذف ال{data.type} </span>
          <Trash />
        </a>
      </ActionBar>
    </>
  )
}

export default connect('hotels, status, roomRate, suiteRate, barnRate', {})(Show)
