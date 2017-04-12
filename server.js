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
const contentful = require('contentful')
const waterfall = require('async-waterfall');
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema
} = require('graphql')


const Entry = mongoose.model('Entry');
const Page = mongoose.model('PageContainer');
const EventPartner = mongoose.model('EventPartner')
const EntryHero = mongoose.model('EntryHero')
const PageHero = mongoose.model('PageHero')

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

app.get('/sync-content', function(req, res) {
    synContent()
    return res.send("Done").status(200)
})

// Sync content from contentful
function synContent() {
    console.log("syncing content")
    const client = contentful.createClient({
        // This is the space ID. A space is like a project folder in Contentful terms
        space: process.env.SPACE_ID,
        // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
        accessToken: process.env.ACCESS_TOKEN
    })
    client.getEntries().then((entries) => (createContent(entries))).catch((err) => (console.log(err)));
}

function createContent(entries) {
    let all_entries = { 'entries': [], 'heroes': [], 'eventpartners': [], 'pagecontainers': [] }
    entries.items.forEach(function(entry) {
            if (entry.sys.contentType.sys.id == 'pageContainer') {
                all_entries.pagecontainers.push(formatPageContainer(entry))
            } else if (entry.sys.contentType.sys.id == 'hero') {
                all_entries.heroes.push(formatHero(entry))
            } else if (entry.sys.contentType.sys.id == 'eventPartner') {
                all_entries.eventpartners.push(formatEventPartner(entry))
            } else if (entry.sys.contentType.sys.id == 'event') {
                all_entries.entries.push(formatEntry(entry))
            }
        })
        // console.log("logging all entiries")
    all_entries = require('./tests/data.js');
    // createEntry(all_entries.entries)
    waterfall([
            function(callback) {
                callback(null, all_entries.heroes);
            },
            function createEntryHeroes(heroes, callback) {
                console.log("Saving heroes")
                EntryHero.create(heroes, function(err) {
                        if (err) {
                            callback(err)
                        } else {
                            callback(null, arguments[1], all_entries.eventpartners)
                        }
                    })
                    // callback(null, all_entries.eventpartners);
            },
            function createEventPartners(heroes, eventPartners, callback) {
                console.log("Saving eventPartners")
                    // console.log(eventPartners)
                EventPartner.create(eventPartners, function(err) {
                        if (err) {
                            callback(err)
                        } else {
                            console.log(arguments)
                            callback(null, heroes, arguments[1], all_entries.entries)
                        }
                    })
                    // callback(null, eventPartners, all_entries.entries);
            },
            function createEntries(heroes, eventPartners, entries, callback) {
                entriesList = []
                for (let i = 0; i < entries.length; i++) {
                    let entry = entries[i]
                    new_entry = new Entry(entry)
                    new_entry.save(function(err) {
                        if (err) {
                            callback(err)
                        } else {
                            eventPartners.forEach(function(partner) {
                                if (entry.eventPartnersIds.indexOf(partner.partner_id) != -1) {
                                    new_entry.eventPartners.push(partner)
                                    new_entry.save(function(err) {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                }
                            })

                            heroes.forEach(function(hero) {
                                if (entry.heroIds.indexOf(hero.hero_id) != -1) {
                                    new_entry.heroes.push(hero)
                                    new_entry.save(function(err) {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                }
                            })

                        }
                    })
                    entriesList.push(new_entry)
                }
                // console.log(eventPartnersList)
                callback(null, eventPartners, entriesList, all_entries.pagecontainers)
            },
            function createPageContainers(eventPartners, entries, pagecontainers, callback) {
                console.log("entries", entries)
                let pageContainerList = []
                for (let i = 0; i < pagecontainers.length; i++) {
                    let page = pagecontainers[i]
                    console.log("page", page)
                    new_page = new Page(page)
                    eventPartners.forEach(function(partner) {
                        if (page.heroId == partner.partner_id) {
                            new_page.hero = partner

                        }
                    })
                    new_page.save(function(err) {
                        if (err) {
                            callback(err)
                        } else {
                            entries.forEach(function(entry) {
                                if (page.entriesIds.indexOf(entry.entry_id) != -1 && new_page.entries.indexOf(entry._id) == -1) {
                                    new_page.entries.push(entry)
                                    new_page.save(function(err) {
                                        if (err) {
                                            callback(err)
                                        }
                                    })
                                }
                            })
                        }
                    })
                    pageContainerList.push(new_page)
                }
                // callback(entriesList, all_entries.pagecontainers)
                // console.log("pagecontainers")
                // console.log(pagecontainers)
                callback(null, pageContainerList)
            }
        ],
        function(err, result) {
            console.log(err)
                // console.log(result);
            console.log("Done done")
        }
    )
}

function formatPageContainer(pageContainer) {
    entryFields = pageContainer.fields
    let formattedPageContainer = {}

    formattedPageContainer.description = entryFields.description
    formattedPageContainer.entriesIds = []
    entryFields.entries.forEach(function(entry) {
        formattedPageContainer.entriesIds.push(entry.sys.id)
    })
    formattedPageContainer.heroId = entryFields.hero.sys.id
    formattedPageContainer.slug = entryFields.slug
    formattedPageContainer.title = entryFields.title
    formattedPageContainer.page_id = pageContainer.sys.id
    return formattedPageContainer
}

function formatEntry(entry) {
    let formattedEntry = {}
    formattedEntry.address = entry.fields.address
    formattedEntry.descriptionLong = entry.fields.descriptionLong
    formattedEntry.descriptionShort = entry.fields.descriptionShort
    formattedEntry.endTime = entry.fields.endTime
    formattedEntry.eventPartnersIds = []
    entry.fields.eventPartners.forEach(function(partner) {
        formattedEntry.eventPartnersIds.push(partner.sys.id)
    })
    formattedEntry.externalUrl = entry.fields.externalUrl
    formattedEntry.heroIds = []
    entry.fields.hero.forEach(function(hero) {
        formattedEntry.heroIds.push(hero.sys.id)
    })
    formattedEntry.location = entry.fields.location
    formattedEntry.slug = entry.fields.slug
        // formattedEntry.speakers = entry.fields.speakers
    formattedEntry.startTime = entry.fields.startTime
    formattedEntry.tags = entry.fields.tags
    formattedEntry.title = entry.fields.title
    formattedEntry.type = entry.fields.type
    formattedEntry.entry_id = entry.sys.id

    return formattedEntry
}

function formatHero(hero) {
    let formattedHero = {};
    formattedHero.backgroundImage = hero.fields.backgroundImage.fields.file.url
    formattedHero.blurb = hero.fields.blurb
    formattedHero.headline = hero.fields.headline
    formattedHero.textAlignment = hero.fields.textAlignment || ''
    formattedHero.hero_id = hero.sys.id
    return formattedHero
}


function formatEventPartner(partner) {
    let formattedEventPartner = {};
    formattedEventPartner.companyLogo = partner.fields.companyLogo.fields.file.url
    formattedEventPartner.companyName = partner.fields.companyName
    formattedEventPartner.url = partner.fields.url
    formattedEventPartner.partner_id = partner.sys.id
    return formattedEventPartner
}

function createEntries(entry) {

}

function createEntryHeroes(entryHero) {

}

function createEventPartners(eventPartner) {

}

function createPageContainers(pageContainer) {

}

function formatEntries(entries) {
    pageDetails = {}
    let pageContainerIndex = entries.items.findIndex(x => x.sys.contentType.sys.id == "pageContainer")

    const pageContainerEntry = entries.items[pageContainerIndex]

    entryFields = pageContainerEntry.fields
    pageDetails.description = entryFields.description
    pageDetails.entries = []
    entryFields.entries.forEach(function(entry) {
        new_entry = {}
        new_entry.address = entry.fields.address
        new_entry.descriptionLong = entry.fields.descriptionLong
        new_entry.descriptionShort = entry.fields.descriptionShort
        new_entry.endTime = entry.fields.endTime
        new_entry.eventPartners = []
        entry.fields.eventPartners.forEach(function(partner) {
            new_event_partner = {}
            new_event_partner.companyLogo = partner.fields.companyLogo.fields.file.url
            new_event_partner.companyName = partner.fields.companyName
            new_event_partner.url = partner.fields.url
            new_event_partner.partner_id = partner.sys.id
            new_entry.eventPartners.push(new_event_partner)
        })
        new_entry.externalUrl = entry.fields.externalUrl
        new_entry.hero = []
        entry.fields.hero.forEach(function(hero) {
            new_hero = {}
            new_hero.backgroundImage = hero.fields.backgroundImage.fields.file.url
            new_hero.blurb = hero.fields.blurb
            new_hero.headline = hero.fields.headline
            new_hero.hero_id = hero.sys.id
            new_entry.hero.push(new_hero)
        })
        new_entry.location = entry.fields.location
        new_entry.slug = entry.fields.slug
        new_entry.speakers = entry.fields.speakers
        new_entry.startTime = entry.fields.startTime
        new_entry.tags = entry.fields.tags
        new_entry.title = entry.fields.title
        new_entry.type = entry.fields.type
        new_entry.entry_id = entry.sys.id
        pageDetails.entries.push(new_entry)
    });
    pageDetails.hero = {}
    pageDetails.hero.companyLogo = entryFields.hero.fields.companyLogo.fields.file.url
    pageDetails.hero.companyName = entryFields.hero.fields.companyName
    pageDetails.hero.url = entryFields.hero.fields.url
    pageDetails.hero.id = entryFields.hero.sys.id
    pageDetails.slug = entryFields.slug
    pageDetails.title = entryFields.title
    pageDetails.content_id = pageContainerEntry.sys.id
    return pageDetails
}

// const pageDetailsFormatted = require('./data');

function compare(page1, page2) {
    for (let key in page1) {
        console.log(page1[key], page2[key], page1[key] == page2[key])
    }
}

function createPageContainer(pageDetails) {
    console.log("creating page container")
    console.log(pageDetails)
        // const pageDetails = require('./data');
    new_page = new Page({
        "description": pageDetails.description,
        "hero": pageDetails.hero,
        "slug": pageDetails.slug,
        "title": pageDetails.title,
        "page_id": pageDetails.content_id,
        "hero": pageDetails.hero
    });
    new_page.save(function(err, page) {
        if (err) {
            throw err;
        } else {
            pageDetails.entries.forEach(function(entry) {
                var new_entry = new Entry({
                    "address": entry.address,
                    "descriptionLong": entry.descriptionLong,
                    "descriptionShort": entry.descriptionShort,
                    "endTime": entry.endTime,
                    "externalUrl": entry.externalUrl,
                    "location": entry.location,
                    "slug": entry.slug,
                    "speakers": entry.speakers,
                    "startTime": entry.startTime,
                    "tags": entry.tags,
                    "title": entry.title,
                    "type": entry.type,
                    "page": page._id
                })
                new_entry.save(function(err, entry_new) {
                    if (err) { throw err } else {
                        page.entries.push(entry_new)
                        page.save(function(err, res) {
                            if (err) throw err
                        })
                    }
                    entry.eventPartners.forEach(function(eventPartner) {
                        var new_event_partner = new EventPartner({
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
                    });
                });

            });
        }
    });
    console.log("Successful")
}

const array = [
    [EntryHero, "EntryHero"],
    [PageHero, "PageHero"],
    [EventPartner, "EventPartner"],
    [Entry, "Entry"],
    [Page, "Page"]
]

const deleteModel = function(i, callback) {
    const model = array[i]
    model[0].remove({}, function(err) {
        // console.log(model[1] + ' removed')
        callback(err, model[1]);
    });
}
const removeAllDb = function() {
    waterfall([
            function(callback) {
                callback(null, array[0]);
            },
            function(model, callback) {
                deleteModel(0, callback)
            },
            function(model, callback) {
                deleteModel(1, callback)
            },
            function(model, callback) {
                deleteModel(2, callback)
            },
            function(model, callback) {
                deleteModel(3, callback)
            },
            function(model, callback) {
                deleteModel(4, callback)
            }
        ],
        function(err, result) {
            console.log('Done removing db');
        }
    )
}

const port = process.env.PORT || 5000

db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback() {
    console.log('db opened');
    app.listen(port, function() {
        // removeAllDb()
        // createPageContainer()
        // value = fetchAllPageContainer();
        // console.log(value);
        console.log(`App is listening on port ${port}`)
    })
});