import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginView from './components/LoginView/LoginView.js';
import AppView from './components/AppView/AppView.js';
import './App.css';

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Routes>
				<Route path='/' element={<AppView />} />
				<Route path='/login' element={<LoginView />} />
			</Routes>
		);
	}
}

export default App;