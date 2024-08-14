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
  

// const express = require('express');
// const router = express.Router();
// const { getCategories, createCategory, deleteCategory, updateCategory, getCategory } = require('../controllers/categoryController');
// const { authenticateToken } = require('../middlewares/authMiddleware');
// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const crypto = require('crypto');
// const path = require('path');
// require('dotenv').config(); // Ensure this is at the top to load environment variables

// // Create a storage object with a given configuration
// const storage = new GridFsStorage({
//   url: process.env.MONGO_URI, // MongoDB Atlas connection string
//   options: { useUnifiedTopology: true },
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           console.error('Error generating random bytes:', err);
//           return reject(err);
//         }
//         const filename = `${buf.toString('hex')}-${Date.now()}${path.extname(file.originalname)}`;
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'uploads',
//           metadata: {
//             originalname: file.originalname, // Add any additional metadata if needed
//           }
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });


// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB file size limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (extname && mimetype) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Error: Images Only!')); // Customize this error message as needed
//     }
//   }
// });

// // Routes
// router.get('/categories', authenticateToken, getCategories);
// router.post('/categories', upload.single('image'), createCategory);
// router.delete('/categories/:id', authenticateToken, deleteCategory);
// router.get('/category/:id', authenticateToken, getCategory);
// router.put('/categories/:id', upload.single('image'), updateCategory);

// module.exports = router;
