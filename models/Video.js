const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  videoId: String
});

module.exports = mongoose.model('Video', videoSchema, 'videos');

