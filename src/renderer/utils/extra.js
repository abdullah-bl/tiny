
import db from './db'

export const beforeInsertRoom = async query => {
  let room = await db.Residence.findOne(query)
  if (room) {
    let error = new Error('رقم الغرفة / الجناح موجد مسبقاً')
    error.name = ''
    throw error
  }
  return null
}