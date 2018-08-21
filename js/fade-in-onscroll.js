$(function() { // $(document).ready shorthand
	showIfInView();
	console.log("Start");
});

var showIfInView = function() {
	/* Check the location of each desired element */
	console.log("Updating");
	$('.card').each(function(i) {
		console.log("found card");
		var bottom_of_object = $(this).position().top;
		var top_of_object = $(this).position().top;
		var bottom_of_window = $(window).scrollTop() + $(window).height();

		/* If the object is completely visible in the window, fade it it */
		if (bottom_of_window > bottom_of_object) {
			$(this).removeClass('fade-out');
			$(this).addClass('fade-in');

		} else if (bottom_of_window < top_of_object) {
			$(this).removeClass('fade-in');
			$(this).addClass('fade-out');
		}
	});
};
$(document).ready(function() {

	/* Every time the window is scrolled ... */
	$(window).scroll(showIfInView);

});