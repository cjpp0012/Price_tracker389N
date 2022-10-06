import React from 'react';
import './App.css';

import { BrowserRouter, Route, Switch,} from 'react-router-dom';
// import { Link, Redirect} from 'react-router-dom';
import Home from './HomePage'
import Item from './ItemPage'

class App extends React.Component {
	render(){
		return (
			<BrowserRouter>
			<div>
				<Switch>
					<Route path="/" component={Home} exact />
					<Route path="/Item" component={Item}/>
				</Switch>
			</div> 
			</BrowserRouter>
		)
	}
}


export default App;
