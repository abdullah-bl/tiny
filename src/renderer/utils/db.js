
import Collations from 'electron-nedb'

const Reservation = Collations('Reservation')
const Residence = Collations('Residence')

export default {
  Reservation,
  Residence
}