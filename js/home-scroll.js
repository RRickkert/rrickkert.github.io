// Get the container element
var button = document.getElementById("home-scroll-button");

button.addEventListener("click", function() {
	scrollTo(document.getElementById(button.getAttribute("target")), 700, 65);
});