const Config = require('../Config');
const jwt = require('jsonwebtoken');

const jwtController = {
	generateAccessToken(id) {
		return jwt.sign({ id: id }, Config.jwtSecret, { expiresIn: '1800s' });
	},

	checkToken(token) {
		try { 
			let decoded = jwt.verify(token, Config.jwtSecret);
			return {id: decoded.id};
		} catch(error) {
			return {error: 'invalid token'};
		}
	}
}

module.exports = jwtController;