const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dumbbot'), { useMongoClient: true };
mongoose.Promise = global.Promise;

module.exports = mongoose;
