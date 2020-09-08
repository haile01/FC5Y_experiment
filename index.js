'use strict'

require('./pool');
const { saveRequest } = require('./dbMethods');
const qs = require('querystring');
const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
require('dotenv').config({ silent: true })

let data = []
fs.createReadStream('Backend Entry Task Data.csv')
	.pipe(csv())
	.on('data', (res) => data.push(res))
	.on('end', () => setup());

const setup = () => {
	const app = express();
	const port = process.env.PORT | 3000;
	
	app.use((req, res, next) => {
		res.saveData = {
			path: req.originalUrl.split('?')[0],
			search: qs.stringify(req.query),
			hash: '#',
		};
		next();
	})

	const match = (query, search) => {
		if (search === '*')
			return 1;
		console.log('Compare', qs.stringify(query), search);
		return qs.stringify(query) === search;
	}

	data.forEach(r => {
		app.get(r.pathname, (req, res) => {
			console.log('Got to pathname', r.pathname);
			let response = `Can't found any in csv`;
			if (match(req.query, r.search))
				response = r.response;
			res.send(response);
			// console.log('Save', Object.assign({}, res.saveData, {response: response}));
			saveRequest(Object.assign({}, res.saveData, { response: response }));
		});
	})
	
	app.get('/', (req, res) => {
		res.send(`Can't found any in csv`);
	})
	
	app.listen(port, () => {
		console.log(`Server is running at localhost:${port}`);
	});
}
