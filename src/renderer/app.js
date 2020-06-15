
import React, { useEffect } from 'react'
import { HashRouter } from 'react-router-dom'
import { connect } from 'unistore/react'
import { getStore } from './store/storage'
import Pages from './components'

const actions = {
  init(state) {
    let oldState = getStore()
    return { ...state, ...oldState }
  }
}

const App = ({ init }) => {
  useEffect(() => {
    init()
  }, [])
  return (
    <HashRouter>
      <Pages />
    </HashRouter>
  )
}

export default connect('', actions)(App)
