
var stage3 = {};

(function() {
	var animating = false;
	var fov = 70;
	var camera, scene, renderer;
	var windowHalfX, windowHalfY;
	var world3D;
	var geometry;
	var ctx;
	var pixels;
	var materials;
	var container;
	var lastTime;
	var drawQueue = [];
	var pixelCheck;
	var pixelCheckData;
	var zoomFactor = 10;
	var finalX;
	var finalY;
	var intervalTimer;
	
	stage3.init = function() {
		container = $('#stage3');
		var image = document.getElementsByTagName('img')[0];
		pixelCheck = document.createElement('canvas');
		pixelCheck.id = 'pixelCheck';
		pixelCheck.width = image.width;
		pixelCheck.height = image.height;
		var pixelCheckContext = pixelCheck.getContext('2d');
		pixelCheckContext.drawImage(image, 0, 0, image.width, image.height);
		pixelCheckData = pixelCheckContext.getImageData(0, 0, pixelCheck.width, pixelCheck.height).data;
		
		nonTransparentPixelCheckData = [];
		for (var i = 0; i < pixelCheckData.length; i+=4) {
			if (pixelCheckData[i+3] > 0) {
				nonTransparentPixelCheckData.push({x: (i % (pixelCheck.width*4)) / 4, y: Math.floor(i / (pixelCheck.width*4))});
			}
		}

		image.parentNode.removeChild(image);
		
		//Init 3D
		scene = new THREE.Scene();
		camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 5000);
		scene.add(camera);
		camera.position.x = pixelCheck.width/2 * zoomFactor;
		camera.position.z = -5000;
		camera.rotation.x = Math.PI;
		camera.target = new THREE.Vector3(0, 0, 0);

		materials = [
			new THREE.MeshLambertMaterial({color: 0x42b6ff}),
			new THREE.MeshLambertMaterial({color: 0xff0000}),
			new THREE.MeshLambertMaterial({color: 0x55d21e}),
			new THREE.MeshLambertMaterial({color: 0xffcc00})
		];

		// Create preloaded shapes
		for (var i = 0; i < 2000; i++) {
			var shape = new Shape(true);
			shape.preloaded = true;
			scene.add(shape.threeObj);
			drawQueue.push(shape);
		}
		
		// Create 3 static shapes
		finalX = 853 * zoomFactor;
		finalY = (630 - pixelCheck.height/2) * zoomFactor;
		// Cone
//		var shape1 = new THREE.Mesh(new THREE.CylinderGeometry(0, 50, 100, 30, 30, false), materials[0]);
		window.shape1 = new THREE.Mesh(new THREE.CylinderGeometry(0, 50, 100, 30, 30, false), materials[0]);
		var shape1 = window.shape1;
		shape1.overdraw = true;
		shape1.position.x = finalX + 70;
		shape1.position.y = finalY - 30;
		shape1.position.z = 100;
		shape1.rotation.x = Math.PI * 1.1;
		shape1.rotation.z = -Math.PI/10;
		scene.add(shape1);
		// Cylinder
//		var shape2 = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 40, 30, 30, false), materials[1]);
		window.shape2 = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 40, 30, 30, false), materials[1]);
		var shape2 = window.shape2;
		shape2.overdraw = true;
		shape2.position.x = finalX - 20;
		shape2.position.y = finalY + 20;
		shape2.position.z = -50;
		shape2.rotation.x = Math.PI/4;
		scene.add(shape2);
		// Cube
