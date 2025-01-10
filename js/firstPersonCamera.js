import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';

export class FirstPersonCamera {
  constructor(camera, renderer, objects) {
  this.startButton = document.getElementById('startButton');

    this.camera_ = camera;
    this.renderer_ = renderer;
    this.domElement_ = this.renderer_.domElement;
    this.controls_ = new FirstPersonControls(this.camera_, this.domElement_);
    this.controls_.lookSpeed = 0.5;
    this.controls_.movementSpeed = 7;
    this.controls_.autoForward = false;
    this.controls_.constrainVertical = true;
    this.controls_.verticalMin = 0.5;
    this.controls_.verticalMax = 3.0;
    this.objects_ = objects;
    this.raycaster_ = new THREE.Raycaster();
    this.previousPosition_ = new THREE.Vector3();
    this.gravity_ = new THREE.Vector3(0, -9.82, 0); // Gravity vector
    this.velocity_ = new THREE.Vector3(); // Velocity vector
  }

  update(delta) {

    this.previousPosition_.copy(this.camera_.position);
    if(this.startButton.style.display === 'none'){
    this.velocity_.add(this.gravity_.clone().multiplyScalar(delta));
    }
    this.camera_.position.add(this.velocity_.clone().multiplyScalar(delta));

    this.checkCollisions_();

    this.controls_.update(delta);
  }

  checkCollisions_() {


    const groundDirection = new THREE.Vector3(0, -1, 0); // Downward direction
    this.raycaster_.set(this.camera_.position, groundDirection);
    var intersects = this.raycaster_.intersectObjects(this.objects_, true);
    if (intersects.length > 0 && intersects[0].distance < 2) {
      this.camera_.position.y = intersects[0].point.y + 2; // Adjust the camera's position to be above the ground
      this.velocity_.y = 0; // Reset the vertical velocity
    }
      const forwardDirection = new THREE.Vector3();
    this.camera_.getWorldDirection(forwardDirection);
    this.raycaster_.set(this.camera_.position, forwardDirection);
    intersects = this.raycaster_.intersectObjects(this.objects_, true);

    if (intersects.length > 0 && intersects[0].distance < 1) {
      // console.log('Collision detected:', intersects[0]);

      this.camera_.position.copy(this.previousPosition_);
      this.velocity_.set(0, 0, 0); // Stop the camera's movement
      this.controls_.movementSpeed = 0; // Stop the controls' movement

    } else {
      this.controls_.movementSpeed = 7; // Restore the controls' movement speed if no collision
    }
  }
  }

