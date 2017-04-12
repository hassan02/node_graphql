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
        trim: true
    },
    eventPartners: [{
        type: Schema.Types.ObjectId,
        ref: 'EventPartner'
    }],
    externalUrl: {
        type: String,
        trim: true
    },
    heroes: [{
        type: Schema.Types.ObjectId,
        ref: 'EntryHero'
    }],
    location: Object,
    slug: {
        type: String,
        trim: true
    },
    speakers: {
        type: Array,
        default: []
    },
    startTime: {
        type: Date,
    },
    tags: {
        type: Array,
        default: []
    },
    title: {
        type: String,
    },
    type: {
        type: String,
    },
    entry_id: {
        type: String,
        trim: true,
        required: true
    },
    page: {
        type: Schema.Types.ObjectId,
        ref: 'PageContainer',
        required: false,
    }
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})

mongoose.model('Entry', entrySchema)

entrySchema.plugin(autoIncrement.plugin, {
    model: 'Entry',
    field: 'id',
    startAt: 1
});