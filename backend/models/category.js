const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    serialNo: {
        type: Number,
        unique: true,  // Ensures that the serial number is unique
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'], // Restricts status to specific values
        default: 'Active', // Default status
    },
    sequence: {
        type: Number,
        min: 0,
    },
});

// Middleware to auto-increment the serialNo before saving
categorySchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastCategory = await Category.findOne().sort({ serialNo: -1 });
        this.serialNo = lastCategory ? lastCategory.serialNo + 1 : 1;
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
