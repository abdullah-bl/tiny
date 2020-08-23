
import React, { useState, useEffect } from 'react'
import { Input, Select, TextArea } from './Input'
import { Save } from 'react-feather'
import { db, Alert, CommandSchema } from '../utils'
import useForm from '../hooks/useForm'
import ActionBar from './ActionBar'

const command = {
  roomId: '',
  type: '',
  done: false,
  note: ''
}

const AddCommand = ({ history: { goBack }, match: { params: { _id } } }) => {
  const { state, onChange, set } = useForm(command)

  useEffect(() => {
    set({ roomId: _id })
  }, [_id])

  async function save() {
    try {
      let doc = await CommandSchema.validateAsync(state)
      await db.History.insert(doc)
      await db.Residence.update({ _id }, { $set: { status: doc.type } })
      Alert({ title: 'تم بنجاح', message: 'تم اضافة الامر بنجاح' })
      goBack()
    } catch (error) {
      Alert({ title: 'توجد مشكلة', message: error.message })
    }
  }

  return (
    <>
      <main>
        <div className='row'>
          <div className='col-12' style={{ textAlign: 'center' }}>
            <h1>اضافة طلب صيانة / نظافة</h1>
          </div>
          <div className='col-4'>
            <Select options={['اختر', 'صيانة', 'نظافة', 'عزل']} defaultValue={state.name} onChange={onChange} label='نوع الطلب' id='type' />
          </div>
          <div className='col-12'>
            <TextArea defaultValue={state.note} onChange={onChange} label='الملاحظات' id='note' placeholder='اكتب ملاحظاتك هنا...' />
          </div>
        </div>
      </main>
      <ActionBar back>
        <a onClick={save}>
          <span>حفظ </span>
          <Save />
        </a>
      </ActionBar>
    </>
  )
}

export default AddCommand