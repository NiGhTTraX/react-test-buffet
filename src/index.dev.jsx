import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app-factory.js';


ReactDOM.render(<AppContainer><App /></AppContainer>,
                document.getElementById('root'));

module.hot.accept('./app-factory.js', () => {
  // eslint-disable-next-line global-require
  const NextApp = require('./app-factory.js').default;

  ReactDOM.render(<AppContainer><NextApp /></AppContainer>,
                  document.getElementById('root'));
});
