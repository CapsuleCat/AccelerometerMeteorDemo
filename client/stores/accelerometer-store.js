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
    this._oldPos = {
      x: 0, y: 0, z: 0
    };
    this._oldVelocity = {
      x: 0, y: 0, z: 0
    };
    this._velocity = {
      x: 0, y: 0, z: 0
    };
    this._accel = {
      x: 0, y: 0, z: 0
    };
  },

  onUpdate(x, y, z) {
    this._oldPos.x = this._pos.x;
    this._oldPos.y = this._pos.y;
    this._oldPos.z = this._pos.z;

    this._pos.x = x;
    this._pos.y = y;
    this._pos.z = z;

    this._oldVelocity.x = this._velocity.x;
    this._oldVelocity.y = this._velocity.y;
    this._oldVelocity.z = this._velocity.z;

    this._velocity.x = (this._pos.x - this._oldPos.x) / 2.0;
    this._velocity.y = (this._pos.y - this._oldPos.y) / 2.0;
    this._velocity.z = (this._pos.z - this._oldPos.z) / 2.0;

    this._accel.x = (this._velocity.x - this._oldVelocity.x) / 2.0;
    this._accel.y = (this._velocity.y - this._oldVelocity.y) / 2.0;
    this._accel.z = (this._velocity.z - this._oldVelocity.z) / 2.0;

   
    this.trigger(this.getInitialState());
  },
 
  getInitialState: function() {
    return {
      x: this._pos.x,
      y: this._pos.y,
      z: this._pos.z,
      vx: this._velocity.x,
      vy: this._velocity.y,
      vz: this._velocity.z,
      ax: this._accel.x,
      ay: this._accel.y,
      az: this._accel.z
    }
  }
});

export default {AccelerometerActions, AccelerometerStore};