const User = require('../models/User');

const UserController = {
	getUserById(id) {
		return User.findOne({telegramId: id});
	},

	createNewUser(loginData) {
		let fullName = loginData.first_name;
		if (loginData.hasOwnProperty('last_name')) {
			fullName += ' ' + loginData.last_name;
		}

		let user = new User({
			telegramId: loginData.id.toString(),
			fullname: fullName,
			username: loginData.username,
			photoUrl: loginData.photo_url
		});

		return user.save();
	}
}

module.exports = UserController;