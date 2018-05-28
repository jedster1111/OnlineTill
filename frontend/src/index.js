import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './Tictactoe';
import Clock from './Clock';
import NameForm from './Nameform';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <div>
        <NameForm />
        <Clock />
        <Game />
        <App />   
    </div>
    , document.getElementById('root'));
registerServiceWorker();
