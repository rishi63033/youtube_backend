require('dotenv').config();



const mongoUri = process.env.MONGO_URI;

const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const videoRoutes = require('./routes/videos');


const app = express();

app.use(cors());
app.use(express.json());



// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/videos', videoRoutes);
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
