
import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './Home'
import Reservation from './Reservation'
import AddReservation from './Reservation/Add'
import Residence from './Residence'
import AddOneResidence from './Residence/AddOne'
import ResidenceSettings from './Residence/Settings'


const Pages = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/reservation" component={Reservation} />
      <Route exact path="/reservation/add" component={AddReservation} />
      <Route exact path="/residence" component={Residence} />
      <Route exact path="/residence/addOne" component={AddOneResidence} />
      <Route exact path="/residence/settings" component={ResidenceSettings} />
      <Route render={Home} />
    </Switch>
  )
}



export default Pages