const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const multer = require('multer');


// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });

  console.log('upload middleware:', upload);
console.log('createCategory function:', createCategory);
  
router.get('/categories', getCategories);
router.post('/categories', upload.single('image'), createCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
