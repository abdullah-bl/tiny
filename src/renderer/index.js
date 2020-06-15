
import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'unistore/react'

import store from './store'
import App from './app'

import './style'

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'))



if (module.hot) {
  module.hot.accept()
}