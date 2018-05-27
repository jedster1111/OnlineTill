import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './Tictactoe';
import Clock from './Clock';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <div>
        <Clock />
        <Game />
        <Clock />
        <App />   
    </div>
    , document.getElementById('root'));
registerServiceWorker();
