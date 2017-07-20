/*
	StorePicker
	<StorePicker/>
*/

import React from 'react';
import Header from './Header';
import {History} from 'react-router';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';
import Firebase from 'firebase';
const ref = new Firebase('https://reactapp-jb138737.firebaseio.com/');

@autobind
class StorePicker extends React.Component {
	goToStore(event) {
		event.preventDefault();
		// Get the data from the input
		var storeId = this.refs.storeId.value;
		this.history.pushState(null, '/store/' + storeId);
		// Transition from <StorePicker/> to <App/>
	}

	createUser(details) {
		details.preventDefault();

		var email = document.getElementById('emailInput').value;
		var password = document.getElementById('passwordInput').value;
		
		var details = {
			email : email,
			password : password
		}

		confirm("Your account has been created successfully");
		document.getElementById('emailInput').value = "";
		document.getElementById('passwordInput').value = "";
		ref.createUser(details, this.authHandler);
	}

	authHandler(err, authData) {
		if(err) {
			confirm("The email address you have entered is invalid");
			console.log(err);
			return;
		}
	}

	renderRegisterForm() {
		return (
			<nav className="register">
				<h2>Register an Account</h2>
				<form className="registerForm" ref="registerForm" onSubmit={this.createUser.bind(this)}>
					<input type="email" id="emailInput" placeholder="Email" required />
					<input type="password" id="passwordInput" placeholder="Password" required />
					<button type="submit">Register</button>
				</form>
			</nav>
		)
	}

	render(){
		return (
			<div className="store-selector">
				<Header tagline="THE BEST GAMES EVER!" />
				<form onSubmit={this.goToStore}>
					<h2>Please Enter A Store Name</h2>
					<input type="text" ref="storeId" defaultValue={h.getRandomName()} required />
					<input type="Submit" className="storeSubmit" value="Submit" onChange={function() {/* Just here to surpress console warning! */}} />
					<p className="information">If the Store already exists, you will be able to login to manage the Stores' Inventory. If you are setting up a new Store, you will take ownership of it upon logging in.</p>
				</form>
				{this.renderRegisterForm()}
				<div className="socialMedia">
					<ul className="social">
						<li><a href="http://www.facebook.com/Spearheadgaming" alt="Join us on Facebook!"><i className="icon-facebook"></i></a></li>
						<li><a href="http://www.instagram.com/Spearheadgaming" alt="Follow us on Instagram!"><i className="icon-instagram"></i></a></li>
						<li><a href="http://www.twitter.com/Spearheadgaming" alt="Follow us on Twitter!"><i className="icon-twitter"></i></a></li>
						<li><a href="mailto:contact@speadheadgaming.com" alt="Get in touch with us!"><i className="icon-email"></i></a></li>
					</ul>
				</div>
			</div>
		)
	}
}

reactMixin.onClass(StorePicker, History);

export default StorePicker;