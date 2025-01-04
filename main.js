import * as THREE from 'three';
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
const button = findChildByName("EndInvasionButton");


document.addEventListener('keydown', (event) => {
  if (event.key === 'e' || event.key === 'E') {
    const light = new THREE.DirectionalLight(0xffffff, 10);
    light.position.set(0, 100, 0);
    scene.add(light);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    // alert('Invasion ended!');
    const message = document.getElementById('message');
    message.style.display = 'none';
    scene.remove(button);
  }
});
document.addEventListener('keyup', (event) => {
  if (event.key === 'e' || event.key === 'E') {
    const message = document.getElementById('message');
    message.style.display = 'none';
  }
});


function animate() {
    var delta = clock.getDelta();

    mixers.forEach((mixer) => {
      mixer.update(delta*3);
  });
  if (child){
    child.position.set(camera.position.x, 0, camera.position.z);
  }
  if (button) {
    const distance = camera.position.distanceTo(button.position);
    if (distance < 3) {
      // Display message to press "E"
      const message = document.getElementById('message');
      message.style.display = 'block';
      message.innerText = 'Press E to end the invasion';

      // Handle "E" key press

    } else {
      const message = document.getElementById('message');
      message.style.display = 'none';
    }
  }

  fpCamera.update(delta);
  renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);
