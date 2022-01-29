import React from 'react';
import './Header.css';

class Header extends React.Component {
	constructor(props) {
		super(props);

	}

	render() {
		return (
			<div className='header'>
				<div className='header-logo'>Logo.</div>
				<div className='userName'>User: {this.props.user.fullname}</div>
				<button onClick={() => this.props.logout()}>Logout</button>
			</div>
		);
	}
}

export default Header;