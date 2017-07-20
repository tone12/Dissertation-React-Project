/*
	Game
	<Game />
*/

import React from 'react';
import h from '../helpers';
import autobind from 'autobind-decorator';

@autobind
class Game extends React.Component {
	onButtonClick() {
		var key = this.props.index;
		this.props.addToOrder(key);
	}

	render() {
		var details = this.props.details;
		var isAvailable = (details.status === 'available' ? true : false);
		var buttonText = (isAvailable ? 'Add To Order' : 'Coming Soon');
		return(
			<li className="menu-game">
				<img src={details.image} alt={details.name} />
				<h3 className="game-name">
				{details.name}
					<span className="price">{h.formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button disabled={!isAvailable} onClick={this.onButtonClick}>{buttonText}</button>
			</li>
		)
	}
};

export default Game;