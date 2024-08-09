const express = require('express');
const router = express.Router();
const { getCategories, createCategory, deleteCategory,updateCategory,getCategory } = require('../controllers/categoryController');
const multer = require('multer');
const { authenticateToken } = require('../middlewares/authMiddleware');


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
  
router.get('/categories' ,authenticateToken,getCategories);
router.post('/categories', upload.single('image'), createCategory);
router.delete('/categories/:id',authenticateToken, deleteCategory);
router.get('/category/:id',authenticateToken, getCategory);
router.put('/categories/:id', upload.single('image'), updateCategory);

module.exports = router;
  