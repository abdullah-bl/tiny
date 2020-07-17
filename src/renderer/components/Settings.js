

import React, { useEffect, useState } from 'react'
import { connect } from 'unistore/react'
import { Trash2, Database, Meh } from 'react-feather'
import ActionBar from './ActionBar'
import { TextArea, Input } from './Input'

const actions = {
  set(state, payload) {
    return { ...state, ...payload }
  }
}

const Settings = ({ ranks, hotels, barnRate, roomRate, suiteRate, units, set }) => {
  const caption = 'يجب الفصل بين الكلمات بسطر جديد بأستخدام مفتاح إنتر  '
  const onChange = e => set({ [e.target.id]: e.target.value.trim() })
  const deleteAll = () => { }
  const backup = () => { }
  const restore = () => { }

  return (
    <>
      <main>
        <div className='content'>
          <div className='row'>
            <div className='col-12'>
              <h1>الإعدادات </h1>
            </div>
            <div className='col-12'>
              <TextArea label="الرتب العسكرية" id="ranks" placeholder='ملازم، ملازم اول...' defaultValue={ranks} caption={caption} onChange={onChange} />
            </div>
            <div className='col-12'>
              <TextArea label="المبانى" id="hotels" placeholder='مثلاً... مبنى الضيافة الممتازة . مبنى الضباط' defaultValue={hotels} caption={caption} onChange={onChange} />
            </div>
            <div className='col-12'>
              <TextArea label="الوحدات" id="units" placeholder='المركز و المدرسة...' defaultValue={units} caption={caption} onChange={onChange} />
            </div>
            <div className='col-auto'>
              <Input type='number' label="سعر الجناح لليلة" id="suiteRate" placeholder='مثلاً ... 6.66' defaultValue={suiteRate} onChange={onChange} />
            </div>
            <div className='col-auto'>
              <Input type='number' label="سعر الغرفة لليلة" id="roomRate" placeholder='مثلا...5.12' defaultValue={roomRate} onChange={onChange} />
            </div>
            <div className='col-auto'>
              <Input type='number' label="سعر الحظيرة لليلة" id="barnRate" placeholder='مثلا...5.12' defaultValue={barnRate} onChange={onChange} />
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
        <a onClick={backup} className=''>
          <span>Backup</span>
          <Database />
        </a>
        <a onClick={restore} className=''>
          <span>Restore Backup</span>
          <Database />
        </a>
        <a className='disabled'>
          <span>v0.1</span>
          <Meh />
        </a>
      </ActionBar>
    </>
  )
}

export default connect('hotels, status, roomRate, suiteRate, ranks, units, barnRate', actions)(Settings)