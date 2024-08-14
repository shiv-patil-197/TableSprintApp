const { GridFSBucket } = require('mongodb');
const Category = require('../models/category');

const getCategories = async (req, res) => {

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const categories = await Category.find()
            .sort({ serialNo: 1 })  // Sort by serial number in ascending order
            .skip((page - 1) * limit)
            .limit(limit);

        const totalCategories = await Category.countDocuments();
        const totalPages = Math.ceil(totalCategories / limit);

        res.json({ data: categories, totalPages, currentPage: page });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories', message: err.message });
    }
};


const getCategory = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the category by ID
        const category = await Category.findById(id);
        
        // Check if category exists
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Return the category data
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
        const {name, sequence, status } = req.body;
        const { file } = req;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const newCategory = new Category({
            name,
            sequence,
            image: file.filename,
            status,
        });

        await newCategory.save();
        res.json({ message: 'Category added successfully', category: newCategory });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category', message: err.message });
    }
};
  
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryToDelete = await Category.findById(id);

        if (!categoryToDelete) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const deletedSerialNo = categoryToDelete.serialNo;

        // Delete the category
        await Category.findByIdAndDelete(id);

        // Update serial numbers for all categories with a higher serial number
        await Category.updateMany(
            { serialNo: { $gt: deletedSerialNo } },
            { $inc: { serialNo: -1 } }
        );

        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete category', message: err.message });
    }
};



const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, sequence, status } = req.body;
    const { file } = req;

    try {
        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name;
        category.sequence = sequence;
        category.status = status;
        if (file) {
            category.image = file.filename;
        }

        await category.save();
        res.json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category', message: error.message });
    }
};

module.exports = {getCategories, createCategory, deleteCategory,updateCategory,getCategory }

