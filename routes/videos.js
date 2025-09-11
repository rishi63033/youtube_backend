const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const axios = require('axios');
require('dotenv').config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

// GET /videos
router.get('/', async (req, res) => {
  try {
    // 1. Fetch all video IDs from MongoDB
    const videos = await Video.find({});

    // 2. For each video, fetch metadata from YouTube API
    const enrichedVideos = await Promise.all(
      videos.map(async (video) => {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${video.videoId}&key=${YOUTUBE_API_KEY}`;
        const response = await axios.get(url);
        const data = response.data.items[0];

        if (!data) return null; // skip if API returns nothing

        return {
          videoId: video.videoId,
          title: data.snippet.title,
          channel: data.snippet.channelTitle,
          thumbnail: data.snippet.thumbnails.medium.url,
          duration: data.contentDetails.duration
        };
      })
    );

    // 3. Filter out any nulls (in case of missing video)
    res.json(enrichedVideos.filter(v => v !== null));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
