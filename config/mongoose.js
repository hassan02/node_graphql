var mongoose = require('mongoose');
const env = process.env.NODE_ENV || "development";
const database = process.env.TEST_DB
mongoose.connect(database);
var db = mongoose.connection;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

function registerModels() {
    require('../models/entry');
    require('../models/pageContainer');
    require('../models/eventPartner');
    require('../models/entryHero');
    require('../models/pageHero');

}

module.exports = {
    db,
    registerModels
}