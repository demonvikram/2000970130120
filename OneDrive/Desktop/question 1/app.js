const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trainRoutes = require('./routes/trainRoutes');
const config = require('./config/config');

const app = express();
app.use(express.json());

//datbase
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/auth', authRoutes);
app.use('/train', trainRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
