
import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { Plus, Filter } from 'react-feather'

import Group from './Group'
import { Search, Select } from './Input'
import ActionBar from './ActionBar'

const Residence = ({ hotels, status }) => {
  const [query, setQuery] = useState({})
  const [sort, setSort] = useState({ 'hotel': -1, 'roomNo': 1 })
  const renderHotels = hotels.split(/\n/).map(s => s.trim())

  useEffect(() => {
    return () => {
      setQuery({})
      setSort({})
    }
  }, [])

  async function onSearch(e) {
    let value = e.target.value.trim()
    if (value) {
      setQuery({
        $or: [
          { hotel: new RegExp(value) },
          { roomNo: new RegExp(value) },
          { status: new RegExp(value) },
          { type: new RegExp(value) },
        ]
      })
    } else {
      setQuery({})
    }
  }

  const onFilter = (e) => {
    let q = { [e.target.id]: e.target.value.trim() }
    if (e.target.value.trim() === 'الكل') {
      return setQuery({})
    }
    setQuery({ ...query, ...q })
  }

  return (
    <>
      <main>
        <div className='content'>
          <Group query={query} sort={sort} />
        </div>
      </main>
      <ActionBar>
        <Link to='add'>
          <span>اضافة سكن</span>
          <Plus />
        </Link>
        <Search placeholder='بحث...' onChange={onSearch} />
        <a className='disabled'>
          <span> تصفية </span>
          <Filter />
        </a>
        <div className=''>
          <Select label='المبنى' options={['الكل', ...renderHotels]} id="hotel" onChange={onFilter} />
        </div>
        <div className=''>
          <Select label='النوع' options={['الكل', 'جناح', 'غرفة', 'حظيرة']} id="type" onChange={onFilter} />
        </div>
        <div className=''>
          <Select label='الحالة' options={['الكل', 'شاغرة', 'غير شاغرة', 'نظافة', 'صيانة', 'عزل']} id='status' onChange={onFilter} />
        </div>
      </ActionBar>
    </>
  )
}

export default connect('hotels', 'status')(Residence)