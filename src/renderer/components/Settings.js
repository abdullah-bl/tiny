

import React, { useEffect, useState } from 'react'
import { connect } from 'unistore/react'
import { Trash2 } from 'react-feather'
import ActionBar from './ActionBar'
import { TextArea, Input } from './Input'

const actions = {
  set(state, payload) {
    return { ...state, ...payload }
  }
}

const Settings = ({ ranks, hotels, status, roomRate, suiteRate, set }) => {
  const onChange = e => set({ [e.target.id]: e.target.value.trim() })
  const deleteAll = () => { }
  return (
    <>
      <main>
        <div className='content'>
          <div className='row'>
            <div className='col-12'>
              <h1>الإعدادات </h1>
            </div>
            <div className='col-12'>
              <TextArea label="الرتب العسكرية" id="ranks" placeholder='مثلاً... شاغر . غير شاغر - ..' defaultValue={ranks} caption="تاكد من الفصل بين الكلمات  (.)" onChange={onChange} />
            </div>
            <div className='col-12'>
              <TextArea label="المبانى" id="hotels" placeholder='مثلاً... مبنى الضيافة الممتازة . مبنى الضباط' defaultValue={hotels} caption="تاكد من الفصل بين الكلمات  (.)" onChange={onChange} />
            </div>
            <div className='col-12'>
              <TextArea label="حالات الغرف" id="status" placeholder='مثلاً... شاغر . غير شاغر - ..' defaultValue={status} caption="تاكد من الفصل بين الكلمات  (.)" onChange={onChange} />
            </div>
            <div className='col-3'>
              <Input type='number' label="سعر الجناح لليلة" id="suiteRate" placeholder='مثلاً ... 6.66' defaultValue={suiteRate} onChange={onChange} />
            </div>
            <div className='col-3'>
              <Input type='number' label="سعر الغرفة لليلة" id="roomRate" placeholder='مثلا...5.12' defaultValue={roomRate} onChange={onChange} />
            </div>
          </div>
          <hr />
          <p style={{ textAlign: 'center' }}>
            يتم حفظ التغييرات تلقائي
        </p>
        </div>
      </main>
      <ActionBar>
        <a onClick={deleteAll}>
          <span>حذف قاعدة البيانات</span>
          <Trash2 />
        </a>
      </ActionBar>
    </>
  )
}

export default connect('hotels, status, roomRate, suiteRate, ranks', actions)(Settings)