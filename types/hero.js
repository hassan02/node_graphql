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
            companyName: {
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            companyLogo: {
                type: GraphQLString
            }
        }
    }

})


module.exports = HeroType