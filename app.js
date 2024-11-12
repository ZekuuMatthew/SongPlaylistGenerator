// Only redirect to Spotify if there's no authorization code in the URL

const clientId = '15d374de17a6473b9bc0fb82c365a519';
const redirectUri = 'http://127.0.0.1:5500//callback'; // Use your actual callback URI
const scopes = 'playlist-read-private playlist-modify-private';

// Check for authorization code in the URL
const urlParams = new URLSearchParams(window.location.search);
const authorizationCode = urlParams.get('code');

if (authorizationCode) {
    console.log("Authorization code received:", authorizationCode);

    // Send the authorization code to your server to get an access token
    fetch('/getAccessToken', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: authorizationCode, redirectUri: redirectUri })
    })
    .then(response => response.json())
    .then(data => {
        const accessToken = data.access_token;
        console.log("Access Token:", accessToken);
        sessionStorage.setItem('spotifyAccessToken', accessToken); // Store token in sessionStorage
        // Now you can fetch Spotify data with the token, e.g., display user data or use it for search
    })
    .catch(error => console.error(error));
}

// Function to handle the "Add to Playlist" button click
function addToPlaylist(songId) {
    const songIds = [songId];  // For a single song, for multiple, gather all song IDs
    createPlaylist(songIds);
}

// Handle search button click and Enter key press
document.querySelector('.search-button').addEventListener('click', () => {
    const searchQuery = document.querySelector('.search-input').value;
    if (searchQuery) {
        searchSongs(searchQuery); // Trigger search on button click
    } else {
        alert("Please enter a search term!");
    }
});

document.querySelector('.search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent form submission
        const searchQuery = document.querySelector('.search-input').value;
        if (searchQuery) {
            searchSongs(searchQuery); // Trigger search on Enter key press
        } else {
            alert("Please enter a search term!");
        }
    }
});

// Function to send the search query to the backend
function searchSongs(searchQuery) {
    const accessToken = sessionStorage.getItem('spotifyAccessToken'); // Retrieve stored token
    if (!accessToken) {
        console.error("Access token not found. User may need to log in.");
        return;
    }

    // Send the search query and access token to the backend
    fetch('/searchSongs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            searchQuery: searchQuery,
            accessToken: accessToken
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.tracks.items);  // Logs the list of songs
        displaySongs(data.tracks.items); // Display the songs in HTML
    })
    .catch(error => console.error('Error searching songs:', error));
}

// Function to display the song data
function displaySongs(songs) {
    const resultContainer = document.querySelector('.search-results');
    resultContainer.innerHTML = ''; // Clear any previous results

    songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('song-item');
        songElement.innerHTML = `
            <h3>${song.name}</h3>
            <p>By ${song.artists.map(artist => artist.name).join(', ')}</p>
            <img src="${song.album.images[0].url}" alt="${song.name}">
            <button class="add-to-playlist" data-song-id="${song.id}">Add to Playlist</button>
        `;
        resultContainer.appendChild(songElement);
    });

    // Add event listener to "Add to Playlist" buttons
    const addButtons = document.querySelectorAll('.add-to-playlist');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const songId = button.getAttribute('data-song-id');
            addToPlaylist(songId); // Add this song to a new playlist
        });
    });
}

// Function to create a playlist and add songs to it
function createPlaylist(songIds) {
    const accessToken = sessionStorage.getItem('spotifyAccessToken');
    if (!accessToken) {
        console.error("Access token not found.");
        return;
    }

    // Create a new playlist
    fetch('https://api.spotify.com/v1/me/playlists', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: "My Generated Playlist",  // Playlist name
            description: "A playlist generated based on your search.",
            public: false  // Change to true if you want it to be public
        })
    })
    .then(response => response.json())
    .then(data => {
        const playlistId = data.id;
        console.log("Playlist created with ID:", playlistId);
        addTracksToPlaylist(playlistId, songIds); // Add songs to the created playlist
    })
    .catch(error => console.error("Error creating playlist:", error));
}

// Function to add tracks to the playlist
function addTracksToPlaylist(playlistId, songIds) {
    const accessToken = sessionStorage.getItem('spotifyAccessToken');
    if (!accessToken) {
        console.error("Access token not found.");
        return;
    }

    // Add the selected tracks to the playlist
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: songIds.map(id => `spotify:track:${id}`) // Create URIs for each song
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("Tracks added to playlist:", data);
        alert("Playlist generated and songs added!");
    })
    .catch(error => console.error("Error adding tracks:", error));
}
