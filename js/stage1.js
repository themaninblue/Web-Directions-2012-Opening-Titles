window.video = null;
var stage1 = {};

(function() {
	var animating = false;
	
	stage1.init = function() {
		var fov = 70;
		var canvasWidth = 320 / 2;
		var canvasHeight = 240 / 2;
		var vidWidth = 320;
		var vidHeight = 240;
		var tiltSpeed = 0.1;
		var tiltAmount = 0.5;
		
		var camera, scene, renderer;
		var mouseX = 0;
		var mouseY = 0;
		var windowHalfX, windowHalfY;
		var video, videoTexture;
		var world3D;
		var geometry;
		var vidCanvas;
		var ctx;
		var pixels;
		var wireMaterial;
		var meshMaterial;
		var container;
		var params;
		
		
		//init HTML elements
		container = document.querySelector('#stage1');
	
		var hasWebgl = (function() {
			try {
				return !!window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');
			} catch (e) {
				return false;
			}
		})();
	
		initialise();
		
		function initialise() {
			//init control panel
			params = new WCMParams();
		
			//Init 3D
			scene = new THREE.Scene();
			camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 5000);
			stage1.camera = camera;
			scene.add(camera);
			camera.position.x = -50;
			camera.position.z = 10;
			camera.rotation.x = -Math.PI/2;
			camera.rotation.y = Math.PI;
			camera.rotation.z = Math.PI;
			camera.target = new THREE.Vector3(0, 0, 0);
	/*		
			camera.position.z = 600;
			camera.rotation.z = Math.PI;
	*/
		
			//init webcam texture
			window.video = document.createElement('video');
			window.video.width = vidWidth;
			window.video.height = vidHeight;
			window.video.autoplay = true;
			window.video.loop = true;
		
			//make it cross browser
			window.URL = window.URL || window.webkitURL;
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

			world3D = new THREE.Object3D();
			scene.add(world3D);
		
			lines = [];
			var lineMaterial = new THREE.LineBasicMaterial({
				color: 0xffffff,
				linewidth: 3
			});
			lineMaterial.vertexColors = true;
			
			for (var i = 0; i < canvasHeight; i++) {
				var lineGeometry = new THREE.Geometry();
				lineGeometry.dynamic = true;
				for (var j = 0; j < canvasWidth; j++) {
					lineGeometry.vertices.push(new THREE.Vector3(j * 640 / canvasWidth - 320, i * 480 / canvasHeight - canvasHeight*2, 0));
					var segmentColor = new THREE.Color(0xffffff);
					lineGeometry.colors.push(segmentColor);
				}
				var line = new THREE.Line(lineGeometry, lineMaterial);
				lines.push(line);
				world3D.add(line);
			}
			
			//init renderer
			renderer = new THREE.WebGLRenderer({
				antialias: true
			});
			renderer.sortObjects = false;
			renderer.setSize(window.innerWidth, window.innerHeight);
			container.appendChild(renderer.domElement);
		
			//init vidCanvas - used to analyze the video pixels
			vidCanvas = document.createElement('canvas');
			ctx = vidCanvas.getContext('2d');
		
			//init listeners
			window.addEventListener('resize', onResize, false);
		
			//handle WebGL context lost
			renderer.domElement.addEventListener("webglcontextlost", function(event) {
				alert('WebGL Context Lost. Please try reloading the page.');
			}, false);
		
			onResize();
		
			animating = true;
			animate();

			$('#loading2').removeClass('on');
			$('#loading3').addClass('on');

			//get webcam
			navigator.getUserMedia({
				video: true
			}, function(stream) {
				$('#loading3').removeClass('on');
				//on webcam enabled
				window.video.src = window.URL.createObjectURL(stream);
				setTimeout(function() {
					startTimeline();
				}, 5000)
			}, function(error) {
				alert('Unable to capture WebCam. Please reload the page.');
			});
		}
		
		// params for dat.gui
		function WCMParams() {
			this.zoom = 1;
			this.mOpac = 1;
			this.wfOpac = 0.1;
			this.contrast = 3;
			this.saturation = 1;
			this.invertZ = false;
			this.zDepth = 400;
			this.noiseStrength = 200;
			this.noiseScale = 0.01;
			this.noiseSpeed = 0.02;
		}
		
		function getZDepths() {
			try {
				//draw webcam video pixels to canvas for pixel analysis
				//double up on last pixel get because there is one more vert than pixels
				ctx.drawImage(window.video, 0, 0, canvasWidth + 1, canvasHeight + 1);
				pixels = ctx.getImageData(0, 0, canvasWidth + 1, canvasHeight + 1).data;
			
				// Colour the 3d lines according to the video stream
				for (var i = 0; i < canvasWidth + 1; i++) {
					for (var j = 0; j < canvasHeight + 1; j++) {
						var color = new THREE.Color(getColor(canvasWidth + 1 - i, j));
			
						if (lines[j] != null) {
							if (lines[j].geometry.colors[i] != null) {
								lines[j].geometry.colors[i] = color;			
								lines[j].geometry.colorsNeedUpdate = true;
							}
						}
					}
				}
			
				// Change the z-position of the 3d line vertices according to audio data	
				for (var i = 0; i < lines.length; i++) {
					for (var j = 0; j < lines[i].geometry.vertices.length; j++) {
						if (i < lines.length-1) {
							var newZ = lines[i+1].geometry.vertices[j].z * 0.986;
						}
						else {
							var newZ = window.audioAnalyserData[Math.floor(j / lines[i].geometry.vertices.length * window.audioAnalyserData.length)];
						}
						lines[i].geometry.vertices[j].z = newZ;
					}
					lines[i].geometry.verticesNeedUpdate = true;
				}
			}
			catch(error) {
			}
		}
		
		function onMouseMove(event) {
			mouseX = (event.clientX - windowHalfX) / (windowHalfX);
			mouseY = (event.clientY - windowHalfY) / (windowHalfY);
		}
		
		function animate() {
			if (window.video.readyState === window.video.HAVE_ENOUGH_DATA) {
				getZDepths();
			}
			if (animating) {
				requestAnimationFrame(animate);
				render();
			}
		}
		
		function render() {
			world3D.scale = new THREE.Vector3(params.zoom, params.zoom, 1);
			world3D.rotation.x += ((mouseY * tiltAmount * 2.8) - world3D.rotation.x) * tiltSpeed;
			world3D.rotation.y += ((mouseX * tiltAmount) - world3D.rotation.y) * tiltSpeed;
	//		camera.lookAt(camera.target);
	//		camera.rotation.z = Math.PI;
			renderer.render(scene, camera);
		}
		
		function onResize() {
			renderer.setSize(window.innerWidth, window.innerHeight);
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			windowHalfX = window.innerWidth / 2;
			windowHalfY = window.innerHeight / 2;
		}
		
		// Returns a hexidecimal color for a given pixel in the pixel array.
		function getColor(x, y) {
			var base = (Math.floor(y) * (canvasWidth + 1) + Math.floor(x)) * 4;
			var c = {
				r: pixels[base + 0],
				g: pixels[base + 1],
				b: pixels[base + 2],
				a: pixels[base + 3]
			};
			return (c.r << 16) + (c.g << 8) + c.b;
		}
	};
	
	stage1.preGo = function() {
		$('#stage1').addClass('on');
	}
	
	stage1.go = function(event) {
		$(document).unbind(event);
		
		TweenLite.to(
			stage1.camera.rotation,
			20,
			{
				delay: 8,
				ease: Cubic.easeInOut,
				x: -Math.PI/5,
				y: 0
			}
		);
		TweenLite.to(
			stage1.camera.position,
			20,
			{
				delay: 8,
				ease: Cubic.easeInOut,
				x: 0,
				z: 200,
				y: 260
			}
		);
		TweenLite.to(
			stage1.camera.rotation,
			20,
			{
				delay: 28,
				ease: Cubic.easeInOut,
				x: 0
			}
		);
		TweenLite.to(
			stage1.camera.position,
			20,
			{
				delay: 28,
				ease: Cubic.easeInOut,
				y: 0,
				z: 250
			}
		);
	};
	
	stage1.text = function() {
		$('#stage1Text').addClass('phase2');
	};
	
	stage1.text2 = function() {
		$('#stage1Text').addClass('phase3');
	};
	
	stage1.text3 = function() {
		$('#stage1Text > span').each(function() {
			var text = $(this).text();
			var html = '';
			
			for (var i = 0; i < text.length; i++) {
				html += '<span>' + text[i] + '</span>';
			}
			
			$(this).html(html);
		});
		
		$('#stage1Text span span').each(function() {
			var $this = $(this);
			setTimeout(function() {
				$this.addClass('off');
			}, Math.random() * 4000);
		});
		$('#stage1Text').addClass('phase4');
	};
	
	stage1.textStop = function() {
		$('#stage1Text').remove();
	};
	
	stage1.stop = function() {
		animating = false;
		$('#stage1').remove();
	}
})();