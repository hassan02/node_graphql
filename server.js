const express = require('express');
const bodyParser = require('body-parser');
const {
    graphqlExpress
} = require('graphql-server-express');
const graphqlHTTP = require('express-graphql');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_graph_ql');
var db = mongoose.connection;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(db);

require('./models/cars');

const Car = mongoose.model('Car');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql')


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

const rootSchema = new GraphQLSchema({
    query: RootQuery,
});
const PORT = 3000;

const app = express();

app.use('/graphql', function(req, res) {
    return graphqlHTTP({
        schema: rootSchema,
        graphiql: true,
        context: {

        }
    })(req, res)
});

const port = process.env.PORT || 8000



mongoose.Promise = require('bluebird');


db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('db opened');
    app.listen(port, function() {
        console.log(`App is listening on port ${port}`)
    })
});
