
import React, { useEffect, useMemo, useState } from 'react'
import ActionBar from '../ActionBar'
import { setSizes } from '../../utils'
import { connect } from 'unistore/react'
import { Input, Select, TextArea } from '../Input'

const initialState = {
  name: '',
  note: '',
  status: 'جديد',
  rooms: [],
  suites: [],
}

const Add = ({ bounds }) => {
  const [state, setState] = useState(initialState)
  useEffect(() => {
    setSizes({ width: 420, height: 500 })
    return () => {
      setSizes(bounds)
    }
  }, [])
  const batActions = [
    {
      label: 'حفظ',
      onClick: () => {
        console.log(state)
        alert('hello')
      },
      style: { padding: '10px 20px', background: '#009688', color: 'white' }
    }
  ]
  function onChange(e) {
    let f = { [e.target.id]: e.target.value }
    setState(old => ({ ...old, ...f }))
  }
  return (
    <>
      <ActionBar actions={batActions} />
      <main>
        <h1>اضف مبنى </h1>
        <Input caption='لايمكن تكرار الاسم!!' label='اسم المبنى' id='name' placeholder='مبنى الضيافة...' defaultValue={state.name} onChange={onChange} />
        <Select
          label='حالة المبنى'
          id='status'
          defaultValue={state.status}
          onChange={onChange}
          options={[
            { label: 'جديد', value: 'جديد' },
            { label: 'عزل', value: 'عزل' },
            { label: 'صيانة', value: 'صيانة' },
          ]}
        />
        <TextArea label='اسم المبنى' id='note' placeholder='اكتب ملاحظاتك هنا...' defaultValue={state.name} onChange={onChange} />
      </main>
    </>
  )
}

export default connect('bounds', {})(Add)
