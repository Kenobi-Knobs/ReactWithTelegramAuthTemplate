import React from 'react';
import { Navigate } from 'react-router-dom';
import './AppView.css';
import Connections from '../../helpers/Connections';
import Header from '../Header/Header';

class AppView extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
		this.state = {
			isLoad: true,
			auth: false,
			user: null,
		}
	}
	
	componentDidMount(){
		this.checkAuth();
	}

	checkAuth() {
		Connections.checkToken().then(
			(result) => {
				if (result.status === 'ok') {
					this.setState({
						isLoad: false,
						auth: true,
						user: result.user,
					});
				} else {
					this.setState({
						isLoad: false,
						auth: false,
						user: null,
					});
				}
			}
		)
	}

	logout() {
		localStorage.removeItem('jwtToken');
		this.setState({
			isLoad: false,
			auth: false,
			user: null,
		});
	}

	render() {
		if (this.state.isLoad) {
			return(null)
		}
		if (!this.state.auth) {
			return (
				<Navigate to='/login' />
			);
		} else {
			return (
				<Header logout={this.logout} user={this.state.user}></Header>
			);
		}
	}
}

export default AppView;