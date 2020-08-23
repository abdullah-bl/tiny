
import React, { useState, useEffect } from 'react'
import Table from './table'
import { Check, Trash } from 'react-feather'
import { db, islamicDate, ChangeStatus } from '../utils'

const RoomHistory = ({ roomId }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    getData()
  }, [roomId])

  async function getData() {
    let data = await db.History.find({ roomId }).sort({ createdAt: -1 })
    setData(data)
  }

  const remove = async (_id, roomId) => {
    let conf = confirm('هل أنت متأكد ؟')
    if (conf) {
      try {
        await db.History.remove({ _id })
        ChangeStatus(roomId)
        getData()
      } catch (error) {
        console.log(error)
      }
    }
  }

  const update = async (_id, roomId) => {
    try {
      await db.History.update({ _id }, { $set: { done: true } })
      getData()
      ChangeStatus(roomId)
    } catch (error) {
      console.log(error)
    }
  }

  return data.length > 0 && (
    <div className='row'>
      <div className='col-12'>
        <h4>طلبات الصيانة و النظافة  ( {data.length} )</h4>
      </div>
      {data.map((d, index) =>
        <div className='col-12' key={d._id}>
          <div className='row'>
            <div className='col-8'>
              <span> رقم الطلب : {d.orderNo} </span> <br />
              <span> نوع الطلب :  {d.type} </span> <br />
              <span>حالة الطلب :  {d.done ? 'تم التنفيذ' : 'تحت الاجراء'}</span>
            </div>
            {!d.done &&
              <div className='col-4' className='no-print' style={{ flex: 1 }}>
                <span>الإجراءات</span>
                <div>
                  <a onClick={() => update(d._id, roomId)} style={{ color: 'var(--blue)' }}>
                    <span>تم التنفيذ</span>
                    <Check size={18} />
                  </a>
                  <a onClick={() => remove(d._id, roomId)} style={{ color: 'var(--red)' }}>
                    <span>حذف الطلب</span>
                    <Trash size={18} />
                  </a>
                </div>
              </div>
            }
            <div className='col-12'>
              <span>الملاحظات : {d.note ? d.note : 'لا يوجد ملاحظات'}</span>
            </div>
            <div className='col-12' style={{ fontSize: 14 }}>
              <span > تاريخ الإنشاء : {islamicDate(d.createdAt)} </span> <br />
              <span > تاريخ الانتهاء : {d.done && islamicDate(d.updatedAt)} </span>
              <hr />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomHistory