import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

export function addMap() {
const loader = new GLTFLoader();
const scene = new THREE.Scene();


loader.load( 'scene.gltf', function ( gltf ) {
    const model = gltf.scene;
	scene.add( model );
    

    model.traverse( (child) => {
        if(child.isMesh) {
            const box = new THREE.Box3().setFromObject(child);
            const size = new THREE.Vector3();
            const center = new THREE.Vector3();
            box.getSize(size);
            box.getCenter(center);

            const collider = new THREE.Mesh(
                new THREE.BoxGeometry(size.x, size.y, size.z),
                new THREE.MeshBasicMaterial( {visible: false})
            );


            collider.position.copy(center);

            scene.add(collider);
        }
    })

}, undefined, function ( error ) {

	console.error( error );

} );

function createSpotlight(lightPos, targetPos, color = 0xffffff, intensity = 1){
    const spotLight = new THREE.SpotLight(color, intensity);
    spotLight.position.set(lightPos.x, lightPos.y, lightPos.z);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 5;
    spotLight.shadow.camera.far = 400;

    const targetObject = new THREE.Object3D(); // An empty object for targeting
    targetObject.position.set(targetPos.x, targetPos.y, targetPos.z); // Directly below the light
    scene.add(targetObject);

    // Set the spotlight to point at the target
    spotLight.target = targetObject;

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    scene.add(spotLight);
}


createSpotlight({ x: 0, y: 31.58414, z: -1 }, { x: 0, y: 0, z: -1 }, 0xffffff, 50); // Red spotlight
createSpotlight({ x: -5, y: 5, z: 5 }, { x: -5, y: 0, z: 5 }, 0x00ff00, 50); // Green spotlight
createSpotlight({ x: 16.5, y: 4.0, z: 7.8 }, { x: 16.5, y: 0, z: 7.8 }, 0x0000ff, 70); // Blue spotlight
const light = new THREE.AmbientLight(0xffffff, 0.2); // Soft white light

console.log( scene );



scene.add(light);




// Add a helper to visualize the spotlight




const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

return scene;
}