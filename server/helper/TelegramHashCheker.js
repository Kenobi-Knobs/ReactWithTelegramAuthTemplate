const Config = require('../Config');
const { createHash, createHmac } = require('crypto');

const token = Config.botToken;

function checkSignature ({ hash, ...data }) {
	const secret = createHash('sha256')
		.update(token)
		.digest()
	const checkString = Object.keys(data)
		.sort()
		.map(k => (`${k}=${data[k]}`))
		.join('\n');
	const hmac = createHmac('sha256', secret)
		.update(checkString)
		.digest('hex');
	return hmac === hash;
}

const TelegramHashCheker = {
	check(payload) {
		return checkSignature(payload);
	}
}

module.exports = TelegramHashCheker;