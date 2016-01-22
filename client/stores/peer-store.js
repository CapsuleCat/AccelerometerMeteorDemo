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
    this._connectedToKey = null;
    this._otherKey = null;
    this._peer = null;
    this._connection = null;
  },

  _data: function(data) {
    AccelerometerActions.update(data.x, data.y, data.z);
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
      this._connection = connection;
      this._connectedToKey = connection.peer;

      this._connection.on('data', this._data.bind(this));
      this._connection.on('close', function() {
        this._connectedToKey = null;
        this._connection = null;

        this.trigger(this.getInitialState()); 
      }.bind(this));
      

      this.trigger(this.getInitialState());
    }.bind(this));


    this.trigger(this.getInitialState());
  },

  onConnect: function (otherKey) {
    this._connection = this._peer.connect(otherKey);
    this._connectedToKey = otherKey;

    this._connection.on('data', this._data.bind(this));

    this._connection.on('open', function () {
      this._connection.send(this._key + ' has connected');
    }.bind(this));

    this._connection.on('close', function() {
      this._connectedToKey = null;
      this._connection = null;

      this.trigger(this.getInitialState()); 
    }.bind(this));

    this.trigger(this.getInitialState());
  },

  onDisconnect: function () {
    this._connection.close();

    this._connectedToKey = null;
    this._connection = null; 

    this.trigger(this.getInitialState());
  },

  onSend: function (data) {
    this._connection.send(data);
  },

  getInitialState: function() {
    return {
      hasOpenPeer: ( this._peer != null ),
      hasOpenConnection: ( this._connection != null ),
      key: this._key,
      connectedToKey: this._connectedToKey
    }
  }
});

export default {PeerActions, PeerStore};