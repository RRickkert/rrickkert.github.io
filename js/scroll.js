function scrollTo(element, duration) {

	$([document.documentElement, document.body]).animate({
		scrollTop: $(element).offset().top - document.getElementsByClassName("navbar")[0].clientHeight
	}, duration);
}