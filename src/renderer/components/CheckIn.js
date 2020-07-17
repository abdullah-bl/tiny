
import React, { useState, useEffect } from 'react'
import { LogIn, UserCheck } from 'react-feather'
import { connect } from 'unistore/react'
import { Input, Select } from './Input'
import { db, GustSchema, Alert, islamicDate } from '../utils'
import useForm from '../hooks/useForm'
import ActionBar from './ActionBar'

const gust = {
  id: '',
  name: '',
  rank: '',
  unit: '',
  phone: '',
  checkIn: new Date(),
  officer: false
}

const CheckIn = ({ ranks, units, history: { goBack }, match: { params: { _id } } }) => {
  const { state, onChange, set } = useForm(gust)
  const renderRanks = ["اختر", ...ranks.split(/\n/).map(s => s.trim())]
  const renderUnits = ["اختر", ...units.split(/\n/).map(s => s.trim())]

  useEffect(() => {
    set({ roomId: _id })
  }, [_id])

  async function save() {
    try {
      let doc = await GustSchema.validateAsync(state)
      let old = await db.Reservation.findOne({ id: doc.id, paid: false })
      if (old) throw Error('لا يمكن تسجيل دخول النزيل لاكثر من سكن واحد!')
      await db.Reservation.insert(doc)
      await db.Residence.update({ _id }, { $set: { isRented: true, status: 'غير شاغرة' } })
      Alert({ message: 'تم بنجاح', detail: `تم تسجيل الدخول لـ (${doc.name}) ` })
      goBack()
    } catch (error) {
      console.log('error', error)
      Alert({ type: 'error', message: error.message })
    }
  }

  return (
    <>
      <main>
        <div className='row'>
          <div className='col' style={{ textAlign: 'center' }}>
            <h1>اضافة ساكن</h1>
          </div>
          <div className='col-12'>
            <Input defaultValue={state.name} onChange={onChange} label='الاسم كامل' id='name' placeholder='اكتب الاسم كامل...' />
          </div>
          <div className='col-6'>
            <Input defaultValue={state.id} onChange={onChange} label='الرقم العسكري' id='id' type='number' min={0} placeholder='الرقم السعكري...' />
          </div>
          <div className='col-6'>
            <Input maxLength={10} defaultValue={state.phone} onChange={onChange} label='رقم الجوال' id='phone' type='number' min={0} placeholder='رقم الجوال...' />
          </div>
          <div className='col-6'>
            {/* <Input defaultValue={state.rank} onChange={onChange} label='الرتبة' id='rank' placeholder='...' /> */}
            <Select label='اختر الرتبة' id='rank' defaultValue={state.rank} onChange={onChange} options={renderRanks} />
          </div>
          <div className='col-6'>
            {/* <Input defaultValue={state.unit} onChange={onChange} label='الوحدة' id='unit' placeholder='الوحدة...' /> */}
            <Select label='اختر الوحدة' id='unit' defaultValue={state.unit} onChange={onChange} options={renderUnits} />
          </div>
          <div className='col-6'>
            <Input defaultValue={state.checkIn} onChange={onChange} label='تاريخ الدخول' id='checkIn' type='date' min='01/01/2020' caption={state.checkIn && `الموافق ${islamicDate(new Date(state.checkIn))}`} />
          </div>
        </div>
      </main>
      <ActionBar back>
        <a onClick={save}>
          <span>تسجيل الدخول</span>
          <UserCheck />
        </a>
      </ActionBar>
    </>
  )
}

export default connect('ranks, units', {})(CheckIn)