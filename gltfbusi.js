if (!Detector.webgl) Detector.addGetWebGLMessage();
class ColorGUIHelper {
	constructor(object, prop) {
		this.object = object;
		this.prop = prop;
		
	}
	get value() {
		return `#${this.object[this.prop].getHexString()}`;
	}
	set value(hexString) {
		this.object[this.prop].set(hexString);
	}
}
class DirectionColorGUIHelper{
	constructor(object, intensity){
		this.object = object;
		this.intensity = intensity;
		this.factor = 1;
	}

	get value() {
		return `#${this.object[this.intensity].getHexString()}`;
	}
	set value(hexString) {
		this.object[this.intensity].set(hexString);
	}

}
let t = 0;
let radius = 0;
let Dlight;
let Plight;
var container, controls, dragcontrols, objectcontrols;
var modelLoaded = false
// var stats; 
container = document.getElementById('container');
var width = container.clientWidth;
var height = container.clientHeight;
var camera, scene, renderer, light;
var model;
var clock = new THREE.Clock();
const arbdata = [{ "x": 22.499557891500686, "y": -2.640000889929751, "z": -3.355519010252323 }, { "x": 12.13292120562273, "y": -0.48415458527208055, "z": 3.154151817770524 }, { "x": -0.2296171760537442, "y": -2.663710277250383, "z": -6.2442337106701284 }, { "x": 12.891306014192082, "y": -0.6382222600370058, "z": -24.528325398190017 }, { "x": 32.466044233202105, "y": -4.581534038331053, "z": -15.74205642222342 }];
console.log(arbdata);
const threeData = [];
arbdata.forEach(el => {
	threeData.push(new THREE.Vector3(el.x, el.y, el.z));
})
console.log(threeData);
var mixers = [];
arbpoint = {
	x: 20.863026775674722, y: -2.1620702540168693, z: 6.044351569420495
}

// var spline = new THREE.SplineCurve3()
// console.log(spline);
// spline = new THREE.SplineCurve3(spline.getPoints(100));
// console.log(spline);

//tags
var camFlyPosIndex = 1000;
var camPosIndex = 1000;
var distanceDom = document.getElementById('distance');
var angleDom = document.getElementById('angle');
var vertexes = []
if(editMode){
	var count = 0;
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	var annotation = document.querySelector('#form');
    var point;
	var domPoss =[];
	var domPos = {
			x: 0,
			y: 0,
			z: 0
	};
	var enable= false;
	var angleEnable = false;
	var distanceEnable = true;
	var doms = [];
	var texts = [];
	var colorClasses = [];
	var parentDoms = [];
	var textareas = [];
	var legendDom = [];
	var legendContDom = document.getElementById('legend');
}
var mixers = [];
init();
animate();
if(editMode == true){
	console.log('DomPoss ', domPoss);
	while (domPoss.length !== 0) {
		domPoss.pop();
	}            
	console.log(locations);
	if(locations.length != 0){
		locations = locations[0];
	}
	if(descriptions.length != 0){
		descriptions = descriptions[0];
	}
	console.log('Locations',locations);
	console.log('Descriptions',descriptions);
	console.log('DomPoss ', domPoss);
	if(locations != undefined){
		locations.forEach(function(point,index){
			console.log(point);
			// domPos.point = element;
			// console.log(domPos);
			domPoss.push(point);
			console.log(index, domPoss);
		});             
	}
	if(existingColorClasses != undefined){
		colorClasses = existingColorClasses;
		console.log(colorClasses);
	}
	if(descriptions != undefined){
		descriptions.forEach(function(element, index){
			console.log(element);
			console.log(domPoss[index]);
			console.log(colorClasses[index]);
			existingInfo(domPoss[index], element, colorClasses[index]);
		});
	}
	var submit = document.getElementById('submit'); 
	var call = function(e){
		e.preventDefault();
		console.log(document.getElementById('colorIcon').value);
		var colorClass = document.getElementById('colorIcon').value;
		console.log('Adding colorClass to colorClasses array');
		colorClasses.push(colorClass);
		console.log('loaded');
		var canvas = document.getElementById("number");
		var ctx = canvas.getContext("2d");
		var text = document.getElementById('exampleFormControlTextarea1').value;
		texts.push[text];
		var ctx = canvas.getContext("2d");
		
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(0,0,200,100);
		
		ctx.fillStyle = "rgb(255, 255, 255)";
		ctx.font = "32px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(text, 50,50);
		document.getElementById('form').style.display = 'none';
		info(point,text, colorClass);
	}
	submit.addEventListener("click", call, false);
	// End TAGG
}

