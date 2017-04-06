const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLFloat
} = require('graphql');

const EventType = require('./event')
const HeroType = require('./hero')

const PageContainerType = new GraphQLObjectType({
    name: 'PageContainer',

    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            entries: {
                type: new GraphQLList(EventType)
            },
            hero: {
                type: HeroType
            },
            slug: {
                type: GraphQLString
            },
            title: {
                type: GraphQLString
            },
            content_id: {
                type: GraphQLString
            }
        }
    }
})

module.exports = PageContainerType