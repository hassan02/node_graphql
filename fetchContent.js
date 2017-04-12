// const contentful = require('contentful');
// const mongoose = require('mongoose')
//     // const Entry = mongoose.model('Entry');
// const Car = mongoose.model('Car');
// const client = contentful.createClient({
//     // This is the space ID. A space is like a project folder in Contentful terms
//     space: 'zlo317dizoff',
//     // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//     accessToken: 'd930e34756515714c9eff3da55720f7529449533bd9079a0a810397b4f79b72b'
// })
//
// function syncContect() {
//     client.getEntries({
//         'content_type': 'pageContainer'
//     }).then((entries) => (saveEntries(entries))).catch((err) => (console.log(err)));
// }
//
// function saveEntries(entries) {
//     const page = entries.items[0]
//     pageContainer = new pageContainer(page.fields);
//
// }
//
//
// function createNewENtry() {
//     entry = new Entry({
//         'address': 'Amity',
//         'slug': 'AM'
//     })
//     entry.save(function(err, res) {
//         if (err) {
//             console.log("Errrot")
//         }
//         if (res) {
//             console.log(res)
//         }
//     })
// }
//
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
//
// module.exports = createNewCar

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