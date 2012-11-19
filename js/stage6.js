
var stage6 = {};

(function() {
	var vidWidth = 320;
	var vidHeight = 240;
	var vidCanvas;
	var ctx;
	var pixels;
	var pixelsArray = [];
	var displayCanvas;
	var displayCtx;
	var displayPixels;
	var phase = 0;
	
	stage6.init = function() {
		vidCanvas = document.createElement('canvas');
		vidCanvas.width = vidWidth;
		vidCanvas.height = vidHeight;
		ctx = vidCanvas.getContext('2d');
		//init displayCanvas - used to display results of video manipulation
		displayCanvas = document.createElement('canvas');
		displayCanvas.id = 'slitscan';
		displayCanvas.width = vidWidth;
		displayCanvas.height = vidHeight;
		$('#stage6').append(displayCanvas);
		displayCtx = displayCanvas.getContext('2d');
		displayCtx.fillRect(0, 0, vidWidth, vidHeight);
		displayPixels = displayCtx.getImageData(0, 0, vidWidth, vidHeight);
		
		$(document).keypress(stage6Keypress);

		// Can't be bothered de-hacking the keypresses
		setTimeout(function() {
			stage6Keypress();

			setTimeout(function() {
				stage6Keypress();

				setTimeout(function() {
					stage6Keypress();

					setTimeout(function() {
						stage6Keypress();

						setTimeout(function() {
							stage6Keypress();

							setTimeout(function() {
								stage6Keypress();

								setTimeout(function() {
									stage6Keypress();
								}, 12000);
							}, 12000);
						}, 12000);
					}, 12000);
				}, 12000);
			}, 12000);
		}, 20000);

		draw();
	};
	
	stage6.go = function() {
	};
	
	function draw() {
		requestAnimationFrame(draw);
		ctx.drawImage(window.video, 0, 0, vidWidth, vidHeight);
		pixels = ctx.getImageData(0, 0, vidWidth, vidHeight);
		pixelsArray.splice(0,0,pixels);
		if (pixelsArray.length >= vidWidth) {
			pixelsArray.splice(pixelsArray.length-1, 1);
		}
		
		for (var i = 0; i < vidHeight; i++) {
			for (var j = 0; j < vidWidth; j++) {
				if (pixelsArray.length >= j+1) {
					var newPixels = pixelsArray[Math.floor(j/4)];
					var oldPixels = pixelsArray[Math.ceil(j/4)];
					displayPixels.data[i*vidWidth*4 + j*4] = newPixels.data[i*vidWidth*4 + j*4]*(4 - j % 4)/4 + oldPixels.data[i*vidWidth*4 + j*4]*(j % 4)/4;
					displayPixels.data[i*vidWidth*4 + j*4 + 1] = newPixels.data[i*vidWidth*4 + j*4 + 1]*(4 - j % 4)/4 + oldPixels.data[i*vidWidth*4 + j*4 + 1]*(j % 4)/4;
					displayPixels.data[i*vidWidth*4 + j*4 + 2] = newPixels.data[i*vidWidth*4 + j*4 + 2]*(4 - j % 4)/4 + oldPixels.data[i*vidWidth*4 + j*4 + 2]*(j % 4)/4;
				}
			}
		}
		
		displayCtx.putImageData(displayPixels, 0, 0);
	}
	
	function stage6Keypress() {
		$('.stage6Names').removeClass('on');

		switch(phase) {
			case 0:
				$('#stage6Names1').addClass('on');
				break;
			case 1:
				$('#stage6Names2').addClass('on');
				break;
			case 2:
				$('#stage6Names3').addClass('on');
				break;
			case 3:
				$('#stage6Names4').addClass('on');
				break;
			case 4:
				$('#stage6Names5').addClass('on');
				break;
			case 5:
				$('#stage6Names6').addClass('on');
				break;
		}
		
		phase++;
	}
})();