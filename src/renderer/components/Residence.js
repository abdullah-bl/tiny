
import React, { useEffect, useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'unistore/react'
import { Plus, Settings } from 'react-feather'

import Group from './Group'
import ResidenceCard from './ResidenceCard'
import { Search } from './Input'
import { db, groupBy } from '../utils'
import Split from './Split'
import ActionBar from './ActionBar'

const RenderData = memo(({ query, sort }) => {
  const [data, setData] = useState([])
  const [docs, setDocs] = useState([])

  useEffect(() => {
    getData({ query, sortBy: sort })
  }, [query, sort])

  async function getData({ query = {}, sortBy = { 'roomNo': 1 } }) {
    let data = await db.Residence.find(query).sort(sortBy)
    let docs = Object.entries(groupBy(data, 'hotel'))
    console.log(docs)
    setDocs(docs)
    return setData(data)
  }

  return (
    <div className='row justify-content-md-center'>
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
    <>
      <main>
        <div className='content'>
          <Search placeholder='بحث...' onChange={onSearch} />
          <Group query={query} sort={sort} />
        </div>
      </main>
      <ActionBar>
        <Link to='add'>
          <span>اضافة سكن</span>
          <Plus />
        </Link>
      </ActionBar>
    </>
  )
}

export default connect('hotels', 'status')(Residence)