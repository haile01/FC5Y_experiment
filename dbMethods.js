'use strict'

const query = import('./dbQuery');

export const saveRequest = async (data) => {
	result = await query(`INSERT INTO Requests (path, search, hash, response) VALUES (${data.path}, ${data.search}, ${data.hash}, ${data.response})`);
	return result;
}
