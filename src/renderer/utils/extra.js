
import db from './db'

export const beforeInsertRoom = async query => {
  let room = await db.Residence.findOne(query)
  if (room) {
    let error = new Error(`رقم الجناح / الغرفة / الحظيرة موجود مسبقاً !`)
    error.name = ''
    throw error
  }
  return null
}

// Accepts the array and key
export const groupBy = (array, key) => {
  // Return the end result
  return array.reduce((result, currentValue) => {
    // If an array already present for key, push it to the array. Else create an array and push the object
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)
    // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
    return result
  }, {}) // empty object is the initial value for result object
}

export function setColor(status) {
  switch (status) {
    case 'شاغرة':
      return 'var(--green)'
    case 'غير شاغرة':
      return 'var(--blue)'
    case 'صيانة':
      return 'var(--yellow)'
    case 'نظافة':
      return 'var(--orange)'
    case 'عزل':
      return 'var(--red)'
    default:
      return 'var(--grey)'
  }
}


export const ChangeStatus = async roomId => {
  try {
    let h = await db.History.findOne({ roomId, done: false })
    if (h) {
      return db.Residence.update({ _id: roomId }, { $set: { status: h.type } })
    } else {
      let r = await db.Residence.findOne({ _id: roomId })
      if (r.isRented) {
        return db.Residence.update({ _id: roomId }, { $set: { status: 'غير شاغرة' } })
      } else {
        return db.Residence.update({ _id: roomId }, { $set: { status: 'شاغرة' } })
      }
    }
  } catch (error) {
    console.log('change status => ', error)
  }
}

export const CountNights = (checkIn, checkOut = new Date().setHours(9, 0, 0, 0)) => {
  const start = new Date(checkIn)
  const end = new Date(checkOut)
  let dayCount = 0
  while (end > start) {
    dayCount++
    start.setDate(start.getDate() + 1)
  }
  return dayCount
}

export const NightsText = (nights = 0) => {
  if (nights === 0) {
    return `لم يكمل الليلة`
  } else if (nights === 1) {
    return `ليلة واحدة`
  } else if (nights === 2) {
    return 'ليلتين'
  } else if (nights < 10) {
    return `${nights} ليالي`
  }
  return `${nights} ليلة`
}



export const reportsOptions = [
  // { label: 'تقرير يومي', value: 'daily' },
  { label: 'تقرير اسبوعي', value: 'weekly' },
  { label: 'تقرير شهري', value: 'monthly' },
  { label: 'تقرير سنوي', value: 'yearly' },
  // { label: 'تقرير مخصص', value: 'specific' },
]

export const years = () => {
  const a = []
  for (var y = 2020; y < 2030; y++) {
    a.push(y)
  }
  return a
}
