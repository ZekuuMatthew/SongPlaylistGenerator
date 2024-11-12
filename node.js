const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

const clientId = '15d374de17a6473b9bc0fb82c365a519';
const clientSecret = 'f163eb93862041dfbdd2a5656760a3c4';

// Endpoint to handle the Spotify token exchange
app.post('/getAccessToken', async (req, res) => {
    const { code, redirectUri } = req.body;

    // Exchange the authorization code for an access token
    try {
        const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: redirectUri
            })
        });

        const tokenData = await tokenResponse.json();
        res.json(tokenData); // Send the access token and other data back to the client
    } catch (error) {
        console.error("Error fetching access token:", error);
        res.status(500).json({ error: "Error exchanging code for access token" });
    }
});

// Endpoint to search Spotify (this handles search queries from the front-end)
app.post('/searchSongs', async (req, res) => {
    const { searchQuery, accessToken } = req.body; // Receive search query and access token

    // Ensure we have an access token
    if (!accessToken) {
        return res.status(400).json({ error: 'Access token is required' });
    }

    // Make a search request to Spotify's API
    try {
        const searchResponse = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchQuery)}&type=track&limit=10`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const searchData = await searchResponse.json();
        res.json(searchData); // Send back the search results to the front-end
    } catch (error) {
        console.error("Error searching Spotify:", error);
        res.status(500).json({ error: "Error searching songs" });
    }
});

// Start the Express server
app.listen(3001, () => console.log("Server running on port 3001"));