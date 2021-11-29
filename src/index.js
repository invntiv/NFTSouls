import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import Home from './views/Home'
import Countdown from './components/countdown'  

ReactDOM.render(
  <React.StrictMode>
    <App/>
    <Home />
  </React.StrictMode>,
  document.getElementById('root')
);
