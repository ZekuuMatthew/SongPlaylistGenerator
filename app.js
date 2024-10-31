const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    console.log("Toggle menu clicked"); // for debugging
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});
