
import React, { useState, useEffect } from 'react'
import { Printer, ArrowLeft, ArrowRight } from 'react-feather'
import { islamicDate, db, years, reportsOptions } from '../utils'
import { Input, SelectComplex, Select } from './Input'
import ActionBar from './ActionBar'

const RenderTitle = ({ reportType, value }) => {
  const [t, setT] = useState('')
  // const renderDate = reportType === 'daily' ? islamicDate(value) : String(value)
  useEffect(() => {
    switch (reportType) {
      case 'daily':
        return setT('يومي')
      case 'weekly':
        return setT('اسبوعي')
      case 'monthly':
        return setT('شهري')
      case 'yearly':
        return setT('سنوي')
      default:
        return setT('مخصص')
    }
  }, [reportType])
  return (
    <div className='row' style={{ textAlign: 'center' }}>
      <div className='col-12'>
        <h2>تقرير {t} </h2>
        {/* <small>{renderDate}</small> */}
      </div>
    </div>
  )
}

const RenderTypes = ({ type, onChange }) => {
  switch (type) {
    case 'daily':
      return <Input label='اختر اليوم' id='daily' type='date' onChange={onChange} />
    case 'weekly':
      return <Input label='اختر الاسبوع' id='weekly' type='week' onChange={onChange} />
    case 'monthly':
      return <Input label='اختر الشهر' id='monthly' type='month' onChange={onChange} />
    case 'yearly':
      return <Select label='اختر السنه' id="yearly" options={years()} onChange={onChange} />
    default:
      return (
        <>
          <Input className='disabled' label='من' id="startOf" type='date' onChange={onChange} />
          <Input className='disabled' label='الي' id="endOf" type='date' onChange={onChange} />
        </>
      )
  }
}

const RenderReportData = ({ query }) => {
  const [data, setDate] = useState([])
  useEffect(() => {
    getData()
    return () => {
      setDate([])
    }
  }, [query])
  const getData = async () => { }
  return (
    <div className='row'>
      <h1>Reports </h1>
    </div>
  )
}



const Reports = () => {
  const [query, setQuery] = useState({})
  const [value, setValue] = useState(new Date())
  const [type, setType] = useState('weekly')

  const onSelect = (e) => {
    setType(e.target.value.trim())
    type === 'daily' ? setValue(new Date()) : setValue('')
  }

  useEffect(() => {
    return () => {
      setQuery({})
      setType('daily')
    }
  }, [])

  const onChange = e => {
    setValue(e.target.value)
    console.log('e', e.target.value)
  }

  return (
    <>
      <main>
        <RenderTitle reportType={type} value={value} />
        <RenderReportData query={query} />
      </main>
      <ActionBar>
        <div className=''>
          <SelectComplex label='اختر نوع التقرير' onChange={onSelect} options={reportsOptions} />
        </div>
        <div className=''>
          <RenderTypes type={type} onChange={onChange} />
        </div>
        <a onClick={print}>
          <span>طباعة</span>
          <Printer />
        </a>
      </ActionBar>
    </>
  )
}

export default Reports