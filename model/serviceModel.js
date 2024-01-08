const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    start_time: String,
    end_time: String,
    flag: Number
})

module.exports = mongoose.model('Service', serviceSchema)