import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { InputController } from './inputController';



export class FirstPersonCamera {
    constructor(camera, renderer) {
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
      
    }
    update(delta) {
      this.controls_.update(delta);
    } 
}