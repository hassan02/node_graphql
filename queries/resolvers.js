const mongoose = require('mongoose');
const { registerModels } = require('../config/mongoose');
registerModels()
const Entry = mongoose.model('Entry');
const Page = mongoose.model('PageContainer');
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
            .populate({
                path: 'entries',
                model: 'Entry',
                populate: { path: 'eventPartners', 'model': 'EventPartner' }
            }).exec(function(err, collection) {
                if (err) {
                    reject(err)
                } else {
                    resolve(collection);
                    // console.log(collection)
                }
            })
    });
}

module.exports = {
    fetchAllPageContainer: fetchAllPageContainer
}