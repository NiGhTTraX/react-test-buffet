import React from 'react';
import ReactDOM from 'react-dom';
import appFactory from './components/app.jsx';


const App = appFactory();

ReactDOM.render(<App />, document.getElementById('root'));