function init() {

	// container = document.createElement( 'div' );
	// document.body.appendChild( container );

	camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 10e9);
	camera.position.set( 100, 100, 100);
	camera.up.set(0, 1 ,0);
	
	controls = new THREE.OrbitControls(camera, container);
	scene = new THREE.Scene();

	const color = 0x808080;
	const intensity = 2;
	const Dlight = new THREE.DirectionalLight(color, intensity);
	Dlight.position.set(1, 1, 1);
	scene.add(Dlight);
	
	const Alight = new THREE.AmbientLight(color, intensity);
	scene.add(Alight);
	 
	const Plight = new THREE.PointLight(color, intensity);
	camera.add( Plight );
	   scene.add( camera );

	//const gui = new dat.GUI();
	//gui.__ul.style.minHeight = 'fit-content';
	//var f1 = gui.addFolder('Directional Light');
	// let DlightPos = new ColorGUIHelper(Dlight, 'color','intensity', 'factor') 
	// gui.addColor(new ColorGUIHelper(Dlight, 'color'), 'value').name('Directional light color');
	// gui.add(Dlight, 'intensity', 0, 2, 0.01).name('Directional light intensity');
	// gui.add(DlightPos, 'factor', 0, 2).name('Position')

	//let DlightPos = new DirectionColorGUIHelper(Dlight,'color');
	//gui.addColor(DlightPos, 'value').name('Directional light color')
	//gui.add(Dlight, 'intensity', 0,2,0.01).name('Directional light intensity');
	//dLightPoaController = gui.add(DlightPos, 'factor', 0,2,0.01).name('Directional light Position');
	//dLightPoaController.onChange((val)=>{
	//	Dlight.position.x = 1.5*radius*Math.cos(val*Math.PI);
	//	Dlight.position.z = 1.5*radius*Math.sin(val*Math.PI);
	//})
//
	////var f2 = gui.addFolder('Ambient Light');
	//gui.addColor(new ColorGUIHelper(Alight, 'color'), 'value').name('Ambient light color');
	//gui.add(Alight, 'intensity', 0, 2, 0.01).name('Ambient light intensity');
//
	////var f3 = gui.addFolder('Point Light');
	//gui.addColor(new ColorGUIHelper(Plight, 'color'), 'value').name('Point light color');
	//gui.add(Plight, 'intensity', 0, 2, 0.01).name('Point light intensity');
