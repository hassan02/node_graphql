require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const {
    graphqlExpress
} = require('graphql-server-express');
const graphqlHTTP = require('express-graphql');
const RootQuery = require('./queries');

const { db } = require('./config/mongoose');
const fetchAllPageContainer = require('./queries/resolvers').fetchAllPageContainer

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql')


const Entry = mongoose.model('Entry');
const Page = mongoose.model('PageContainer');
const EventPartner = mongoose.model('EventPartner')

const rootSchema = new GraphQLSchema({
    query: RootQuery,
});


const app = express();
app.get('/pages', function(req, res) {
    fetchAllPageContainer().then((collection) => { return res.status(200).json(collection) }).catch(err => { return str(err) })
})


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
function createPageContainer() {
    const pageDetails = require('./data')
    new_page = new Page({
        "description": pageDetails.description,
        "slug": pageDetails.slug,
        "title": pageDetails.title,
        "content_id": pageDetails.content_id,
        "hero": pageDetails.hero
    })
    new_page.save(function(err, page) {
        if (err) {
            throw err
        } else {
            entries = pageDetails.entries
            for (var i = 0; i < entries.length; i++) {
                entry = entries[i]
                new_entry = new Entry({
                    "address": entry.address,
                    "descriptionLong": entry.descriptionLong,
                    "descriptionShort": entry.descriptionShort,
                    "endTime": entry.endTime,
                    "externalUrl": entry.externalUrl,
                    "hero": entry.hero,
                    "location": entry.location,
                    "slug": entry.slug,
                    "speakers": entry.speakers,
                    "startTime": entry.startTime,
                    "tags": entry.tags,
                    "title": entry.title,
                    "type": entry.type,
                    "page": page._id
                })
                eventPartners = entry.eventPartners
                new_entry.save(function(err, entry_new) {
                    if (err) { throw err } else {
                        page.entries.push(entry_new)
                        page.save(function(err, res) {
                            if (err) throw err
                        })
                        for (var i = 0; i < eventPartners.length; i++) {
                            eventPartner = eventPartners[i]
                            new_event_partner = new EventPartner({
                                "companyLogo": eventPartner.companyLogo,
                                "companyName": eventPartner.companyName,
                                "url": eventPartner.url,
                                "event": entry_new._id
                            })
                            new_event_partner.save(function(err, entry_partner_new) {
                                if (err) {
                                    throw err
                                } else {
                                    entry_new.eventPartners.push(entry_partner_new)
                                    entry_new.save(function(err, res) {
                                        if (err) throw err
                                    })
                                }
                            })
                        }
                    }

                })
            }
            console.log("Successful")
        }
    })

}
const port = process.env.PORT || 5000

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('db opened');
    app.listen(port, function() {
        // createNewCar()
        // createPageContainer()
        // value = fetchAllPageContainer();
        // console.log(value);
        console.log(`App is listening on port ${port}`)
    })
});