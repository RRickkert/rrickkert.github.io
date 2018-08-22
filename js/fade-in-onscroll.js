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
			'obj': $(this)
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
		var bottom_of_object = cardInfo.obj.position().top;
		var top_of_object = bottom_of_object;
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
		var bottom_of_object = cardInfo.obj.position().top;
		var top_of_object = bottom_of_object;
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




var _ = function(obj) {
	if (obj instanceof _) return obj;
	if (!(this instanceof _)) return new _(obj);
	this._wrapped = obj;
};
_.throttle = function(func, wait, options) {
	var timeout, context, args, result;
	var previous = 0;
	if (!options) options = {};

	var later = function() {
		previous = options.leading === false ? 0 : _.now();
		timeout = null;
		result = func.apply(context, args);
		if (!timeout) context = args = null;
	};

	var throttled = function() {
		var now = _.now();
		if (!previous && options.leading === false) previous = now;
		var remaining = wait - (now - previous);
		context = this;
		args = arguments;
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			previous = now;
			result = func.apply(context, args);
			if (!timeout) context = args = null;
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining);
		}
		return result;
	};

	throttled.cancel = function() {
		clearTimeout(timeout);
		previous = 0;
		timeout = context = args = null;
	};

	return throttled;
};
_.now = Date.now || function() {
	return new Date().getTime();
};

$(document).ready(function() {
	initialize();
	$(window).scroll(_.throttle(showIfInView, 100));
	$(window).resize(_.throttle(showIfInView, 100));
	$(window).resize(reduceMargin);
});

function lerp(start, end, amt) {
	amt = Math.min(Math.max(amt, 0), 1);
	return (1 - amt) * start + amt * end;
}