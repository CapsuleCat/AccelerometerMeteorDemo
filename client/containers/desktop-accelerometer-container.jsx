import React from 'react';
import Reflux from 'reflux';

import {AccelerometerStore} from '../stores/accelerometer-store';
import {Accelerometer} from '../components/accelerometer/accelerometer.jsx';

const DesktopAccelerometerContainer = React.createClass({
  mixins: [Reflux.connect(AccelerometerStore, 'accel')],

  render() {
    return (
      <div>
        <Accelerometer
            accel={this.state.accel} />
      </div>
    );
  }
});

export default {DesktopAccelerometerContainer};

