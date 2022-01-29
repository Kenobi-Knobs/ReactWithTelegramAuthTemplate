## Template React app with Telegram Login Widget and mongoDB

## Get started

1. Install server modules, run `npm install` in root dir.
2. install client modules, run `npm install` in client dir.
4. set ngrok tunel, downoload ngrok utility and run `ngrok http 80` in dir with ngrok execution file.
5. set server side config, create new file `server/Config.js` and fill this template:
	```javascript

	const crypto = require('crypto');

	const Config = {
		//bot settings
		botToken: 'YOUR_BOT_TOKEN',
		botNickname: 'YOUR_BOT_NICKNAME',
		//db data
		DBConnectUri: 'mongodb+srv://DB_USER:DB_PASSWORD@cluster0.nkyso.mongodb.net/DB_NAME?retryWrites=true&w=majority',
		DBName: 'DB_NAME',
		//jwt
		jwtSecret: crypto.randomBytes(64).toString('hex'),
	}

	module.exports = Config;
	```
6. set client side config, create new file `client/src/helpers/Config.js` and fill this template:
	```javascript
	const Config  = {
		//bot data
		botName: 'YOUR_BOT_NICKNAME',
	};

	export default Config;
	```
7. if all correct for build and run server use `npm run dev` in root dir.