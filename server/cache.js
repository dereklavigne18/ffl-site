const { Promise } = require('bluebird');
const redis = require('redis');

const REDIS_HOST = '127.0.0.1';
const REDIS_PORT = 6379;

const cache = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
Promise.promisifyAll(cache);

module.exports = cache;
