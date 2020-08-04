const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Name = new Schema({
    Name: {
        type: String
    },
    Length: {
        type: Int32
    },
    Age: {
        type: Int32
    },
});
module.exports = mongoose.model('Name', Name);