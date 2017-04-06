var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var eventPartnerSchema = Schema({
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

mongoose.model('EventPartner', eventPartnerSchema)

eventPartnerSchema.plugin(autoIncrement.plugin, {
    model: 'EventPartner',
    field: 'id',
    startAt: 1
});
