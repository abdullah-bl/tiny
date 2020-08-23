
import React, { useState, useEffect, memo } from 'react'
import { FileText, AlertCircle, UserCheck } from 'react-feather'
import { db, groupBy, setColor } from '../utils'
import { withRouter } from 'react-router-dom'

const RenderData = withRouter(({ history, data = [] }) => {
  return data && data.map(d => (
    <div
      className='col-auto card'
      style={{ borderColor: setColor(d.status) }}
      key={d._id}
      onClick={() => history.push(`details/${d._id}`)} >
      <h3>{d.type} - {d.roomNo}</h3>
      <h4> {d.isRented && <UserCheck size={18} />} {d.status} {d.note && <FileText size={18} />}</h4>
    </div>
  ))
})

const Group = ({ query, sort, limit = 1000 }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    getData({ query, sortBy: sort, limit })
  }, [query, sort])

  async function getData({ query = {}, sortBy = { 'roomNo': 1 } }) {
    const data = await db.Residence.find(query).sort(sortBy).limit(limit)
    let docs = Object.entries(groupBy(data, 'hotel'))
    return setData(docs)
  }
  return data.length > 0 ? data.map((doc, index) => (
    <div className='row justify-content-md-center' key={index}>
      <div className='col-12'>
        <h3>{doc[0]} - ({doc[1].length})</h3>
      </div>
      <RenderData data={doc[1]} />
    </div>
  )) : (
      <div className='no-data'>
        <span>لا توجد بيانات</span>
        <AlertCircle />
      </div>
    )
}

export default memo(Group)