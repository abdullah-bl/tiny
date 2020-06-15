
import createStore from 'unistore'
import devtools from 'unistore/devtools'
import { is } from 'electron-util'

import { setStore } from './storage'
import { getSizes } from '../utils'

let initialState = {
  bounds: getSizes(),
  hotels: "مبنى الضباط، الضيافة الممتازة",
  status: "شاغرة ، غير شاغرة، صيانة، نظافة ، عزل",
  roomRate: 5,
  suiteRate: 6.66,
  showRevenue: true,
  showLatestRes: true,
}

let store = !is.development ? createStore(initialState) : devtools(createStore(initialState))


store.subscribe(state => {
  console.log(state)
  setStore(state)
})

export default store