    const mongoose = require('mongoose');

    const connectDB = async () => {
        try {
            await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                connectTimeoutMS: 30000,  // 30 seconds
                socketTimeoutMS: 45000
            });
            console.log('MongoDB connected');
        } catch (error) {
            console.error('MongoDB connection failed:', error.message);
        }
    };

    module.exports = connectDB;
