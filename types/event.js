const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLFloat
} = require('graphql');
const EventPartnerType = require('./eventPartner')
const HeroType = require('./hero')

const locationType = require('./location')


const EventType = new GraphQLObjectType({
    name: 'Event',

    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            address: {
                type: GraphQLString
            },
            descriptionLong: {
                type: GraphQLString
            },
            descriptionShort: {
                type: GraphQLString
            },
            endTime: {
                type: GraphQLString
            },
            eventPartners: {
                type: new GraphQLList(EventPartnerType)
            },
            externalUrl: {
                type: GraphQLString
            },
            heroes: {
                type: new GraphQLList(HeroType)
            },
            location: {
                type: locationType
            },
            title: {
                type: GraphQLString
            }
        }
    }
})

module.exports = EventType