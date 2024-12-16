import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export function addMap() {
const loader = new GLTFLoader();
const scene = new THREE.Scene();


loader.load( 'scene.gltf', function ( gltf ) {
  
	scene.add( gltf.scene );
    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object

}, undefined, function ( error ) {

	console.error( error );

} );

const light = new THREE.AmbientLight(0xffffff, 1.5); // Soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

return scene;
}