//
	//var customContainer = document.getElementById('pointctrl');
	//customContainer.appendChild(gui.domElement);
   	//scene.add( camera );
	
	// scene.background = new THREE.Color( 0x1c0c4e );
	// var axisHelper = new THREE.AxisHelper(100);
	// scene.add(axisHelper);
	// var directionalLight = new THREE.DirectionalLight( 0xffeedd );
	// directionalLight.position.set( 0, 0, 1 );
	// scene.add( directionalLight );
	// var directionalLight = new THREE.DirectionalLight(0xffffff, 0.1);
	// directionalLight.position.set(1, 1, 1);
	// scene.add(directionalLight);
	// var directionalLight1 = new THREE.DirectionalLight(0xffffff,0.1);
	// directionalLight1.position.set(-1, -1, -1);
	// scene.add(directionalLight1);
	// var directionalLight2 = new THREE.DirectionalLight(0xffffff, 1);
	// directionalLight2.position.set(1, 1, -1);
	// scene.add(directionalLight2);
	// var directionalLight3 = new THREE.DirectionalLight(0xffffff, 1);
	// directionalLight3.position.set(-1, 1, -1);
	// scene.add(directionalLight3);
	// var directionalLight4 = new THREE.DirectionalLight(0xffffff, 1);
	// directionalLight4.position.set(1, -1, -1);
	// scene.add(directionalLight4);
	// var directionalLight5 = new THREE.DirectionalLight(0xffffff, 1);
	// directionalLight5.position.set(-1, -1, 1);
	// scene.add(directionalLight5);
	// var directionalLight6 = new THREE.DirectionalLight(0xffffff, 1);
	// directionalLight6.position.set(1, -1, 1);
	// scene.add(directionalLight6);
	// var directionalLight7 = new THREE.DirectionalLight(0xffffff, 1);
	// directionalLight7.position.set(-1, 1, 1);
	// scene.add(directionalLight7);	

	// light = new THREE.DirectionalLight( 0xffffff );
	// light.position.set( 0, 200, 100 );
	// light.castShadow = true;
	// light.shadow.camera.top = 180;
	// light.shadow.camera.bottom = -100;
	// light.shadow.camera.left = -120;
	// light.shadow.camera.right = 120;
	// scene.add( light );

	// scene.add( new THREE.CameraHelper( light.shadow.camera ) );

	// ground
	// var mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2000, 2000 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
	// mesh.rotation.x = - Math.PI / 2; 
	// mesh.receiveShadow = true;
	// scene.add( mesh );

	// var grid = new THREE.GridHelper( 2000, 20, 0x000000, 0x000000 );
	// grid.material.opacity = 1;
	// grid.material.transparent = true;
	// scene.add( grid );

	var manager = new THREE.LoadingManager();
	manager.onProgress = function (item, loaded, total) {

		console.log(item, loaded, total);

	};


	var onProgress = function (xhr) {
		console.log(xhr)
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			document.getElementById('loaded').innerText = Math.round(percentComplete, 2) + '% downloaded';
			console.log(Math.round(percentComplete, 2) + '% downloaded');
		} else {
			document.getElementById('loaded').innerText = (xhr.loaded / Math.pow(10, 6)).toPrecision(3) + 'MB downloaded';
		}
		if (xhr.loaded == xhr.total) {
			document.getElementById('loaded').innerText = 'Rendering...';
		}
	};

	var onError = function (xhr) {
		console.log(xhr);
	};
    // model
	var loader = new THREE.GLTFLoader(manager);
	// loader.crossOrigin('');
    loader.load(objFile, function (gltf) {
		gltfG = gltf
		model = gltf.scene;
		modelLoaded = true;
		model.traverse(function (child) {
			if (child instanceof THREE.Mesh) {
				console.log(child)
				// if(child instanceof THREE.Object3D){
				// 	child.position.set(0,0,0)
				// }
				if(child.material instanceof Array){
					child.material.forEach((mat)=>{
					  mat.side = THREE.DoubleSide;
					})
				  }else{
					child.material.side = THREE.DoubleSide;
				  }
				// child.material.side = THREE.DoubleSide;
				// child.material.needsUpdate = true;
				// gridhelper.add(child)
			}
		});
		let box = new THREE.Box3();
		box.setFromObject(model)
		console.log(box)
		scene.add(model)
		if(gltf.animations.length>0){
			let mixer = new THREE.AnimationMixer(gltf.scene);
			mixers.push(mixer);
			let action = mixer.clipAction(gltf.animations[0]);
			action.play();
			const primectrl = document.getElementById('primectrl');
			if(primectrl){
				let animateButton = document.createElement('button');
				animateButton.classList.add('btn')
				animateButton.classList.add('btn-primary')
				animateButton.classList.add('btn-sm')
				animateButton.classList.add('m-2')
				animateButton.innerHTML = 'Toggle Animation';
				animateButton.addEventListener('click', ()=>{
					animateButton.classList.toggle('btn-primary');
					animateButton.classList.contains('btn-primary')? action.play(): action.stop();
				})
				primectrl.appendChild(animateButton)
			}
		}
		// console.log(box.getBoundingSphere())
		// console.log(radius)
		// camera.position.set(radius, radius, radius);
		//console.log(box.getBoundingSphere().radius)
		//radius = box.getBoundingSphere().radius;
		let sphere = new THREE.Sphere()
		box.getBoundingSphere(sphere)
		radius = sphere.radius
		console.log(radius)
		camera.position.set(radius, radius, radius);
		//camera.position.set(box.getBoundingSphere().radius, box.getBoundingSphere().radius, box.getBoundingSphere().radius);
		setTimeout(() => {
			document.getElementById('buffer').style.display = 'none';
		}, 2000);
    }, onProgress, onError)
	

	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
	renderer.setClearColor(0x000000, 0);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	container.appendChild(renderer.domElement);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	// controls.target.set( 0, 100, 0 )
	controls.update();
	window.addEventListener('resize', onWindowResize, false);
	if (admin == true) {
		document.addEventListener('dblclick', filter);
	}

	// stats
	// stats = new Stats();
	// container.appendChild( stats.dom );

}

