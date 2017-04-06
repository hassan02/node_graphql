const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLFloat
} = require('graphql');

const locationType = new GraphQLObjectType({
    name: 'Location',

    fields: () => {
        return {
            log: {
                type: GraphQLFloat
            },
            lat: {
                type: GraphQLFloat
            }
        }
    }

})


module.exports = locationType