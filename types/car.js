const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql');

const CarType = new GraphQLObjectType({
    name: 'Car',

    fields: () => {
        return {
            id: {
                type: GraphQLID
            },
            name: {
                type: GraphQLString
            },
            model: {
                type: GraphQLString
            },
            type: {
                type: GraphQLString
            },
        }
    }
})

module.exports = CarType
