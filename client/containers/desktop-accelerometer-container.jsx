import React from 'react';
import Reflux from 'reflux';

import {PeerStore} from '../stores/peer-store';
import {AccelerometerStore} from '../stores/accelerometer-store';
import {Accelerometer} from '../components/accelerometer/accelerometer.jsx';
import {BlobContainer} from '../containers/blob-container.jsx';

const DesktopAccelerometerContainer = React.createClass({
  mixins: [
    Reflux.connect(PeerStore, 'peer'),
    Reflux.connect(AccelerometerStore, 'accel')
  ],

  render() {
    if (this.state.peer.hasOpenConnection) {
      return (
        <div>
          <Accelerometer
              accel={this.state.accel} />

          <BlobContainer
              accel={this.state.accel} />
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
});

export default {DesktopAccelerometerContainer};

