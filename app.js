// Handle search button click and Enter key press
document.querySelector('.search-button').addEventListener('click', () => {
    const searchQuery = document.querySelector('.search-input').value;
    if (searchQuery) {
        searchSongs(searchQuery); // Trigger search on button click
    } else {
        alert("Please enter your mood or activity!");
    }
});

document.querySelector('.search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent form submission
        const searchQuery = document.querySelector('.search-input').value;
        if (searchQuery) {
            searchSongs(searchQuery); // Trigger search on Enter key press
        } else {
            alert("Please enter your mood or activity!");
        }
    }
});

// Function to send the search query to the backend
function searchSongs(searchQuery) {
    fetch('/generate-playlist', { // New backend endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: searchQuery
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.playlist);  // Logs the list of songs
        displaySongs(data.playlist); // Display the songs in HTML
    })
    .catch(error => console.error('Error generating playlist:', error));
}

// Function to display the playlist
function displaySongs(playlist) {
    const resultContainer = document.querySelector('.search-results');
    resultContainer.innerHTML = ''; // Clear previous results

    if (!playlist || playlist.trim() === "") {
        resultContainer.innerHTML = '<p>No songs found. Try a different prompt.</p>';
        return;
    }

    // Split the playlist into individual songs
    const songs = playlist.split('\n').filter(song => song.trim() !== '');

    songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('song-item');
        songElement.innerHTML = `
            <p>${song}</p>
        `;
        resultContainer.appendChild(songElement);
    });
}

function generatePlaylist() {
    const mood = document.getElementById('moodInput').value.toLowerCase();
    const playlistContainer = document.getElementById('playlistContainer');

    // Hide the container initially
    playlistContainer.style.display = "none";

    // Hardcoded playlist
    const happySongs = [
        { name: "Happy", artist: "Pharrell Williams", url: "#" },
        { name: "Can't Stop The Feeling!", artist: "Justin Timberlake", url: "#" },
        { name: "Walking on Sunshine", artist: "Katrina and the Waves", url: "#" },
        { name: "Shake It Off", artist: "Taylor Swift", url: "#" },
        { name: "Good Vibrations", artist: "The Beach Boys", url: "#" },
        // Add more songs here...
    ];

    if (mood === "happy") {
        // Clear previous results
        playlistContainer.innerHTML = "";

        // Create a table for the playlist
        const table = document.createElement('table');
        table.classList.add('table');

        // Add table headers
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>#</th>
                <th>Song</th>
                <th>Artist</th>
                <th>Link</th>
            </tr>
        `;
        table.appendChild(thead);

        // Add table body
        const tbody = document.createElement('tbody');
        happySongs.forEach((song, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${song.name}</td>
                <td>${song.artist}</td>
                <td><a href="${song.url}" target="_blank">Listen</a></td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        // Append the table to the container
        playlistContainer.appendChild(table);
        playlistContainer.style.display = "block"; // Show the container
    } else if (mood) {
        // Show a "no playlist available" message
        playlistContainer.innerHTML = `<p>No playlist available for mood: ${mood}</p>`;
        playlistContainer.style.display = "block"; // Show the container
    }
}
