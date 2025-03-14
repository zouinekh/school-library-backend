const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const { apiLimiter } = require('./src/utils/rateLimiter');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.use('/books', require('./src/routes/books'));
app.use('/checkouts', require('./src/routes/checkouts'));
app.use('/dashboard', require('./src/routes/dashboard'));

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

const startServer = async () => {
  const PORT = process.env.PORT || 3001;
  
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
};

startServer();