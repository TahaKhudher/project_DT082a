// import * as THREE from 'three';
// // import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

// //import { InputController } from './js/inputController';
// import { FirstPersonCamera } from './js/firstPersonCamera';
// import { addMap } from './js/scene.js';

// var clock = new THREE.Clock();


// const objects = [];

// const scene = addMap(objects);

// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.set(0, 2, 20);
// // camera.position.x = 0;
// // camera.position.y = 2;
// // camera.position.z = 20;
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);



// var fpCamera = new FirstPersonCamera(camera, renderer, objects);

// function animate() {
//   var delta = clock.getDelta();
//   fpCamera.update(delta);
//   renderer.render(scene, camera);

// }
// renderer.setAnimationLoop(animate);

import * as THREE from 'three';
import * as CANNON from 'cannon';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FirstPersonCamera } from './js/firstPersonCamera';
import { addMap } from './js/scene.js';

var clock = new THREE.Clock();

const objects = [];

// Create a physics world
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0);
const scene = addMap(objects, world);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 20);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Load GLTF file and add its meshes to the objects array
const loader = new GLTFLoader();


var fpCamera = new FirstPersonCamera(camera, renderer, objects, world);

var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;

function animate(time) {
  requestAnimationFrame(animate);

  var delta = clock.getDelta();
  world.step(fixedTimeStep, delta, maxSubSteps);

  fpCamera.update(delta);
  renderer.render(scene, camera);
}
animate();
// renderer.setAnimationLoop(animate);