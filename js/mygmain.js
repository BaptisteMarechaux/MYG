/* global THREE */
var camera, scene, renderer;
var cameraOrtho, sceneOrtho;

var attackButton, defendButton, itemButton, runButton;

var hpFront, hpBack, hpEBack, hpEFront;

var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
var attackSprite, defendSprite, itemSprite, runSprite;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//var canvas = document.getElementById("mycanvas");
var rendererWidth = 800;
var rendererHeight = 450;

var cube, eCube;

init();
animate();

function init() {
	//Scene setting
	camera = new THREE.PerspectiveCamera( 60, rendererWidth / rendererHeight, 1, 2100 );
	camera.position.z = 150;

	cameraOrtho = new THREE.OrthographicCamera( - rendererWidth / 2, rendererWidth / 2, rendererHeight / 2, - rendererHeight / 2, 1, 10);
	cameraOrtho.position.z = 10;

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog( 0x000000, 1500, 2100 );

	sceneOrtho = new THREE.Scene();
	
	var geometry = new THREE.BoxGeometry( 10, 10, 10 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffaa00, transparent: true, blending: THREE.AdditiveBlending } );

	cube = new THREE.Mesh( geometry, material );
	scene.add( cube );
	
	var loader = new THREE.TextureLoader();
	
	
	//Objects
	
	//var mapA = loader.load('/img/blue128.png', createHUDSprites);
	//var mapA = THREE.ImageUtils.loadTexture( "img/blue128.png", undefined, createHUDSprites );
	// renderer
	var mapHpBack = loader.load('/img/blue128.png', createBackHpbars);
	var mapHp = loader.load('/img/green128.png', createFrontHpbars);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( rendererWidth, rendererHeight );
	renderer.autoClear = false; // To allow render overlay on top of sprited sphere

	document.body.appendChild( renderer.domElement );
	
}

function createBackHpbars(texture) {
	var material = new THREE.SpriteMaterial( { map: texture } );

	var width = material.map.image.width;
	//var height = material.map.image.height;
	
	hpBack = new THREE.Sprite(material);
	hpEBack = new THREE.Sprite(material);


	hpBack.scale.set(width, 30, 1);
	hpEBack.scale.set(width, 30, 1);
	sceneOrtho.add(hpBack );
	sceneOrtho.add(hpEBack );
	hpEBack.position.set(-300, 100, 1 );
	
	hpBack.position.set(300, -64, 1);
}

function createFrontHpbars(texture) {
	var material = new THREE.SpriteMaterial( { map: texture } );

	var width = material.map.image.width;
	//var height = material.map.image.height;
	
	hpFront= new THREE.Sprite(material);
	hpEFront = new THREE.Sprite(material);


	hpFront.scale.set(width, 30, 1);
	hpEFront.scale.set(width, 30, 1);
	sceneOrtho.add(hpFront);
	sceneOrtho.add(hpEFront);
	
	hpEFront.position.set(-300, 100, 2 );
	
	hpFront.position.set(300, -64, 2 );
}

function createHUDSprites ( texture ) {
	var material = new THREE.SpriteMaterial( { map: texture } );

	var width = material.map.image.width;
	var height = material.map.image.height;
	
	spriteC = new THREE.Sprite( material );
	spriteC.scale.set( width, height, 1 );
	sceneOrtho.add( spriteC );

	updateHUDSprites();

}

function updateHUDSprites () {

	var width = rendererWidth / 2;
	var height = rendererHeight / 2;

	var material = spriteTR.material;

	var imageWidth = material.map.image.width / 2;
	var imageHeight = material.map.image.height / 2;
	
	spriteC.position.set( 0, 0, 1 ); // center

}

function animate() {
	requestAnimationFrame( animate );
	render();
}

function render () {
	var time = Date.now() / 1000;
	
	// update the picking ray with the camera and mouse position	
	raycaster.setFromCamera( mouse, cameraOrtho );	

	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( sceneOrtho.children );
	for ( var i = 0; i < intersects.length; i++ ) {
		
		
		//intersects[ i ].object.material.color.set( 0xff0000 );
	
	}
	
	cube.rotation.x += 0.005;
	cube.rotation.y += 0.01;
	
	//spriteC.rotateOnAxis (new THREE.Vector3( 0, 0, 1 ), 0.05);
	
	renderer.render( scene, camera );
	
	renderer.clear();
	renderer.render( scene, camera );
	renderer.clearDepth();
	renderer.render( sceneOrtho, cameraOrtho );
}


function onMouseMove( event ) {

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / rendererWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / rendererHeight ) * 2 + 1;	

}

window.addEventListener('mousemove', onMouseMove);
