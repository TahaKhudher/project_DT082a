import * as THREE from 'three';
import { FirstPersonCamera } from './js/firstPersonCamera';
import { addMap } from './js/scene.js';
// import { World } from 'cannon';
import { Sky } from 'three/addons/objects/Sky.js';
import { MathUtils, Vector3 } from 'three';

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(40, 25, 20);

document.getElementById('startButton').addEventListener('click', () => {
  document.getElementById('startButton').style.display = 'none';
  rendererContainer.style.display = 'block';
  animate();
});


var clock = new THREE.Clock();

const objects = [];
const mixers = [];

const scene = addMap(objects,mixers);

var spotLight = new THREE.SpotLight(0xffffff, 150);
spotLight.position.set(0, 3, 20);
spotLight.angle = Math.PI /8;
spotLight.penumbra = 0.5;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 5;
spotLight.shadow.camera.far = 400;

spotLight.name = "flashlight_1";
const targetObject = new THREE.Object3D(); // An empty object for targeting
targetObject.position.set(0, 2,20); // Directly below the light
targetObject.name = "Target_light";




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

var direction = fpCamera.camera_.getWorldDirection(new THREE.Vector3());
targetObject.position.set(camera.position.x + direction.x, camera.position.y + direction.y, camera.position.z + direction.z);
scene.add(targetObject);
scene.add(spotLight);


const child = findChildByName("Target");
const button = findChildByName("EndInvasionButton");
const flashlight_1 = findChildByName("flashlight_1");



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

  const sky = new Sky();
  sky.scale.setScalar( 450000 );

  const phi = MathUtils.degToRad( 90 );
  const theta = MathUtils.degToRad( 180 );
  const sunPosition = new Vector3().setFromSphericalCoords( 1, phi, theta );

  sky.material.uniforms.sunPosition.value = sunPosition;

  scene.add( sky );
  const amblight = new THREE.AmbientLight( 0xffffff ,0.05 ); // soft white light
  scene.add( amblight );

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

  flashlight_1.position.set(camera.position.x, camera.position.y, camera.position.z);
  var direction = fpCamera.camera_.getWorldDirection(new THREE.Vector3());
  targetObject.position.set(camera.position.x + direction.x, camera.position.y + direction.y, camera.position.z + direction.z);
  flashlight_1.target = targetObject;

  fpCamera.update(delta);
  renderer.render(scene, camera);

}
renderer.setAnimationLoop(animate);

