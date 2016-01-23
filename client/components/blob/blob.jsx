import React from 'react';

const Blob = React.createClass({
  render() {
    const styles = {
      borderRadius: '50%',
      border: '2px solid blue',
      backgroundColor: '#3355FF',
      position: 'fixed',
      top: this.props.y + 'px',
      left: this.props.x + 'px',
      width: '50px',
      height: '50px',
      textAlign: 'center'
    };

    return (
      <div style={styles}>
      </div>
    );
  }
});

export default {Blob};