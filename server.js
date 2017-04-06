require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const {
    graphqlExpress
} = require('graphql-server-express');
const graphqlHTTP = require('express-graphql');
const RootQuery = require('./queries');

const db = require('./config/mongoose');


const Car = mongoose.model('Car');
const Entry = mongoose.model('Entry');
const Page = mongoose.model('PageContainer');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql')





const rootSchema = new GraphQLSchema({
    query: RootQuery,
});
const app = express();

app.use('/graphql', function(req, res) {
    return graphqlHTTP({
        schema: rootSchema,
        graphiql: true,
        context: {}
    })(req, res)
});

// function createNewCar() {
//     car = new Car({
//         'name': 'TY',
//     })
//     car.save(function(err, res) {
//         if (err) {
//             console.log("Errrot")
//         }
//         if (res) {
//             console.log(res)
//         }
//     })
// }
// function createNewEntry() {
//     entry = new Entry({
//         'address': 'Amity',
//         'slug': 'AM'
//     })
//     entry.save(function(err, res) {
//         if (err) {
//             console.log(err)
//         }
//         if (res) {
//             console.log(res)
//         }
//     })
// }

// function createPageContainer() {
// page = new Page({
//     'description': 'New Page 3',
//     'slug': 'np4'
// })
// page.save(function(err, res) {
//     if (res) {
//         var entry = Entry({
//             'address': 'HM3',
//             'page': page._id
//         })
//         entry.save(function(err, res) {
//             if (res) {
//                 console.log(res)
//                 page.entries.push(res);
//                 page.entries.push(res);
//                 page.save(function(err, res) {
//                     console.log(res);
//                 });
//             } else {
//                 console.log(err);
//             }
//         })
//     } else {
//         console.log(err);
//     }
// })
// }

function fetchAllPageContainer() {
    return new Promise((resolve, reject) => {
        Page.find({})
            .then((pages) => {
                console.log(pages)
                resolve(pages);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
const port = process.env.PORT || 8000

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('db opened');
    app.listen(port, function() {
        // createNewCar()
        // createPageContainer()
        value = fetchAllPageContainer();
        console.log(value);
        console.log(`App is listening on port ${port}`)
    })
});
