// import * as THREE from 'three';
// import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

// export class FirstPersonCamera {
//   constructor(camera, renderer, objects) {
//     this.camera_ = camera;
//     this.renderer_ = renderer;
//     this.domElement_ = this.renderer_.domElement;
//     this.controls_ = new FirstPersonControls(this.camera_, this.domElement_);
//     this.controls_.lookSpeed = 0.5;
//     this.controls_.movementSpeed = 10;
//     this.controls_.autoForward = false;
//     this.controls_.constrainVertical = true;
//     this.controls_.verticalMin = 0.5;
//     this.controls_.verticalMax = 3.0;
//     this.objects_ = objects;
//     this.raycaster_ = new THREE.Raycaster();
//     this.previousPosition_ = new THREE.Vector3();
//   }

//   update(delta) {
//     this.previousPosition_.copy(this.camera_.position);
//     this.controls_.update(delta);
//     this.checkCollisions_();
//   }

//   checkCollisions_() {
//     const direction = new THREE.Vector3();
//     this.camera_.getWorldDirection(direction);

//     this.raycaster_.set(this.camera_.position, direction);
//     const intersects = this.raycaster_.intersectObjects(this.objects_, true);

//     if (intersects.length > 0 && intersects[0].distance < 1) {
//       this.camera_.position.copy(this.previousPosition_); // Revert to previous position if collision detected
//     }
//   }
// }
import * as THREE from 'three';
import * as CANNON from 'cannon';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export class FirstPersonCamera {
  constructor(camera, renderer, objects, world) {
    this.camera_ = camera;
    this.renderer_ = renderer;
    this.domElement_ = this.renderer_.domElement;
    this.controls_ = new FirstPersonControls(this.camera_, this.domElement_);
    this.controls_.lookSpeed = 0.5;
    this.controls_.movementSpeed = 10;
    this.controls_.autoForward = false;
    this.controls_.constrainVertical = true;
    this.controls_.verticalMin = 0.5;
    this.controls_.verticalMax = 3.0;
    this.objects_ = objects;
    this.world_ = world;
    this.raycaster_ = new THREE.Raycaster();
    this.previousPosition_ = new THREE.Vector3();

    // Create a physics body for the camera
    this.cameraBody_ = new CANNON.Body({
      mass: 1, // kg
      position: new CANNON.Vec3(camera.position.x, camera.position.y, camera.position.z),
      shape: new CANNON.Sphere(1.5) // radius of the sphere
    });
    this.world_.addBody(this.cameraBody_);

    this.initControls_();
  }

  initControls_() {
    window.addEventListener('keydown', (event) => this.onKeyDown_(event));
    window.addEventListener('keyup', (event) => this.onKeyUp_(event));
  }

  onKeyDown_(event) {
    switch (event.code) {
      case 'KeyW':
        this.cameraBody_.velocity.z = -5;
        break;
      case 'KeyS':
        this.cameraBody_.velocity.z = 5;
        break;
      case 'KeyA':
        this.cameraBody_.velocity.x = -5;
        break;
      case 'KeyD':
        this.cameraBody_.velocity.x = 5;
        break;
    }
  }

  onKeyUp_(event) {
    switch (event.code) {
      case 'KeyW':
      case 'KeyS':
        this.cameraBody_.velocity.z = 0;
        break;
      case 'KeyA':
      case 'KeyD':
        this.cameraBody_.velocity.x = 0;
        break;
    }
  }

  update(delta) {
    this.world_.step(delta);

    // Update camera position based on physics body
    this.camera_.position.copy(this.cameraBody_.position);

    this.controls_.update(delta);
    this.checkCollisions_();
  }

  checkCollisions_() {
    const direction = new THREE.Vector3();
    this.camera_.getWorldDirection(direction);

    this.raycaster_.set(this.camera_.position, direction);
    const intersects = this.raycaster_.intersectObjects(this.objects_, true);

    if (intersects.length > 0 && intersects[0].distance < 1) {
      this.camera_.position.copy(this.previousPosition_); // Revert to previous position if collision detected
    }
  }
}
