
import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'unistore/react'
import { Link } from 'react-router-dom'
import { LogIn, LogOut, Trash, Printer } from 'react-feather'
import ActionBar from './ActionBar'
import { RoomSchema, Alert, db } from '../utils'
import RoomHistory from './RoomHistory'
import RoomRentals from './RoomRentals'
import { Input, Select, TextArea } from './Input'
import Split from './Split'


const Show = ({ hotels, status, roomRate, suiteRate, history: { goBack }, match: { params: { _id } } }) => {
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

  async function logout() {
    // let
  }

  async function remove() {
    let c = confirm(`هل أنت متأكد تريد حذف ال${data.type}`)
    if (c) {
      await db.Residence.remove({ _id })
      goBack()
    }
  }

  const rate = data.type === 'جناح' ? suiteRate : roomRate

  return (
    <Split>
      <div className='content'>
        <div className='row justify-content-md-center' style={{ textAlign: 'center', marginBottom: '2em' }}>
          <div className='col-12' style={{ textAlign: 'center', marginBottom: '2em' }}>
            <h2> {data.hotel} {data.type} رقم ({data.roomNo}) </h2>
          </div>
          <div className='col'>
            <h4> السعر {rate} ريال </h4>
            <h5>  لليلة الواحدة </h5>
          </div>
          <div className='col'>
            <h4>عدد الاسرة</h4>
            <h4>{data.numberOfBeds}</h4>
          </div>
          <div className='col'>
            <h4>حالة ال{data.type}</h4>
            <h4>{data.status}</h4>
          </div>
        </div>
        <RoomRentals roomId={_id} />
        <RoomHistory roomId={_id} />
      </div>
      <ActionBar back>
        <Link to={`/add-gust/${_id}`} className={data.isRented ? 'disabled' : ''}>
          <span>تسجيل دخول</span>
          <LogIn />
        </Link>
        <a onClick={logout} className={!data.isRented ? 'disabled' : ''} >
          <span>تسجيل خروج</span>
          <LogOut />
        </a>
        <a onClick={() => print()} >
          <span>طباعة</span>
          <Printer />
        </a>
        <a onClick={remove} className={data.isRented ? 'disabled' : ''}>
          <span>   حذف ال{data.type} </span>
          <Trash />
        </a>
      </ActionBar>
    </Split>
  )
}

export default connect('hotels, status, roomRate, suiteRate', {})(Show)
