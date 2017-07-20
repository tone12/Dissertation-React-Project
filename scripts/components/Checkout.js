/*
	Checkout
	<Checkout/>
*/

import React from 'react';
import App from './App';
import {History} from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import h from '../helpers';
import reactMixin from 'react-mixin';
import autobind from 'autobind-decorator';

@autobind
class Checkout extends React.Component {
	goBack(event) {
		this.history.goBack();
	}

	componentDidMount() {
		var localStorageRef = localStorage.getItem('order-' + this.props.params.storeId);

		if(localStorageRef) {
			// update our component state to reflect what is in localStorage
			this.setState({
				order : JSON.parse(localStorageRef)
			});
		}
	}

	purchaseOrder(details) {
		details.preventDefault();

		var cardType = document.getElementById('cardType').value;
		var cardName = document.getElementById('cardName').value;
		var cardNumber = document.getElementById('cardNumber').value;
		var expiryMonth = document.getElementById('expiryMonth').value;
		var expiryYear = document.getElementById('expiryYear').value;
		var securityNumber = document.getElementById('securityNumber').value;
		
		var details = {
			cardType : cardType,
			cardName : cardName,
			cardNumber : cardNumber,
			expiryMonth : expiryMonth,
			expiryYear : expiryYear,
			securityNumber : securityNumber
		}
	}

	render(){
		return (
			<div className="checkout-wrap">
				<h2 className="checkout-title">Checkout</h2>
				<div className="order-display">
					<h4>Under Construction</h4>
					{/*first thing - you may likely want to have /checkout/ live at /store/store-id/checkout/. with that, we know we're referencing a specific store's order data.
					To render the order, you need both the games and order states. it sounds like the new /checkout route would render a different component than the existing App component. 
					Let's call it Checkout. so maybe you can create that class and then grab the data from Firebase and localStorage to update Checkout's state, similar to how App did it with componentDidMount.
					Depending on the functionality of your Checkout, you may also need componentWillUpdate (e.g. changing quantities, removing items, etc). then i imagine you could re-use the <Order /> class inside of your new Checkout component*/}
					<form className="purchaseForm" ref="purchaseForm" onSubmit={this.purchaseOrder.bind(this)}>
						<div>Card Type:<select name="cardType" id="cardType">
							<option value="visa">Visa</option>
							<option value="mastercard">Mastercard</option>
							<option value="maestro">Maestro</option>
							<option value="americanexpress">American Express</option>
						</select></div>
						<div>Cardholder Name:<input type="text" id="cardName" required /></div>
						<div>Card Number:<input type="text" id="cardNumber" required /></div>
						<div>Expiry Date:<br /><select name="expiryMonth" id="expiryMonth">
							<option value="01">Jan</option>
							<option value="02">Feb</option>
							<option value="03">Mar</option>
							<option value="04">Apr</option>
							<option value="05">May</option>
							<option value="06">Jun</option>
							<option value="07">Jul</option>
							<option value="08">Aug</option>
							<option value="09">Sep</option>
							<option value="10">Oct</option>
							<option value="11">Nov</option>
							<option value="12">Dec</option>
						</select>
						<select name="expiryYear" id="expiryYear">
							<option value="16">2016</option>
							<option value="17">2017</option>
							<option value="18">2018</option>
							<option value="19">2019</option>
							<option value="20">2020</option>
							<option value="21">2021</option>
							<option value="22">2022</option>
							<option value="23">2023</option>
							<option value="24">2024</option>
							<option value="25">2025</option>
						</select><br />
						</div>
						<div>Security Number:<input type="text" id="securityNumber" required /></div>
						<button type="submit" className="purchaseButton"><i className="icon-purchase"></i>&nbsp; Purchase</button>
					</form>
				</div>
				<button className="backButton" onClick={this.goBack}><i className="icon-back"></i>&nbsp;Return to Store</button>
			</div>
		)
	}
}

reactMixin.onClass(Checkout, History);

export default Checkout;