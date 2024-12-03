const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // Update origin as needed
app.use(express.json());

const clientId = '038a2eef7fdc4dc1a7a77ccb200f2b9c'; // Replace with your Client ID
const clientSecret = 'd13c1bddc3be4362b3290e9f20d7b6e1'; // Replace with your Client Secret

// Function to fetch Spotify App Access Token
async function getAppAccessToken() {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
            },
            body: new URLSearchParams({ grant_type: 'client_credentials' })
        });

        const data = await response.json();
        console.log("Access Token:", data.access_token); // Log the token for debugging
        return data.access_token;
    } catch (error) {
        console.error("Error fetching app access token:", error.message);
        throw new Error("Failed to fetch app access token");
    }
}

// Endpoint to generate a playlist based on a mood or activity
app.post('/generatePlaylist', async (req, res) => {
    const { mood } = req.body;

    // Validate mood input
    if (!mood) {
        console.error("No mood provided in the request");
        return res.status(400).json({ error: 'Mood or activity is required' });
    }

    console.log("Received mood:", mood); // Log received mood for debugging

    try {
        // Fetch Spotify access token
        const accessToken = await getAppAccessToken();

        // Construct Spotify search API URL
        const searchURL = `https://api.spotify.com/v1/search?q=${encodeURIComponent(mood)}&type=track&limit=50`;
        console.log("Search URL:", searchURL); // Log the search URL for debugging

        // Make API request to Spotify
        const searchResponse = await fetch(searchURL, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        const searchData = await searchResponse.json();
        console.log("Spotify Search Response:", JSON.stringify(searchData, null, 2)); // Log full response for debugging

        // Check if tracks are available in the response
        if (!searchData.tracks || !searchData.tracks.items || searchData.tracks.items.length === 0) {
            console.error("No tracks found for the given mood");
            return res.status(404).json({ error: 'No tracks found for the given mood or activity' });
        }

        // Extract track details
        const playlist = searchData.tracks.items.map(track => ({
            name: track.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            url: track.external_urls.spotify
        }));

        // Send playlist as response
        res.json({ playlist });
    } catch (error) {
        console.error("Error generating playlist:", error.message);
        res.status(500).json({ error: 'Failed to generate playlist' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
