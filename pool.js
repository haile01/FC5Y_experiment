'use strict'

const Pool = require('pg').Pool;
require('dotenv').config({ silent: true });

const { db_username, db_password, db_name, host, port } = process.env;

const dbConfig = {
	connectionString: `postgres://${db_username}:${db_password}@${host}:${port}/${db_name}`
}

const pool = new Pool(dbConfig);

export default pool;
