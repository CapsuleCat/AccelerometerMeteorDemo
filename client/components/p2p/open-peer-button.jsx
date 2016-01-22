import React from 'react';

import {PeerActions} from '../../stores/peer-store';

const OpenPeerButton = React.createClass({
  getDefaultProps() {
    hasOpenPeer: false
  },

  handleOpenConnection(e) {
    e.preventDefault();

    let key = ShortId.generate();
    PeerActions.open(key);
  },

  render() {
    if (this.props.hasOpenPeer) {
      return <div></div>;
    }

    return (
      <button 
          className="btn btn-primary"
          onClick={this.handleOpenConnection}>
        Get My Key
      </button>
    );
  }
});

export default {OpenPeerButton};
