
import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'unistore/react'
import ReactModal from 'react-modal'
import Header from '../Header'
import { LogIn, LogOut } from 'react-feather'
import ActionBar from '../ActionBar'
import AddGust from './AddGust'
import { setSizes, RoomSchema, Alert, db } from '../../utils'
import { Input, Select, TextArea } from '../Input'
import Split from '../Split'


const RenderHistory = () => {
  return (
    <div>
      <h1>اعمال الصيانه و النظافة</h1>
    </div>
  )
}

const RenderRental = () => {
  return (
    <div>
      <h1>تاريخ السكن</h1>
    </div>
  )
}

const Show = ({ hotels, status, match: { params: { _id } } }) => {
  const [data, setData] = useState({})
  const [isOpen, setOpen] = useState(true)
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

  function close() {
    setOpen(false)
  }

  const actions = [
    {
      label: 'اضافة نزيل',
      onClick: async () => setOpen(true),
      disabled: !data.isRented,
      style: { padding: '10px 20px', background: 'var(--green)', color: 'white' }
    },
    {
      label: 'تسجيل خروج',
      onClick: async () => setOpen(true),
      disabled: data.isRented,
      style: { padding: '10px 20px', background: 'var(--red)', color: 'white' }
    },
  ]

  return (
    <Split>
      <div className='row'>
        <div className='col-12' style={{ textAlign: 'center' }}>
          <h2> {data.hotel} {data.type} رقم ({data.roomNo}) </h2>
        </div>
        <div className='col-12'>
          <RenderHistory />
        </div>
        <div className='col-12'>
          <RenderRental />
        </div>
        <ReactModal overlayClassName='Overlay' className='Modal' isOpen={isOpen} onRequestClose={close}>
          <AddGust close={close} />
        </ReactModal>
      </div>
      <ActionBar back>
        <a onClick={() => setOpen(true)} className={data.isRented ? 'disabled' : ''}>
          <span>تسجيل دخول</span>
          <LogIn />
        </a>
        <a onClick={() => setOpen(true)} className={!data.isRented ? 'disabled' : ''} >
          <span>تسجيل خروج</span>
          <LogOut />
        </a>
      </ActionBar>
    </Split>
  )
}

export default connect('hotels, status, bounds', {})(Show)
