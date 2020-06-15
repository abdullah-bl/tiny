

import React, { useEffect, useState } from 'react'
import { connect } from 'unistore/react'

import ActionBar from '../ActionBar'
import { setSizes } from '../../utils'
import { TextArea, Input } from '../Input'
// import ContextMenu from '../context/menu'

const actions = {
  set(state, payload) {
    return { ...state, ...payload }
  }
}

const Settings = ({ hotels, status, roomRate, suiteRate, bounds, set }) => {
  useEffect(() => {
    setSizes({ width: 420, height: 500 })
    return () => {
      setSizes(bounds)
    }
  }, [])
  const onChange = e => set({ [e.target.id]: e.target.value.trim() })
  return (
    <>
      <ActionBar />
      <main>
        <h1>إعدادات السكن</h1>
        <TextArea label="المبنى" id="hotels" placeholder='مثلاً... مبنى الضيافة الممتازة ، مبنى الضباط' defaultValue={hotels} caption="تاكد من الفصل بين الكلمات بفاصلة (،)" onChange={onChange} />
        <TextArea label="حالات الغرف" id="status" placeholder='مثلاً... شاغر ، غير شاغر ، ..' defaultValue={status} caption="تاكد من الفصل بين الكلمات بفاصلة (،)" onChange={onChange} />
        <Input type='number' label="سعر الجناح لليلة" id="suiteRate" placeholder='مثلاً ... 6.66' defaultValue={suiteRate} onChange={onChange} />
        <Input type='number' label="سعر الغرفة لليلة" id="roomRate" placeholder='مثلا...5.12' defaultValue={roomRate} onChange={onChange} />
        <hr />
        <p style={{ textAlign: 'center' }}>
          يتم حفظ التغييرات تلقائي
        </p>
      </main>
    </>
  )
}

export default connect('hotels, status, roomRate, suiteRate,  bounds', actions)(Settings)