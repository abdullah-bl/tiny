
import React, { useState, useEffect } from 'react'
import { Input } from './Input'
import { LogIn } from 'react-feather'
import { db, GustSchema, Alert } from '../utils'
import useForm from '../hooks/useForm'
import Split from './Split'
import ActionBar from './ActionBar'

const gust = {
  id: '',
  name: '',
  rank: '',
  unit: '',
  phone: '',
  checkIn: new Date()
}

const AddGust = ({ history: { goBack }, match: { params: { _id } } }) => {
  const { state, onChange, set } = useForm(gust)

  useEffect(() => {
    set({ roomId: _id })
  }, [_id])

  async function save() {
    try {
      let doc = await GustSchema.validateAsync(state)
      await db.Reservation.insert(doc)
      await db.Residence.update({ _id }, { $set: { isRented: true, status: 'غير شاغرة' } })
      Alert({ message: 'Done' })
      goBack()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <Split>
      <div className='content'>
        <div className='row'>
          <div className='col' style={{ textAlign: 'center' }}>
            <h1>اضافة نزيل</h1>
          </div>
          <div className='col-12'>
            <Input defaultValue={state.name} onChange={onChange} label='الاسم كامل' id='name' placeholder='اكتب الاسم كامل...' />
          </div>
          <div className='col-6'>
            <Input defaultValue={state.id} onChange={onChange} label='الرقم العسكري' id='id' type='number' min={0} placeholder='الرقم السعكري...' />
          </div>
          <div className='col-6'>
            <Input defaultValue={state.rank} onChange={onChange} label='الرتبة' id='rank' placeholder='...' />
          </div>
          <div className='col-6'>
            <Input defaultValue={state.phone} onChange={onChange} label='رقم الجوال' id='phone' type='number' min={0} placeholder='رقم الجوال...' />
          </div>
          <div className='col-6'>
            <Input defaultValue={state.unit} onChange={onChange} label='الوحدة' id='unit' placeholder='الوحدة...' />
          </div>
          <div className='col-6'>
            <Input defaultValue={state.checkIn} onChange={onChange} label='تاريخ الدخول' id='checkIn' type='date' />
          </div>
        </div>
      </div>
      <ActionBar back>
        <a onClick={save}>
          <span>تسجيل الدخول</span>
          <LogIn />
        </a>
      </ActionBar>
    </Split>
  )
}

export default AddGust