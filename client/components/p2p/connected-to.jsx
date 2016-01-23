import React from 'react';

import {PeerActions} from '../../stores/peer-store';

const ConnectedTo = React.createClass({
  getDefaultProps() {
    return {
      hasOpenConnection: false,
      connectedKeys: []
    };
  },

  handleDisconnect(key) {
    return (e) => {
      e.preventDefault();

      PeerActions.disconnect(key);
    }
  },

  render() {
    if (! this.props.hasOpenConnection) {
      return <div></div>
    }

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <h3>Connections</h3>

          <ul>
            {this.props.connectedKeys.map((key) => {
              return (
                <li key={key}>
                  {key}
                  <button
                      onClick={this.handleDisconnect(key)}
                      className="btn btn-danger">
                    Disconnect
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
});

export default {ConnectedTo};