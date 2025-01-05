import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function addMap(objects,mixers) {
  const loader = new GLTFLoader();
  const scene = new THREE.Scene();

  loader.load('scene.gltf', function (gltf) {

    const root = gltf.scene;

    var i = 0;
    root.traverse((child) => {
      if (child.isMesh) {
        child.name = `_${i}`;
        objects.push(child);
      }
        i++;
    });
    scene.add(root);

    const mixer = new THREE.AnimationMixer(gltf.scene);
    gltf.animations.forEach((clip) => {
        mixer.clipAction(clip).play();
    });
    // Store the mixer to update it in the animation loop
    mixers.push(mixer);

  }, undefined, function (error) {

    console.error(error);

  });
  // Create a button
  const buttonGeometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
  const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
  button.position.set(-38, 5.6, 2); // Set the position of the button
  button.name = "EndInvasionButton";
  scene.add(button);

  function createSpotlight(lightPos, targetPos, color = 0xffffff, intensity = 1, angle = Math.PI / 2.5) {
    const spotLight = new THREE.SpotLight(color, intensity);
    spotLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 5;
    spotLight.shadow.camera.far = 400;
    const targetObject = new THREE.Object3D(); // An empty object for targeting
    targetObject.position.set(targetPos.x, targetPos.y, targetPos.z); // Directly below the light
    if (angle !== Math.PI / 2.5)
    {
      targetObject.name = "Target";
      spotLight.name = "SpotLight";
      spotLight.angle = angle;

    }
    scene.add(targetObject);

    // Set the spotlight to point at the target
    spotLight.target = targetObject;

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);

    scene.add(spotLight);
  }
//light on the player position from ufo and lighting up the ufo from below
  createSpotlight({ x: 0, y: 31.5, z: -1 }, { x: 0, y:2, z:20 }, 0xffffff, 10500, 0.05); // Red spotlight
  createSpotlight({ x: 0, y: 21.5, z: -1}, { x: 0, y: 30, z: -1 }, 0xffffff, 100, 10); // Green spotlight

  createSpotlight({ x: 16.5, y: 4.0, z: -4 }, { x: 16.5, y: 0, z: -4 }, 0xffffff,25); // Green spotlight
  createSpotlight({ x: 16.5, y: 4.0, z: 7.8 }, { x: 16.5, y: 0, z: 7.8 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 16.5, y: 4.0, z: -16.2 }, { x: 16.5, y: 0, z: -16.2 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 7, y: 4.0, z: -21.6 }, { x: 7, y: 0, z: -21.6 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -3.2, y: 4.0, z: -21.7 }, { x: -3.2, y: 0, z: -21.7 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -3.0, y: 4.0, z: -30.5 }, { x: -3.0, y: 0, z: -30.5 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 7.04, y: 4.0, z: -30.6 }, { x: 7.04, y: 0, z: -30.6 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 16.76, y: 4.0, z: -30.6 }, { x: 16.76, y: 0, z: -30.6 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -35, y: 6.45, z: -14.6 }, { x: -35, y: 0, z: -14.6 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -45, y: 6.43, z: -14.6 }, { x: -45, y: 0, z: -14.6 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -55.35, y: 6.22, z: -14.62 }, { x: -55.35, y: 0, z: -14.62 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -55.35, y: 6.12, z: -5.58 }, { x: -55.35, y: 0, z: -5.58 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -45.1, y: 6.25, z: -5.52 }, { x: -45.1, y: 0, z: -5.52 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -35, y: 6.2, z: -5.62 }, { x: -35, y: 0, z: -5.62 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: -33.11, y: 3.9, z: 22.24 }, { x: -33.11, y: 0, z: 22.24 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 40.4, y: 7.7, z: 37.8 }, { x: 40.4, y: 0, z: 37.8 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 45.4, y: 7.7, z: 37.8 }, { x: 45.4, y: 0, z: 37.8 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 29.7, y: 3.8, z: 7.9 }, { x: 29.7, y: 0, z: 7.9 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 29.65, y: 3.8, z: -4.1 }, { x: 29.65, y: 0, z: -4.1 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 29.58, y: 3.8, z: -16.12 }, { x: 29.58, y: 0, z: -16.12 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 45.18, y: 7.7, z: -9.3 }, { x: 45.18, y: 0, z: -9.3 }, 0xffffff,25); // Blue spotlight
  createSpotlight({ x: 45.26, y: 7.7, z: -0.94 }, { x: 45.26, y: 0, z: -0.94 }, 0xffffff,25); // Blue spotlight

  const light = new THREE.AmbientLight( 0xffffff ,0.05 ); // soft white light
  scene.add( light );

  return scene;
}
