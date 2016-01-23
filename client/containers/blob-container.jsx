import React from 'react';
import {jQuery as $} from 'meteor/jquery';

import {Blob} from '../components/blob/blob.jsx';

const velocity = 1;

const BlobContainer = React.createClass({
  getInitialState() {
    return {
      blobData: [
        /*
        id,
        rotation,
        x,
        y,
        color
        */
      ]
    }
  },

  _step() {
    this.state.blobData.forEach((blob, index, arr) => {
      let x = blob.x + velocity * Math.cos(blob.rotation * Math.PI / 180);
      let y = blob.y + velocity * Math.sin(blob.rotation * Math.PI / 180);

      // Clamp to the window
      if (x > $('body').width() - 50) {
        x = $('body').width() - 50;
      }
      if (x < 0) {
        x = 0;
      }
      if (y > $('body').height() - 50) {
        y = $('body').height() - 50;
      }
      if (y < 0) {
        y = 0;
      }

      arr[index] = {
        id: blob.id,
        rotation: blob.rotation,
        x,
        y,
        color: blob.color
      }

      this.setState({
        blobData: arr
      });
    });
  },

  componentDidMount() {
    this._interval = setInterval(() => {
      this._step();
    }, 10);
  },

  componentWillUnmount() {
    clearInterval(this._interval);
  },

  // ugh...
  _mod(n, m) {
    return ((n % m) + m) % m;
  },

  componentWillReceiveProps(newProps) {
    /*
      props: {
        x, y, z,
        id, color
      }
    */
    let nextState = this.state.blobData.slice(0, this.state.blobData.length);

    newProps.playerData.players.forEach((data, _, arr) => {
      let aY = 0;
      if (data.y > 30 || data.y < -30) {
        aY = data.y / 2;
      }

      // Alright... now...
      // Find the current id in the nextState array
      // Mark the nextState blob as visited
      let index = nextState.findIndex((blob) => { return blob.id === data.id });
      // if exists, update
      if (index !== -1) {
        let rotation = this._mod(this.state.blobData[index].rotation + aY, 360);
        nextState[index].rotation = rotation;
        nextState[index].visited = true;
      }
      // else, make new
      else {
        nextState.push({
          id: data.id,
          x: 0,
          y: 0,
          rotation: 0,
          color: data.color,
          visited: true
        });
      }
    });

    // clean all unvisited blobs
    nextState = nextState.filter((blob) => {
      let wasVisited = blob.visited === true;
      delete blob.visited
      return wasVisited;
    });


    this.setState({
      blobData: nextState
    });
  },

  render() {
    return (
      <div>
        {this.state.blobData.map((blob) => {
          return <Blob
              key={blob.id}
              x={blob.x}
              y={blob.y}
              color={blob.color} />
        })}
      </div>
    );
  }
});

export default {BlobContainer};