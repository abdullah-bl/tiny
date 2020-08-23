

import React from 'react'
import { connect } from 'unistore/react'
import { Save } from 'react-feather'
import ActionBar from './ActionBar'
import { Select, Input } from './Input'
import useForm from '../hooks/useForm'
import { AddPatchSchema, Alert, db } from '../utils'

const doc = {
  roomNo: 101,
  type: '',
  status: 'شاغرة',
  isRented: false,
  numberOfBeds: 1,
  notes: ''
}

const AddPatch = ({ hotels }) => {
  const { state, onChange, set } = useForm({
    start: 101,
    end: 10,
    hotel: '',
    type: '',
    numberOfBeds: 1,
  })
  const renderHotel = ["اختر", ...hotels.split(/\n/).map(s => s.trim())]
  const submit = async e => {
    e.preventDefault()
    try {
      let docs = []
      const d = await AddPatchSchema.validateAsync(state)
      const found = await db.Residence.findOne({ roomNo: d.start, hotel: d.hotel })
      if (found) {
        const e = new Error('يبدو ان المبنى ليس خالي!!')
        e.name = ''
        e.detail = 'لا يمكن تكرار الرقم للاجنحة و الغرف و الحظائر!!'
        throw e
      } else {
        for (var x = 0; x < d.end; x++) {
          docs.push({
            ...doc,
            roomNo: d.start + x,
            type: d.type,
            hotel: d.hotel,
            numberOfBeds: d.numberOfBeds
          })
        }
        await db.Residence.insert(docs)
        Alert({ type: 'info', message: 'تم الاضافة بنجاح!' })
        document.getElementById('reset').click()
      }
    } catch (error) {
      Alert({ type: 'error', message: error.message, detail: error.detail })
    }
  }
  return (
    <>
      <main>
        <div className='container'>
          <h1>اضف مجموعة إسكان </h1>
          <h4>اجنحة / غرف  / حظائر</h4>
          <form noValidate onSubmit={submit}>
            <div className='row'>
              <div className='col-md-4 col-sm-6 col-xs-12' >
                <Select label='اختر المبنى' id='hotel' defaultValue={state.hotel} onChange={onChange} options={renderHotel} />
              </div>
              <div className='col-md-4 col-sm-6 col-xs-12'>
                <Select label='النوع ' id='type' defaultValue={state.type} onChange={onChange} options={["اختر", "غرفة", "جناح", "حظيرة"]} />
              </div>
            </div>
            <div className='row'>
              <div className='col-md-4 col-sm-6 col-xs-12'>
                <Input style={{ textAlign: 'center' }} type='number' min={101} caption='لايمكن تكرار الرقم !' label='بداية رقم التسلسل' id='start' placeholder='مثلاً ... 101 , G01, F02' value={state.start} onChange={onChange} />
              </div>
              <div className='col-md-4 col-sm-6 col-xs-12'>
                <Input min={0} lang="en-150" type='number' label=' عدد الأسِرَّة لكل سكن' id='numberOfBeds' placeholder='مثلاً ... 1,2,4' value={state.numberOfBeds} onChange={onChange} />
              </div>
              <div className='col-md-4 col-sm-6 col-xs-12'>
                <Input min={5} type='number' label='المجوع الكلي' id='end' placeholder='مثلاً ... 10, 20,30' value={state.end} onChange={onChange} />
              </div>
            </div>
            <div style={{ display: 'none' }}>
              <button id='submit' type='submit'>submit</button>
              <button id='reset' type='reset'>reset</button>
            </div>
          </form>
        </div>
      </main>
      <ActionBar back>
        <a onClick={() => document.getElementById('submit').click()}>
          <span>حفظ</span>
          <Save />
        </a>
      </ActionBar>
    </>
  )
}

export default connect('hotels', {})(AddPatch)