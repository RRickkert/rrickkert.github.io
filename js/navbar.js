// Get the container element
var btnContainer = document.getElementById("navbar");
var currentActiveMenuButton;
var currentMenuButtonInView;
var isScrolling = false;
// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("btn");
// Loop through the buttons and add the active class to the current/clicked button
var timeoutHandle;

for (var i = 0; i < btns.length; i++) {
	btns[i].addEventListener("click", function() {
		if (currentActiveMenuButton == this)
			return;
		currentActiveMenuButton.className = currentActiveMenuButton.className.replace(" active", "");
		currentMenuButtonInView.className = currentMenuButtonInView.className.replace(" in-view", "");
		currentActiveMenuButton = this;
		currentMenuButtonInView = this;
		currentActiveMenuButton.className += " active";

		$([document.documentElement, document.body]).stop();
		scrollTo(document.getElementById(currentActiveMenuButton.getAttribute("target")), 1000, 65);
		isScrolling = true;

		if (timeoutHandle != undefined)
			clearTimeout(timeoutHandle);

		timeoutHandle = setTimeout(function() {
			isScrolling = false;
		}, 1000);
	});
}

var animating = false;

function magic() {
	for (var i = 0; i < btns.length; i++) {
		if ($(window).scrollTop() >= $(document.getElementById(btns[i].getAttribute("target"))).offset().top - 65 - 1 - document.getElementById("navbar").clientHeight) {
			if (!isScrolling) {
				currentMenuButtonInView.className = currentMenuButtonInView.className.replace(" in-view", "");
				currentMenuButtonInView = btns[i];
				currentMenuButtonInView.className += " in-view";


				currentActiveMenuButton.className = currentActiveMenuButton.className.replace(" active", "");
				currentActiveMenuButton = btns[i];
				currentActiveMenuButton.className += " active";
			}
		}
	}
}

$(document).ready(function() {
	currentActiveMenuButton = btns[0];
	currentMenuButtonInView = currentActiveMenuButton;

	$(window).scroll(_.throttle(magic, 100));
});