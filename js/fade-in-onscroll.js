$(function() { // $(document).ready shorthand
	showIfInView();
	reduceMargin();
});

var fadedInCards = [];
var fadedOutCards = [];

var initialize = function() {
	$('.card').each(function(i) {
		var bottom_of_object = $(this).position().top;
		var top_of_object = $(this).position().top;
		var bottom_of_window = $(window).scrollTop() + $(window).height();

		var cardInfo = {
			'obj': $(this),
			'top': $(this).position().top
		}
		/* If the object is completely visible in the window, fade it it */
		if (bottom_of_window > bottom_of_object) {
			$(this).removeClass('fade-out');
			$(this).addClass('fade-in');
			fadedInCards.push(cardInfo);
		} else if (bottom_of_window < top_of_object) {
			$(this).removeClass('fade-in');
			$(this).addClass('fade-out');
			fadedOutCards.push(cardInfo);
		}
	});
}

var showIfInView = function() {

	for (var i = fadedInCards.length - 1; i >= 0; i--) {
		var cardInfo = fadedInCards[i];
		var bottom_of_object = cardInfo.top;
		var top_of_object = cardInfo.top;
		var bottom_of_window = $(window).scrollTop() + $(window).height();

		if (bottom_of_window < top_of_object) {
			cardInfo.obj.removeClass('fade-in');
			cardInfo.obj.addClass('fade-out');
			fadedInCards.splice(i, 1);
			fadedOutCards.push(cardInfo);
		}
	}

	for (var i = fadedOutCards.length - 1; i >= 0; i--) {
		var cardInfo = fadedOutCards[i];
		var bottom_of_object = cardInfo.top;
		var top_of_object = cardInfo.top;
		var bottom_of_window = $(window).scrollTop() + $(window).height();

		if (bottom_of_window > top_of_object) {
			cardInfo.obj.removeClass('fade-out');
			cardInfo.obj.addClass('fade-in');
			fadedOutCards.splice(i, 1);
			fadedInCards.push(cardInfo);
		}
	}
}

var reduceMargin = function() {
	var func = function(i) {
		$(this).css({
			marginLeft: lerp($(window).width() * 0.15, $(window).width() * 0.05, 2 * (1 - $(window).width() / screen.width)),
			marginRight: lerp($(window).width() * 0.15, $(window).width() * 0.05, 2 * (1 - $(window).width() / screen.width))
		});
	};
	$('.about-me-container').each(func);
	$('.skills-container').each(func);
	$('.projects-container').each(func);
};

$(document).ready(function() {
	initialize();
	/* Every time the window is scrolled ... */
	$(window).scroll(showIfInView);
	$(window).resize(showIfInView);
	$(window).resize(reduceMargin);
});

function lerp(start, end, amt) {
	amt = Math.min(Math.max(amt, 0), 1);
	return (1 - amt) * start + amt * end;
}