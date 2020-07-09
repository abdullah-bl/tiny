
import createStore from 'unistore'
import devtools from 'unistore/devtools'
import { is } from 'electron-util'

import { setStore } from './storage'

let initialState = {
  hotels: "الضيافة الممتازة . مبنى الضباط . ٣٤-أ",
  status: "شاغرة .غير شاغرة .صيانة .نظافة .عزل",
  ranks: 'فريق اول . فريق . لواء مهندس ركن. لواء ركن . لواء . عميد مهندس ركن. عميد ركن . عميد. عقيد مهندس ركن .عقيد ركن. عقيد . مقدم ',
  roomRate: 5,
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