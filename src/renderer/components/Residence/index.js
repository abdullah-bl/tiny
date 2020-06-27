
import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { Plus, Settings } from 'react-feather'

import { Search } from '../Input'
import { ResidenceCard } from '../Card'
import { db } from '../../utils'
import Split from '../Split'
import ActionBar from '../ActionBar'

const RenderData = memo(({ query, sort }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData({ query, sortBy: sort })
  }, [query, sort])

  async function getData({ query = {}, sortBy = { 'roomNo': 1 } }) {
    let data = await db.Residence.find(query).sort(sortBy)
    return setData(data)
  }

  return (
    <div className='row'>
      {data && data.map(d => <ResidenceCard key={d._id} {...d} />)}
    </div>
  )
})

const Residence = ({ hotels, status }) => {
  const [query, setQuery] = useState({})
  const [sort, setSort] = useState({ 'hotel': -1, 'roomNo': 1 })
  useEffect(() => {

    return () => {
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

  return (
    <Split>
      <div className='content'>
        <Search placeholder='بحث...' onChange={onSearch} />
        <RenderData query={query} sort={sort} />
      </div>
      <ActionBar>
        <Link to='residence/add'>
          <span>اضافة غرفة</span>
          <Plus />
        </Link>
        <Link to='residence/settings'>
          <span>اعدادات</span>
          <Settings />
        </Link>
      </ActionBar>
    </Split>
  )
}

export default connect('hotels', 'status')(Residence)