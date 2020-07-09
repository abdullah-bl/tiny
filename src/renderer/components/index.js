
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ReactModal from 'react-modal'

import Header from './Header'

import Home from './Home'
import Residence from './Residence'
import Add from './Add'
import Edit from './Edit'
import CheckIn from './CheckIn'
import AddCommand from './AddCommand'
import Details from './Details'
import Settings from './Settings'
import Reservation from './Reservation'

ReactModal.setAppElement('#app')

const Pages = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/residence" component={Residence} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/edit/:_id" component={Edit} />
        <Route exact path="/check-in/:_id" component={CheckIn} />
        <Route exact path="/add-command/:_id" component={AddCommand} />
        <Route exact path="/details/:_id" component={Details} />
        <Route exact path="/reservation/:_id" component={Reservation} />
        <Route exact path="/settings" component={Settings} />
        <Route render={Home} />
      </Switch>
    </>
  )
}



export default Pages