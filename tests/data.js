let all_entries = {
    'entries': [{
        "address": "Lagos, Nigeria",
        "descriptionLong": "Event1 long description",
        "descriptionShort": "Event2 short description",
        "endTime": "2017-02-24T20:00-05:00",
        "externalUrl": "https://events.andela.com/nigeria-lagos/",
        "location": {
            "lat": 40.7473795,
            "lon": -73.99122090000003
        },
        "slug": "test-event",
        "speakers": [],
        "startTime": "2017-02-24T18:00-05:00",
        "tags": ["Webinar", "Distributed Learning"],
        "title": "Test Event",
        "type": "Webinar",
        "entry_id": "entry_1"
    }, {
        "address": "Nairobi, Kenya",
        "descriptionLong": "Event2 long description",
        "descriptionShort": "Event2 short description",
        "endTime": "2017-02-24T20:00-05:00",
        "externalUrl": "https://events.andela.com/nairobi-kenya/",
        "location": {
            "lat": 46.133,
            "lon": -13.13133
        },
        "slug": "test-event",
        "speakers": [],
        "startTime": "2017-02-24T18:00-05:00",
        "tags": ["Programming", "AI"],
        "title": "Test Event 2",
        "type": "Webinar",
        "entry_id": "entry_2"
    }],
    'heroes': [{
        backgroundImage: '//images.contentful.com/zlo317dizoff/6i3UZco5aMEYCmIIoY6G88/fdb0a602a13e76539235ef53557034ad/Andela-Dev.jpg',
        blurb: 'This is some blurb about something. ',
        headline: 'Comment On The Importance Of Human Life',
        textAlignment: '',
        hero_id: 'hero_1'
    }, {
        backgroundImage: '//images.contentful.com/zlo317dizoff/2ThZzt6RtmuYWYmugAyIWY/6c57b21858e3bd324f313205dc81ab5b/eventhero.jpg',
        blurb: 'This some text',
        headline: 'The Future of Work Will Be Distributed',
        textAlignment: 'Center',
        hero_id: '5JU8tmvtzGea2qyqm4eG8G'
    }],
    'eventpartners': [{
        companyLogo: '//images.contentful.com/zlo317dizoff/5gPRlKT58cQIK2gKuy8OuI/26a57e493e3e7eba8096264edc594abb/zen_compass.jpg',
        companyName: 'Zen Compass',
        url: 'https://zencompass.com',
        partner_id: '6yIO7FQm4w0CmiGuek6w6U'
    }],
    'pagecontainers': [{
        "description": "This page has all event listings",
        "entriesIds": ["entry_1", "entry_2"],
        "hero_id": "event_partner_1",
        "slug": "events",
        "title": "Events",
        "page_id": "page_1"
    }]
}

module.exports = all_entries