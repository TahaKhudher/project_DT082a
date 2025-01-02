import * as THREE from 'three';
import * as CANNON from 'cannon';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function addMap(objects, world) {
const loader = new GLTFLoader();
const scene = new THREE.Scene();




loader.load( 'scene.gltf', function ( gltf ) {
  
    const root = gltf.scene;
    var i = 0;
        root.traverse((child) => {
            // allObjects.push(child);
            // console.log(`Object name: ${child.name}, Type: ${child.type}`);
            if (child.isMesh) {
                objects.push(child);
                // Create a CANNON.Trimesh for the terrain
                // const vertices = child.geometry.attributes.position.array;
                // const indices = Array.from({ length: vertices.length / 3 }, (_, i) => i);
                // const trimesh = new CANNON.Trimesh(vertices, indices);
                // const terrainBody = new CANNON.Body({ mass: 0 });
                // terrainBody.addShape(trimesh);
                // world.addBody(terrainBody);
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