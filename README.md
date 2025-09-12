# YouTube Backend

## Description
This is the backend for the LearnOverse assignment. It is built with **Node.js** and connects to **MongoDB** to store YouTube video IDs. The backend exposes an endpoint that fetches 10 videos, enriches them with metadata from the YouTube API, and returns JSON to the frontend.

## How It Works
1. Connects to a MongoDB database containing video IDs.  
2. Fetches metadata for each video from the YouTube Data API (title, channel, thumbnail, duration).  
3. Returns the enriched list of 10 videos to the frontend via an API endpoint.

## Installation & Setup
1. Clone the backend repository and go into the folder:
   in bash
   git clone <your-backend-repo-link>
   cd youtube_backend
