const Category = require('../models/category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ data: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createCategory = async (req, res) => {
    try {
      const { name, sequence, status } = req.body;
      const { file } = req;
  
      if (!file) {
        return res.status(400).send('No file uploaded');
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
      res.json(err);
    }
  };
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await Category.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getCategories, createCategory, deleteCategory }