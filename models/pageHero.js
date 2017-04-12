var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var pageHeroSchema = Schema({
    companyName: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true
    },
    companyLogo: {
        type: String,
        trim: true
    },
    hero_id: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})

mongoose.model('PageHero', pageHeroSchema)

pageHeroSchema.plugin(autoIncrement.plugin, {
    model: 'PageHero',
    field: 'id',
    startAt: 1
});