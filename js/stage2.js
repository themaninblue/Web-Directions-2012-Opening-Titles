
var stage2 = {};

(function() {
	var MIN_Z = -500;
	
	stage2.go = function() {
		$('#stage2').addClass('on');
		
		$('#stage2StartLetter')
			.data('translateX', 0)
			.data('translateY', 0)
			.data('translateZ', -250)
			.css('opacity', 1)
		generateLetters();
		// Fade-in the letters
		setTimeout(function() {
			$('#stage2StartLetter').addClass('separated');
			setTimeout(function() {
				$('#stage2OtherLetters').css('opacity', 1)
				$('#stage2Container')
					.css('-webkit-transform', 'translate3d(0,0,0) rotateY(0)')
					.css('left', '-100%')
				$('.stage2Letter:not(#stage2StartLetter)').each(function() {
					var $this = $(this);
					$this.css('opacity', 1 - parseInt($this.data('translateZ'))/MIN_Z*0.8);
				});

				setTimeout(function() {
					$('#stage2Bar').addClass('phase2');
					$('#stage2Names').addClass('phase2');
					
					setTimeout(function() {
						$('#stage2Names').addClass('phase3');
						
						setTimeout(function() {
							$('#stage2Bar2').addClass('phase2');
							stage3.go();
						}, 5000);
					}, 2400);
				}, 4000);
				
				setTimeout(function() {
					$('#stage2Container').remove();
				}, 20000);
			}, 2000);
		}, 3000);
	};
	
	stage2.stop = function() {
		$('#stage2').remove();
	};
	
	function generateLetters() {
		var MAX_LETTERS = 30;
		
		for (var i = 0; i < MAX_LETTERS; i++) {
			var character = String.fromCharCode(65 + Math.floor(Math.random() * 26));
			var newLetter = $('<span class="stage2Letter"><span class="inner">' + character + '</span><span class="inner inner2">' + character + '</span><span class="inner inner3">' + character + '</span></span>');
			var rotateX = Math.random() * 90;
			var rotateY = Math.random() * 90;
			var rotateZ = Math.random() * 90;
			var translateX = $(window).width() / MAX_LETTERS * i;
			var translateY = $(window).height()/2 - (1 - i/MAX_LETTERS) * $(window).height()/2 + Math.random() * (1 - i/MAX_LETTERS) * $(window).height();
			var translateZ = Math.random() * MIN_Z;
	
			newLetter
				.data('translateX', translateX)
				.data('translateY', translateY)
				.data('translateZ', translateZ)
				.css('opacity', 1 - translateX/$(window).width())
				.css('-webkit-transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg)')
				.appendTo('#stage2OtherLetters');
		}
		
		$('.stage2Letter').each(function() {
			var rotateX = Math.random() * 1440;
			var rotateY = Math.random() * 1440;
			var rotateZ = Math.random() * 1440;
			
			if (this.id == 'stage2StartLetter') {
				rotateX = 1080;
				rotateY = 1440;
				rotateZ = 1080;
			}
			
			var translateX = $(this).data('translateX') + $(window).width();
			var translateX = $(this).data('translateX');
			var translateY = $(window).height()/2;
			var translateZ = MIN_Z/2;
			
			$(this).css('-webkit-transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg)');
		});
	}
})();