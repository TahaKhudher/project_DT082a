import * as THREE from 'three';
// import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

//import { InputController } from './js/inputController';
import { FirstPersonCamera } from './js/firstPersonCamera';
import { addMap } from './js/scene.js';

var clock = new THREE.Clock();


const objects = [];
const mixers = [];

const scene = addMap(objects,mixers);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(64, 10, 27);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



var fpCamera = new FirstPersonCamera(camera, renderer, objects);
function findChildByName(name) {
  for (var i = 0; i < scene.children.length; i++) {
      if (scene.children[i].name === name) {
          return scene.children[i];
      }
  }
  return null;
}
  
const child = findChildByName("Target");
function animate() {
    var delta = clock.getDelta();

    mixers.forEach((mixer) => {
      mixer.update(delta*3);
  });
  if (child){
    child.position.set(camera.position.x, 0, camera.position.z);
  }

  fpCamera.update(delta);
  renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);
