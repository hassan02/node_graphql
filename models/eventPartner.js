var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var eventPartnerSchema = Schema({
    companyLogo: {
        type: String,
        trim: true
    },
    companyName: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true
    },
    event: {
        type: Schema.Types.ObjectId,
        ref: 'Entry',
        required: false
    }
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})

mongoose.model('EventPartner', eventPartnerSchema)

eventPartnerSchema.plugin(autoIncrement.plugin, {
    model: 'EventPartner',
    field: 'id',
    startAt: 1
});