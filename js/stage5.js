
var stage5 = {};

stage5.go = function() {
	$('#stage5').addClass('on');
	
	$('#stage5Forest').css('-webkit-transform', 'translate3d(' + (-$('#stage5Forest').width() + $(window).width() + 200) + 'px,0,0)');
	
	$('#stage5Name2 span').css('left', -$('#stage5Name2 span').width());
	$('#stage5Name6 span').css('left', -$('#stage5Name6 span').width());
	$('#stage5Name8 span').css('left', -$('#stage5Name8 span').width());
	$('#stage5Name9 span').css('left', -$('#stage5Name9 span').width());
	$('#stage5Name11 span').css('left', -$('#stage5Name11 span').width());
	$('#stage5Name12')
		.css('top', $(window).height())
		.css('width', $(window).height() * 0.677);
	$('#stage5Name12 span').css('left', -$('#stage5Name12 span').width());

	// All names have been positioned, turn on transitions
	setTimeout(function() {
		$('#stage5').addClass('ready');
	}, 20);
	
	// Name1
	setTimeout(function() {
		$('#stage5Name1 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(-' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 100);

	// Name2
	setTimeout(function() {
		$('#stage5Name2 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 4000);

	// Name3
	setTimeout(function() {
		$('#stage5Name3 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(-' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 7000);

	// Name4
	setTimeout(function() {
		$('#stage5Name4 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(-' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 11000);

	// Name5
	setTimeout(function() {
		$('#stage5Name5 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(-' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 15000);

	// Name6
	setTimeout(function() {
		$('#stage5Name6 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 18500);

	// Name7
	setTimeout(function() {
		$('#stage5Name7 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(-' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 23000);

	// Name8
	setTimeout(function() {
		$('#stage5Name8 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 29000);
	
	// Name9
	setTimeout(function() {
		$('#stage5Name9 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 35000);

	// Name10
	setTimeout(function() {
		$('#stage5Name10 span').each(function() {
			$(this).css('-webkit-transform', 'translate3d(-' + ($(this).width() + $(this).parent().width()) + 'px,0,0)');
		});
	}, 40500);

	// Name11
	setTimeout(function() {
		$('.stage5Name11').each(function() {
			$(this).css('-webkit-transform', 'translate3d(0,0,0)');
		});
	}, 40500);

	// Name12
	setTimeout(function() {
		$('.stage5Name12').each(function() {
			$(this).css('-webkit-transform', 'translate3d(0,0,0)');
		});
		$('.stage5Name13').each(function() {
			$(this).css('-webkit-transform', 'translate3d(0,0,0)');
		});
	}, 44500);
	
	setTimeout(function() {
		stage6.init();
		
		$('#stage5Square7, #stage5Square8, #stage5Square9').css('-webkit-transform', 'translate3d(0,192px,0)');
		$('#stage5Square23').css('-webkit-transform', 'translate3d(0,-192px,0)');
		
		setTimeout(function() {
			$('#stage5Square8').css('-webkit-transform', 'translate3d(192px,192px,0)');
			$('#stage5Square12, #stage5Square15').css('-webkit-transform', 'translate3d(192px,0,0)');
			$('#stage5Square24').css('-webkit-transform', 'translate3d(0,0,0)');
			
			setTimeout(function() {
				$('#stage5Square7').css('-webkit-transform', 'translate3d(-192px,192px,0)');
				$('#stage5Square11, #stage5Square14').css('-webkit-transform', 'translate3d(-192px,0,0)');
				$('#stage5Square28').css('-webkit-transform', 'translate3d(0,192px,0)');

				setTimeout(function() {
					$('#stage5Square10, #stage5Square13').css('-webkit-transform', 'translate3d(192px,0,0)');
					$('#stage5Square22').css('-webkit-transform', 'translate3d(0,0,0)');
					$('#stage5Square23').css('-webkit-transform', 'translate3d(192px,-192px,0)');

					setTimeout(function() {
						$('#stage5Square10').css('-webkit-transform', 'translate3d(192px,-192px,0)');
						$('#stage5Square12').css('-webkit-transform', 'translate3d(192px,-192px,0)');
						$('#stage5Square28').css('-webkit-transform', 'translate3d(0,0,0)');
						$('#stage5Square30').css('-webkit-transform', 'translate3d(0,0,0)');

						setTimeout(function() {
							$('#stage5Square14').css('-webkit-transform', 'translate3d(-192px,192px,0)');
							$('#stage5Square8').css('-webkit-transform', 'translate3d(192px,384px,0)');
							$('#stage5Square23').css('-webkit-transform', 'translate3d(192px,0,0)');
							$('#stage5Square27').css('-webkit-transform', 'translate3d(0,-384px,0)');

							setTimeout(function() {
								$('#stage5Square11').css('-webkit-transform', 'translate3d(-384px,0,0)');
								$('#stage5Square12').css('-webkit-transform', 'translate3d(0,-192px,0)');
								$('#stage5Square23').css('-webkit-transform', 'translate3d(0,0,0)');
								$('#stage5Square29').css('-webkit-transform', 'translate3d(0,0,0)');

								setTimeout(function() {
									$('#stage5Square14').css('-webkit-transform', 'translate3d(-192px,384px,0)');
									$('#stage5Square12').css('-webkit-transform', 'translate3d(0,0,0)');
									$('#stage5Square26').css('-webkit-transform', 'translate3d(0,-192px,0)');
									$('#stage5Square27').css('-webkit-transform', 'translate3d(0,-192px,0)');

									setTimeout(function() {
										$('#stage5Square12').css('-webkit-transform', 'translate3d(0,192px,0)');
										$('#stage5Square25').css('-webkit-transform', 'translate3d(0,0,0)');
										$('#stage5Square26').css('-webkit-transform', 'translate3d(0,0,0)');
										$('#stage5Square27').css('-webkit-transform', 'translate3d(0,0,0)');
									}, 550);
								}, 550);
							}, 550);
						}, 550);
					}, 550);
				}, 550);
			}, 550);
		}, 550);
	}, 52000);

	setTimeout(function() {
		$('#stage5Square22, #stage5Square23, #stage5Square24').css('-webkit-transform', 'translate3d(0,192px,0)');
		$('#stage5Square32').css('-webkit-transform', 'translate3d(0,-192px,0)');
		
		setTimeout(function() {
			$('#stage5Square23').css('-webkit-transform', 'translate3d(192px,192px,0)');
			$('#stage5Square27, #stage5Square30').css('-webkit-transform', 'translate3d(192px,0,0)');
			$('#stage5Square33').css('-webkit-transform', 'translate3d(0,0,0)');
			
			setTimeout(function() {
				$('#stage5Square22').css('-webkit-transform', 'translate3d(-192px,192px,0)');
				$('#stage5Square26, #stage5Square29').css('-webkit-transform', 'translate3d(-192px,0,0)');
				$('#stage5Square37').css('-webkit-transform', 'translate3d(0,192px,0)');

				setTimeout(function() {
					$('#stage5Square25, #stage5Square28').css('-webkit-transform', 'translate3d(192px,0,0)');
					$('#stage5Square31').css('-webkit-transform', 'translate3d(0,0,0)');
					$('#stage5Square32').css('-webkit-transform', 'translate3d(192px,-192px,0)');

					setTimeout(function() {
						$('#stage5Square25').css('-webkit-transform', 'translate3d(192px,-192px,0)');
						$('#stage5Square27').css('-webkit-transform', 'translate3d(192px,-192px,0)');
						$('#stage5Square37').css('-webkit-transform', 'translate3d(0,0,0)');
						$('#stage5Square39').css('-webkit-transform', 'translate3d(0,0,0)');

						setTimeout(function() {
							$('#stage5Square29').css('-webkit-transform', 'translate3d(-192px,192px,0)');
							$('#stage5Square23').css('-webkit-transform', 'translate3d(192px,384px,0)');
							$('#stage5Square32').css('-webkit-transform', 'translate3d(192px,0,0)');
							$('#stage5Square36').css('-webkit-transform', 'translate3d(0,-384px,0)');

							setTimeout(function() {
								$('#stage5Square26').css('-webkit-transform', 'translate3d(-384px,0,0)');
								$('#stage5Square27').css('-webkit-transform', 'translate3d(0,-192px,0)');
								$('#stage5Square32').css('-webkit-transform', 'translate3d(0,0,0)');
								$('#stage5Square38').css('-webkit-transform', 'translate3d(0,0,0)');

								setTimeout(function() {
									$('#stage5Square29').css('-webkit-transform', 'translate3d(-192px,384px,0)');
									$('#stage5Square27').css('-webkit-transform', 'translate3d(0,0,0)');
									$('#stage5Square35').css('-webkit-transform', 'translate3d(0,-192px,0)');
									$('#stage5Square36').css('-webkit-transform', 'translate3d(0,-192px,0)');

									setTimeout(function() {
										$('#stage5Square27').css('-webkit-transform', 'translate3d(0,192px,0)');
										$('#stage5Square34').css('-webkit-transform', 'translate3d(0,0,0)');
										$('#stage5Square35').css('-webkit-transform', 'translate3d(0,0,0)');
										$('#stage5Square36').css('-webkit-transform', 'translate3d(0,0,0)');
										
										setTimeout(disintegrate, 3000);
									}, 550);
								}, 550);
							}, 550);
						}, 550);
					}, 550);
				}, 550);
			}, 550);
		}, 550);
	}, 60000);
	
	function disintegrate() {
		var DELAY = 100;
		$('#stage5').addClass('disintegrating');
		$('#stage5Square7, #stage5Square8, #stage5Square9, #stage5Square10, #stage5Square11, #stage5Square12, #stage5Square13, #stage5Square14, #stage5Square15, #stage5Square22, #stage5Square23, #stage5Square24, #stage5Square25, #stage5Square26, #stage5Square27, #stage5Square28, #stage5Square29, #stage5Square30').remove();
		fallAway($('#stage5Square35'));
		
		setTimeout(function() {
			fallAway($('#stage5Square34'));
			setTimeout(function() {
				fallAway($('#stage5Square38'));
				setTimeout(function() {
					fallAway($('#stage5Square36'));
					setTimeout(function() {
						fallAway($('#stage5Square32'));
						setTimeout(function() {
							fallAway($('#stage5Square37'));
							setTimeout(function() {
								fallAway($('#stage5Square17'));
								setTimeout(function() {
									fallAway($('#stage5Square39'));
									setTimeout(function() {
										fallAway($('#stage5Square33'));
										setTimeout(function() {
											fallAway($('#stage5Square5'));
											setTimeout(function() {
												fallAway($('#stage5Square31'));
												setTimeout(function() {
													fallAway($('#stage5Square16'));
													setTimeout(function() {
														fallAway($('#stage5Square20'));
															setTimeout(function() {
																fallAway($('#stage5Square18'));
																setTimeout(function() {
																	fallAway($('#stage5Square6'));
																	setTimeout(function() {
																		fallAway($('#stage5Square2'));
																		setTimeout(function() {
																			fallAway($('#stage5Square4'));
																			setTimeout(function() {
																				fallAway($('#stage5Square19'));
																				setTimeout(function() {
																					fallAway($('#stage5Square21'));
																					setTimeout(function() {
																						fallAway($('#stage5Square3'));
																						setTimeout(function() {
																							fallAway($('#stage5Square1'));
																						}, DELAY);
																					}, DELAY);
																				}, DELAY);
																			}, DELAY);
																		}, DELAY);
																	}, DELAY);
																}, DELAY);
															}, DELAY);
													}, DELAY);
												}, DELAY);
											}, DELAY);
										}, DELAY);
									}, DELAY);
								}, DELAY);
							}, DELAY);
						}, DELAY);
					}, DELAY);
				}, DELAY);
			}, DELAY);
		}, DELAY);
	}
	
	function fallAway(item) {
		var rotateX = Math.random() * 360;
		var rotateY = Math.random() * 360;
		var rotateZ = Math.random() * 360;
		item
			.css('opacity', 0)
			.css('-webkit-transform', 'translate3d(0,0,-2000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) rotateZ(' + rotateZ + 'deg)')
	}
}