//		var shape3 = new THREE.Mesh(new THREE.CubeGeometry(80, 80, 80), materials[2]);
		window.shape3 = new THREE.Mesh(new THREE.CubeGeometry(80, 80, 80), materials[2]);
		var shape3 = window.shape3;
		shape3.overdraw = true;
		shape3.position.x = finalX - 40;
		shape3.position.y = finalY - 60;
		shape3.position.z = 20;
		shape3.rotation.x = -1.3;
		shape3.rotation.y = 0.3;
		shape3.rotation.z = Math.PI / 6;
		scene.add(shape3);
	
		// add subtle ambient lighting
		var ambientLight = new THREE.AmbientLight(0x111111);
		scene.add(ambientLight);

		// add directional light source
		var directionalLight = new THREE.DirectionalLight(0xffffff);
		directionalLight.position.set(-1, -1, -1).normalize();
		scene.add(directionalLight);

		//init renderer
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.sortObjects = false;
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.append(renderer.domElement);
	
		onResize();
		render();
		stage1.init();
	};
	
	stage3.go = function() {
		camera.position.x = window.innerWidth/2;
		camera.position.z = -1000;
		container.addClass('on');
		intervalTimer = setInterval(generateShape, 100);
		animating = true;
		animate();
	};
	
	stage3.stopShapes = function() {
		clearInterval(intervalTimer);
	};
	
	stage3.goCamera = function() {
		TweenLite.to(
			camera.position,
			16,
			{
				ease: Cubic.easeInOut,
				x: pixelCheck.width/2 * zoomFactor,
				z: -5000,
				onComplete: function() {
					breakApart();
					
					TweenLite.to(
						camera.position,
						10,
						{
							delay: 3,
							ease: Cubic.easeInOut,
							x: finalX - 30,
							y: finalY + 30,
							z: -220,
							onComplete: function() {
								stage4.go();
								stage3.stop();
							}
						}
					);
				}
			}
		);
	};
	
	stage3.stop = function() {
		animating = false;
		container.remove();
	};
	
	function generateShape() {
		var shape = new Shape();
		scene.add(shape.threeObj);
		drawQueue.push(shape);
	}
	
	function Shape(preload) {
		if (typeof preload == 'undefined') {
			preload = false;
		}
		
		var angle = -Math.PI*0.25 + Math.random() * Math.PI*0.5;
		var sin = Math.sin(angle);
		var cos = Math.cos(angle);
		var velocity = preload ? 0 : 0.45 + Math.random() * 0.1;
		var rotationType = Math.floor(Math.random() * 2);
		var rotationVelocity = Math.PI*0.1;
		var material = materials[Math.floor(Math.random() * materials.length)];
		var faces = preload ? 10 : 20;
		
		// Cone
		if (Math.random() < 0.333) {
			var shape = new THREE.Mesh(new THREE.CylinderGeometry(0, 50, 100, faces, faces, false), material);
		}
		// Cylinder
		else if (Math.random() > 0.5) {
			var shape = new THREE.Mesh(new THREE.CylinderGeometry(50, 50, 40, faces, faces, false), material);
		}
		
		// Cube
		else {
			var shape = new THREE.Mesh(new THREE.CubeGeometry(80, 80, 80), material);
		}
		
		shape.overdraw = true;
		if (preload) {
			var point = nonTransparentPixelCheckData[Math.floor(Math.random() * nonTransparentPixelCheckData.length)];
			var x = point.x * zoomFactor;
			var y = (point.y - pixelCheck.height/2) * zoomFactor;
			shape.position.x = x;
			shape.position.y = y;
		}
		else {
			shape.position.x = -window.innerWidth/1.35;
			shape.position.y = 0;
		}
		shape.rotation.x = Math.random() * Math.PI*2;
		shape.rotation.y = Math.random() * Math.PI*2;
		shape.rotation.z = Math.random() * Math.PI*2;
		scene.add(shape);
		
		function draw(timeDiff) {
			var _velocity = velocity;
			
			if (!preload) {
/*
				if (overlaps(shape.position.x, shape.position.y)) {
					_velocity = 0;
				}
*/
				
				shape.position.x += _velocity*cos * timeDiff;
				shape.position.y += _velocity*sin * timeDiff;
			}
			
			if (rotationType == 0) {
				shape.rotation.x += rotationVelocity / 10;
			}
			else {
				shape.rotation.y += rotationVelocity / 10;
			}
		}
		
		return {
			threeObj: shape,
			draw: draw
		}
	}
	
	function breakApart() {
		for (var i = 0; i < drawQueue.length; i++) {
			var shape = drawQueue[i];
			if (shape.preloaded) {
				TweenLite.to(
					shape.threeObj.position,
					14,
					{
						delay: Math.random() * 5,
						ease: Cubic.easeInOut,
						x: shape.threeObj.position.x + (-3000 + Math.random() * 6000),
						y: shape.threeObj.position.y + (-3000 + Math.random() * 6000),
						z: shape.threeObj.position.z + (-1000 + Math.random() * 2000)
					}
				);
			}
		}
	}
	
	function overlaps(x, y) {
		y = Math.round(y / zoomFactor + pixelCheck.height / 2);
		x = Math.round(x / zoomFactor);

		if (pixelCheckData[y * pixelCheck.width * 4 + x * 4 + 3] > 0) {
			return true;
		}
		
		return false;
	}
	
	function animate() {
		if (animating) {
			requestAnimationFrame(animate);
			
			var now = new Date().getTime();
			var timeDiff = now - lastTime;
			lastTime = now;
			
			for (var i = 0; i < drawQueue.length; i++) {
				drawQueue[i].draw(timeDiff);
			}
			
			render();
		}
	}
	
	function render() {
		renderer.render(scene, camera);
	}
	
	function onResize() {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
	}
})();