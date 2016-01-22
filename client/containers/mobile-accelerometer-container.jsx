import React from 'react';
import Reflux from 'reflux';

import {PeerActions} from '../stores/peer-store'; 
import {throttle} from '/libs/utilities/throttle';

import {Accelerometer} from '../components/accelerometer/accelerometer.jsx';

const MobileAccelerometerContainer = React.createClass({
  getInitialState() {
    return {
      x: 0, y: 0, z: 0
    };
  },

  tilt(x, y, z) {
    const xI = Math.round( x );
    const yI = Math.round( y );
    const zI = Math.round( z );

    const raw = {
      x, y, z
    };

    const data = {
      x: xI, y: yI, z: zI
    };

    this.setState(data);

    this.sendData(raw)
  },

  componentDidMount() {
    this.sendData = throttle(function (data) {
      PeerActions.send(data);
    }.bind(this), 100);

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
        <Accelerometer
            accel={{x: this.state.x, y: this.state.y, z: this.state.z}} />
      </div>
    );
  }
});

export default {MobileAccelerometerContainer};

