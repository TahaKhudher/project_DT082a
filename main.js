import * as THREE from 'three';
// import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

//import { InputController } from './js/inputController';
import { FirstPersonCamera } from './js/firstPersonCamera';
import { addMap } from './js/scene.js';

var clock = new THREE.Clock();


const objects = [];

const scene = addMap(objects);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 20);
// camera.position.x = 0;
// camera.position.y = 2;
// camera.position.z = 20;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



var fpCamera = new FirstPersonCamera(camera, renderer, objects);

function animate() {
  var delta = clock.getDelta();
  fpCamera.update(delta);
  renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);
