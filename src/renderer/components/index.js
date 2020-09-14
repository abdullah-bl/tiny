import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Header from './Header'

import Home from './Home'
import Residence from './Residence'
import Reports from './Reports'
import Add from './Add'
import AddPatch from './AddPatch'
import CheckOutPatch from './CheckOutPatch'
import Edit from './Edit'
import CheckIn from './CheckIn'
import AddCommand from './AddCommand'
import Details from './Details'
import Settings from './Settings'
import Reservation from './Reservation'
import Reservations from './Reservations'
const Pages = () => {
	return (
		<>
			<Header />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route exact path='/reports' component={Reports} />
				<Route exact path='/residence' component={Residence} />
				<Route exact path='/add' component={Add} />
				<Route exact path='/add-patch' component={AddPatch} />
				<Route exact path='/checkout-patch' component={CheckOutPatch} />
				<Route exact path='/edit/:_id' component={Edit} />
				<Route exact path='/check-in/:_id' component={CheckIn} />
				<Route exact path='/add-command/:_id' component={AddCommand} />
				<Route exact path='/details/:_id' component={Details} />
				<Route exact path='/reservations' component={Reservations} />
				<Route exact path='/reservations/:_id' component={Reservation} />
				<Route exact path='/settings' component={Settings} />
				<Route render={() => <Redirect to='/' />} />
			</Switch>
		</>
	)
}

export default Pages
