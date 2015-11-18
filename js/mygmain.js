/* global THREE */
var camera, scene, renderer;
var cameraOrtho, sceneOrtho;

var spriteTL, spriteTR, spriteBL, spriteBR, spriteC;
var attackSprite, defendSprite, itemSprite, runSprite;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

//var canvas = document.getElementById("mycanvas");
var rendererWidth = 800;
var rendererHeight = 450;

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
	
	var loader = new THREE.TextureLoader();
	
	//Objects
	var mapA = loader.load('/img/blue128.png', createHUDSprites);
	//var mapA = THREE.ImageUtils.loadTexture( "img/blue128.png", undefined, createHUDSprites );
	// renderer

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( rendererWidth, rendererHeight );
	renderer.autoClear = false; // To allow render overlay on top of sprited sphere

	document.body.appendChild( renderer.domElement );
	
}

function createHUDSprites ( texture ) {
	console.log("setting everything");
	var material = new THREE.SpriteMaterial( { map: texture } );

	var width = material.map.image.width;
	var height = material.map.image.height;
	
	attackSprite = new THREE.Sprite( material );
	attackSprite.scale.set( width, height, 1 );
	sceneOrtho.add( attackSprite );

	spriteTR = new THREE.Sprite( material );
	spriteTR.scale.set( width, height, 1 );
	sceneOrtho.add( spriteTR );

	spriteBL = new THREE.Sprite( material );
	spriteBL.scale.set( width, height, 1 );
	sceneOrtho.add( spriteBL );

	spriteBR = new THREE.Sprite( material );
	spriteBR.scale.set( width, height, 1 );
	sceneOrtho.add( spriteBR );
	
	spriteC = new THREE.Sprite( material );
	spriteC.scale.set( width, height, 1 );
	sceneOrtho.add( spriteC );

	updateHUDSprites();

}

function updateHUDSprites () {

	var width = rendererWidth / 2;
	var height = rendererHeight / 2;

	var material = spriteTR.material;
	
	console.log(material);

	var imageWidth = material.map.image.width / 2;
	var imageHeight = material.map.image.height / 2;

	attackSprite.position.set( - width + imageWidth,   height - imageHeight, 1 ); // top left
	spriteTR.position.set(   width - imageWidth,   height - imageHeight, 1 ); // top right
	spriteBL.position.set( - width + imageWidth, - height + imageHeight, 1 ); // bottom left
	spriteBR.position.set(   width - imageWidth, - height + imageHeight, 1 ); // bottom right
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

		intersects[ i ].object.material.color.set( 0xff0000 );
	
	}
	
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
	
	console.log(mouse.y);	

}

window.addEventListener('mousemove', onMouseMove);

