const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name: String,
    start_time: Array,
    end_time: Array,
    flag: Number
})

module.exports = mongoose.model('Service', serviceSchema)