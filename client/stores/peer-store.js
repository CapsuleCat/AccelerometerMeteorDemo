import Reflux from 'reflux';

import {AccelerometerActions} from './accelerometer-store';

const PeerActions = Reflux.createActions([
  'open',
  'connect',
  'disconnect',
  'send'
]);

const PeerStore = Reflux.createStore({
  listenables: PeerActions,

  init: function () {
    this._key = null;
    this._connectedKeys = [];
    this._peer = null;
    this._connections = [];
  },

  _data: function(data) {
    console.log(data);
    AccelerometerActions.update(
        data.x,
        data.y,
        data.z
    );
  },

  _closed: function(connectionId) {
    return () => {
      // remove the connection from the list of connectedKeys
      let index = this._connectedKeys.indexOf(connectionId);
      this._connectedKeys.splice(index, 1);

      // remove the connection from the list of connections
      let connections = this._connections.filter((connection) => {
        return (connection.peer === connectionId);
      });

      if (connections && connections.length > 0) {
        this._connections.splice(connections[0], 1);
      }

      this.trigger(this.getInitialState()); 
    }
  },

  onOpen: function(key) {
    this._key = key;
    this._peer = new Peer(key, {key: 'mx9f1w0bidmibe29'});
    // this._peer = new Peer(key, {
    //   host: 'localhost',
    //   port: 9000,
    //   path: '/test'
    // });

    this._peer.on('connection', function (connection) {
      const connectionId = connection.peer;

      connection.on('data', this._data.bind(this));
      connection.on('close', this._closed(connectionId));
      
      this._connections.push(connection);
      this._connectedKeys.push(connection.peer);

      this.trigger(this.getInitialState());
    }.bind(this));


    this.trigger(this.getInitialState());
  },

  onConnect: function (otherKey) {
    let connection = this._peer.connect(otherKey);

    connection.on('data', this._data.bind(this));

    connection.on('open', function () {
      connection.send(this._key + ' has connected');
    }.bind(this));

    connection.on('close', this._closed(otherKey));

    this._connections.push(connection);
    this._connectedKeys.push(otherKey);

    this.trigger(this.getInitialState());
  },

  onDisconnect: function (connectionId) {
    let connections = this._connections.filter((connection) => {
      return (connection.peer === connectionId);
    });

    let connection = null;

    if (connections && connections.length > 0) {
      connection = connections[0];
    }

    connection.close();

    this._closed(connectionId)();

    this.trigger(this.getInitialState());
  },

  onSend: function (data, connectionId) {
    let connection = null;

    if (connectionId == null) {
      connection = this._connections[0];
    } else {
      let connections = this._connections.filter((connection) => {
        return (connection.peer === connectionId);
      });

      if (connections && connections.length > 0) {
        connection = connections[0];
      }
    }

    connection.send(data);
  },

  getInitialState: function() {
    return {
      hasOpenPeer: ( this._peer != null ),
      hasOpenConnection: ( this._connections.length > 0 ),
      key: this._key,
      connectedKeys: this._connectedKeys
    }
  }
});

export default {PeerActions, PeerStore};
