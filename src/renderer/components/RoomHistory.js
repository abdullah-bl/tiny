
import React from 'react'
import Table from './table'

const RoomHistory = () => {
  return (
    <div className='row'>
      <div className='col-12'>
        <h4>تاريخ الصيانة و النظافة</h4>
      </div>
      <div className='col-12'>
        <Table rows={[1, 2, 3]} data={[1, 2, 3]} />
      </div>
    </div>
  )
}

export default RoomHistory