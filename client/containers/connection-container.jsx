import React from 'react';
import Reflux from 'reflux';

import {PeerStore} from '../stores/peer-store';
import {OpenPeerButton} from '../components/p2p/open-peer-button.jsx';
import {OpenConnection} from '../components/p2p/open-connection.jsx';
import {ConnectedTo} from '../components/p2p/connected-to.jsx';

const ConnectionContainer = React.createClass({
  mixins: [Reflux.connect(PeerStore, 'peer')],

  render() {
    return (
      <div>
        <OpenPeerButton 
            hasOpenPeer={this.state.peer.hasOpenPeer}/>
        <OpenConnection
            connectionKey={this.state.peer.key}
            hasOpenPeer={this.state.peer.hasOpenPeer}
            hasOpenConnection={this.state.peer.hasOpenConnection} />
        <ConnectedTo
            connectedToKey={this.state.peer.connectedToKey}
            hasOpenConnection={this.state.peer.hasOpenConnection} />
      </div>
    );
  }
});

export default {ConnectionContainer};
