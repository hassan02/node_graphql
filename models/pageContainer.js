var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var pageContainerSchema = Schema({
    description: {
        type: String,
        trim: true
    },
    entries: [{
        type: Schema.Types.ObjectId,
        ref: 'Entry'
    }],
    hero: {
        type: Schema.Types.ObjectId,
        ref: 'EventPartner'
    },
    slug: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    page_id: {
        type: String,
        trim: true
    }
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})

mongoose.model('PageContainer', pageContainerSchema)

pageContainerSchema.plugin(autoIncrement.plugin, {
    model: 'PageContainer',
    field: 'id',
    startAt: 1
});