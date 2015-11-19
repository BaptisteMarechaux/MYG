//Script for managing the user interaction
var attackSprite, defendSprite, itemSprite, runSprite;

attackButton = document.getElementById("attackCommand");
defendButton = document.getElementById("defendCommand");
itemButton = document.getElementById("itemCommand");
runButton = document.getElementById("runCommand");

attackButton.addEventListener("click", function (evt) {
	if(hpEFront != undefined) {
		//spriteC.material.color = new THREE.Color( 0xff0000 );
		//spriteC.translateX(100);
		//hpEFront.scale.set(new THREE.Vector3( 0.6, 0, 0 ));
		hpEFront.scale.setX(hpEFront.scale.x-20);
	}
	else {
		console.log("Hp E Front is undefinied");
	}
	
});