import React from 'react';

import {AccelerometerActions} from '../../stores/accelerometer-store'; 

const Accelerometer = React.createClass({
  render() {
    return (
      <div>
        Accelerometer Data
        <p>{this.props.accel.x}</p>
        <p>{this.props.accel.y}</p>
        <p>{this.props.accel.z}</p>
        <p>{this.props.accel.vx}</p>
        <p>{this.props.accel.vy}</p>
        <p>{this.props.accel.vz}</p>
        <p>{this.props.accel.ax}</p>
        <p>{this.props.accel.ay}</p>
        <p>{this.props.accel.az}</p>
      </div>
    );
  }
});

export default {Accelerometer};