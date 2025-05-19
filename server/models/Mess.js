const mongoose = require('mongoose');

const messSchema = new mongoose.Schema({
    mess: {type: String, required: true, unique: true},
    emails: [String],
    limit: {type: Number, default: 3}
})

module.exports = mongoose.model('Mess', messSchema)