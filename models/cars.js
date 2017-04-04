var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var carSchema = Schema({
    name: {
        type: String,
        trim: true,
        required: '{PATH} is required!',
    }, 
    model: {
        type: String,
        trim: true
    }, 
    type: {
        type: String,
        trim: true
    }
}, {
    timestamps: {
        createdAt: 'date_created',
        updatedAt: 'date_modified'
    }
})

mongoose.model('Car', carSchema)

carSchema.plugin(autoIncrement.plugin, {
    model: 'Car',
    field: 'id',
    startAt: 1
});
