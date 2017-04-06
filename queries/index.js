const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql');
const CarType = require('../types/car')
const fetchAllPageContainer = require('./resolvers').fetchAllPageContainer;
const PageContainerType = require('../types/pageContainers')
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
                // Car.findOne(args, function(err, car) {
                //     if (err) return "error"
                //     return car
                // })

                // return new Promise((resolve, reject) => {
                //     Car.findOne(args)
                //         .then((car) => {
                //             resolve(car);
                //         })
                //         .catch((err) => {
                //             reject(err);
                //         });
                // });
            }
        },

        PageContainer: {
            type: PageContainerType,
            description: 'The page container identified by an id or slug',
            args: {
                _id: {
                    type: GraphQLString
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
            },
            resolve: (obj, args) => {
                return fetchAllPageContainer(args).then((collection) => { console.log(collection); return collection }).catch(err => { return str(err) })
            }
        }
    })
});

module.exports = RootQuery