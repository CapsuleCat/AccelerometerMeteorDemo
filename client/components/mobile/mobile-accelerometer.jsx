import React from 'react';

import {PeerActions} from '../../stores/peer-store'; 
import {throttle} from '/libs/utilities/throttle';

// TODO add container
const MobileAccelerometer = React.createClass({
  getInitialState() {
    return {
      x: 0, y: 0, z: 0
    };
  },

  tilt(x, y, z) {
    const xI = Math.round( x );
    const yI = Math.round( y );
    const zI = Math.round( z );

    const data = {
      x: xI, y: yI, z: zI
    };

    this.setState(data);

    this.sendData(data)
  },

  componentDidMount() {
    this.sendData = throttle(function (data) {
      PeerActions.send(data);
    }.bind(this), 500);

    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", () => {
        this.tilt(event.alpha, event.beta, event.gamma);
      }, true);
    } else if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', () => {
        this.tilt(event.acceleration.x * 2, event.acceleration.y * 2, event.acceleration.z * 3);
      }, true);
    } else {
      window.addEventListener("MozOrientation", () => {
        this.tilt(orientation.x * 50, orientation.y * 50, orientation.z * 50);
      }, true);
    }
  },

  componentWillUnMount() {
    // TOOD detatch events
  },

  render() {
    return (
      <div>
        Mobile data
        <p>{this.state.x}</p>
        <p>{this.state.y}</p>
        <p>{this.state.z}</p>
      </div>
    );
  }
});

export default {MobileAccelerometer};