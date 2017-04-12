const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLFloat
} = require('graphql');

const HeroType = new GraphQLObjectType({
    name: 'Hero',

    fields: () => {
        return {
            backgroundImage: {
                type: GraphQLString
            },
            blurb: {
                type: GraphQLString
            },
            headline: {
                type: GraphQLString
            },
            textAlignment: {
                type: GraphQLString
            },
            hero_id: {
                type: GraphQLString
            }
        }
    }

})


module.exports = HeroType