function onWindowResize() {
	var width = container.clientWidth;
	var height = container.clientHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();

	renderer.setSize(width, height);
}

function animate() {
	requestAnimationFrame( animate );
	render();

	if(modelLoaded){
		model.rotation.y += 0.005;	
	}
	
	//camera.rotation.x += 0.01;
	
	renderer.render( scene, camera );
	//if(camPosIndex<90){
	//	camPosIndex++;
	//	console.log(camPosIndex);
	//	console.log(camPosIndex);
	//	var camPos = spline.getPoint(camPosIndex);
	//	var camRot = spline.getTangent(camPosIndex);
	//	
	//	camera.position.x = camPos.x;
	//	camera.position.y = camPos.y;
	//	camera.position.z = camPos.z;
	//	console.log(camera.position);
	//	
	//	camera.rotation.x = camRot.x;
	//	camera.rotation.y = camRot.y;
	//	camera.rotation.z = camRot.z;
	//	console.log(camera.rotation);
  //
	//	camera.lookAt(spline.getPoint((camPosIndex+1)));
	//}
	//if(camFlyPosIndex<1000){
	//	camFlyPosIndex++;
	//	console.log(camFlyPosIndex);
	//	var camPos = flyspline.getPoint(camFlyPosIndex);
	//	var camRot = flyspline.getTangent(camFlyPosIndex);
	//	
	//	camera.position.x = camPos.x;
	//	camera.position.y = camPos.y;
	//	camera.position.z = camPos.z;
	//	console.log(camera.position);
	//	
	//	camera.rotation.x = camRot.x;
	//	camera.rotation.y = camRot.y;
	//	camera.rotation.z = camRot.z;
	//	console.log(camera.rotation);
  //
	//	camera.lookAt(flyspline.getPoint((camFlyPosIndex+1)));
	//	if(camFlyPosIndex === 1000){
	//		camera.lookAt(new THREE.Vector3(domPoss[0].x,domPoss[0].y,domPoss[0].z));
	//		// camera.position.set(1.5 * box.getBoundingSphere().radius, 1.5 * box.getBoundingSphere().radius, 1.5 * box.getBoundingSphere().radius);
	//	}
  //}
	if(editMode ==true){
		updateScreenPosition();
	}
	// controls.update();
	//console.log(JSON.stringify(camera.position));
}
function render() {

	if (mixers.length > 0) {
		for (var i = 0; i < mixers.length; i++) {
			mixers[i].update(clock.getDelta());
		}
	}
	// console.log(gridhelper.rotation)
	renderer.render(scene, camera);
}
// Measurement Code
if(admin){

	var pointA = new THREE.Vector3( 0, 1, 0 );
	var pointB = new THREE.Vector3();
	// var pointC = new THREE.Vector3(1,0,0);
	var markerA = new THREE.Mesh( new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial( { color: 0xFF5555, opacity: 1, depthTest: false, depthWrite: false } ) );
	var markerB = markerA.clone();
	var markerC = markerB.clone();
	markerA.renderOrder = 1;
	markerB.renderOrder = 1;
	// markerC.renderOrder = 1;
	// scene.add( markerA );
	// scene.add( markerB );
	// scene.add( markerC );
	var line;
	var markers = [];
	var apexes = [];
	
	window.addEventListener('keydown', (event)=>{
		if(event.keyCode === 27){
			markerA.position.set(0,0,0);
			markerB.position.set(0,0,0);
			scene.remove(markerB);
			scene.remove(markerA);
			scene.remove(markerC);
			scene.remove(line);
			if(intersections.length >3){
				intersections.splice(0, intersections.length);
				scene.remove(sline);
				distanceDom.innerHTML = 'Distance:';
				angleDom.innerHTML = 'Angle:';
			}
		}
	})
	
	function getIntersections( event ) {
		var vector = new THREE.Vector2();
		vector.set(
			( event.clientX / container.clientWidth ) * 2 - 1,
			- ( event.clientY / container.clientHeight ) * 2 + 1 );
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera( vector, camera );
		let entities = []
		model.traverse((el)=>{
			if(el instanceof THREE.Mesh){
				entities.push(el)
			}
		})
		var intersects = raycaster.intersectObjects(entities);	
		// var intersects = raycaster.intersectObjects( model.children );
		console.log('Intersection ',intersects);
		return intersects;
	}
	
	function getLine( vectorA, vectorB ) {
		var geometry = new THREE.Geometry();
		geometry.vertices.push( vectorA );
		geometry.vertices.push( vectorB );
		var material = new THREE.LineBasicMaterial({
			color: 0xFF5555,
			depthWrite: false,
			depthTest: false
		});
		line = new THREE.Line( geometry, material );
		distanceDom.innerHTML = "Distance: "+ distance.toPrecision(3) +" m";
		return line;
	}
	
	function onDoubleClick( event ) {
		var intersects = getIntersections( event );
		if( intersects.length > 0 ){
			if ( ! pointB.equals( pointA ) ) {
				console.log('Not Equal B')
				pointB = intersects[ 0 ].point;
				console.log('pointB', pointB);
			} else {
				pointB = pointA;
				console.log('pointB', pointB);
			}
			// if ( ! pointC.equals( pointA ) ) {
			// 	console.log('Not equal C')
			// 	pointC = intersects[ 0 ].point;
			// 	console.log('pointC', pointC);
			// } else {
			// 	pointC = pointA;
			// 	console.log('pointC', pointC);
			// }
			scene.add( markerA );
			scene.add( markerB );
			pointA = intersects[ 0 ].point;
			console.log('pointA', pointA);
			markerA.position.copy( pointA );
			markerB.position.copy( pointB );
			// markerC.position.copy( pointC );
			vertexes.push(pointA);
			vertexes.push(pointB);
			// vertexes.push(pointC);
				// scene.add(pointA)
				// scene.add(pointB)
			distance = pointA.distanceTo( pointB );
			if ( line instanceof THREE.Line ) {
			scene.remove( line );
			}
			if ( distance > 0 ) {
				console.log( "distance", distance );
				line = getLine( pointA, pointB );
				scene.add(line);
			}
		}
	}
}

