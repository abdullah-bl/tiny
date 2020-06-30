
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ReactModal from 'react-modal'

import Header from './Header'
import Controls from './Controls'

import Home from './Home'
import Residence from './Residence'
import AddRoom from './AddRoom'
import AddGust from './AddGust'
import ShowRoom from './ShowRoom'
import Settings from './Settings'
import Reservation from './Reservation'

ReactModal.setAppElement('#app')

const Pages = () => {
  return (
    <>
      <Controls />
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/residence" component={Residence} />
        <Route exact path="/add-room" component={AddRoom} />
        <Route exact path="/add-gust/:_id" component={AddGust} />
        <Route exact path="/show/:_id" component={ShowRoom} />
        <Route exact path="/reservation/:_id" component={Reservation} />
        <Route exact path="/settings" component={Settings} />
        <Route render={Home} />
      </Switch>
    </>
  )
}



export default Pages