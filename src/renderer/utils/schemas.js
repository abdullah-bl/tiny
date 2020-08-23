
import Joi, { allow } from '@hapi/joi'

const Errors = (message) => {
  let err = new Error(message)
  err.name = ''
  return err
}

export const CommandSchema = Joi.object({
  orderNo: Joi.number().default(() => Math.random().toPrecision(5).slice(2)),
  roomId: Joi.string().required(),
  type: Joi.valid("صيانة", "عزل", "نظافة").error(Errors('يجب ان تحدد نوع الطلب !')),
  done: Joi.boolean().default(false),
  note: Joi.string().allow('')
})

export const GustSchema = Joi.object({
  roomId: Joi.string().required(),
  name: Joi.string().required().error(Errors('يجب كتابة الاسم!')),
  id: Joi.number().required().error(Errors('تأكد من كتابة الرقم العسكري!!')),
  rank: Joi.string().required().error(Errors(' يجب اختيار الرتبة')),
  unit: Joi.string().required().error(Errors(' يجب اختيار الوحدة')),
  phone: Joi.string().allow(''),
  checkIn: Joi.date().default(new Date()),
  checkOut: Joi.date().allow(""),
  nights: Joi.number().default(0),
  paid: Joi.boolean().default(false),
  total: Joi.number().default(0.00),
  officer: Joi.boolean().default(false),
})

export const ReservationSchema = Joi.object({
  id: Joi.number().required().error(Errors('الرقم العسكري او رقم الهوية مطلوب!')),
  name: Joi.string().required().error(Errors('يجب كتابة الاسم!')),
  rank: Joi.string().required().error(Errors(' يجب اختيار الرتبة')),
  unit: Joi.string().required().error(Errors(' يجب كتابة الوحدة')),
  phone: Joi.string().allow(''),
  roomId: Joi.string().required().error(Errors('يجب اختيار الغرفة / الجناح')),
  checkIn: Joi.date().default(new Date()),
  checkOut: Joi.date().allow(""),
  nights: Joi.number().default(0),
  paid: Joi.boolean().default(false),
  total: Joi.boolean().default(0.00)
})

export const RoomSchema = Joi.object({
  hotel: Joi.string().required().error(Errors('يجب اختيار المبنى!')),
  roomNo: Joi.string().required(),
  isRented: Joi.boolean().default(false),
  numberOfBeds: Joi.number().default(1),
  type: Joi.valid("غرفة", "جناح", "حظيرة").default("غرفة").error(Errors('يجب اختيار النوع !')),
  status: Joi.valid("غير شاغرة", "شاغرة", "صيانة", "عزل", "نظافة").default("شاغرة"),
  note: Joi.string().allow('')
})

export const UpdateRoomSchema = Joi.object({
  _id: Joi.string(),
  hotel: Joi.string().required().error(Errors('يجب اختيار المبنى!')),
  roomNo: Joi.number().required(),
  isRented: Joi.boolean().default(false),
  numberOfBeds: Joi.number().default(1),
  type: Joi.valid("غرفة", "جناح", "حظيرة").default("غرفة").error(Errors('يجب اختيار النوع !')),
  status: Joi.valid("غير شاغرة", "شاغرة", "صيانة", "عزل", "نظافة").default("شاغرة"),
  note: Joi.string().allow(''),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
})


export const AddPatchSchema = Joi.object({
  start: Joi.number().min(101).error(Errors('تجب ان تختار رقم بداية التسليل')),
  end: Joi.number().min(5).error(Errors('المجموع الكلي يجب ان لا يقل عن 5')),
  hotel: Joi.string().required().error(Errors('يجب اختيار المبنى!')),
  type: Joi.valid("غرفة", "جناح", "حظيرة").default("غرفة").error(Errors('يجب اختيار النوع !')),
  numberOfBeds: Joi.number().default(1),
})