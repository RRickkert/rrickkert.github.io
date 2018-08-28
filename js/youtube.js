var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$(window).scroll(function() {
	$('video').each(function() {
		if ($(this).visible(true)) {
			$(this)[0].play();
		} else {
			$(this)[0].pause();
		}
	})
});

function onYouTubeIframeAPIReady() {
	var ytVideoElements = document.getElementsByClassName("youtube-video");
	var ytPlayers = [];

	for (var i = 0; i < ytVideoElements.length; i++) {
		ytPlayers.push({
			id: ytVideoElements[i].id,
			videoId: ytVideoElements[i].id
		})
	}

	ytPlayers.forEach(function(playerInfo) {
		createPlayer(playerInfo);
	});
}

function createPlayer(playerInfo) {
	var parentElement = document.getElementById(playerInfo.id).parentElement;
	for (var i = 0; i < parentElement.childNodes.length; i++) {
		var el = parentElement.childNodes[i];
		var classes = el.className != undefined ? el.className.split(" ") : [];
		for (var j = 0, jl = classes.length; j < jl; j++) {
			if (classes[j] == "overlay") {
				var player = new YT.Player(playerInfo.id, {
					width: '960',
					height: '540',
					videoId: playerInfo.videoId, //  B7bqAsxee4I
					host: 'https://www.youtube.com',
					playerVars: {
						'autoplay': 1,
						'controls': 0,
						'start': 0
					},
					events: {
						'onReady': onPlayerReady,
						'onStateChange': function(event) {
							onPlayerStateChange(el, event);
						}
					}
				});
				showOverlay(el);
				return;
			}
		}
	}
}

function onPlayerReady(event) {
	event.target.setVolume(0);
	event.target.playVideo();
}

function onPlayerStateChange(overlay, event) {
	if (event.data == YT.PlayerState.PLAYING) {
		window.setTimeout(function() {
			hideOverlay(overlay);
		}, 500);

		window.setTimeout(function() {
			showOverlay(overlay);
		}, event.target.getDuration() * 1000 - 1000 - 100);
	}

	if (event.data == YT.PlayerState.ENDED) {
		window.setTimeout(function() {
			event.target.playVideo();
		}, 2500);
	}
}

function showOverlay(overlay) {
	overlay.classList.add("show");
	overlay.classList.remove("hide");
}

function hideOverlay(overlay) {
	overlay.classList.add("hide");
	overlay.classList.remove("show");
}