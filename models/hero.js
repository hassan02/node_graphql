var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var heroSchema = Schema({
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
    }
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})

mongoose.model('Hero', heroSchema)

heroSchema.plugin(autoIncrement.plugin, {
    model: 'Hero',
    field: 'id',
    startAt: 1
});
