/*
	App
*/

import React from 'react';
import Header from './Header';
import Game from './Game';
import Order from './Order';
import Inventory from './Inventory';
import Checkout from './Checkout';
import Catalyst from 'react-catalyst';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

// Firebase
import Rebase from 're-base';
var base = Rebase.createClass('https://reactapp-jb138737.firebaseio.com/');

@autobind
class App extends React.Component {
	constructor() {
		super();

		this.state = {
			games : {},
			order : {}
		}
	}

	componentDidMount() {
		base.syncState(this.props.params.storeId + '/games', {
			context : this,
			state : 'games'
		});

		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

		if(localStorageRef) {
			// update our component state to reflect what is in localStorage
			this.setState({
				order : JSON.parse(localStorageRef)
			});
		}
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem('order-' + this.props.params.storeId, JSON.stringify(nextState.order));
	}

	addToOrder(key) {
		this.state.order[key] = this.state.order[key] + 1 || 1;
		this.setState({ order : this.state.order });
	}

	removeFromOrder(key) {
		delete this.state.order[key];
		this.setState({
			order : this.state.order
		});
	}

	addGame(game) {
		var timestamp = (new Date()).getTime();
		// Update the state object
		this.state.games['game-' + timestamp] = game;
		// Set the state
		this.setState({ games : this.state.games });
	}

	removeGame(key) {
		if(confirm("Are you sure you want to remove this game?")) {
			this.state.games[key] = null;
			this.setState({
				games : this.state.games
			});
		}
	}

	loadSamples() {
		this.setState({
			games : require('../sample-games')
		});
	}

	renderGame(key) {
		return <Game key={key} index={key} details={this.state.games[key]} addToOrder={this.addToOrder} />
	}

	render() {
		return (
			<div className="spearhead-gaming">
				<div className="menu-wrap">
					<Header tagline="THE BEST GAMES EVER!" />
					<ul className="list-of-games">
						{Object.keys(this.state.games).map(this.renderGame)}
					</ul>
				</div>
				<Order games={this.state.games} order={this.state.order} removeFromOrder={this.removeFromOrder} />
				<Inventory addGame={this.addGame} loadSamples={this.loadSamples} games={this.state.games} linkState={this.linkState.bind(this)} removeGame={this.removeGame} {...this.props} />
			</div>
		)
	}
};

reactMixin.onClass(App, Catalyst.LinkedStateMixin);

export default App;