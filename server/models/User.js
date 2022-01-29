const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	telegramId: {
		type: String,
		required: true,
		unique: true
	},
	fullname: {
		type: String,
		required: true
	},
	username: {
		type: String,
		default: null
	},
	photoUrl: {
		type: String,
		default: null
	}
},{ versionKey: false });

module.exports = mongoose.model('User', UserSchema);