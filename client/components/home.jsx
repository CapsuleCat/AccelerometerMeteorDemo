import React from 'react';

import {ConnectionContainer} from '../containers/connection-container.jsx';
import {BrowserInformationContainer} from '../containers/browser-information-container.jsx';

const Home = React.createClass({
  render() {
    return (
      <div style={{position: 'relative' }} className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 col-sm-12">
            <ConnectionContainer />

            <div className="panel panel-default">
              <div className="panel-body">
                <BrowserInformationContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default {Home};