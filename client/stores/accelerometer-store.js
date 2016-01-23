import Reflux from 'reflux';

const AccelerometerActions = Reflux.createActions([
  'update'
]);

const AccelerometerStore = Reflux.createStore({
  listenables: AccelerometerActions,

  init: function () {
    this._pos = {
      x: 0, y: 0, z: 0
    };
  },

  onUpdate(x, y, z) {
    this._pos.x = x;
    this._pos.y = y;
    this._pos.z = z;
   
    this.trigger(this.getInitialState());
  },
 
  getInitialState: function() {
    return {
      x: this._pos.x,
      y: this._pos.y,
      z: this._pos.z
    }
  }
});

export default {AccelerometerActions, AccelerometerStore};