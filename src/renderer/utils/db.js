
const Collations = window.require("electron-nedb")

const Reservation = Collations('Reservation')
const Residence = Collations('Residence')
const History = Collations('History')

const ensure = async () => {
  await Reservation.ensureIndex({ fieldName: 'name' })
  await Reservation.ensureIndex({ fieldName: 'id' })
  await Reservation.ensureIndex({ fieldName: 'checkIn' })
  await Residence.ensureIndex({ fieldName: 'hotel' })
}

ensure()

export default window.db = {
  Reservation,
  Residence,
  History
}