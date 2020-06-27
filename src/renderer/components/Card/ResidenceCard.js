
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

const ResidenceCard = ({ _id, hotel, roomNo, type, status, note }) => {
  const [color, setColor] = useState('transparent')
  useEffect(() => {
    getColor(status)
    return () => { }
  }, [status])


  function getColor(status) {
    switch (status) {
      case 'شاغرة':
        return setColor('var(--green)')
      case 'غير شاغرة':
        return setColor('var(--blue)')
      case 'صيانة':
        return setColor('var(--yellow)')
      case 'نظافة':
        return setColor('var(--orange)')
      case 'عزل':
        return setColor('var(--red)')
      default:
        return setColor('var(--grey)')
    }
  }
  return (
    <Link to={`/residence/show/${_id}`}>
      <div className='card col' style={{ borderColor: color }} >
        <h3>{hotel}</h3>
        <span> {type} رقم {roomNo} </span>
        <span>{status}</span>
        <small>{note}</small>
      </div>
    </Link>
  )
}

export default ResidenceCard