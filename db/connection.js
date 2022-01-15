const mongoose = require('mongoose')

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB,
    MONGO_HOSTNAME
} = process.env

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`

const MONGO_OPTIONS = {
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
};

module.exports = () => {
    return mongoose.connect(url,MONGO_OPTIONS)
}