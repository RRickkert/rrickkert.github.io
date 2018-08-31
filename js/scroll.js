function scrollTo(element, duration, offset = 50) {

	$([document.documentElement, document.body]).animate({
		scrollTop: $(element).offset().top - document.getElementById("navbar").clientHeight - offset
	}, duration);
}