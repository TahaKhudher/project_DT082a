import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';


import {addMap} from './js/scene.js';



const scene = addMap();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


const fpControls = new FirstPersonControls( camera, renderer.domElement );


var clock = new THREE.Clock();

fpControls.lookSpeed = 0.1;
fpControls.movementSpeed = 5;
fpControls.constrainVertical = true;
fpControls.verticalMin = 1;
fpControls.verticalMax = 3;


camera.position.set(0, 31, 20)
//camera.lookAt(new THREE.Vector3(1, 1, 20));





function animate() {
    var delta = clock.getDelta();
 

    fpControls.update(delta);
    
    renderer.render( scene, camera );
    console.log(camera.position);
}
renderer.setAnimationLoop( animate );