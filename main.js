import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import {addMap} from './js/scene.js';


const scene = addMap();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
var clock = new THREE.Clock();
var keyboard = {};
var moveSpeed = 10;
var cameraPosition = new THREE.Vector3(0, 0, 20);
var cameraRotation = new THREE.Vector3(0, 0, 0);
var rotateSpeed = Math.PI / 2;

window.addEventListener('keydown', function(event) {
    keyboard[event.key] = true;
    console.log(event.key);
});
  
document.addEventListener('keyup', function(event) {
keyboard[event.key] = false;
});

function handleKeyboardInput(delta) {
    if (keyboard['w']) {
      cameraPosition.z -= moveSpeed * delta;
      
    }
    if (keyboard['s']) {
      cameraPosition.z += moveSpeed * delta;
    }
    if (keyboard['a']) {
      cameraRotation.x += rotateSpeed * delta;
      cameraPosition.x += moveSpeed * delta;
    }
    if (keyboard['d']) {
        cameraRotation.x -= rotateSpeed * delta;
    }
    camera.position.copy(cameraPosition);
    camera.rotation.setFromVector3(cameraRotation);
  }

window.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 87: // W
            camera.position.z -= 0.1;
            break;
        case 65: // A
            camera.position.x -= 0.1;
            break;
        case 83: // S
            camera.position.z += 0.1;
            break;
        case 68: // D
            camera.position.x += 0.1;
            break;
    }
});




camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;

controls.update();


function animate() {
    var delta = clock.getDelta();
    handleKeyboardInput(delta);
    controls.update(delta);
    renderer.render( scene, camera );
    // const delta = clock.getDelta();
    // controls.update(delta);

	
    
    

}
renderer.setAnimationLoop( animate );