const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let category = new Schema({
    description: {
        type: String,
        unique: true,
        required: [true, 'Description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Category', category);