import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export function addMap() {
const loader = new GLTFLoader();
const scene = new THREE.Scene();




loader.load( 'scene.gltf', function ( gltf ) {
  
    const root = gltf.scene;
    var i = 0;
        root.traverse((child) => {
            // allObjects.push(child);
            console.log(`Object name: ${child.name}, Type: ${child.type}`);
            if (!child.isMesh) {
                // Assign a random color
                if(child.name.startsWith('Decor')) {
                    // child.visible = false;
                    console.log(child);
                
                const randomColor = new THREE.Color(Math.random(), Math.random(), Math.random());
                // child.material = new THREE.MeshBasicMaterial({ color: randomColor });
                child.color = new THREE.Color(Math.random(), Math.random(), Math.random());
            }
        }
        });

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
console.log(scene);
return scene;
}