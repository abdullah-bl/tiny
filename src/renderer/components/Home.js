
import React, { useState, useEffect } from 'react'
import { DollarSign, } from 'react-feather'
import { db, groupBy } from '../utils'

const Income = ({ data }) => {
  return (
    <div className='row'>
      <div className='col-12'>
        <h3>احصائيات عامة</h3>
      </div>
    </div>
  )
}

const Home = () => {
  const [data, setData] = useState({})
  useEffect(() => {
    getData()
    return () => {
      setData({})
    }
  }, [])

  async function getData() {
    const data = await db.Residence.find({})
    let docs = Object.entries(groupBy(data, 'hotel'))
    return setData(docs)
  }

  return (
    <>
      <main>
        <Income />
        <div className='row justify-content-md-center'>
          <div className='col-12'>
            <h4>الدخل </h4>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home