const { psql } = require('./connect');
const models = require('./models');

const db = { models, psql };

module.exports = db;