function toggleControls(choice){
	let controls = document.getElementsByClassName('control');
	choice.map((el,i)=>{
		if(el){
			controls[i].classList.remove('btn-primary');
		} else{
			controls[i].classList.add('btn-primary');
		}
	})
}
// Info Icons Functions
//function toggleTag(element){
//	console.log("GeoTagging ", enable);
//	if(enable){
//		enable = false;
//		let choice =[distanceEnable, angleEnable, enable];
//		console.log(distanceEnable, angleEnable, enable);
//		toggleControls(choice);
//	} else{
//		enable = true;
//		angleEnable = false;
//		distanceEnable = false;
//		let choice =[distanceEnable, angleEnable, enable];
//		console.log(distanceEnable, angleEnable, enable);
//		toggleControls(choice);
//	}
//}
//function toggleAngle(element){
//	console.log('Angle Measurement ', angleEnable);
//	if(angleEnable){
//		angleEnable = false;
//		let choice =[distanceEnable, angleEnable, enable];
//		console.log(distanceEnable, angleEnable, enable);
//		toggleControls(choice)
//	} else{
//		angleEnable = true;
//		enable = false;
//		distanceEnable = false;
//		let choice =[distanceEnable, angleEnable, enable];
//		console.log(distanceEnable, angleEnable, enable);
//		toggleControls(choice);		
//	}
//}
//function toggleDistance(element){
//	console.log('Distance Measurement ', distanceEnable);
//	if(distanceEnable){
//		distanceEnable = false;
//		let choice =[distanceEnable, angleEnable, enable];
//		console.log(distanceEnable, angleEnable, enable);
//		toggleControls(choice);	
//	} else{
//		distanceEnable = true;
//		enable = false;
//		angleEnable = false;
//		let choice =[distanceEnable, angleEnable, enable];
//		console.log(distanceEnable, angleEnable, enable);
//		toggleControls(choice);	
//	}
//}
function filter(event){
	if(enable){
		createInfo(event);
	}
	if(angleEnable){
		angle(event);
	}
	if(distanceEnable){
		onDoubleClick(event);		
	}
}

