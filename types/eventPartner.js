const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLString,
    GraphQLSchema,
    GraphQLFloat
} = require('graphql');

const EventPartnerType = new GraphQLObjectType({
    name: 'EventPartner',

    fields: () => {
        return {
            companyLogo: {
                type: GraphQLString
            },
            companyName: {
                type: GraphQLString
            },
            url: {
                type: GraphQLString
            },
            partner_id: {
                type: GraphQLString
            },
            event: {
                type: GraphQLString
            }
        }
    }

})


module.exports = EventPartnerType