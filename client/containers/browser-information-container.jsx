import React from 'react';
import Reflux from 'reflux';

import {MobileAccelerometerContainer} from '../containers/mobile-accelerometer-container.jsx';
import {DesktopAccelerometerContainer} from '../containers/desktop-accelerometer-container.jsx';

const BrowserInformationContainer = React.createClass({
  //mixins: [Reflux.connect(PeerStore, 'peer')],
  getInitialState() {
    return {
      isMobile: typeof window.orientation !== 'undefined'
    }
  },

  render() {
    let $$inner = '';

    if (this.state.isMobile) {
      $$inner = <MobileAccelerometerContainer />;
    } else {
      $$inner = <DesktopAccelerometerContainer />;
    }

    return (
      <div>
        {$$inner}
      </div>
    );
  }
});

export default {BrowserInformationContainer};
