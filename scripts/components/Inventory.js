/*
	Inventory
	<Inventory />
*/

import React from 'react';
import AddGameForm from './AddGameForm';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://reactapp-jb138737.firebaseio.com/');

@autobind
class Inventory extends React.Component {

	constructor(){
		super();

		this.state = {
			uid : ''
		}
	}

	authenticate(provider) {
		ref.authWithOAuthPopup(provider, this.authHandler);
	}

	authWithEmailPass(details) {
		details.preventDefault();
		var email = document.getElementById('emailInput').value;
		var password = document.getElementById('passwordInput').value;
		
		var details = {
			email : email,
			password : password
		}

		ref.authWithPassword(details, this.authHandler);
	}

	componentWillMount() {
		var token = localStorage.getItem('token');
		if(token) {
			ref.authWithCustomToken(token, this.authHandler);
		}
	}

	logout() {
		if(confirm("Are you sure you want to log out?")) {
			ref.unauth();
			localStorage.removeItem('token');
			this.setState({
				uid : null
			});
		}
	}

	authHandler(err, authData) {
		if(err) {
			confirm("Incorrect email address or password, please try again");
			console.log(err);
			return;
		}

		// save the login token in the browser
		localStorage.setItem('token', authData.token);

		const storeRef = ref.child(this.props.params.storeId);
		storeRef.on('value', (snapshot)=> {
			var data = snapshot.val() || {};
			
			// claim it as our own if there is no owner already
			if(!data.owner) {
				storeRef.set({
					owner : authData.uid
				});
			}

			// update our state to reflect the current store owner and user
			this.setState({
				uid : authData.uid,
				owner : data.owner || authData.uid
			});

		});
	}

	renderLogin() {
		return (
			<nav className="login">
				<h2 className="inventory-title">Inventory</h2>
				<p>Sign in to manage your store's inventory</p>
				<form className="loginForm" ref="loginForm" onSubmit={this.authWithEmailPass.bind(this)}>
					<input type="email" id="emailInput" placeholder="Email" required />
					<input type="password" id="passwordInput" placeholder="Password" required />
					<button type="submit">Login</button>
				</form>
				<h3 className="loginSeperator">OR</h3>
				<button className="facebook" onClick={this.authenticate.bind(this, 'facebook')}><i className="icon-facebook"></i>&nbsp; Login with Facebook</button>
				<button className="refreshButtonLogin" onClick={this.refreshStore}><i className="icon-refresh"></i>&nbsp; Refresh Store</button>
			</nav>
		)
	}

	renderInventory(key) {
		var linkState = this.props.linkState;
		return (
			<div className="game-edit" key={key}>
				<input type="text" valueLink={linkState('games.' + key + '.name')} />
				<input type="text" valueLink={linkState('games.' + key + '.price')} />
				<select valueLink={linkState('games.' + key + '.status')}>
					<option value="available">Available</option>
					<option value="unavailable">Sold Out</option>
				</select>
				<textarea valueLink={linkState('games.' + key + '.desc')}></textarea>
				<input type="text" valueLink={linkState('games.' + key + '.image')} />
				<button onClick={this.props.removeGame.bind(null, key)}>Remove</button>
			</div>
		)
	}

	refreshStore(event) {
		window.location.reload();
	}

	render() {
		let logoutButton = <button className="logoutButton" onClick={this.logout}><i className="icon-logout"></i>&nbsp; Logout</button>

		// first check if they aren't logged in
		if(!this.state.uid) {
			return (
				<div>{this.renderLogin()}</div>
			)
		}

		// then check if they aren't the owner of the current store

		if(this.state.uid !== this.state.owner) {
			return (
				<div className="loginFailed">
					<p>Sorry, you aren't the owner of this store</p>
					{logoutButton}
				</div>
			)
		}

		return (
			<div className="inventory-wrap">
				<h2 className="inventory-title">Inventory</h2>
				{logoutButton}
				{Object.keys(this.props.games).map(this.renderInventory)}
				<AddGameForm {...this.props} />
				<button className="sampleButton" onClick={this.props.loadSamples}>Load Sample Games</button> <button className="refreshButton" onClick={this.refreshStore}><i className="icon-refresh"></i>&nbsp; Refresh Store</button>
			</div>
		)
	}
};

Inventory.propTypes = {
		addGame : React.PropTypes.func.isRequired,
		loadSamples : React.PropTypes.func.isRequired,
		games : React.PropTypes.object.isRequired,
		linkState : React.PropTypes.func.isRequired,
		removeGame : React.PropTypes.func.isRequired,
}

export default Inventory;