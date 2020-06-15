
import Joi from '@hapi/joi'

const Errors = (message) => {
  let err = new Error(message)
  err.name = ''
  return err
}

export const ReservationSchema = Joi.object({
  guest: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    unit: Joi.string().required(),
    rank: Joi.string().required(),
    phone: Joi.string(),
  }),
  roomId: Joi.string().required(),
  checkIn: Joi.date().default(new Date()),
  checkOut: Joi.date().allow(""),
  nights: Joi.number().default(0),
  paid: Joi.boolean().default(false)
})

export const RoomSchema = Joi.object({
  hotel: Joi.string().required().error(Errors('حقل المبنى لا يمكن ان يكون فارغ!')),
  roomNo: Joi.number().required(),
  isRented: Joi.boolean().default(false),
  numberOfBeds: Joi.number().default(1),
  type: Joi.valid("غرفة", "جناح").default("غرفة"),
  status: Joi.valid("غير شاغرة", "شاغرة", "صيانة", "عزل", "نظافة").default("شاغرة"),
  location: Joi.string().allow(''),
  note: Joi.string().allow('')
})