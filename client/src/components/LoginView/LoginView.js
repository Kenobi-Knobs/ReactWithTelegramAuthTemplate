import React from 'react';
import TelegramLoginButton from 'react-telegram-login';
import { Navigate } from 'react-router-dom';
import Config from '../../helpers/Config';
import Connections from '../../helpers/Connections';
import './LoginView.css';

class LoginView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loginError: '',
			loginComplete: false,
			isLoad: true
		};
	}

	componentDidMount(){
		this.checkAuth();
	}

	checkAuth() {
		Connections.checkToken().then(
			(result) => {
				if (result.status === 'ok') {
					this.setState({
						loginError: '',
						loginComplete: true,
						isLoad: false
					});
				} else {
					this.setState({
						loginError: '',
						loginComplete: false,
						isLoad: false
					});
				}
			}
		)
	}

	handleTelegramResponse = response => {
		Connections.login(response).then(
			(result) => {
				if (result.status === 'ok'){
					localStorage.setItem('jwtToken', result.token);
					this.setState({
						loginError: '',
						loginComplete: true,
						isLoad: false
					});
				} else {
					this.setState({
						loginError: result.message,
						loginComplete: false,
						isLoad: false
					});
				}
			}
		);
	};

	render() {
		if (this.state.isLoad){
			return (null);
		}
		if (!this.state.loginComplete) {
			return (
				<div className='page'>
					<div className='container'>
						<h1 className='logo'>Logo<span id='dot'>.</span></h1>
						{this.state.loginError !== '' &&
							<span className='error'>⚠️ {this.state.loginError}</span>
						}
						<TelegramLoginButton dataOnauth={this.handleTelegramResponse} botName={Config.botName} />
					</div>
				</div>
				);
		} else {
			return (
				<Navigate to='/' />
			);
		}
	}
}

export default LoginView;