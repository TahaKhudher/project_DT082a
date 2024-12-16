import * as THREE from 'three';
import { MMDPhysics } from 'three/addons/animation/MMDPhysics.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import {addMap} from './js/scene.js';


const scene = addMap();



const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );





camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 20;

controls.update();


function animate() {
	renderer.render( scene, camera );
    // controls.update();

}
renderer.setAnimationLoop( animate );