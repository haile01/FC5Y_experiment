'use strict'

const pool = require('./pool');

const query = (query, params) => {
	return new Promise((resolve, reject) => {
		pool.query(quertText, params)
		.then((res) => {
			resolve(res);
		})
		.catch((err) => {
			reject(err);
		});
	});
}

export default query;
