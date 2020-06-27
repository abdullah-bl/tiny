
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ReactModal from 'react-modal'

import Header from './Header'
import Controls from './Controls'

import Home from './Home'
import Residence from './Residence'
import Add from './Residence/Add'
import Show from './Residence/Show'
import Edit from './Residence/Edit'
import ResidenceSettings from './Residence/Settings'

ReactModal.setAppElement('#app')

const Pages = () => {
  return (
    <>
      <Controls />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/residence" component={Residence} />
        <Route exact path="/residence/add" component={Add} />
        <Route exact path="/residence/show/:_id" component={Show} />
        <Route exact path="/residence/edit/:_id" component={Edit} />
        <Route exact path="/residence/settings" component={ResidenceSettings} />
        <Route render={Home} />
      </Switch>
    </>
  )
}



export default Pages