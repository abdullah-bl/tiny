
import Joi, { allow } from '@hapi/joi'

const Errors = (message) => {
  let err = new Error(message)
  err.name = ''
  return err
}

export const GustSchema = Joi.object({
  roomId: Joi.string().required(),
  id: Joi.number().required().error(Errors('الرقم العسكري او رقم الهوية مطلوب!')),
  name: Joi.string().required().error(Errors('يجب كتابة الاسم!')),
  rank: Joi.string().required().error(Errors(' يجب كتابة الرتبة')),
  unit: Joi.string().required().error(Errors(' يجب كتابة الوحدة')),
  phone: Joi.string().allow(''),
  checkIn: Joi.date().default(new Date()),
  checkOut: Joi.date().allow(""),
  nights: Joi.number().default(0),
  paid: Joi.boolean().default(false)
})

export const ReservationSchema = Joi.object({
  id: Joi.number().required().error(Errors('الرقم العسكري او رقم الهوية مطلوب!')),
  name: Joi.string().required().error(Errors('يجب كتابة الاسم!')),
  rank: Joi.string().required().error(Errors(' يجب كتابة الرتبة')),
  unit: Joi.string().required().error(Errors(' يجب كتابة الوحدة')),
  phone: Joi.string().allow(''),
  roomId: Joi.string().required().error(Errors('يجب اختيار الغرفة / الجناح')),
  checkIn: Joi.date().default(new Date()),
  checkOut: Joi.date().allow(""),
  nights: Joi.number().default(0),
  paid: Joi.boolean().default(false)
})

export const RoomSchema = Joi.object({
  hotel: Joi.string().required().error(Errors('يجب اختيار المبنى!')),
  roomNo: Joi.string().required(),
  isRented: Joi.boolean().default(false),
  numberOfBeds: Joi.number().default(1),
  type: Joi.valid("غرفة", "جناح", "حظيرة").default("غرفة"),
  status: Joi.valid("غير شاغرة", "شاغرة", "صيانة", "عزل", "نظافة").default("شاغرة"),
  location: Joi.string().allow(''),
  note: Joi.string().allow('')
})