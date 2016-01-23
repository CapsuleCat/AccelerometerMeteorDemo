import React from 'react';
import Reflux from 'reflux';

import {PeerStore} from '../stores/peer-store';
import {AccelerometerStore} from '../stores/accelerometer-store';
import {Accelerometer} from '../components/accelerometer/accelerometer.jsx';
import {BlobContainer} from '../containers/blob-container.jsx';

// TODO rename DesktopGameContainer

const DesktopAccelerometerContainer = React.createClass({
  mixins: [
    Reflux.connect(PeerStore, 'peer'),
    Reflux.connect(AccelerometerStore, 'playerData')
  ],

  render() {
    if (this.state.peer.hasOpenConnection) {
      return (
        <div>
          <BlobContainer
              playerData={this.state.playerData} />
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

