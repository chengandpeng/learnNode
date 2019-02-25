const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

const redisUrl = 'redis://127.0.0.1:6379';
const client = redis.createClient(redisUrl);
client.get = util.promisify(client.get);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.exec = async function () {
    console.log('IM ABOUT TO RUN A QUERY');
    
    const key = JSON.stringify(
        Object.assign({}, this.getQuery(), {
            collection: this.mongooseCollection.name
        })
    );

    const cacheValue = await client.get(key);

    // 'key' in redis
    if (cacheValue) {
        console.log(this.getQuery());
        console.log(cacheValue);
        return mongoose.set(this.getQuery(), JSON.parse(cacheValue));
        // return new mongoose.SchemaType()
        // return Promise.resolve(JSON.parse(cacheValue));
    }

    // 'key' not in redis
    const result = await exec.apply(this, arguments);
    client.set(key, JSON.stringify(result));
    
    return result;
}