// Info Icons Functions
function createInfo(event){
    point = event;
    document.getElementById('form').style.display = 'block';
}
function existingInfo(coord, content, colors){
    var spriteMap = new THREE.CanvasTexture(
        document.querySelector('#number')
    )
    console.log("SpriteMap: ",spriteMap);
    // var spriteMap = new THREE.TextureLoader().load( "icon.png" );
    var spriteMaterial = new THREE.SpriteMaterial( { 
        map: spriteMap, 
        alphaTest: 0.5,
        transparent: true,
        depthTest: false,
        depthWrite: false
        } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(100, 100, 1);
    sprite.material.opacity = 0;
    sprite.position.x = (coord.x);
    sprite.position.y = (coord.y);
    sprite.position.z = (coord.z);
    console.log("Sprite: ",sprite);
    sprite.renderOrder =1;
    scene.add( sprite );
    tagDom(coord, content, colors);
}

function info(point,content,colorClass){
    console.log('Count: ', count);
    console.log(point);
    mouse.x = ( point.clientX / container.clientWidth ) * 2 - 1;
    mouse.y = - ( point.clientY / container.clientHeight ) * 2 + 1;
	raycaster.setFromCamera( mouse, camera );
	let entities = []
	model.traverse((el)=>{
		if(el instanceof THREE.Mesh){
			entities.push(el)
		}
	})
    var intersect = raycaster.intersectObjects(entities);
    console.log('Intersect',intersect);
    temp = intersect;
	var found;
	let first = 0;
    temp.forEach(function(element){
        Object.keys(element).forEach(function(key){
            // console.log(key, element[key]);
            if(key == 'object'){
                // console.log("Found");
                Object.keys(element[key]).forEach(function(ele){
                    if(element[key][ele] == 'Mesh'){
						console.log("Located");
						if(first == 0){
							found = element;
						}
						first++;				
                    }		
                });		
            }
        })
    })
    console.log("Found: ", found);
    domPos = found.point;
    console.log('Adding to domPoss');
    domPoss.push(domPos);
    var spriteMap = new THREE.CanvasTexture(
        document.querySelector('#number')
    )
    console.log("SpriteMap: ",spriteMap);
    // var spriteMap = new THREE.TextureLoader().load( "icon.png" );
    var spriteMaterial = new THREE.SpriteMaterial( { 
        map: spriteMap, 
        alphaTest: 0.5,
        transparent: true,
        depthTest: false,
        depthWrite: false
        } );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(100, 100, 1);
    sprite.material.opacity = 0;
    sprite.position.x = (found.point.x);
    sprite.position.y = (found.point.y);
    sprite.position.z = (found.point.z);
    console.log("Sprite: ",sprite);
    sprite.renderOrder =1;
    scene.add( sprite );
    tagDom(domPos, content, colorClass);
}
function tagDom(domPos, content, colorClass){
    console.log('DomPos', domPos);
    var vector = new THREE.Vector3(domPos.x, domPos.y, domPos.z);
    console.log('Initial ',vector);
    canvas = document.getElementsByTagName('canvas')[0];
    console.log(canvas);
    vector.project(camera);
    vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
    vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
    console.log('Projected: ', vector);
    // dom = document.getElementById('dom');
    var parentDom = document.createElement('div');
    parentDom.setAttribute('id','p'+count);
    parentDom.classList.add('justify-content-center');
    parentDom.style.position = 'absolute';
    container.appendChild(parentDom);
    parentDoms.push(parentDom);
    var dom = document.createElement('button');
    // var classIndex = Math.round((Math.random()*20));
    // console.log(colorClass[classIndex], classIndex);
    console.log("Adding Class");
    dom.classList.add('material-icons', 'large', colorClass);
    dom.setAttribute('id',count);
    dom.innerHTML = 'place';
    parentDom.appendChild(dom);
    var textarea = document.createElement('p');
	textarea.setAttribute('id','t'+count);
    textarea.innerHTML = content;
    parentDom.appendChild(textarea);
    textareas.push(textarea);
    parentDom.style.top = vector.y + "px";
    parentDom.style.left = vector.x + "px";
    dom.addEventListener('mouseover', function(){
        textarea.classList.remove('toolTipHide')
	},true);
	dom.addEventListener('click', ()=>{
		spline = new THREE.CatmullRomCurve3([new THREE.Vector3(domPos.x, domPos.y, domPos.z), camera.position]);
		console.log(spline)
		spline = new THREE.CatmullRomCurve3(spline.getPoints(100));
		// var geometry = new THREE.BufferGeometry().setFromPoints(spline.getPoints(100));

		// var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

		// Create the final object to add to the scene
		// controls.target = new THREE.Vector3(domPos.x, domPos.y, domPos.z);
	controls.target = new THREE.Vector3(0,0,0);

		// var curveObject = new THREE.Line( geometry, material );
		// scene.add(curveObject);
		camPosIndex = 0;
	});
    dom.addEventListener('mouseout', function(){
        textarea.classList.add('toolTipHide');
    },true);
	doms.push(dom);
	let legendList = document.createElement('li');
	let legendIcon = document.createElement('i');
	legendIcon.classList.add('material-icons', 'small', colorClass);
	legendIcon.innerHTML = 'place';
	legendList.appendChild(legendIcon);
	legendList.innerHTML += content;
	legendList.addEventListener('click', ()=>{
		spline = new THREE.CatmullRomCurve3([new THREE.Vector3(domPos.x, domPos.y, domPos.z), camera.position]);
		console.log(spline)
		spline = new THREE.CatmullRomCurve3(spline.getPoints(100));
		// var geometry = new THREE.BufferGeometry().setFromPoints(spline.getPoints(100));

		// var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );

		// Create the final object to add to the scene
		// controls.target = new THREE.Vector3(domPos.x, domPos.y, domPos.z);
	controls.target = new THREE.Vector3(0,0,0);

		// var curveObject = new THREE.Line( geometry, material );
		// scene.add(curveObject);
		camPosIndex = 0;
	});
	legendContDom.appendChild(legendList);
	legendDom.push(legendList);
	count++;
}
function updateScreenPosition() {
    domPoss.forEach(function(domPos, index){
        // console.log(index);
        // console.log(domPos.x, domPos.y, domPos.z);
				let vector = new THREE.Vector3(domPos.x, domPos.y, domPos.z);
				camera.updateMatrix(); // make sure camera's local matrix is updated
				camera.updateMatrixWorld(); // make sure camera's world matrix is updated
				camera.matrixWorldInverse.getInverse( camera.matrixWorld );
				
				let frustum = new THREE.Frustum();
				frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );
        let canvas = renderer.domElement;
        // console.log('Before Projecting', vector);
        vector.project(camera);
				if(frustum.containsPoint(vector)) {
					// console.log('within camera view');
					vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
					vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
					// console.log(vector.x, vector.y)
					parentDoms[index].style.display = 'block'
					parentDoms[index].style.top = vector.y + "px";
					parentDoms[index].style.left = vector.x + "px";
					let veco = new THREE.Vector3(0,0,0);
					if(camera.position.distanceTo(new THREE.Vector3(0,0,vector.z)) > camera.position.distanceTo(veco)){
						parentDoms[index].style.opacity = 0.25;
						// console.log('far')
					}else{
						parentDoms[index].style.opacity = 1;
						// console.log('near')
					}
					// console.log(oldvec,camera.position.distanceTo(new THREE.Vector3(0,0,vector.z)), camera.position.distanceTo(veco))
				}else {
					parentDoms[index].style.display = 'none'
					// console.log('outside camera view');
				}
        // console.log('After Projecting',vector);
				// console.log(parentDoms[index].style)
        // parentDoms[index].style.opacity = spriteBehindObject ? 0.25 : 1;
    });
}
const intersections = [];
function angle(event){
	if(intersections.length >3){
		console.log('removing')
		intersections.splice(0, intersections.length);
		scene.remove(sline);
	}
	let intersects = getIntersections( event );
	if( intersects.length > 0 ){
		console.log('pushing');
		console.log(intersects[0].point);
		intersections.push(intersects[0]);
		markerC.position.copy(intersects[0].point)
	}
	if(intersections.length == 1){
		scene.add(markerC);
	}
	if(intersections.length == 3){
		var geometry = new THREE.Geometry();
		intersections.forEach((intersect)=>{
				geometry.vertices.push( intersect.point );
			})
		var material = new THREE.LineBasicMaterial({
			color: 0xFF5555,
			depthWrite: false,
			depthTest: false
		});
		sline = new THREE.Line( geometry, material );
		console.log('drawing line');
		scene.add(sline);
		let dir1 = new THREE.Vector3();
		let dir2 = new THREE.Vector3();
		dir1.subVectors(intersections[0].point, intersections[1].point).normalize();
		dir2.subVectors(intersections[2].point, intersections[1].point).normalize();
		console.log(dir1,dir2);
		let rad = dir1.angleTo(dir2);
		console.log(rad);
		deg = rad*(180/Math.PI);
		console.log(deg);
		angleDom.innerHTML = "Angle: "+ deg.toPrecision(4);
		markerC.position.copy(intersections[1].point)
		// let anglemarker = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32, 0, rad), new THREE.MeshBasicMaterial( { color: 0xFF5555, opacity: 1, depthTest: false, depthWrite: false } ))
		// anglemarker.position.copy(intersections[1].point)
		// scene.add(anglemarker)
		intersections.push([]);
	}
}
function delTag(){
	console.log(domPoss)
	domPoss.pop();
	console.log(locations)
	locations.pop();
	console.log(descriptions)
	descriptions.pop();
	console.log(doms)
	doms[doms.length-1].remove();
	doms.pop();
	console.log(texts)
	console.log(colorClasses)
	colorClasses.pop();
	console.log(parentDoms)
	parentDoms[parentDoms.length-1].remove();
	parentDoms.pop();
	console.log(textareas)
	textareas[textareas.length-1].remove();
	textareas.pop();
	legendDom[legendDom.length-1].remove();
	legendDom.pop();
}
function toolTipToggle(){
	textareas.forEach((element)=>{
		element.classList.toggle('toolTipHide')
	})
}

// Fly through all tags
function flythrough(){
	let vectorArray = domPoss.map(value=>{
		return new THREE.Vector3(value.x, value.y, value.z)
	})
	console.log(vectorArray)
	vectorArray.unshift(camera.position);
	vectorArray.push(camera.position);
	flyspline = new THREE.CatmullRomCurve3(vectorArray);
	flyspline = new THREE.CatmullRomCurve3(flyspline.getPoints(1000))
	// var geometry = new THREE.BufferGeometry().setFromPoints(flyspline.getPoints(1000));
	// var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	controls.target = new THREE.Vector3(0,0,0);
	// var curveObject = new THREE.Line( geometry, material );
	// scene.add(curveObject);
	camFlyPosIndex = 0;
}
