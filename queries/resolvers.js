const mongoose = require('mongoose');
const { registerModels } = require('../config/mongoose');
registerModels()
const Entry = mongoose.model('Entry');
const Page = mongoose.model('PageContainer');
const EntryHero = mongoose.model('EntryHero');

const EventPartner = mongoose.model('EventPartner')
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql')

// console.log(pageDetails, "page")



function fetchAllPageContainer(args) {
    var args = args || {}
    return new Promise((resolve, reject) => {
        Page.findOne(args)
            .populate([{ path: 'hero', model: 'EventPartner' }, {
                path: 'entries',
                model: 'Entry',
                populate: [{ path: 'eventPartners', 'model': 'EventPartner' }, { path: 'heroes', 'model': 'EntryHero' }],

            }]).exec(function(err, collection) {
                if (err) {
                    reject(err)
                } else {
                    console.log(collection)
                    resolve(collection);
                }
            })
    });
}


function fetchAllEvent(args) {
    var args = args || {}
    return new Promise((resolve, reject) => {
        Entry.findOne(args)
            .populate([{
                path: 'eventPartners',
                model: 'EventPartner'
            }, { path: 'heroes', model: 'EntryHero' }]).exec(function(err, collection) {
                if (err) {
                    reject(err)
                } else {
                    console.log(collection)
                    resolve(collection);
                }
            })
    });
}

function fetchAllHero(args) {
    var args = args || {}
    return new Promise((resolve, reject) => {
        EntryHero.findOne(args)
            .exec(function(err, collection) {
                if (err) {
                    reject(err)
                } else {
                    resolve(collection);
                }
            })
    });
}

function fetchAllEventPartner(args) {
    var args = args || {}
    return new Promise((resolve, reject) => {
        EventPartner.findOne(args)
            .exec(function(err, collection) {
                if (err) {
                    reject(err)
                } else {
                    resolve(collection);
                }
            })
    });
}

module.exports = {
    fetchAllPageContainer: fetchAllPageContainer,
    fetchAllEvent: fetchAllEvent,
    fetchAllHero: fetchAllHero,
    fetchAllEventPartner: fetchAllEventPartner
}