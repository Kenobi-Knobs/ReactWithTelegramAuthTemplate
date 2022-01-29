function getOptions(params, method) {
	const token = localStorage.getItem('jwtToken');
	let options = {};
	if (method === 'POST'){
		options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json', 
				'Authorization': token
			},
			body: JSON.stringify(params)
		};
	} else {
		options = {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': token
			}
		};
	}
	return options;
}

const Connections  = {
	login: function(user) {
		return fetch('/api/login', getOptions(user, 'POST')).then(res => res.json());
	},

	checkToken: function() {
		return fetch('/api/checkToken', getOptions({}, 'GET')).then(res => res.json());
	}
};

export default Connections;