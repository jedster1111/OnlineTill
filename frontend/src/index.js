import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Game from './Tictactoe';
import Clock from './Clock';
import ExampleForm from './Exampleform';
import Calculator from './Tempcalculator';
import Tictactoe from './Tictactoemulti';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
    <div>
        <Tictactoe />
        <Calculator />
        <ExampleForm />
        <Clock />
        <Game />
        <App />   
    </div>
    , document.getElementById('root'));
registerServiceWorker();
