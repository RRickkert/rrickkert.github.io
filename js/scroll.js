function scrollTo(element, duration) {

	$([document.documentElement, document.body]).animate({
		scrollTop: $(element).offset().top - document.getElementById("navbar").clientHeight
	}, duration);
}