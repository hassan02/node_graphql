const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql');
const CarType = require('../types/car')
const fetchAllPageContainer = require('./resolvers').fetchAllPageContainer;
const fetchAllEvent = require('./resolvers').fetchAllEvent;
const fetchAllHero = require('./resolvers').fetchAllHero;
const fetchAllEventPartner = require('./resolvers').fetchAllEventPartner;


const PageContainerType = require('../types/pageContainers');
const EventType = require('../types/event');
const HeroType = require('../types/hero');

const EventPartnerType = require('../types/eventPartner');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',

    fields: () => ({
        Event: {
            type: EventType,
            description: 'The event id or slug',
            args: {
                _id: {
                    type: GraphQLString
                },
                entry_id: {
                    type: GraphQLString
                },
                title: {
                    type: GraphQLString
                },

            },
            resolve: (obj, args) => {
                return fetchAllEvent(args).then((collection) => { return collection }).catch(err => { return str(err) })
            }
        },
        PageContainer: {
            type: PageContainerType,
            description: 'The page container identified by an id or slug',
            args: {
                _id: {
                    type: GraphQLString
                },
                page_id: {
                    type: GraphQLString
                },
                slug: {
                    type: GraphQLString
                },
                title: {
                    type: GraphQLString
                }
            },
            resolve: (obj, args) => {
                return fetchAllPageContainer(args).then((collection) => { return collection }).catch(err => { return str(err) })
            }
        },
        Hero: {
            type: HeroType,
            description: 'The hero identified by an id or blurb',
            args: {
                _id: {
                    type: GraphQLString
                },
                hero_id: {
                    type: GraphQLString
                }
            },
            resolve: (obj, args) => {
                return fetchAllHero(args).then((collection) => { console.log(collection); return collection }).catch(err => { return str(err) })
            }
        },
        EventPartner: {
            type: EventPartnerType,
            description: 'The event partner idnetified by an id',
            args: {
                _id: {
                    type: GraphQLString
                },
                partner_id: {
                    type: GraphQLString
                }
            },
            resolve: (obj, args) => {
                return fetchAllEventPartner(args).then((collection) => { return collection }).catch(err => { return str(err) })
            }
        }
    })
});

module.exports = RootQuery