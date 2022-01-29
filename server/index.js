const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;
const app = express();
const mongoose = require('mongoose');
const Config = require('./Config');
const userController = require('./helper/userController');
const authChecker = require('./helper/TelegramHashCheker');
const jwtController = require('./helper/jwtController');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../client/build')));

mongoose.connect(Config.DBConnectUri);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/api/checkToken', (req, res) => {
	const token = req.headers.authorization;
	if (token == null) return res.json({status: 'error', message: 'token unfound' });
	let result = jwtController.checkToken(token)
	if (!result.hasOwnProperty('error')) {
		userController.getUserById(result.id)
			.then(function(user) {
				if (user !== null) {
					res.json({status: 'ok', message: 'ok', user: user });
				} else {
					res.json({status: 'error', message: 'user nof found :(' });
				}
			});	
	} else {
		res.json({status: 'error', message: 'invalid token' });
	}
});

app.get('/api/status', (req, res) => {
	res.json({status: 'ok', message: 'ok' });
});

app.post('/api/login', (req, res) => {
	if (authChecker.check(req.body)) {
		let token = jwtController.generateAccessToken(req.body.id)
		userController.getUserById(req.body.id)
			.then(function(result){
				if (result === null) {
					console.log('[event] New User ' + req.body.first_name + ' ('+ req.body.id +')');
					userController.createNewUser(req.body)
						.then(function(){
							res.status(200).send({status: 'ok', message: 'login success', token: token, newUser: true})
						});
				} else {
					res.status(200).send({status: 'ok', message: 'login success', token: token});
				}
			});
	} else {
		res.status(401).send({status: 'error', message: 'invalid hash'});
	}
});

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});