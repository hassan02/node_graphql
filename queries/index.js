const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql');
const CarType = require('../types/car')
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',

    fields: () => ({
        Car: {
            type: CarType,
            description: 'The car identified by an name',
            args: {
                id: {
                    type: GraphQLID
                },
                name: {
                    type: GraphQLString
                },
                type: {
                    type: GraphQLString
                }
            },
            resolve: (obj, args) => {
                Car.findOne(args, function(err, car) {
                    if (err) return "error"
                    return car
                })

                return new Promise((resolve, reject) => {
                    Car.findOne(args)
                        .then((car) => {
                            resolve(car);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                });
            }
        }
    })
});

module.exports = RootQuery
