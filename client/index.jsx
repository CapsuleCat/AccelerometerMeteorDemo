import React from 'react';
import ReactDOM from 'react-dom';

import {Home} from './components/home.jsx';

if (Meteor.isClient) {
  Meteor.startup(function () {
    ReactDOM.render(<Home />, document.getElementById('render-target'));
  });
}