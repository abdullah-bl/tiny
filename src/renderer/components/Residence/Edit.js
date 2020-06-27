
import React, { useEffect, useMemo, useState } from 'react'
import Header from '../Header'
import { setSizes, RoomSchema, Alert, db } from '../../utils'
import { connect } from 'unistore/react'
import { Input, Select, TextArea } from '../Input'

const RenderHistory = () => {
  return (
    <div>
      <h1>اعمال الصيانه و النظافة</h1>
    </div>
  )
}

const RenderRental = () => {
  return (
    <div>
      <h1>تاريخ السكن</h1>
    </div>
  )
}

const Edit = ({ hotels, status, match: { params: { _id } } }) => {
  const [disabled, setDisabled] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0)
    // get Data
    getData()
    // clean up
    return () => { }
  }, [_id])

  async function getData() {
    let data = await db.Residence.findOne({ _id })
    return setData(data)
  }
  return (
    <>
      <Header />
      <main>
        <div style={{ textAlign: 'center' }}>
          <h2> {data.hotel} {data.type} رقم ({data.roomNo}) </h2>
        </div>
        <hr />
        <RenderHistory />
        <RenderRental />
      </main>
    </>
  )
}

export default connect('hotels, status, bounds', {})(Edit)
