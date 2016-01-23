import React from 'react';
import {jQuery as $} from 'meteor/jquery';

import {Blob} from '../components/blob/blob.jsx';

const BlobContainer = React.createClass({
  getInitialState() {
    return {
      velocity: 1,
      rotation: 90,
      x: 0,
      y: 0
    }
  },

  _step() {
    // apply the velocity on the current rotation
    // set x and y
    let x = this.state.x + this.state.velocity * Math.cos(this.state.rotation * Math.PI / 180);
    let y = this.state.y + this.state.velocity * Math.sin(this.state.rotation * Math.PI / 180);

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

    this.setState({
      x, y
    });
  },

  _rotate(rotation) {
    if (this._rotateAnimation) {
      // TODO clear animation
    }

    // TODO apply "animation"
    this._rotateAnimation = null;

    this.setState({
      rotation
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
    if (this._initialY == null) {
      this._initialY = newProps.accel.y;
    }

    let aY = 0;

    if (newProps.accel.y > this._initialY + 4 * this._initialY || 
        newProps.accel.y < this._initialY - 4 * this._initialY ) {
      aY = (-newProps.accel.y - this._initialY ) / ( 8 * this._initialY );
    }

    let rotation = this._mod(this.state.rotation + aY, 360);
    console.log(rotation);
    this._rotate(rotation);
  },

  render() {
    return (
      <Blob
          x={this.state.x}
          y={this.state.y} />
    );
  }
});

export default {BlobContainer};