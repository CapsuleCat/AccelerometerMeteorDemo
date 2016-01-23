import Reflux from 'reflux';

const AccelerometerActions = Reflux.createActions([
  'newPlayer',
  'playerLeave',
  'update'
]);

let _colors = [
  'red',
  'blue',
  'green',
  'orange',
  'yellow'
];

const AccelerometerStore = Reflux.createStore({
  listenables: AccelerometerActions,

  init: function () {
    this._playerData = [];
  },

  onNewPlayer(id) {
    // add the player if she does not exist

    let found = this._playerData.some((player) => { return player.id === id });

    if ( ! found ) {
      this._playerData.push({
        id,
        x: 0,
        y: 0,
        z: 0,
        color: ( _colors.pop() || 'blue' )
      });
    }
  },

  onPlayerLeave(id) {
    // player has left, remove them from the playerData

    let index = this._playerData.findIndex((player) => { return player.id === id });

    if ( index !== -1 ) {
      this._playerData.splice(index, 1);
    }
  },

  onUpdate(x, y, z, id) {
    // find the player and update
    let index = this._playerData.findIndex((player) => { return player.id === id });

    if (index === -1) {
      this.onNewPlayer(id);
      index = this._playerData.findIndex((player) => { return player.id === id });
    }

    this._playerData[index].x = x;
    this._playerData[index].y = y;
    this._playerData[index].z = z;
   
    this.trigger(this.getInitialState());
  },
 
  getInitialState: function() {
    return {
      players: this._playerData
    }
  }
});

export default {AccelerometerActions, AccelerometerStore};