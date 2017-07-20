import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

/*
	Import components
*/

import App from './components/App';
import StorePicker from './components/StorePicker';
import Checkout from './components/Checkout';
import NotFound from './components/NotFound';

/*
	Routes
*/

var routes = (
	<Router history={createHistory()}>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="/checkout/:orderId" component={Checkout} />
		<Route path="*" component={NotFound} />
	</Router>
)

ReactDOM.render(routes, document.querySelector('#main'));