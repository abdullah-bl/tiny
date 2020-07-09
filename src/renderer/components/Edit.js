
import React, { useEffect, useState } from 'react'
import { connect } from 'unistore/react'
import { Edit3 } from 'react-feather'
import { Select, Input, TextArea } from './Input'
import ActionBar from './ActionBar'
import { db, Alert, UpdateRoomSchema, beforeInsertRoom } from '../utils'
import useForm from '../hooks/useForm'

const Edit = ({ history, hotels, match: { params: { _id } } }) => {
  const [data, setData] = useState({})
  const { state, onChange, set } = useForm({})
  const renderHotel = ["اختر", ...hotels.split(".").map(s => s.trim())]

  useEffect(() => {
    getData()
    return () => setData({})
  }, [_id])

  async function getData() {
    const data = await db.Residence.findOne({ _id })
    setData(data)
    set(data)
  }

  async function update() {
    try {
      let doc = await UpdateRoomSchema.validateAsync(state)
      await beforeInsertRoom({ roomNo: doc.roomNo, hotel: doc.hotel })
      await db.Residence.update({ _id }, { $set: { ...doc } })
      Alert({ type: 'info', message: 'تم الحفظ بنجاح' })
      history.goBack()
    } catch (error) {
      Alert({ title: 'الإسكان', type: 'error', message: 'خطأ في ادخال البيانات', detail: String(error) })
    }
  }

  return (
    <>
      <main>
        <div className='row'>
          <div className='col-12' style={{ textAlign: 'center' }}>
            <h2>تعديل {data.type} رقم {data.roomNo} في {data.hotel}</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 col-sm-6 col-xs-12' >
            <Select label='اختر المبنى' id='hotel' defaultValue={data.hotel} onChange={onChange} options={renderHotel} />
          </div>
          <div className='row'>
            <div className='col-4'>
              <Select label='النوع ' id='type' defaultValue={data.type} onChange={onChange} options={["اختر", "غرفة", "جناح", "حظيرة"]} />
            </div>
            <div className='col-4'>
              <Input style={{ textAlign: 'center' }} type='text' caption='لايمكن تكرار رقم الغرفة!' label='رقم الغرفة / الجناح' id='roomNo' placeholder='F01, G01, ...' defaultValue={data.roomNo} onChange={onChange} />
            </div>
            <div className='col-4'>
              <Input min={0} lang="en-150" type='number' label='عدد الأسِرَّة' id='numberOfBeds' placeholder='مثلاً ... 1,2,4' defaultValue={data.numberOfBeds} onChange={onChange} />
            </div>
            <div className='col-12'>
              <TextArea label='ملاحظات' id='note' placeholder='اكتب ملاحظاتك هنا...' value={data.note} onChange={onChange} />
            </div>
          </div>
        </div>
      </main>
      <ActionBar back>
        <a onClick={update}>
          <span>تعديل</span>
          <Edit3 />
        </a>
      </ActionBar>
    </>
  )
}

export default connect('hotels', {})(Edit)