var mongoose = require('mongoose');
const env = process.env.NODE_ENV || "development";
const database = env == "development" ? process.env.DEV_DB : process.env.PROD_DB;
mongoose.connect(database);
var db = mongoose.connection;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

function registerModels() {
    require('../models/cars');
    require('../models/entry');
    require('../models/pageContainer');
    require('../models/eventPartner');
}

module.exports = {
    db,
    registerModels
}