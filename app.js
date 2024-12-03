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
    fetch('http://localhost:3001/generatePlaylist', { // Ensure the endpoint matches and adjust the URL as needed
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mood: searchQuery  // Use 'mood' instead of 'prompt'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error generating playlist:', data.error);
            displayError(data.error);
        } else {
            console.log(data.playlist);  // Logs the list of songs
            displaySongs(data.playlist); // Display the songs in HTML
        }
    })
    .catch(error => {
        console.error('Error generating playlist:', error);
        displayError('An error occurred while generating the playlist.');
    });
}

// Function to display the playlist
function displaySongs(playlist) {
    const resultContainer = document.querySelector('.search-results');
    resultContainer.innerHTML = ''; // Clear previous results

    if (!playlist || playlist.length === 0) {
        resultContainer.innerHTML = '<p>No songs found. Try a different prompt.</p>';
        return;
    }

    playlist.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.classList.add('song-item');
        songElement.innerHTML = `
            <p>${index + 1}. ${song.track_name} - ${song.artist_names}</p>
            <a href="${song.track_url}" target="_blank">Listen on Spotify</a>
        `;
        resultContainer.appendChild(songElement);
    });
}

function displayError(errorMessage) {
    const resultContainer = document.querySelector('.search-results');
    resultContainer.innerHTML = `<p>${errorMessage}</p>`;
}
