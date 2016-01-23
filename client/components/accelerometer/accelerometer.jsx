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
      </div>
    );
  }
});

export default {Accelerometer};