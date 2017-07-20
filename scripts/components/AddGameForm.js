/*
	Add Game Form
	<AddGameForm />
*/

import React from 'react';
import autobind from 'autobind-decorator';

@autobind
class AddGameForm extends React.Component {
	createGame(event) {
		// 1. Stop the form from submitting
		event.preventDefault();
		// 2. Take the data from the form and create an object
		var game = {
			name : this.refs.name.value,
			price : this.refs.price.value,
			status : this.refs.status.value,
			desc : this.refs.desc.value,
			image : this.refs.image.value,
		}

		// 3. Add the game to the App State
		this.props.addGame(game);
		this.refs.gameForm.reset();
	}

	render() {
		return (
			<form className="game-edit" ref="gameForm" onSubmit={this.createGame}>
				<input type="text" ref="name" placeholder="Game Name" required />
				<input type="text" ref="price" placeholder="Game Price" required />
				<select ref="status">
					<option value="available">Available</option>
					<option value="unavailable">Sold Out</option>
				</select>
				<textarea type="text" ref="desc" placeholder="Desc"></textarea>
				<input type="text" ref="image" placeholder="URL to Image" required />
				<button type="submit">+ Add Item </button>
			</form>
		)
	}
};

export default AddGameForm;