
var stage4 = {};

(function() {
	stage4.go = function() {
		$('#stage4').addClass('on');
		
		setTimeout(function() {
			$('#stage4Flash').addClass('off');
			var video = $('#stage4 video').get(0);
			video.play();
			var intervalTimer = setInterval(function() {
				if (video.currentTime > 55.7) {
					clearInterval(intervalTimer);
					stage5.go();
					setTimeout(stage4.stop, 1000);
				}
			}, 10);
		}, 20);
	};
	
	stage4.stop = function() {
		$('#stage4').remove();
	};
})();