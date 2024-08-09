const Category = require('../models/category');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json({ data: categories });
    } catch (error) {
        res.status(500).json({ error: error.message });
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
      const { id, name, sequence, status } = req.body;
      const { file } = req;
  
      if (!file) {
        return res.status(400).send('No file uploaded');
      }
  
      const newCategory = new Category({
        id,
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

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, sequence, status } = req.body;
    const { file } = req;

    try {
        console.log(id);
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
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getCategories, createCategory, deleteCategory,updateCategory,getCategory }