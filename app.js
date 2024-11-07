const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    console.log("Toggle menu clicked"); // for debugging
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Search button click event
document.querySelector('.search-button').addEventListener('click', function() {
    const query = document.querySelector('.search-input').value;
    if (query) {
        alert(`You searched for: ${query}`);
        // Add additional logic to handle the search query here
    } else {
        alert('Please enter a search term.');
    }
});

// Trigger search on Enter key press in the search input
document.querySelector('.search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent form submission, if any
        document.querySelector('.search-button').click(); // Simulate button click
    }
});
