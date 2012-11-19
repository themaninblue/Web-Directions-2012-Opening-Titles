
var timeline = [
	{time: 0, callback: stage1.go},
	{time: 5, callback: stage1.text},
	{time: 15, callback: stage1.text2},
	{time: 21, callback: stage1.text3},
	{time: 31, callback: stage1.textStop},
	{time: 41.9, callback: stage2.go},
	{time: 48, callback: stage1.stop},
	{time: 65.4, callback: stage3.stopShapes},
	{time: 66, callback: stage3.goCamera},
	{time: 75, callback: stage2.stop}
];
var appCacheReady = false;
applicationCache.addEventListener('cached', function() {window.location.reload();}, false);
applicationCache.addEventListener('updateready', function() {window.location.reload();}, false);
applicationCache.addEventListener('noupdate', function() {appCacheReady = true;}, false);

$(initTimeline);

function initTimeline() {
	// Set font-size based on window width
	$('body').css('font-size', $(window).width() / 6.4 + 'px');
	$('#music').get(0).addEventListener('canplaythrough', function() {musicCanPlay = true;});
	$('#stage4Video').get(0).addEventListener('canplaythrough', function() {videoCanPlay = true;});
	checkIfLoaded();
}

function checkIfLoaded() {
	var image = document.getElementById('stage3ShapeNames');

	if (appCacheReady && image.complete == true) {
		$('#loading1').removeClass('on');
		$('#loading2').addClass('on');
		setTimeout(function() {
			stage3.init();
		}, 500);
	}
	else {
		setTimeout(checkIfLoaded, 500);
	}
}

function startTimeline() {
	var audio = document.getElementById('music');
	audio.play();
	
	setInterval(function() {
		var now = audio.currentTime;
		
		for (var i = 0; i < timeline.length; i++) {
			if (timeline[i].time <= now) {
				timeline[i].callback();
				timeline.splice(i, 1);
				i--;
			}
			else {
				break;
			}
		}
	}, 10);
}