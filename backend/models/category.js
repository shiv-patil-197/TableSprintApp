const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
    },
    sequence: {
        type: Number,
    },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
