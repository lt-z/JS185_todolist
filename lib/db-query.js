const config = require('./config');
const { Client } = require('pg');

const isProduction = config.NODE_ENV === 'production';
const CONNECTION = {
  user: config.USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: 'localhost',
  port: config.DB_PORT,
  // ssl: isProduction, // See note below
  ssl: { rejectUnauthorized: false },
};

const logQuery = (statement, parameters) => {
  let timeStamp = new Date();
  let formattedTimeStamp = timeStamp.toString().substring(4, 24);
  console.log(formattedTimeStamp, statement, parameters);
};

module.exports = {
  async dbQuery(statement, ...parameters) {
    let client = new Client(CONNECTION);

    await client.connect();
    logQuery(statement, parameters);
    let result = await client.query(statement, parameters);
    await client.end();

    return result;
  },
};
