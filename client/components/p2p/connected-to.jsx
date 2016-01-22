import React from 'react';

import {PeerActions} from '../../stores/peer-store';

const ConnectedTo = React.createClass({
  getDefaultProps() {
    return {
      hasOpenConnection: false,
      connectedToKey: 'None'
    };
  },

  handleDisconnect(e) {
    e.preventDefault();

    PeerActions.disconnect();
  },

  render() {
    if (! this.props.hasOpenConnection) {
      return <div></div>
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <p>Connected to: {this.props.connectedToKey}</p>
          <button
              onClick={this.handleDisconnect}
              className="btn btn-danger">
            Disconnect
          </button>
        </div>
      </div>
    );
  }
});

export default {ConnectedTo};