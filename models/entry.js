var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    relationship = require("mongoose-relationship"),
    autoIncrement = require('mongoose-auto-increment');

var entrySchema = Schema({
    address: {
        type: String,
        trim: true,
    },
    descriptionLong: {
        type: String,
        trim: true
    },
    descriptionShort: {
        type: String,
        trim: true
    },
    endTime: {
        type: Date,
        // required: tradue
    },
    eventPartners: [{
        type: Schema.Types.ObjectId,
        ref: 'EventPartner'
    }],
    page: {
        type: Schema.Types.ObjectId,
        ref: 'pageContainer',
        required: false,
        childPath: "entries"
    },
    externalUrl: {
        type: String,
        trim: true,
    },
    hero: {},
    location: {},
    slug: {
        type: String,
        trim: true
    },
    speakers: {},
    startTime: {
        type: Date,
        // required: true
    },
    tags: [],
    title: {
        type: Date,
        // required: true
    },
    type: {
        type: Date,
        // required: true
    },
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})
entrySchema.plugin(relationship, {
    relationshipPathName: 'page'
});
mongoose.model('Entry', entrySchema)

entrySchema.plugin(autoIncrement.plugin, {
    model: 'Entry',
    field: 'id',
    startAt: 1
});
