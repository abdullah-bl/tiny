
import createStore from 'unistore'
import devtools from 'unistore/devtools'
import { is } from 'electron-util'

import { setStore } from './storage'

let initialState = {
  hotels: "الضيافة الممتازة\n مبنى الضباط",
  status: "شاغرة\nغير شاغرة\nصيانة \nنظافة \nعزل",
  ranks: 'ملازم\nملازم اول',
  units: 'المركز و المدرسة\n',
  roomRate: 5,
  barnRate: 3,
  suiteRate: 6.66,
  showRevenue: true,
  showLatestRes: true,
}

let store = !is.development ? createStore(initialState) : devtools(createStore(initialState))


store.subscribe(state => {
  console.info('State Changed => ', state)
  setStore(state)
})

export default store