import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './Tictactoe';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <div>
        <Game />
        <App />   
    </div>
    , document.getElementById('root'));
registerServiceWorker();
