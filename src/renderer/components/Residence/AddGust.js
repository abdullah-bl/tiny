
import React from 'react'
import { Input } from '../Input'
import { LogIn } from 'react-feather'

const AddGust = ({ close }) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col' style={{ textAlign: 'center' }}>
          <h1>اضافة نزيل</h1>
        </div>
        <div className='col-12'>
          <Input label='الاسم كامل' id='name' placeholder='اكتب الاسم كامل...' />
        </div>
        <div className='col-6'>
          <Input label='الرقم العسكري' id='id' type='number' min={0} placeholder='الرقم السعكري...' />
        </div>
        <div className='col-6'>
          <Input label='الرتبة' id='rank' placeholder='...' />
        </div>
        <div className='col-6'>
          <Input label='رقم الجوال' id='phone' type='number' min={0} placeholder='رقم الجوال...' />
        </div>
        <div className='col-6'>
          <Input label='الوحدة' id='unit' placeholder='الوحدة...' />
        </div>
        <div className='col-6'>
          <Input label='تاريخ الدخول' id='checkIn' type='date' />
        </div>
      </div>
      <div className='row'>
        <div className='col-12' style={{ textAlign: 'center' }}>
          <a onClick={close}>
            <span>تسجيل الدخول</span>
            <LogIn />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AddGust