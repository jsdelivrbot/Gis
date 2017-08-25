const request = require("request");

const port = 8493;

const postRequest = (url, body) => {
	request({
		url,
		baseUrl: `http://localhost:${port}`,
		method: "POST",
		json: true,
		body
	});
}

const getRequest = (url, qs) => {
	request({
		url,
		baseUrl: `http://localhost:${port}`,
		method: "GET",
		qs
	});
}

module.exports = {
	postRequest,
	getRequest
}