const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    console.log("Toggle menu clicked"); // for debugging
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


// In app.js or a script tag in your HTML
document.querySelector('.search-button').addEventListener('click', function() {
    const query = document.querySelector('.search-input').value;
    if (query) {
        alert(`You searched for: ${query}`);
        // Add additional logic to handle the search query here
    } else {
        alert('Please enter a search term.');
    }
});
