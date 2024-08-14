const express = require('express');
const connectDB = require('./config/database');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api', authRoutes);
app.use('/api', categoryRoutes);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});



// const express = require('express');
// const connectDB = require('./config/database');
// const cors = require('cors');
// const path = require('path');
// require('dotenv').config();
// const mongoose = require('mongoose');
// const { GridFSBucket } = require('mongodb');

// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// const authRoutes = require('./routes/authRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');

// // Apply the routes
// app.use('/api', authRoutes);
// app.use('/api', categoryRoutes);

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB and start the server
// connectDB().then(() => {
//     const db = mongoose.connection.db; // Access the native MongoDB db object
//     const gfs = new GridFSBucket(db, {
//         bucketName: 'uploads',
//     });

//     // Route to fetch and serve the image by filename
//     app.get('/files/:filename', (req, res) => {
//       const { filename } = req.params;
    
//       const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//         bucketName: 'uploads',
//       });
    
//       gfs.find({ filename }).toArray((err, files) => {
//         if (!files || files.length === 0) {
//           return res.status(404).json({
//             err: 'No files exist',
//           });
//         }
    
//         gfs.openDownloadStreamByName(filename)
//           .pipe(res)
//           .on('error', (err) => {
//             res.status(500).json({ err });
//           });
//       });
//     });
    

//     // Start the server after setting up GridFSBucket
//     app.listen(PORT, () => {
//         console.log(`Server is running on port ${PORT}`);
//     });
// }).catch((err) => {
//     console.error('Failed to connect to the database:', err);
// });
