/*
 * Created by Cameron Adams on 18th September 2012
 * More info here: http://themaninblue.com/writing/perspective/2012/09/18/
 *
 */

(function() {
	var analyser;
	
	window.addEventListener('load', init, false);
	
	function init() {
		setupWebAudio();
		updateAudioData();
	}
	
	
	// Wire up the <audio> element with the Web Audio analyser (currently Webkit only)
	function setupWebAudio() {
		// Get our <audio> element
		var audio = document.getElementById('music');
		// Create a new audio context (that allows us to do all the Web Audio stuff)
		var audioContext = new webkitAudioContext();
		// Create a new analyser
		analyser = audioContext.createAnalyser();
		analyser.fftSize = 256;
		// Create a new audio source from the <audio> element
		var source = audioContext.createMediaElementSource(audio);
		// Connect up the output from the audio source to the input of the analyser
		source.connect(analyser);
		// Connect up the audio output of the analyser to the audioContext destination i.e. the speakers (The analyser takes the output of the <audio> element and swallows it. If we want to hear the sound of the <audio> element then we need to re-route the analyser's output to the speakers)
		analyser.connect(audioContext.destination);
	}
	
	// Update the audio data for other modules to access
	function updateAudioData() {
		// Setup the next data update, based on drawing frame rate
		webkitRequestAnimationFrame(updateAudioData);
		
		// Create a new array that we can copy the frequency data into
		window.audioAnalyserData = new Uint8Array(analyser.frequencyBinCount);
		// Copy the frequency data into our new array
		analyser.getByteFrequencyData(window.audioAnalyserData);
	}
})();