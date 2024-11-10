module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URI: process.env.DB_URI || 'mongodb://localhost:27017/mydatabase', // Update with your MongoDB URI
    JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret', // For JWT authentication if needed
};
