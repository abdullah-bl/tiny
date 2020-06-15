
import React, { useEffect, useMemo, useState } from 'react'
import ActionBar from '../ActionBar'
import { setSizes, RoomSchema, Alert } from '../../utils'
import { connect } from 'unistore/react'
import { Input, Select, TextArea } from '../Input'


const initialState = {
  hotel: "",
  roomNo: 1,
  location: "",
  isRented: false,
  numberOfBeds: 1,
  type: "غرفة",
  status: "شاغرة",
  note: "",
}

const AddOne = ({ hotels, status, bounds }) => {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    setSizes({ width: 450, height: 550 })
    return () => {
      setSizes(bounds)
    }
  }, [])
  const batActions = [
    {
      label: 'حفظ',
      onClick: async () => {
        try {
          console.log(state)
          let doc = await RoomSchema.validateAsync(state)
          Alert({ type: 'info', message: 'تم الحفظ بنجاح' })
        } catch (error) {
          Alert({ type: 'warning', message: 'warning', detail: String(error) })
        }
      },
      disabled: false,
      style: { padding: '10px 20px', background: '#009688', color: 'white' }
    }
  ]
  function onChange(e) {
    let f = { [e.target.id]: e.target.value.trim() }
    setState(old => ({ ...old, ...f }))
  }
  return (
    <>
      <ActionBar actions={batActions} />
      <main>
        <h1>اضف غرفة </h1>
        <Input type='number' caption='لايمكن تكرار رقم الغرفة!' label='رقم الغرفة' id='roomNo' placeholder='مثلاً ... 1,2,4' defaultValue={state.roomNo} onChange={onChange} />
        <Select label='اختر المبنى' id='hotel' defaultValue={state.hotel} onChange={onChange} options={["اختر ", ...hotels.split("،")]} />
        <Select label='نوع الغرفة' id='type' defaultValue={state.type} onChange={onChange} options={["غرفة", "جناح"]} />
        <Select label='حالة الغرفة' id='status' defaultValue={state.status} onChange={onChange} options={["اختر ", ...status.split("،")]} />
        <Input lang="en-150" type='number' label='عدد الأسِرَّة' id='numberOfBeds' placeholder='مثلاً ... 1,2,4' defaultValue={state.numberOfBeds} onChange={onChange} />
        <Input type='text' label='موقع الغرفة / الجناح' id='location' placeholder='مثلاً ... الدور الاول' defaultValue={state.location} onChange={onChange} />
        <TextArea label='ملاحظات' id='note' placeholder='اكتب ملاحظاتك هنا...' defaultValue={state.note} onChange={onChange} />
      </main>
    </>
  )
}

export default connect('hotels, status, bounds', {})(AddOne)
