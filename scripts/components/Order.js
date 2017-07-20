/*
	Order
	<Order />
*/

import React from 'react';
import h from '../helpers';
import {History} from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import autobind from 'autobind-decorator';
import reactMixin from 'react-mixin';

@autobind
class Order extends React.Component {
	goToCheckout(event) {
		event.preventDefault();
		var timestamp = (new Date()).getTime();
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key)=> {
			var game = this.props.games[key];
			var count = this.props.order[key];
			var isAvailable = game && game.status === 'available';

			if(game && isAvailable) {
				return prevTotal + (count * parseInt(game.price) || 0);
			}

			return prevTotal;
		}, 0);
		this.history.pushState(null, '/checkout/' + timestamp + total);
		// Transition from <App/> to <Checkout/>
	}

	renderOrder(key) {
		var game = this.props.games[key];
		var count = this.props.order[key];
		var removeButton = <button className="removeButton" onClick={this.props.removeFromOrder.bind(null, key)}>&times;</button>

		if(!game) {
			return <li key={key}>Sorry, this game is no longer available! {removeButton}</li>
		}
		if(game.status === 'unavailable'){
			return <li key={key}>Sorry, this game is currently unavailable! {removeButton}</li>
		}

		return (
			<li key={key}>
				<span>
					<CSSTransitionGroup component="span" transitionName="count" transitionEnterTimeout={150} transitionLeaveTimeout={150}>
					<span key={count}>{count}</span>
					</CSSTransitionGroup>
					x&nbsp;{game.name}&nbsp;&nbsp;{removeButton}
				</span>
				<span className="price">{h.formatPrice(count * game.price)}</span>
			</li>)
	}
	
	render() {
		var orderIds = Object.keys(this.props.order);
		var total = orderIds.reduce((prevTotal, key)=> {
			var game = this.props.games[key];
			var count = this.props.order[key];
			var isAvailable = game && game.status === 'available';

			if(game && isAvailable) {
				return prevTotal + (count * parseInt(game.price) || 0);
			}

			return prevTotal;
		}, 0);

		return (
			<div className="order-wrap">
				<h2 className="order-title">Your Order</h2>
				<div className="order-main">
					<CSSTransitionGroup className="order" component="ul" transitionName="order" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
						{orderIds.map(this.renderOrder)}
						<li className="total">
							<strong>Total:</strong>
							{h.formatPrice(total)}
						</li>
					</CSSTransitionGroup>
					<button className="checkoutButton" onClick={this.goToCheckout}><i className="icon-checkout"></i>&nbsp; Checkout</button>
				</div>
				<div className="socialMedia">
					<ul className="social">
						<li><a href="http://www.facebook.com/Spearheadgaming" alt="Join us on Facebook!"><i className="icon-facebook"></i></a></li>
						<li><a href="http://www.instagram.com/Spearheadgaming" alt="Follow us on Instagram!"><i className="icon-instagram"></i></a></li>
						<li><a href="http://www.twitter.com/Spearheadgaming" alt="Follow us on Twitter!"><i className="icon-twitter"></i></a></li>
						<li><a href="mailto:contact@spearheadgaming.com" alt="Get in touch with us!"><i className="icon-email"></i></a></li>
					</ul>
				</div>
			</div>
		)
	}
};

Order.propTypes = {
		games : React.PropTypes.object.isRequired,
		order : React.PropTypes.object.isRequired,
		removeFromOrder : React.PropTypes.func.isRequired,
}

reactMixin.onClass(Order, History);

export default Order;