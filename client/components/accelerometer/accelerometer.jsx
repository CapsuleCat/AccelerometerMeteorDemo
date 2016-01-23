import React from 'react';

import {AccelerometerActions} from '../../stores/accelerometer-store'; 

const Accelerometer = React.createClass({
  render() {
    return (
      <div style={{textAlign: 'right'}}>
        Accelerometer Data
        
        <p>{Math.round(this.props.accel.x * 100)}</p>
        <p>{Math.round(this.props.accel.y * 100)}</p>
        <p>{Math.round(this.props.accel.z * 100)}</p>
        <hr/>
        <p>{Math.round(this.props.accel.vx * 100)}</p>
        <p>{Math.round(this.props.accel.vy * 100)}</p>
        <p>{Math.round(this.props.accel.vz * 100)}</p>
        <hr/>
        <p>{Math.round(this.props.accel.ax * 1000)}</p>
        <p>{Math.round(this.props.accel.ay * 1000)}</p>
        <p>{Math.round(this.props.accel.az * 1000)}</p>
      </div>
    );
  }
});

export default {Accelerometer};