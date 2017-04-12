var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var entryHeroSchema = Schema({
    backgroundImage: {
        type: String,
        trim: true,
    },
    blurb: {
        type: String,
        trim: true
    },
    headline: {
        type: String,
        trim: true
    },
    textAlignment: {
        type: String,
        trim: true
    },
    hero_id: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})

mongoose.model('EntryHero', entryHeroSchema)

entryHeroSchema.plugin(autoIncrement.plugin, {
    model: 'EntryHero',
    field: 'id',
    startAt: 1
});